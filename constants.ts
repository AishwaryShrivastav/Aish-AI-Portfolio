
import { SiteConfig, SectionData } from './types';

export const SEED_SECTIONS: SectionData[] = [
  {
    "id": "philosophy-section",
    "type": "philosophy",
    "title": "Engineering Philosophy",
    "subtitle": "Hands-on Leadership, AI-First Thinking",
    "isVisible": true,
    "content": "I believe that true technical leadership demands staying hands-on. You cannot effectively lead engineering teams without understanding the code, the complexity, and the trade-offs. Ultimately, engineering management is not just about systems; it is fundamentally about people management—empowering individuals to master their craft and take ownership.\n\nMy approach was deeply shaped by the Sri Sathya Sai National Leadership Program, where I imbibed the values of leading through service, empathy, and integrity. Later, at Llama, building leadership development tools for global giants like LinkedIn and BCG, I saw firsthand how technology serves human potential. This experience cemented my conviction: build systems that scale, but build teams that thrive through autonomy, clarity, and purpose."
  },
  {
    "id": "projects-section",
    "type": "projects",
    "title": "Projects & Platforms",
    "subtitle": "Engineering Intelligence at Scale",
    "isVisible": true,
    "items": [
      {
        "id": "p1",
        "title": "MachineHack Platform",
        "description": "Led the complete transformation of MachineHack SaaS from a monolithic ML hackathon product into a modular, AI-first, agentic ecosystem. Architected the migration to a serverless, event-driven system using Node.js, Python, MongoDB, and AWS. Expanded scope beyond ML to domain-specific and multi-agent hackathons while also managing product strategy and project execution.",
        "techStack": ["Agentic Architecture", "Python", "Node.js", "MongoDB", "Serverless", "AWS"],
        "imageUrl": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop",
        "year": "2025"
      },
      {
        "id": "p4",
        "title": "Aerchain Platform",
        "description": "Architected an **AI-powered B2B SaaS procurement platform** leveraging LLMs, RAG pipelines, and event-driven microservices. Developed intelligent agents for OCR, negotiation, and document workflows to enhance automation and simplify user journeys. Managed product, project, and engineering alignment for consistent delivery and AI adoption.",
        "techStack": ["Node.js", "React", "AI", "PostgreSQL", "RAG", "Agentic AI", "LLMs"],
        "imageUrl": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
        "year": "2024"
      },
      {
        "id": "p2",
        "title": "Ask Llama AI Chatbot",
        "description": "Built an AI-first conversational assistant with OpenAI APIs and Vue.js. Designed multi-agent reasoning and feedback loops, enabling natural dialogue and contextual learning. Managed both product direction and engineering delivery from concept to deployment.",
        "techStack": ["Vue.js", "Nest.js", "OpenAI", "LangChain", "RAG"],
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop",
        "year": "2024"
      },
      {
        "id": "p3",
        "title": "Learning Management System (LMS)",
        "description": "Architected and shipped a multi-tenant, scalable LMS built with React, Vue, and Python on AWS. Designed for high concurrency and modular expansion, enabling smooth course management and analytics for enterprise clients.",
        "techStack": ["React", "Vue", "Python", "AWS"],
        "imageUrl": "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=2074&auto=format&fit=crop",
        "year": "2023"
      },
      {
        "id": "p5",
        "title": "Slack Bot for LMS",
        "description": "Developed a Slack-integrated automation bot to handle LMS notifications, real-time course updates, and workflow management for instructors and learners.",
        "techStack": ["JavaScript", "Node.js", "Slack API"],
        "imageUrl": "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1470&auto=format&fit=crop",
        "year": "2023"
      },
      {
        "id": "p6",
        "title": "Steve Madden eCommerce",
        "description": "Developed automation flows, REST APIs, and regional storefronts for the Steve Madden eCommerce platform using Apache OFBiz and Vue.js, integrating payments and logistics systems.",
        "techStack": ["Apache OFBiz", "Vue.js"],
        "imageUrl": "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop",
        "year": "2021"
      },
      {
        "id": "p7",
        "title": "AAPA B2B Marketplace",
        "description": "Built a B2B marketplace for automotive parts integrating payment and shipping APIs for 10+ stakeholders, designed for scalability and high availability.",
        "techStack": ["Apache OFBiz", "JavaScript", "Vue.js"],
        "imageUrl": "https://images.unsplash.com/photo-1486262715619-01b80258e0b5?q=80&w=2070&auto=format&fit=crop",
        "year": "2020"
      }
    ]
  },
  {
    "id": "experience-section",
    "type": "experience",
    "title": "Professional Experience",
    "subtitle": "Leading Through Action and Architecture",
    "isVisible": true,
    "items": [
      {
        "id": "e1",
        "role": "Principal Engineer",
        "company": "Machine Hack (AIM Media House)",
        "period": "May 2025 - Present",
        "description": "Driving MachineHack’s evolution into an AI-first, agentic platform. Leading architecture, engineering, product, and project management simultaneously. Spearheading the migration from monolithic design to modular, event-driven systems using Node.js, Python, and MongoDB. Mentoring teams to integrate AI across product lifecycles and operational workflows.",
        "reportsTo": "Founder"
      },
      {
        "id": "e2",
        "role": "Tech Lead",
        "company": "Aerchain",
        "period": "Jun 2024 - May 2025",
        "description": "Led development of an AI-powered procurement platform leveraging LLMs, RAG pipelines, and agentic automation. Designed and implemented agents for OCR, negotiation, and document workflows, improving decision-making and user efficiency. Managed product direction, cross-functional collaboration, and full-scale technical execution.",
        "reportsTo": "CTO"
      },
      {
        "id": "e3",
        "role": "Head of Engineering / Consultant",
        "company": "Llama",
        "period": "Nov 2021 - Present",
        "description": "Built the tech team and product suite from the ground up. Launched key products like the LMS, Ask Llama bot, and Slack bot. Managed both engineering and product strategy, defining the tech roadmap and delivery cycles. The company specialized in leadership training for clients such as LinkedIn, BCG, and McKinsey, reinforcing my belief in people-centric engineering.",
        "reportsTo": "Co-founder"
      },
      {
        "id": "e4",
        "role": "Technical Consultant / Senior Engineer / Engineer",
        "company": "HotWax Systems",
        "period": "Jan 2016 - Nov 2021",
        "description": "Delivered large-scale ERP and retail systems for global clients. Designed scalable APIs, integrated Solr search, and automated workflows. Mentored developers and improved system performance through modular architecture.",
        "reportsTo": "CTO"
      },
      {
        "id": "e5",
        "role": "Founder & Blogger",
        "company": "HackingGeek",
        "period": "May 2013 - Jan 2016",
        "description": "Founded a cybersecurity and tech blog that grew to 3,000+ readers. Created automation tools for digital marketing and shared insights on cybersecurity, Linux, and product growth.",
        "reportsTo": "Self"
      }
    ]
  },
  {
    "id": "education-section",
    "type": "education",
    "title": "Education & Certifications",
    "subtitle": "Learning That Shapes Leadership",
    "isVisible": true,
    "items": [
      {
        "id": "ed1",
        "degree": "Sri Sathya Sai National Leadership Program",
        "institution": "Sri Satya Sai Institute of Higher Learning",
        "year": "2020"
      },
      {
        "id": "ed2",
        "degree": "Certified Ethical Hacker",
        "institution": "EC-Council",
        "year": "2015"
      },
      {
        "id": "ed3",
        "degree": "Bachelor’s in Computer Science Engineering",
        "institution": "CDGI, Indore",
        "year": "2016"
      }
    ]
  }
];

export const SEED_DATA: SiteConfig = {
  hero: {
    "title": "Aish",
    "subtitle": "Building Agentic AI Systems, Scalable Architectures, and Empowered Teams.",
    "rotatingWords": ["Agentic AI", "Leadership", "System Design", "Product Strategy"],
    "experienceText": "9+ years building AI-driven, scalable products while leading teams with empathy and precision.",
    "techStack": [
      "Agentic Systems",
      "RAG",
      "Prompt Engineering",
      "TypeScript",
      "Node.js (Nest)",
      "Python",
      "React, Next.js",
      "Event-Driven Microservices",
      "Domain-Driven Design",
      "Clean Architecture",
      "AWS",
      "Javascript",
      "MySQL",
      "MongoDB",
      "Elastic Search",
      "Redis",
      "CI/CD"
    ],
    // High-tech abstract neural network background
    "bgImage": "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=3270&auto=format&fit=crop",
    "showRotatingText": true
  },
  aiConfig: {
    "enabled": true,
    "showWidget": true,
    "provider": "openai",
    "systemPrompt": "You are a digital assistant for Aishwary Shrivastava — Principal Engineer and AI Systems Architect. You know his expertise in agentic architectures, RAG, LLM-driven products, leadership, and product strategy. He blends hands-on engineering with people-first leadership and believes management is about enabling people and self-mastery. He studied servant leadership at Sri Sathya Sai Institute and built teams from scratch at Llama and MachineHack, driving AI-first transformations.",
    "welcomeMessage": "Hi! Ask me about Aishwary’s AI systems, leadership philosophy, or the products he’s built.",
    "apiKeys": {
      "openai": "",
      "gemini": "",
      "huggingface": ""
    },
    "models": {
      "openai": "gpt-4o",
      "gemini": "gemini-2.5-flash",
      "huggingface": "mistralai/Mistral-7B-Instruct-v0.2"
    }
  },
  footer: {
    "title": "Let’s Connect",
    "message": "© 2025 Aishwary Shrivastava. Designing systems and teams that scale with intelligence.",
    "socials": {
      "twitter": "https://x.com/aishshrivastava",
      "linkedin": "https://linkedin.com/in/aishwaryshrivastava",
      "github": "",
      "email": "mailto:aishwaryshrivastava@gmail.com"
    }
  },
  sections: SEED_SECTIONS,
  analytics: {
    totalVisits: 0,
    lastVisit: new Date().toISOString(),
    devices: { mobile: 0, desktop: 0 }
  }
};
