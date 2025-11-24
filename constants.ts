
import { SiteConfig, SectionData } from './types';

export const SEED_SECTIONS: SectionData[] = [
  {
    "id": "projects-section",
    "type": "projects",
    "title": "Selected Works",
    "subtitle": "My Portfolio",
    "isVisible": true,
    "items": [
      {
        "id": "p1",
        "title": "Aerchain Platform",
        "description": "Led migration from a legacy system to a microservices-based infrastructure using Node.js, React, and PostgreSQL. Built CI/CD pipelines and monitoring tools for high scalability.",
        "techStack": ["Node.js", "React", "AI", "PostgreSQL"],
        "imageUrl": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
        "year": "2024"
      },
      {
        "id": "p2",
        "title": "Learning Management System (LMS)",
        "description": "Architected and deployed a scalable LMS using React, Vue, and Python with AWS infrastructure and robust sprint management.",
        "techStack": ["React", "Vue", "Python", "AWS"],
        "imageUrl": "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=2074&auto=format&fit=crop",
        "year": "2023"
      },
      {
        "id": "p3",
        "title": "Ask Llama AI Chatbot",
        "description": "Designed architecture and UI/UX for an OpenAI-powered chatbot, integrating intelligent conversational capabilities into enterprise workflows.",
        "techStack": ["Vue.js", "Nest.js", "OpenAI"],
        "imageUrl": "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=2006&auto=format&fit=crop",
        "year": "2024"
      },
      {
        "id": "p4",
        "title": "Slack Bot for LMS",
        "description": "Developed a Slack-integrated chatbot to automate LMS workflows and notifications with seamless backend integration.",
        "techStack": ["JavaScript", "Node.js", "Slack API"],
        "imageUrl": "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1974&auto=format&fit=crop",
        "year": "2023"
      },
      {
        "id": "p5",
        "title": "Steve Madden eCommerce",
        "description": "Built automation, REST APIs, and multiple regional storefronts on Apache OFBiz with Vue.js for Steve Madden’s eCommerce operations.",
        "techStack": ["Apache OFBiz", "Vue.js"],
        "imageUrl": "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop",
        "year": "2021"
      },
      {
        "id": "p6",
        "title": "AAPA B2B Marketplace",
        "description": "Developed a scalable B2B marketplace for automotive parts integrating secure payment and shipping APIs.",
        "techStack": ["Apache OFBiz", "JavaScript", "Vue.js"],
        "imageUrl": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
        "year": "2020"
      }
    ]
  },
  {
    "id": "experience-section",
    "type": "experience",
    "title": "Experience",
    "subtitle": "My Journey",
    "isVisible": true,
    "items": [
      {
        "id": "e1",
        "role": "Principal Engineer",
        "company": "Machine Hack",
        "period": "May 2025 - Present",
        "description": "Leading AI-first platform development under AIM Media House. Managing a team of nine and driving architecture, product strategy, and stakeholder management.",
        "reportsTo": "Founder"
      },
      {
        "id": "e2",
        "role": "Tech Lead",
        "company": "Aerchain",
        "period": "Jun 2024 - May 2025",
        "description": "Led AI-driven procurement platform scaling with microservices and microfrontends. Architected OCR, negotiation, and automation agents.",
        "reportsTo": "CTO"
      },
      {
        "id": "e3",
        "role": "Engineering Consultant / Head of Engineering",
        "company": "Llama",
        "period": "Nov 2021 - Present",
        "description": "Defined tech vision, strategy, and infrastructure. Built and led engineering team, fostering innovation and aligning business with technology.",
        "reportsTo": "Co-founder"
      },
      {
        "id": "e4",
        "role": "Technical Consultant / Senior Engineer / Engineer",
        "company": "HotWax Systems",
        "period": "Jan 2016 - Nov 2021",
        "description": "Developed scalable ERP and retail systems for US clients. Designed APIs, led solution design, mentored engineers, and enhanced omnichannel fulfillment.",
        "reportsTo": "CTO"
      },
      {
        "id": "e5",
        "role": "Founder",
        "company": "Pinakiney Motives",
        "period": "Jun 2015 - Jan 2016",
        "description": "Built a bulk WhatsApp marketing tool to automate communications for small businesses before regulations limited operations.",
        "reportsTo": "Self"
      },
      {
        "id": "e6",
        "role": "Blogger",
        "company": "HackingGeek",
        "period": "May 2013 - Dec 2014",
        "description": "Authored Linux and cybersecurity blogs, growing an audience of over 3,000 readers.",
        "reportsTo": "Self"
      }
    ]
  },
  {
    "id": "education-section",
    "type": "education",
    "title": "Education",
    "subtitle": "Academic Background",
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
  },
  {
    "id": "philosophy-section",
    "type": "philosophy",
    "title": "Philosophy & Tools",
    "subtitle": "My Stack",
    "isVisible": true,
    "content": "### Philosophy\nI combine leadership with hands-on coding, believing true project management is people management. Staying close to development ensures clarity, mentorship, and scalable execution.\n\n### Tools\n**Development:** Node.js, React, Vue, Java, Python, Next.js, Nuxt.js\n\n**Project Management:** Jira, ClickUp, Notion, Asana, Trello, Confluence\n\n**Monitoring:** PostHog, New Relic, Mixpanel, Google Analytics, Datadog, Grafana, Sentry\n\n**AI/ML:** OpenAI, Anthropic Claude, Google Gemini, LangChain, Pinecone, Weaviate, Haystack\n\n**DevOps:** AWS, Docker, Kubernetes, Terraform, GitHub Actions, Jenkins\n\n**Security & Auth:** AWS IAM, Auth0\n\n**Databases:** PostgreSQL, MongoDB, Redis, Elasticsearch"
  }
];

export const SEED_DATA: SiteConfig = {
  hero: {
    "title": "Aishwary Shrivastava",
    "subtitle": "Engineering Scalable Tech, Leading Teams, and Building AI-Powered Solutions.",
    "rotatingWords": ["Leadership", "AI Systems", "Full-Stack Development", "Scalable Architecture"],
    "experienceText": "9+ years of full-stack experience specializing in scalable and AI-driven systems.",
    "techStack": ["Node.js", "React.js", "Vue.js", "Crew AI", "OpenAI", "MongoDB", "SQL", "AWS", "Java", "Python"],
    "bgImage": "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=3870&auto=format&fit=crop"
  },
  aiConfig: {
    "enabled": true,
    "provider": "openai",
    "systemPrompt": "You are a digital assistant for Aishwary Shrivastava. Answer questions based on his professional experience, projects, and philosophy.",
    "welcomeMessage": "Hello! Ask me anything about Aishwary Shrivastava’s work, leadership, or projects.",
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
    "title": "Let's Connect",
    "message": "© 2025 Aishwary Shrivastava. All rights reserved.",
    "socials": {
      "twitter": "",
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
