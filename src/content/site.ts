import type { MenuChannel } from "@/types/menu";
import type {
  ChannelSlug,
  ExpandedChannelContent,
} from "@/types/portfolio";

export const menuChannels = [
  {
    slug: "about",
    title: "About",
    subtitle: "The person behind the code",
    icon: "about",
    slot: 1,
    avatar: {
      src: "/assets/mii/Oscar_custom_render_2026-08-18T05_54_32.625Z-ezgif.com-crop.gif",
      alt: "Oscar's Mii avatar",
    },
  },
  {
    slug: "projects",
    title: "Projects",
    subtitle: "Selected builds, decisions, and impact",
    icon: "projects",
    slot: 3,
    featured: true,
  },
  {
    slug: "experience",
    title: "Experience",
    subtitle: "Professional and research work",
    icon: "experience",
    slot: 4,
  },
  {
    slug: "resume",
    title: "Resume",
    subtitle: "Education, skills, and achievements",
    icon: "resume",
    slot: 7,
  },
  {
    slug: "contact",
    title: "Contact",
    subtitle: "Start a conversation",
    icon: "contact",
    slot: 9,
  },
] as const satisfies readonly MenuChannel[];

export const siteContent = {
  name: "Oscar",
  title: "Computer Science Portfolio",
  introduction:
    "An undergraduate computer science student building thoughtful software and exploring complex technical problems.",
  menuLabel: "Portfolio channels",
} as const;

export const channelContent = {
  about: {
    eyebrow: "About Oscar Pineda",
    introduction: siteContent.introduction,
    sections: [
      {
        title: "Current Education",
        items: [
          {
            title: "Univesrity of California - Davis ",
            description:
              "Bachelor's of Science in Computer Science",
            image: {
              src: "/assets/pictures/UC-Davis-Symbol-cropped.png",
              alt: "",
              width: 3840,
              height: 749,
            },
            placeholder: false,
          },
        ],
      },
      {
        title: "Technical interests and skills",
        items: [
          {
            title: "Technical interests",
            description:
              "Add the technical domains and problem areas you are most motivated to explore.",
            placeholder: true,
          },
          {
            title: "Skills by category",
            description:
              "Replace these labels with the languages, frameworks, databases, and developer tools you use.",
            tags: ["Languages to add", "Frameworks to add", "Tools to add"],
            placeholder: true,
          },
        ],
      },
    ],
    actions: [
      {
        label: "Add GitHub profile",
        description: "Connect your GitHub profile in the content file.",
      },
      {
        label: "Add LinkedIn profile",
        description: "Connect your LinkedIn profile in the content file.",
      },
    ],
  },
  projects: {
    eyebrow: "Selected work",
    introduction:
      "Project case studies will explain the problem, technical approach, personal contribution, and measurable outcome.",
    sections: [
      {
        title: "Project case studies",
        introduction:
          "Add your strongest projects first and lead with the problem each project solved.",
        items: [
          {
            title: "Featured project to add",
            meta: "Problem · Approach · Contribution · Impact",
            description:
              "Add the project summary, technical decisions, technologies, repository link, demonstration, and outcome.",
            placeholder: true,
          },
          {
            title: "Additional project to add",
            meta: "Problem · Approach · Contribution · Impact",
            description:
              "Use this space for another project that demonstrates a different technical strength.",
            placeholder: true,
          },
        ],
      },
    ],
    actions: [
      {
        label: "Add GitHub projects link",
        description: "Connect the relevant repository or GitHub profile.",
      },
      {
        label: "Add project demonstration",
        description: "Connect a live or recorded demonstration.",
      },
    ],
  },
  experience: {
    eyebrow: "Professional and research work",
    introduction:
      "Experience entries will connect your responsibilities to the technical problems you addressed and the impact of your work.",
    sections: [
      {
        title: "Experience timeline",
        items: [
          {
            title: "Experience entry to add",
            meta: "Organization · Role · Date range",
            description:
              "Add the problem or responsibility, your technical work, collaborators or constraints, and the resulting impact.",
            placeholder: true,
          },
          {
            title: "Research experience to add",
            meta: "Lab or organization · Role · Date range",
            description:
              "Add the research question, methods, tools, your contribution, and any outcome you can share.",
            placeholder: true,
          },
        ],
      },
    ],
    actions: [],
  },
  resume: {
    eyebrow: "Resume and qualifications",
    introduction:
      "This channel will provide a recruiter-friendly overview and a direct link to your current resume.",
    sections: [
      {
        title: "Resume highlights",
        items: [
          {
            title: "Education details to add",
            description:
              "Add your institution, degree, expected graduation date, and selected academic highlights.",
            placeholder: true,
          },
          {
            title: "Skills summary to add",
            description:
              "Add a concise, evidence-based summary of the technologies represented in your work.",
            placeholder: true,
          },
        ],
      },
    ],
    actions: [
      {
        label: "Add resume link",
        description: "Connect the current resume PDF before publishing.",
      },
    ],
  },
  contact: {
    eyebrow: "Start a conversation",
    introduction:
      "Provide the contact methods you want recruiters and engineering teams to use.",
    sections: [
      {
        title: "Contact details",
        items: [
          {
            title: "Email address to add",
            description:
              "Add the professional email address you want displayed publicly.",
            placeholder: true,
          },
          {
            title: "Professional profiles to add",
            description:
              "Add your GitHub and LinkedIn URLs, plus any other public profile relevant to your work.",
            placeholder: true,
          },
        ],
      },
    ],
    actions: [
      {
        label: "Add email link",
        description: "Connect a public mailto link in the content file.",
      },
      {
        label: "Add LinkedIn link",
        description: "Connect your LinkedIn profile in the content file.",
      },
    ],
  },
} as const satisfies Record<ChannelSlug, ExpandedChannelContent>;
