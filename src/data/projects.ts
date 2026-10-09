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
  image: string;
  services?: string[];
  dataLayer?: string[];
  techStack: string[];
  highlights: string[];
  githubUrl: string;
  liveUrl: string;
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
    image: "/images/projects/autospace.jpg",
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
    image: "/images/projects/paalazhi.jpg",
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
    image: "/images/projects/shoebox.jpg",
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
    image: "/images/projects/zanpad.jpg",
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
  {
    id: "rate-limiter",
    title: "Rate Limiter",
    tag: "Distributed Sandbox",
    tagline: "Sliding-Window Lua Rate Limiter",
    image: "/images/projects/ratelimiter.jpg",
    description:
      "Sub-millisecond distributed rate limiter leveraging Upstash Redis atomic Lua scripts for multi-region API abuse prevention and DDoS mitigation.",
    architecture: "Edge Proxy Rate Limiter with Upstash Redis",
    cardType: "blueprint",
    isFeatured: false,
    dataLayer: ["Upstash Redis (Sliding Logs, Tokens)"],
    techStack: ["Upstash Redis", "Next.js", "TypeScript", "Lua Scripting", "Tailwind"],
    highlights: [
      "Atomic sliding-window Lua execution eliminating race conditions",
      "Sub-10ms response times deployed to edge runtimes",
      "Fail-open graceful fallback protection preserving client availability",
    ],
    githubUrl: "[ADD LINK]",
    liveUrl: "[ADD LINK]",
    systemMetrics: [
      { label: "Engine", value: "Upstash Redis Lua" },
      { label: "Latency", value: "<10ms Global" },
      { label: "Algorithm", value: "Sliding Window Log" },
    ],
  },
  {
    id: "task-engine",
    title: "Task Engine",
    tag: "Distributed Backend",
    tagline: "Asynchronous Queue & Worker Orchestrator",
    image: "/images/projects/taskengine.jpg",
    description:
      "Durable event-driven job queue managing distributed worker pools, retries, and dead-letter pipelines with RabbitMQ and Node.js.",
    architecture: "Event-Driven Worker Cluster",
    cardType: "server-blade",
    isFeatured: false,
    dataLayer: ["RabbitMQ (AMQP Exchanges)", "Redis (Idempotency Keys)"],
    techStack: ["RabbitMQ", "Node.js", "TypeScript", "Docker", "Redis"],
    highlights: [
      "Idempotent message handling with Redis deduplication keys",
      "Automatic Dead Letter Exchange routing for poison message isolation",
      "Concurrent worker scaling with dynamic prefetch tuning",
    ],
    githubUrl: "[ADD LINK]",
    liveUrl: "[ADD LINK]",
    systemMetrics: [
      { label: "Broker", value: "RabbitMQ AMQP" },
      { label: "Workers", value: "Node.js Clustered" },
      { label: "Guarantees", value: "At-least-once + Idempotent" },
    ],
  },
  {
    id: "cloud-shield",
    title: "Cloud Shield",
    tag: "Cloud Infrastructure",
    tagline: "Resilient Multi-AZ AWS Topology",
    image: "/images/projects/cloudshield.jpg",
    description:
      "Highly available multi-availability zone AWS infrastructure topology with automated application load balancing, health probes, and private VPC subnets.",
    architecture: "Multi-AZ Cloud Infrastructure",
    cardType: "blueprint",
    isFeatured: false,
    dataLayer: ["Amazon RDS PostgreSQL", "ElastiCache Redis"],
    techStack: ["AWS EC2", "AWS ECS", "ALB", "Terraform", "Docker", "VPC"],
    highlights: [
      "Strict network isolation: public internet-facing ALBs and private compute/DB subnets",
      "Predictive auto-scaling groups tuned to request queues rather than delayed CPU stats",
      "Automated blue-green container task deployment with health verification",
    ],
    githubUrl: "[ADD LINK]",
    liveUrl: "[ADD LINK]",
    systemMetrics: [
      { label: "Regions", value: "Multi-AZ Fault Tolerant" },
      { label: "Balancing", value: "AWS ALB Layer 7" },
      { label: "Compute", value: "ECS Containers" },
    ],
  },
  {
    id: "devpulse",
    title: "DevPulse",
    tag: "Real-Time System",
    tagline: "Distributed System Telemetry Stream",
    image: "/images/projects/devpulse.jpg",
    description:
      "Real-time telemetry and cluster monitoring application broadcasting node health and message throughput via WebSocket backplanes.",
    architecture: "Stateful WebSocket Broadcast Engine",
    cardType: "server-blade",
    isFeatured: false,
    dataLayer: ["Redis Pub/Sub (Cluster Backplane)", "TimescaleDB"],
    techStack: ["WebSockets", "Node.js", "Redis Pub/Sub", "React", "Chart.js"],
    highlights: [
      "Redis pub/sub backplane fanning out events across horizontal Node server instances",
      "Heartbeat ping/pong and exponential jitter for resilient client reconnects",
      "Low-overhead real-time metrics stream rendering at 60 FPS",
    ],
    githubUrl: "[ADD LINK]",
    liveUrl: "[ADD LINK]",
    systemMetrics: [
      { label: "Protocol", value: "Persistent WebSockets" },
      { label: "Backplane", value: "Redis Pub/Sub" },
      { label: "Throughput", value: "Real-time Telemetry" },
    ],
  },
];
