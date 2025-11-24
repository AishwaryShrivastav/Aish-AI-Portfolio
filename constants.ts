
import { SiteConfig, SectionData } from './types';

export const SEED_SECTIONS: SectionData[] = [
  {
    id: 'projects-section',
    type: 'projects',
    title: 'Architected Realities',
    subtitle: 'Selected Works & System Designs',
    isVisible: true,
    items: [
      {
        id: 'p1',
        title: 'Neural Cloud Infrastructure',
        description: 'Designed a scalable, self-healing cloud architecture for AI model training at scale. Reduced latency by 40% using edge computing patterns.',
        techStack: ['Kubernetes', 'Terraform', 'Go', 'gRPC'],
        imageUrl: 'https://picsum.photos/600/400?random=1',
        year: '2023'
      },
      {
        id: 'p2',
        title: 'FinTech Ledger Core',
        description: 'High-frequency trading ledger capable of processing 1M TPS. Built with Rust and event-sourcing principles.',
        techStack: ['Rust', 'Kafka', 'PostgreSQL', 'Redis'],
        imageUrl: 'https://picsum.photos/600/400?random=2',
        year: '2022'
      },
      {
        id: 'p3',
        title: 'Smart City Grid',
        description: 'IoT ingestion engine for a smart city pilot. Handles millions of sensor data points in real-time.',
        techStack: ['Elixir', 'Phoenix', 'TimescaleDB', 'MQTT'],
        imageUrl: 'https://picsum.photos/600/400?random=3',
        year: '2021'
      }
    ]
  },
  {
    id: 'philosophy-section',
    type: 'philosophy',
    title: 'Design Philosophy',
    subtitle: 'The Tao of Architecture',
    isVisible: true,
    content: `
### Simplicity is the ultimate sophistication.

I believe in building systems that are robust not because they are complex, but because they are resilient.

*   **Autonomy:** Decoupled services that can stand alone.
*   **Observability:** You cannot fix what you cannot see.
*   **Evolution:** Architecture is a journey, not a destination.
    `
  },
  {
    id: 'experience-section',
    type: 'experience',
    title: 'Trajectory',
    subtitle: 'Professional Timeline',
    isVisible: true,
    items: [
      {
        id: 'e1',
        role: 'Principal Architect',
        company: 'Cyberdyne Systems',
        period: '2022 - Present',
        description: 'Leading the neural network infrastructure team. Defining standards for AI interactions.',
        reportsTo: 'VP of Engineering'
      },
      {
        id: 'e2',
        role: 'Senior Backend Engineer',
        company: 'Tyrell Corp',
        period: '2019 - 2022',
        description: 'Implemented core replicant identity services and scaled auth systems to global availability.',
        reportsTo: 'Chief Technical Officer'
      },
      {
        id: 'e3',
        role: 'Systems Developer',
        company: 'Massive Dynamic',
        period: '2016 - 2019',
        description: 'Worked on fringe science data pipelines and localized quantum storage solutions.',
        reportsTo: 'Lead Systems Architect'
      }
    ]
  },
  {
    id: 'education-section',
    type: 'education',
    title: 'Knowledge Base',
    subtitle: 'Academics & Certifications',
    isVisible: true,
    items: [
      {
        id: 'ed1',
        degree: 'M.S. Computer Science',
        institution: 'MIT',
        year: '2016'
      },
      {
        id: 'ed2',
        degree: 'B.S. Electrical Engineering',
        institution: 'CalTech',
        year: '2014'
      },
      {
        id: 'cert1',
        degree: 'AWS Solutions Architect Professional',
        institution: 'Amazon Web Services',
        year: '2023'
      }
    ]
  }
];

export const SEED_DATA: SiteConfig = {
  hero: {
    title: "AISH",
    subtitle: "Architecting The",
    rotatingWords: ["Future", "Cloud", "Unknown", "Singularity"],
    experienceText: "9+ Years of experience forging systems with:",
    techStack: ["Kubernetes", "Rust", "Go", "TensorFlow", "React", "AWS", "GraphQL"],
    bgImage: "https://picsum.photos/1920/1080?grayscale&blur=2"
  },
  aiConfig: {
    systemPrompt: "You are 'Aish AI', a digital assistant for Aish, a Technical Architect. You are helpful, futuristic, and slightly witty. You know all about Aish's projects (Neural Cloud, FinTech Ledger) and experience. Keep answers concise and tech-focused.",
    modelName: 'gpt-4o',
    welcomeMessage: "System Online. I am Aish's digital twin (powered by OpenAI). Ask me anything about his architecture or experience."
  },
  footer: {
    title: "INITIALIZE CONNECTION",
    message: "Building the future, one microservice at a time.",
    socials: {
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
      github: "https://github.com",
      email: "mailto:hello@example.com"
    }
  },
  sections: SEED_SECTIONS
};
