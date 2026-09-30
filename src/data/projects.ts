export type ProjectCardType = "blueprint" | "server-blade";

export interface ProjectItem {
  id: string;
  title: string;
  tag: string;
  tagline: string;
  description: string;
  architecture: string;
  cardType: ProjectCardType;
  isFeatured: boolean;
  services?: string[];
  dataLayer?: string[];
  techStack: string[];
  highlights: string[];
  githubUrl: string; // "[ADD LINK]"
  liveUrl: string;   // "[ADD LINK]"
  systemMetrics?: {
    label: string;
    value: string;
  }[];
}

export const PROJECTS: ProjectItem[] = [
  {
    id: "autospace",
    title: "AutoSpace",
    tag: "Featured Architecture",
    tagline: "Smart Parking Management Platform",
    description:
      "Smart parking management platform engineered with decoupled microservices for high-concurrency sensor slot allocation, geospatial search, reservations, and payment processing.",
    architecture: "Decoupled Microservices (Auth, Resource, Booking, API Gateway)",
    cardType: "blueprint",
    isFeatured: true,
    services: ["API Gateway", "Auth Service", "Resource Service", "Booking Service"],
    dataLayer: [
      "PostgreSQL (Relational/Ledger)",
      "MongoDB (Sensors/Catalog)",
      "Redis (Distributed Cache/Locking)",
      "RabbitMQ (Asynchronous Event Bus)",
    ],
    techStack: [
      "Microservices",
      "Next.js",
      "Node.js",
      "TypeScript",
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "RabbitMQ",
      "AWS EC2",
      "Vercel",
      "Stripe",
      "Google Maps API",
      "JWT/RBAC",
    ],
    highlights: [
      "Microservices architecture partitioned into Auth, Resource, Booking, and API Gateway",
      "Geospatial parking search powered by Google Maps API with distance-radius queries",
      "Asynchronous event messaging with RabbitMQ and low-latency cache via Redis",
      "Dual database architecture: PostgreSQL for transactional records and MongoDB for sensor state",
      "Secure JWT + refresh token authentication lifecycle with Role-Based Access Control (RBAC)",
      "Stripe payment checkout integration for slot booking settlements",
    ],
    githubUrl: "[ADD LINK]",
    liveUrl: "[ADD LINK]",
    systemMetrics: [
      { label: "Topology", value: "4 Microservices" },
      { label: "Event Bus", value: "RabbitMQ AMQP" },
      { label: "Data Layer", value: "Postgres + Mongo + Redis" },
      { label: "Cloud Infra", value: "AWS EC2 + Vercel" },
    ],
  },
  {
    id: "paalazhi",
    title: "Paalazhi",
    tag: "Restaurant OS • Freelance",
    tagline: "Restaurant Operating System",
    description:
      "Custom restaurant operating system streamlining real-time dine-in orders, kitchen workflow automation, and payment processing.",
    architecture: "Full Stack Order Dispatch & Kitchen POS",
    cardType: "server-blade",
    isFeatured: false,
    dataLayer: ["PostgreSQL (Orders, Tables, Billing)"],
    techStack: ["React", "Node.js", "Express", "PostgreSQL", "Stripe", "Tailwind"],
    highlights: [
      "Real-time table ordering and synchronized kitchen dispatch display",
      "Kitchen workflow automation reducing preparation bottleneck latency",
      "Seamless bill settlement with Stripe checkout integration",
      "Relational PostgreSQL database for reliable order transactions and financial logs",
    ],
    githubUrl: "[ADD LINK]",
    liveUrl: "[ADD LINK]",
    systemMetrics: [
      { label: "Architecture", value: "Full Stack POS & Dispatch" },
      { label: "Database", value: "PostgreSQL Relational" },
      { label: "Payments", value: "Stripe Checkout" },
    ],
  },
  {
    id: "shoebox",
    title: "Shoebox",
    tag: "E-Commerce System",
    tagline: "Full-Stack Footwear E-Commerce",
    description:
      "Full-stack footwear commerce platform featuring dynamic product catalogs, inventory management, session authentication, and integrated payment processing.",
    architecture: "Full-Stack MVC Architecture with Session Management",
    cardType: "server-blade",
    isFeatured: false,
    dataLayer: ["MongoDB (Product Catalog, Users, Orders)"],
    techStack: ["React", "Node.js", "Express", "MongoDB", "TypeScript", "AWS EC2", "Session Auth", "Payment Integration"],
    highlights: [
      "Responsive footwear catalog browsing, filtering, and persistent cart checkout",
      "Server-side session authentication with secure cookie lifecycle",
      "Integrated payment processing for order settlement",
      "Cloud deployment on AWS EC2 with Linux process management",
    ],
    githubUrl: "[ADD LINK]",
    liveUrl: "[ADD LINK]",
    systemMetrics: [
      { label: "Stack", value: "React + Express + Mongo" },
      { label: "Auth", value: "Session-based Cookies" },
      { label: "Hosting", value: "AWS EC2 Linux" },
    ],
  },
  {
    id: "zanpad",
    title: "Zanpad",
    tag: "Web Application",
    tagline: "Fast Notepad & Note Capture",
    description:
      "Minimalist, high-speed notepad application designed for friction-free note-taking with Clerk Google OAuth and instant cloud deployment.",
    architecture: "Serverless Edge Application",
    cardType: "server-blade",
    isFeatured: false,
    dataLayer: ["Edge Cloud Storage"],
    techStack: ["Next.js", "TypeScript", "Clerk (Google OAuth)", "Tailwind", "Vercel"],
    highlights: [
      "Instant note drafting and autosave with lightweight responsive interface",
      "Seamless Google OAuth authentication managed through Clerk",
      "Serverless Next.js deployment with rapid edge caching on Vercel",
    ],
    githubUrl: "[ADD LINK]",
    liveUrl: "[ADD LINK]",
    systemMetrics: [
      { label: "Framework", value: "Next.js App Router" },
      { label: "Auth Provider", value: "Clerk Google OAuth" },
      { label: "Deployment", value: "Vercel Edge Network" },
    ],
  },
];
