import {
  access,
  cp,
  mkdir,
  readFile,
  rm,
  writeFile,
} from "node:fs/promises";
import { resolve } from "node:path";

const projectRoot = process.cwd();
const distRoot = resolve(projectRoot, "dist");
const clientRoot = resolve(distRoot, "client");
const serverRoot = resolve(distRoot, "server");
const nextStaticRoot = resolve(projectRoot, ".next", "static");
const nextAppRoot = resolve(projectRoot, ".next", "server", "app");

if (!distRoot.startsWith(`${projectRoot}\\`) && !distRoot.startsWith(`${projectRoot}/`)) {
  throw new Error("Refusing to prepare a build outside the project directory.");
}

await access(resolve(nextAppRoot, "index.html"));
await rm(distRoot, { recursive: true, force: true });
await mkdir(serverRoot, { recursive: true });
await mkdir(resolve(clientRoot, "_next"), { recursive: true });

await cp(resolve(projectRoot, "public"), clientRoot, { recursive: true });
await cp(nextStaticRoot, resolve(clientRoot, "_next", "static"), {
  recursive: true,
});
await cp(resolve(nextAppRoot, "index.html"), resolve(clientRoot, "index.html"));
await cp(
  resolve(nextAppRoot, "_not-found.html"),
  resolve(clientRoot, "404.html"),
);

const workerSource = `const metadataSelector =
  'meta[property="og:image"], meta[name="twitter:image"]';

function withMetadataOrigin(response, request) {
  const contentType = response.headers.get("content-type") ?? "";

  if (!contentType.includes("text/html")) {
    return response;
  }

  const origin = new URL(request.url).origin;

  return new HTMLRewriter()
    .on(metadataSelector, {
      element(element) {
        element.setAttribute("content", \`\${origin}/og-v2.png\`);
      },
    })
    .transform(response);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/") {
      url.pathname = "/index.html";
    }

    const assetRequest = new Request(url, request);
    const response = await env.ASSETS.fetch(assetRequest);

    if (response.status === 404 && !url.pathname.includes(".")) {
      const fallbackUrl = new URL("/404.html", request.url);
      return withMetadataOrigin(
        await env.ASSETS.fetch(new Request(fallbackUrl, request)),
        request,
      );
    }

    return withMetadataOrigin(response, request);
  },
};
`;

await writeFile(resolve(serverRoot, "index.js"), workerSource, "utf8");

const indexHtml = await readFile(resolve(clientRoot, "index.html"), "utf8");

if (!indexHtml.includes("Oscar | Computer Science Portfolio")) {
  throw new Error("The generated site does not contain the expected metadata.");
}

console.log("Prepared Sites deployment output in dist.");
