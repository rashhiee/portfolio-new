export interface BlogSection {
  heading: string;
  body: string;
  bullets?: string[];
  codeBlock?: {
    language: string;
    filename?: string;
    code: string;
  };
}

export interface BlogPost {
  slug: string;
  id: string; // for compatibility
  title: string;
  subtitle: string;
  excerpt: string;
  category: "PROJECT DEEP DIVE" | "ENGINEERING" | "CLIENT ARCHITECTURE" | "SYSTEM DESIGN" | "CAREER REFLECTIONS";
  readingTime: string;
  readTime: string;
  publishedAt?: string;
  date?: string;
  coverImage: string;
  image: string;
  altText: string;
  tags: string[];
  content: {
    overview: string;
    sections: BlogSection[];
    takeaways: string[];
  };
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "building-autospace",
    id: "building-autospace",
    title: "Building AutoSpace: A Smart Parking Management Platform",
    subtitle: "Architecting a decoupled microservices platform handling 1,000+ daily requests, geospatial search, and real-time valet logistics.",
    excerpt: "How we architected a decoupled microservices platform handling 1,000+ daily requests across 4 services, geospatial proximity search, and real-time valet logistics.",
    category: "PROJECT DEEP DIVE",
    readingTime: "6 min read",
    readTime: "6 min read",
    date: "2026",
    publishedAt: "2026",
    coverImage: "https://cdn.21st.dev/assets/mirror/57/57332c2066d3283d7c8b8fb7d1f2b4fb6fe692e6d770884ca969cf986ecb420c.jpg",
    image: "https://cdn.21st.dev/assets/mirror/57/57332c2066d3283d7c8b8fb7d1f2b4fb6fe692e6d770884ca969cf986ecb420c.jpg",
    altText: "AutoSpace smart parking microservices architecture and geospatial interface",
    tags: ["Microservices", "Next.js", "PostgreSQL", "RabbitMQ", "Redis", "AWS EC2", "Stripe"],
    content: {
      overview:
        "Urban parking systems often suffer from fragmented facility management, zero live visibility into vacant stalls, and chaotic manual coordination between parking operators and valet staff. AutoSpace was designed to solve this by engineering a unified, high-availability platform powered by decoupled microservices, sub-millisecond slot queries, and automated booking lifecycles.",
      sections: [
        {
          heading: "The Problem Space & Platform Goals",
          body:
            "Drivers circling congested urban corridors waste fuel and create street-level bottlenecks when parking availability cannot be queried in advance. On the facility side, lot owners lack automated tools to track occupancy, process credit card settlements, or manage on-duty valet attendants. The architectural objective was clear: build a resilient platform that provides drivers with instant geospatial slot reservations while offering facility administrators real-time operational control.",
          bullets: [
            "Eliminate parking search latency via real-time radius-based slot discovery.",
            "Enforce strict concurrency control to prevent double-booking identical parking slots.",
            "Provide role-based operational visibility across facility managers, owners, and valet attendants.",
            "Guarantee 99.9% uptime and low-latency API response times under high-concurrency peak traffic.",
          ],
        },
        {
          heading: "Decoupled Service Topology: 4 Independent Microservices",
          body:
            "Rather than coupling authentication, facility catalogues, and payments into a monolithic codebase, AutoSpace is partitioned into four decoupled services coordinated through a centralized API Gateway:",
          bullets: [
            "Centralized API Gateway: Serves as the single client entry point. Enforces centralized request routing, SSL termination, rate limiting, and JWT authentication checks before proxying requests downstream.",
            "Auth Service: Manages credential hashing, user profiles, session issuance, refresh-token rotation, and granular Role-Based Access Control (RBAC).",
            "Resource Service: Handles parking lot registry, spatial coordinates, slot dimensions, pricing rules, and valet availability rosters.",
            "Booking Service: Orchestrates reservation state machines, slot locks, Stripe payment processing, and booking cancellations.",
          ],
        },
        {
          heading: "Centralized API Gateway & JWT Refresh-Token Lifecycle",
          body:
            "Security across distributed microservices requires strict token verification without creating database bottlenecks on every request. AutoSpace utilizes short-lived JWT access tokens paired with long-lived refresh tokens stored exclusively in secure, httpOnly, SameSite=Strict cookies to protect against cross-site scripting (XSS) and token theft.",
          codeBlock: {
            language: "typescript",
            filename: "gateway-auth-verification.ts",
            code: `// API Gateway JWT Verification & Header Propagation
export async function authenticateGatewayRequest(req: NextRequest) {
  const token = req.cookies.get("accessToken")?.value;
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as UserTokenPayload;
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("x-user-id", payload.userId);
    requestHeaders.set("x-user-role", payload.role);

    return NextResponse.next({ request: { headers: requestHeaders } });
  } catch (err) {
    return NextResponse.json({ error: "Token expired or invalid" }, { status: 403 });
  }
}`,
          },
        },
        {
          heading: "Geospatial Search & Proximity Queries",
          body:
            "To connect drivers with nearby parking lots, the Resource Service leverages PostgreSQL geometry types combined with distance calculation using the Haversine formula. Drivers specify their destination or broadcast their current coordinates, and the service executes spatial queries filtering parking facilities within a 20km radius.",
          bullets: [
            "Integrated with Google Maps API for interactive map rendering, turn-by-turn navigation, and marker clustering.",
            "Spatial indexing in PostgreSQL allows distance calculation without exhaustive full-table scans.",
            "Radius queries return facility occupancy rates, hourly pricing, and available valet services in real time.",
          ],
        },
        {
          heading: "Real-Time Valet Availability & State Management",
          body:
            "Valet staff coordination was modeled after on-demand delivery driver dispatch architectures. Each attendant operates with a distinct status state machine (Available, Busy, Off-Duty). When a customer books a premium valet slot, the booking service automatically checks the availability pool, locks an on-duty valet, and transitions their state to Busy until vehicle return.",
        },
        {
          heading: "Asynchronous Event Processing with RabbitMQ",
          body:
            "Booking creation must never be blocked by secondary side-effects such as sending confirmation emails or generating downloadable PDF invoices. AutoSpace utilizes RabbitMQ as an AMQP message broker to handle asynchronous workloads reliably.",
          bullets: [
            "The Booking Service publishes a 'booking.created' event to the RabbitMQ exchange immediately upon payment confirmation.",
            "Worker consumers pick up messages to generate branded PDF invoices, compile parking access QR codes, and trigger email delivery.",
            "If a downstream mail provider encounters network failures, RabbitMQ dead-letter exchanges retry delivery without interrupting the driver checkout flow.",
          ],
        },
        {
          heading: "Multi-Database Strategy & Production Deployment",
          body:
            "A dual-database pattern was selected to match differing persistence requirements: PostgreSQL guarantees ACID transactional integrity for reservations and financial ledgers, while MongoDB stores unstructured facility catalogues and sensor status telemetry. Redis operates as a distributed cache and fast-locking mechanism to prevent slot race conditions. The backend runs on AWS EC2 instances behind an Nginx reverse proxy, while the Next.js frontend is deployed on Vercel with 99.9% uptime and auto-scaling.",
        },
      ],
      takeaways: [
        "Partitioning AutoSpace into 4 microservices with an API Gateway isolated business concerns and improved maintainability.",
        "Secure HTTP-only cookies combined with short-lived JWTs and refresh rotation provide robust API security.",
        "PostgreSQL geospatial queries with Haversine distance calculations reliably filter parking options within a 20km radius.",
        "RabbitMQ message queues decoupled time-intensive tasks like invoice generation and email notifications from synchronous booking flows.",
      ],
    },
  },
  {
    slug: "designing-souqrima",
    id: "designing-souqrima",
    title: "From Figma to Code: Building an E-commerce Platform",
    subtitle: "Leading the transition from Figma UI/UX design to production code for a multi-vendor e-commerce platform at CK Creatives.",
    excerpt: "Leading database architecture and UI/UX design in Figma, and translating approved schemas into a full-stack Next.js and TypeScript application.",
    category: "ENGINEERING",
    readingTime: "5 min read",
    readTime: "5 min read",
    date: "2026",
    publishedAt: "2026",
    coverImage: "https://cdn.21st.dev/assets/mirror/2a/2ab6ce934d6bf8516dda60e58fad804ac2197ee86111687dae55c72b0040d161.jpg",
    image: "https://cdn.21st.dev/assets/mirror/2a/2ab6ce934d6bf8516dda60e58fad804ac2197ee86111687dae55c72b0040d161.jpg",
    altText: "Souqrima e-commerce platform design architecture from Figma to full-stack code",
    tags: ["Next.js", "Figma", "UI/UX", "TypeScript", "PostgreSQL", "Database Design"],
    content: {
      overview:
        "Building a multi-vendor e-commerce platform requires careful synchronization between user experience design and underlying database schema architecture. At CK Creatives, I took ownership of Souqrima end-to-end—first designing the full UI/UX system and database architecture, and currently developing the production codebase in Next.js, Node.js, and TypeScript.",
      sections: [
        {
          heading: "The Role of UI/UX Design and Figma Architecture",
          body:
            "Before writing application code, jumping straight into frontend development without an established design system inevitably leads to inconsistent spacing, disconnected component states, and costly UI rewrites. In Figma, I established an atomic design system covering color palettes, typography scales, interactive component states, and responsive breakpoints for mobile and desktop screens.",
          bullets: [
            "Standardized UI components for product cards, navigation headers, category drawers, and checkout funnels.",
            "Created responsive layout grids to ensure effortless browsing across mobile smartphones, tablets, and large displays.",
            "Mapped customer user journeys from homepage product discovery to filtering, cart reviews, and order completion.",
          ],
        },
        {
          heading: "Database Architecture and Product Data Considerations",
          body:
            "E-commerce data models are notoriously complex due to multi-attribute variants (e.g. sizes, colors, material finishes), dynamic inventory tracking, category hierarchies, and vendor attribution. The database architecture balances relational integrity with catalog flexibility.",
          bullets: [
            "Relational Schemas in PostgreSQL: Store core business entities requiring strict consistency—customer accounts, vendor registrations, order invoices, and financial transactions.",
            "Document Schemas in MongoDB: Store dynamic, deeply nested product specifications, dynamic attribute filters, and customer review aggregates.",
            "Inventory & Stock Consistency: Enforcing strict transaction isolation so product quantities decrement accurately during concurrent checkout attempts.",
          ],
        },
        {
          heading: "The Modern Full-Stack Technology Stack",
          body:
            "Translating Souqrima's design and schema into an active software platform relies on modern web technologies chosen for developer velocity, SEO performance, and type safety:",
          bullets: [
            "Next.js (App Router): Provides server-side rendering (SSR) for high-speed product page loading and search engine indexing, alongside React Server Components.",
            "TypeScript: Guarantees end-to-end type contracts across API response payloads, database entities, and frontend UI props, eliminating runtime surprises.",
            "Node.js Backend Services: Delivers high-performance REST APIs for catalog management, shopping cart operations, and vendor admin dashboards.",
          ],
        },
        {
          heading: "Translating Approved Designs and Schemas into Code",
          body:
            "The engineering phase bridges visual tokens into reusable Tailwind CSS utilities and modular React components. Each visual atom from Figma is implemented as a typed React component with explicit prop contracts, ensuring that UI updates in one area of the store never break downstream layouts.",
          codeBlock: {
            language: "typescript",
            filename: "product-variant-types.ts",
            code: `// Type-Safe Product Schema matching Figma & Database Model
export interface ProductVariant {
  sku: string;
  size: string;
  color: string;
  stockCount: number;
  priceInCents: number;
  discountPercentage?: number;
}

export interface ProductCatalogItem {
  id: string;
  vendorId: string;
  title: string;
  slug: string;
  categoryHierarchy: string[];
  variants: ProductVariant[];
  mediaGallery: string[];
  isAvailable: boolean;
}`,
          },
        },
        {
          heading: "Challenges & Lessons from Cross-Discipline Ownership",
          body:
            "Owning both design in Figma and implementation in Next.js provided valuable perspective. Designing the UI first makes you keenly aware of the exact queries required by the frontend—preventing over-fetching and unnecessary API roundtrips. The project is actively ongoing at CK Creatives, with core database models and frontend designs approved and foundational services in active development.",
        },
      ],
      takeaways: [
        "Establishing an atomic design system in Figma before writing code eliminates UI inconsistencies and accelerates engineering.",
        "Separating relational transaction data from flexible product variant catalogs simplifies query paths.",
        "TypeScript contracts ensure seamless alignment between database schema definitions and frontend UI props.",
        "Understanding both design constraints and backend architecture prevents costly schema revisions mid-development.",
      ],
    },
  },
  {
    slug: "building-palazhi",
    id: "building-palazhi",
    title: "Building a Restaurant Operating System from the Ground Up",
    subtitle: "Delivering an end-to-end restaurant operating system as a solo freelance developer—from requirements gathering to deployment.",
    excerpt: "Designing, building, and deploying Paalazhi, a full-stack restaurant operating system handling real-time table orders, kitchen dispatch, and Stripe billing.",
    category: "CLIENT ARCHITECTURE",
    readingTime: "5 min read",
    readTime: "5 min read",
    date: "2026",
    publishedAt: "2026",
    coverImage: "https://cdn.21st.dev/assets/mirror/05/05e8cb2f9105f8b6b5a600e3bf99a9a3f354d4a427f2fa533526cea2cb00e00c.jpg",
    image: "https://cdn.21st.dev/assets/mirror/05/05e8cb2f9105f8b6b5a600e3bf99a9a3f354d4a427f2fa533526cea2cb00e00c.jpg",
    altText: "Paalazhi restaurant operating system kitchen display and order management",
    tags: ["React", "Node.js", "Express", "PostgreSQL", "Stripe", "Freelance", "Client Project"],
    content: {
      overview:
        "Hospitality environments operate under fast-paced, high-pressure conditions where a lost ticket or a five-minute kitchen delay directly harms the customer experience. Between March and July 2026, I worked as a freelance full-stack developer to design, build, and deploy Paalazhi—a custom restaurant operating system built from scratch to streamline dine-in ordering, kitchen dispatch, and payment collection.",
      sections: [
        {
          heading: "Understanding the Realities of Restaurant Operations",
          body:
            "Before writing any code, I spent time understanding the day-to-day operational workflow of restaurant staff. Traditional restaurants often rely on handwritten paper slips or disjointed point-of-sale systems where front-of-house servers, kitchen line cooks, and cashiers operate without real-time coordination. The core challenges were clear:",
          bullets: [
            "Order Confusion: Handwritten order modifications led to prep errors during peak dinner rushes.",
            "Kitchen Bottlenecks: Head chefs lacked visibility into order priority queues and prep timers.",
            "Inventory Stockouts: Servers continued selling menu items after key ingredients ran out in the kitchen.",
            "Billing Delays: Waitstaff had to walk back and forth between registers and dining tables to settle guest checks.",
          ],
        },
        {
          heading: "Core Functional Modules in Paalazhi",
          body:
            "Paalazhi was structured into three tightly integrated workflows:",
          bullets: [
            "Table Ordering Workflow: A touch-optimized interface allowing floor staff to select tables, record orders with dietary notes, and transmit tickets directly to the kitchen.",
            "Synchronized Kitchen Display (KDS): A real-time kitchen screen organizing orders chronologically, categorizing items by prep station, and updating order status with single taps.",
            "Menu & Inventory Oversight: An administrative portal allowing managers to update prices, modify menu offerings, and mark sold-out items instantly.",
            "Automated Billing & Checkout: Streamlined check generation with Stripe checkout integration for credit card transactions and receipt printing.",
          ],
        },
        {
          heading: "Backend Business Logic & Order State Machine",
          body:
            "To prevent inconsistencies between the dining floor and kitchen line, orders progress through a deterministic, strictly enforced state machine backed by relational integrity in PostgreSQL:",
          codeBlock: {
            language: "typescript",
            filename: "order-lifecycle-state.ts",
            code: `// Deterministic Order Progression State Machine
export type OrderStatus = "RECEIVED" | "IN_PREPARATION" | "READY" | "SERVED" | "SETTLED";

export function canTransitionOrder(current: OrderStatus, next: OrderStatus): boolean {
  const allowedTransitions: Record<OrderStatus, OrderStatus[]> = {
    RECEIVED: ["IN_PREPARATION"],
    IN_PREPARATION: ["READY"],
    READY: ["SERVED"],
    SERVED: ["SETTLED"],
    SETTLED: [],
  };

  return allowedTransitions[current]?.includes(next) ?? false;
}`,
          },
        },
        {
          heading: "Full-Stack Implementation and Stack Choices",
          body:
            "The platform was engineered using React and Next.js on the frontend, Node.js and Express for backend REST micro-APIs, and a relational PostgreSQL database to ensure bulletproof financial records and transaction logging. Stripe was integrated to handle secure card payments and webhooks.",
        },
        {
          heading: "Lessons Learned as a Sole Developer on a Client Engagement",
          body:
            "Operating as the sole developer on a client project requires wearing every hat simultaneously—business analyst, UI designer, systems architect, and QA tester. Delivering Paalazhi reinforced that simplicity and reliability under load matter far more than theoretical complexity. Building clean software that real restaurant staff depend on daily was an invaluable milestone in my engineering journey.",
        },
      ],
      takeaways: [
        "Direct stakeholder interviews reveal practical operational bottlenecks that cannot be anticipated in isolation.",
        "Modeling order progression with a deterministic state machine eliminates front-of-house and kitchen desynchronization.",
        "Relational schemas in PostgreSQL provide the auditability needed for restaurant transactions and inventory counts.",
        "Sole ownership of a freelance engagement sharpens requirements gathering, scope management, and deployment resilience.",
      ],
    },
  },
  {
    slug: "microservices-and-performance",
    id: "microservices-and-performance",
    title: "Practical Lessons from Microservices, RabbitMQ and Redis",
    subtitle: "Architectural insights from microservice boundaries, asynchronous message brokers, and query optimization techniques that reduced API response times by 40%.",
    excerpt: "Practical insights on microservice service boundaries, RabbitMQ asynchronous queues, Redis caching, and optimizing PostgreSQL queries for high performance.",
    category: "SYSTEM DESIGN",
    readingTime: "7 min read",
    readTime: "7 min read",
    date: "2026",
    publishedAt: "2026",
    coverImage: "https://cdn.21st.dev/assets/mirror/44/44bcf2a8cafad29f508d198ab98cae0f6cf50acbc1326a36bf864f2e86f6a89e.jpg",
    image: "https://cdn.21st.dev/assets/mirror/44/44bcf2a8cafad29f508d198ab98cae0f6cf50acbc1326a36bf864f2e86f6a89e.jpg",
    altText: "Microservices architecture diagram featuring RabbitMQ message queues and Redis cache",
    tags: ["Microservices", "RabbitMQ", "Redis", "PostgreSQL", "Performance", "System Design"],
    content: {
      overview:
        "Modern backend architectures frequently adopt microservices to solve scaling and organizational challenges. However, distributed systems introduce network boundaries, data synchronization concerns, and latency pitfalls. During my professional experience as a MERN Stack Developer Intern, I implemented microservices with RabbitMQ message brokers, optimized PostgreSQL database queries, and implemented Redis caching—achieving a 40% reduction in API response times on production REST APIs processing 1,000+ requests daily.",
      sections: [
        {
          heading: "When Microservices Are Genuinely Justified",
          body:
            "Microservices should never be chosen merely as a trend. For straightforward CRUD apps with modest traffic, a modular monolith is often simpler and faster to ship. Microservices become justified when different business domains have divergent operational requirements, scaling profiles, or security boundaries. In AutoSpace, separating user authentication from high-frequency parking slot availability and payment transactions allowed each domain to scale and deploy independently without systemic risk.",
        },
        {
          heading: "Defining Clean Service Boundaries in AutoSpace",
          body:
            "A successful distributed topology requires clear, non-overlapping service boundaries:",
          bullets: [
            "API Gateway: Central entry point handling SSL, rate limiting, and JWT authentication verification before routing calls downstream.",
            "Auth Service: Sole authority on user credentials, password hashing, token generation, and role permissions.",
            "Resource Service: Owns parking lot definitions, geospatial coordinates, slot dimensions, and valet staff availability.",
            "Booking Service: Manages reservations, slot availability locking, payment handoffs, and cancellation rules.",
          ],
        },
        {
          heading: "Decoupling Synchronous Chains with RabbitMQ",
          body:
            "A classic anti-pattern in distributed systems is synchronous chaining: Service A calls Service B over HTTP, which calls Service C, which calls Service D. If any service stalls, latency multiplies and failures cascade. In our architecture, RabbitMQ converts tight temporal coupling into resilient eventual consistency.",
          codeBlock: {
            language: "typescript",
            filename: "rabbitmq-booking-publisher.ts",
            code: `// Publishing Asynchronous Booking Events via RabbitMQ
import amqp from "amqplib";

export async function publishBookingEvent(bookingData: object) {
  const connection = await amqp.connect(process.env.RABBITMQ_URL!);
  const channel = await connection.createChannel();
  const exchange = "booking_events";

  await channel.assertExchange(exchange, "fanout", { durable: true });
  channel.publish(
    exchange,
    "",
    Buffer.from(JSON.stringify(bookingData)),
    { persistent: true }
  );

  setTimeout(() => {
    connection.close();
  }, 500);
}`,
          },
        },
        {
          heading: "Reducing API Response Time by 40% with Redis & PostgreSQL Optimization",
          body:
            "In professional backend engineering, latency directly impacts customer retention and infrastructure cost. Through deliberate query tuning and caching, we reduced API response times by 40%:",
          bullets: [
            "Targeted PostgreSQL Indexing: Added composite indexes on high-frequency query paths (such as lot_id + booking_status + start_time), eliminating sequential full-table scans.",
            "Query Profiling with EXPLAIN ANALYZE: Identified slow nested joins and restructured relational queries into efficient batch statements.",
            "Redis Cache-Aside Pattern: Stored frequently requested facility profiles and active valet availability states in Redis with time-to-live (TTL) expiration, offloading recurrent reads from the primary relational database.",
            "Scale Milestone: These architectural improvements allowed our production-ready REST APIs to reliably handle 1,000+ requests per day with rock-solid consistency.",
          ],
        },
        {
          heading: "Granular RBAC and Defensive API Security",
          body:
            "Production APIs must defend against unauthorized horizontal and vertical privilege escalation. We developed a comprehensive Role-Based Access Control (RBAC) system supporting Admin, Owner, Manager, and Valet roles with granular permission matrices. Coupled with strict schema validation on all incoming request payloads, the system ensures zero unauthorized data mutations across service boundaries.",
        },
      ],
      takeaways: [
        "Microservices succeed only when service boundaries reflect genuine domain independence and differing scaling needs.",
        "RabbitMQ message queues prevent cascading network failures by converting synchronous calls into asynchronous events.",
        "Strategic PostgreSQL indexing paired with Redis cache-aside caching reduced API response times by 40%.",
        "Centralized API Gateways combined with granular RBAC provide robust defense against unauthorized API access.",
      ],
    },
  },
  {
    slug: "full-stack-development-journey",
    id: "full-stack-development-journey",
    title: "From Frontend Interfaces to Production-Ready Applications",
    subtitle: "Reflections on evolving from crafting frontend user interfaces to architecting resilient, production-grade full-stack systems.",
    excerpt: "The progression from frontend development to full-stack ownership across Next.js, Node.js, microservices, and cloud deployments.",
    category: "CAREER REFLECTIONS",
    readingTime: "6 min read",
    readTime: "6 min read",
    date: "2026",
    publishedAt: "2026",
    coverImage: "https://cdn.21st.dev/assets/mirror/8d/8d0a29816b1faeb5946abe01b3bfbf0637c4ef2aa2595d9896a738a4db137ebf.jpg",
    image: "https://cdn.21st.dev/assets/mirror/8d/8d0a29816b1faeb5946abe01b3bfbf0637c4ef2aa2595d9896a738a4db137ebf.jpg",
    altText: "Full stack engineering journey across Next.js, Node.js, cloud systems, and databases",
    tags: ["Full Stack", "TypeScript", "Next.js", "Node.js", "Career", "Software Engineering"],
    content: {
      overview:
        "Transitioning from building static user interfaces to designing, deploying, and maintaining production-ready full-stack applications is a transformative progression. It requires shifting your mindset from how an application looks to how data flows, how state persists, how failures are handled, and how infrastructure scales under load. This article reflects on my engineering journey across academic foundations, internships, freelance client deliveries, and production architectures.",
      sections: [
        {
          heading: "The Academic Grounding: Computer Applications (BCA)",
          body:
            "My journey began during my Bachelor of Computer Application (BCA) studies at the University of Calicut (2022–2025). Coursework in Data Structures, Database Management Systems (DBMS), Web Technologies, and System Design provided the theoretical scaffolding needed to understand what happens beneath modern frameworks. Learning how B-trees organize indexes, how relational normalization prevents anomalies, and how networks transmit packets demystified full-stack software development.",
        },
        {
          heading: "The Stack: Next.js, Node.js, and TypeScript",
          body:
            "Over time, my primary technical stack crystallized around Next.js (App Router), Node.js, and TypeScript. TypeScript has become indispensable: sharing type definitions between database models, backend controllers, and React UI components eliminates an entire category of runtime errors and enables fearless refactoring across complex codebases.",
          bullets: [
            "React & Next.js: Building fluid, accessible frontend interfaces with server-side rendering (SSR) and optimized bundle delivery.",
            "Node.js & Express: Architecting high-throughput REST APIs, middleware pipelines, and webhook handlers.",
            "Tailwind CSS & Shadcn UI: Crafting responsive, accessible design systems that feel modern and performant.",
          ],
        },
        {
          heading: "Deepening the Data Layer: PostgreSQL, MongoDB, and Redis",
          body:
            "A crucial turning point for any developer is mastering data storage beyond basic CRUD operations. Understanding when to use relational PostgreSQL for transactional ledger integrity, when to leverage MongoDB for flexible documents, and how Redis delivers sub-millisecond caching and rate limiting is what elevates code from a prototype to production-grade software.",
        },
        {
          heading: "Lessons Across Internships and Freelance Engagements",
          body:
            "My experience has been forged across real-world environments with distinct constraints:",
          bullets: [
            "MERN Stack Developer Intern (Jul 2025 – Mar 2026): Architected microservices with RabbitMQ, optimized PostgreSQL queries and Redis caching for a 40% latency reduction, and built geospatial search APIs.",
            "Freelance Full Stack Developer (Mar 2026 – Jul 2026): Solely designed, built, and launched Paalazhi restaurant operating system for a client, managing requirements through deployment.",
            "Full Stack Developer Intern at CK Creatives (Jul 2026 – Present): Building Thynck-OS (internal CRM with WhatsApp sales automation), leading end-to-end design and development of Souqrima e-commerce, and delivering client storefronts.",
          ],
        },
        {
          heading: "Cloud Infrastructure & Deployment Realities",
          body:
            "Code is not finished until it is running reliably in production. Deploying applications across AWS EC2 instances with Nginx reverse proxies, configuring Linux server environments, setting up automated CI/CD pipelines, and hosting frontend applications on Vercel with 99.9% uptime taught me the critical importance of observability, error boundaries, and environment isolation.",
        },
        {
          heading: "Looking Forward: Distributed Systems and System Design",
          body:
            "Software engineering is a discipline of continuous growth. My ongoing technical interests focus on distributed systems, event-driven architectures, cloud scalability, and high-performance backend design. With over 10+ full-stack applications deployed and 100+ GitHub contributions, the goal remains unchanged: writing clean, maintainable code that solves real problems with uncompromising quality.",
        },
      ],
      takeaways: [
        "End-to-end type safety with TypeScript creates a shared contract between database schemas and client interfaces.",
        "Choosing the right database for the right workload (relational vs document vs cache) is fundamental to application reliability.",
        "Deploying and monitoring production applications on AWS EC2 and Vercel builds deep empathy for operational resilience.",
        "Consistent hands-on building across client engagements and internships is the most effective way to master software engineering.",
      ],
    },
  },
];

export function getAllBlogs(): BlogPost[] {
  return BLOG_POSTS;
}

export function getBlogBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((b) => b.slug === slug || b.id === slug);
}

export function getAllBlogSlugs(): string[] {
  return BLOG_POSTS.map((b) => b.slug);
}

export function getRelatedBlogs(currentSlug: string, count: number = 3): BlogPost[] {
  return BLOG_POSTS.filter((b) => b.slug !== currentSlug).slice(0, count);
}
