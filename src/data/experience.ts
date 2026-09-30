export type SkillStatus = "Used in projects" | "Exploring";

export type SkillCategory = "Backend & Systems" | "Frontend & UI" | "Architecture & Security" | "Cloud & DevOps";

export interface SkillItem {
  name: string;
  category: SkillCategory;
  status: SkillStatus;
  context?: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  roleConfirmed: boolean;
  companyOrType: string;
  period: string;
  isCurrent?: boolean;
  type: "apprenticeship" | "freelance" | "internship" | "education";
  description: string;
  highlights: string[];
  technologies: string[];
  systemSpecs?: {
    label: string;
    value: string;
  }[];
}

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: "ck-creatives",
    role: "Software Engineering Intern",
    roleConfirmed: false, // [Confirm exact job titles before publishing: I will edit later.]
    companyOrType: "CK Creatives",
    period: "July 2026 – Present",
    isCurrent: true,
    type: "internship",
    description:
      "Driving sales pipeline automation and client digital infrastructure. Developed internal tooling, automated WhatsApp CRM sales workflows, crafted e-commerce system designs in Figma, and delivered production Shopify frontend solutions.",
    highlights: [
      "Built automated WhatsApp sales CRM integration and operational tooling",
      "Architected e-commerce systems with Figma design specifications",
      "Engineered high-conversion Shopify frontend interfaces",
    ],
    technologies: ["Next.js", "TypeScript", "Node.js", "Tailwind", "WhatsApp CRM API", "Shopify"],
    systemSpecs: [
      { label: "Pipeline", value: "WhatsApp Webhook CRM" },
      { label: "Deployment", value: "Internal Tooling & Shopify" },
      { label: "Status", value: "Active Node" },
    ],
  },
  {
    id: "freelance-paalazhi",
    role: "Freelance Full Stack Developer",
    roleConfirmed: false, // [Confirm exact job titles before publishing: I will edit later.]
    companyOrType: "Freelance",
    period: "March 2026 – July 2026",
    isCurrent: false,
    type: "freelance",
    description:
      "Solely built and launched Paalazhi, a comprehensive restaurant operating system handling table ordering, kitchen dispatch workflows, billing, and operational analytics.",
    highlights: [
      "Engineered end-to-end restaurant OS (table ordering, kitchen display, billing)",
      "Implemented reliable transaction flows and Stripe checkout integration",
      "Designed real-time order state progression and responsive management dashboards",
    ],
    technologies: ["React", "Node.js", "Express", "PostgreSQL", "Stripe", "Tailwind"],
    systemSpecs: [
      { label: "Product", value: "Paalazhi Restaurant OS" },
      { label: "Architecture", value: "Full Stack Order Dispatch" },
      { label: "Payments", value: "Stripe Checkout" },
    ],
  },
  {
    id: "apprenticeship-autospace",
    role: "Software Engineering Apprentice",
    roleConfirmed: false, // [Confirm exact job titles before publishing: I will edit later.]
    companyOrType: "Apprenticeship",
    period: "July 2025 – March 2026",
    isCurrent: false,
    type: "apprenticeship",
    description:
      "Deep-dived into full stack engineering across the MERN stack. Designed and built AutoSpace, a smart parking management platform managing sensor slot tracking, reservations, and authenticated administrative controls.",
    highlights: [
      "Mastered and applied the MERN stack in building production-ready architectures",
      "Developed AutoSpace: smart parking platform with slot booking and admin dashboard",
      "Implemented robust JWT token-based authentication and role-based access control (RBAC)",
    ],
    technologies: ["MongoDB", "Express", "React", "Node.js", "JWT/RBAC", "Tailwind"],
    systemSpecs: [
      { label: "Project", value: "AutoSpace Smart Parking" },
      { label: "Stack", value: "MERN Architecture" },
      { label: "Auth Layer", value: "JWT & Role-Based Access" },
    ],
  },
  {
    id: "education-calicut",
    role: "Bachelor of Computer Applications (BCA)",
    roleConfirmed: true,
    companyOrType: "University of Calicut",
    period: "2022 – 2025",
    isCurrent: false,
    type: "education",
    description:
      "Graduated with foundational expertise in computer science, software engineering principles, relational databases, data structures, algorithms, and networked systems.",
    highlights: [
      "Core curriculum in Data Structures, Algorithms, DBMS, and Network Systems",
      "Hands-on foundational programming in C, Java, and Web Technologies",
      "Academic research into software engineering methodologies",
    ],
    technologies: ["Data Structures", "Algorithms", "Relational Databases", "Web Technologies"],
    systemSpecs: [
      { label: "Institution", value: "University of Calicut, Kerala" },
      { label: "Degree", value: "BCA (Computer Applications)" },
      { label: "Duration", value: "3 Years (2022 – 2025)" },
    ],
  },
];

export const SKILLS_DATA: SkillItem[] = [
  // Backend & Systems
  { name: "Node.js", category: "Backend & Systems", status: "Used in projects", context: "AutoSpace & Paalazhi APIs" },
  { name: "Express", category: "Backend & Systems", status: "Used in projects", context: "MERN REST Services" },
  { name: "PostgreSQL", category: "Backend & Systems", status: "Used in projects", context: "Relational Schemas & Paalazhi" },
  { name: "MongoDB", category: "Backend & Systems", status: "Used in projects", context: "AutoSpace Document Store" },
  { name: "Redis", category: "Backend & Systems", status: "Used in projects", context: "Cache Layer & Rate Limiting" },
  { name: "RabbitMQ", category: "Backend & Systems", status: "Used in projects", context: "Message Broker & Event Dispatch" },

  // Frontend & UI
  { name: "Next.js", category: "Frontend & UI", status: "Used in projects", context: "Full-Stack App Router & SSR" },
  { name: "React", category: "Frontend & UI", status: "Used in projects", context: "Component Architecture & Hooks" },
  { name: "TypeScript", category: "Frontend & UI", status: "Used in projects", context: "Type-Safe Contracts & APIs" },
  { name: "Tailwind", category: "Frontend & UI", status: "Used in projects", context: "Design Systems & Responsive UI" },

  // Architecture & Security
  { name: "microservices", category: "Architecture & Security", status: "Used in projects", context: "Decoupled Service Topologies" },
  { name: "JWT/RBAC", category: "Architecture & Security", status: "Used in projects", context: "Secure Auth & Access Controls" },
  { name: "Stripe", category: "Architecture & Security", status: "Used in projects", context: "Checkout & Webhook Lifecycle" },

  // Cloud & DevOps
  { name: "AWS EC2", category: "Cloud & DevOps", status: "Exploring", context: "Cloud Instances & Linux Deployments" },
];
