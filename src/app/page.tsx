import { Container } from "@/components/ui/container";
import { siteContent } from "@/content/site";

export default function HomePage() {
  return (
    <main id="main-content">
      <Container className="home-shell">
        <p className="eyebrow">Portfolio foundation</p>
        <h1>{siteContent.name}</h1>
        <p className="intro">{siteContent.introduction}</p>

        <nav aria-label="Portfolio channels">
          <ul className="channel-list">
            {siteContent.channels.map((channel) => (
              <li key={channel.slug}>{channel.label}</li>
            ))}
          </ul>
        </nav>

        <p className="setup-note">
          Initial setup is complete. Channel views will be implemented in the
          next phase.
        </p>
      </Container>
    </main>
  );
}
