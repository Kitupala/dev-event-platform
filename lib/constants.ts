// Matches the fields expected by `EventDetails` + Event schema
export type DetailedEventItem = {
  title: string;
  slug: string;
  description: string;
  overview: string;
  image: string;
  venue: string;
  location: string;
  date: string;
  time: string;
  mode: "online" | "offline" | "hybrid" | string;
  audience: string;
  agenda: string[];
  organizer: string;
  tags: string[];
};

export const detailedEvents: DetailedEventItem[] = [
  {
    title: "FOSDEM 2026",
    slug: "fosdem-2026",
    description:
      "FOSDEM is one of the biggest free and open source software events in Europe, with hundreds of talks across community-run tracks.",
    overview:
      "Spend a weekend exploring open source ecosystems—from Linux and observability to modern web tooling. Expect packed devrooms, hallway track conversations, and plenty of chances to meet maintainers in person.",
    image: "/images/event1.png",
    venue: "ULB Solbosch Campus",
    location: "Brussels, BE",
    date: "2026-02-07",
    time: "09:00",
    mode: "offline",
    audience:
      "Open-source contributors, platform engineers, and web developers",
    agenda: [
      "Keynote: The state of open source in 2026",
      "Devrooms: Containers, Kubernetes & Cloud Native",
      "Devrooms: JavaScript, TypeScript & Web Performance",
      "Lightning talks + hallway track",
    ],
    organizer: "FOSDEM Volunteer Team",
    tags: ["open-source", "linux", "cloud-native", "web"],
  },
  {
    title: "KubeCon + CloudNativeCon Europe 2026",
    slug: "kubecon-cloudnativecon-europe-2026",
    description:
      "The flagship conference for Kubernetes and cloud native adopters and maintainers, featuring deep-dive sessions, maintainer tracks, and hands-on workshops.",
    overview:
      "Join platform teams and maintainers for architecture patterns, production war stories, and the latest developments across Kubernetes, service meshes, and observability.",
    image: "/images/event4.png",
    venue: "Austria Center Vienna",
    location: "Vienna, AT",
    date: "2026-03-18",
    time: "09:00",
    mode: "hybrid",
    audience: "SREs, platform engineers, DevOps teams, and cloud architects",
    agenda: [
      "Workshop: Building multi-cluster GitOps pipelines",
      "Talks: Kubernetes scalability & reliability",
      "Maintainer track: SIG updates and roadmaps",
      "Observability day: metrics, logs, traces",
    ],
    organizer: "Cloud Native Computing Foundation (CNCF)",
    tags: ["kubernetes", "cncf", "devops", "observability"],
  },
  {
    title: "PyCon US 2026",
    slug: "pycon-us-2026",
    description:
      "The largest annual gathering for the Python community, including tutorials, talks, sprints, and community events.",
    overview:
      "From Python for data and ML to backend engineering and tooling, PyCon is the best place to level up your Python craft and meet maintainers behind your favorite libraries.",
    image: "/images/event3.png",
    venue: "David L. Lawrence Convention Center",
    location: "Pittsburgh, PA, USA",
    date: "2026-04-18",
    time: "09:30",
    mode: "hybrid",
    audience: "Python developers, data engineers, researchers, and educators",
    agenda: [
      "Tutorials: Typing, async Python, and testing strategies",
      "Talks: Packaging, performance, and security",
      "Open spaces + maintainers meetups",
      "Sprints: Contribute to core and ecosystem projects",
    ],
    organizer: "Python Software Foundation",
    tags: ["python", "data", "testing", "open-source"],
  },
  {
    title: "Google I/O 2026",
    slug: "google-io-2026",
    description:
      "Google’s flagship developer event featuring announcements, technical sessions, and product deep dives across Android, web, cloud, and AI.",
    overview:
      "Get hands-on with the newest SDKs and frameworks, learn from engineers, and explore the latest best practices for building modern apps.",
    image: "/images/event5.png",
    venue: "Shoreline Amphitheatre",
    location: "Mountain View, CA, USA + Online",
    date: "2026-05-12",
    time: "10:00",
    mode: "hybrid",
    audience:
      "Mobile developers, web engineers, cloud developers, and ML practitioners",
    agenda: [
      "Keynote: Platform updates and roadmap",
      "Sessions: Android, Web, Cloud, and AI tooling",
      "Codelabs: Build and ship with new APIs",
      "Fireside chats + community meetups",
    ],
    organizer: "Google Developer Relations",
    tags: ["android", "web", "cloud", "ai"],
  },
  {
    title: "React Summit Amsterdam 2026",
    slug: "react-summit-amsterdam-2026",
    description:
      "A major React conference with talks from core contributors, ecosystem maintainers, and teams shipping React apps at scale.",
    overview:
      "A full-day deep dive into modern React patterns, performance, state management, and developer experience—plus plenty of networking with the community.",
    image: "/images/event2.png",
    venue: "Gashouder",
    location: "Amsterdam, NL",
    date: "2026-06-13",
    time: "09:00",
    mode: "offline",
    audience: "Frontend engineers, React developers, and product teams",
    agenda: [
      "Keynote: React roadmap & ecosystem updates",
      "Talks: Server Components, streaming, and caching",
      "Workshop: TypeScript-first React patterns",
      "Panel + afterparty networking",
    ],
    organizer: "GitNation",
    tags: ["react", "typescript", "frontend", "performance"],
  },
  {
    title: "HackMIT 2026",
    slug: "hackmit-2026",
    description:
      "A student-run hackathon focused on building ambitious projects in a fast-paced, collaborative environment.",
    overview:
      "Form a team, pitch an idea, and build a working demo in a weekend. Expect mentorship, sponsor APIs, workshops, and a final demo expo.",
    image: "/images/event-full.png",
    venue: "MIT Stata Center",
    location: "Cambridge, MA, USA",
    date: "2026-09-19",
    time: "10:00",
    mode: "offline",
    audience: "Students, early-career developers, and builders",
    agenda: [
      "Opening ceremony + team formation",
      "Workshops: Rapid prototyping, pitching, and APIs",
      "Mentor office hours",
      "Project expo + judging",
    ],
    organizer: "HackMIT Organizing Team",
    tags: ["hackathon", "students", "prototyping", "community"],
  },
  {
    title: "Next.js Conf 2026",
    slug: "nextjs-conf-2026",
    description:
      "A conference for building fast, modern web apps with Next.js—covering performance, app architecture, and the React ecosystem.",
    overview:
      "Learn how teams ship production Next.js apps with great DX and speed. Sessions include routing patterns, caching strategies, edge deployments, and practical observability.",
    image: "/images/event6.png",
    venue: "Moscone Center (West)",
    location: "San Francisco, CA, USA + Online",
    date: "2026-10-15",
    time: "09:00",
    mode: "hybrid",
    audience: "Full-stack web developers, frontend leads, and platform teams",
    agenda: [
      "Keynote: Next.js roadmap & ecosystem updates",
      "Talks: Performance tuning and real-world caching",
      "Workshop: App Router patterns at scale",
      "Case studies: Observability and incident learnings",
    ],
    organizer: "Vercel",
    tags: ["nextjs", "react", "fullstack", "web"],
  },
];
