
export type SectionType = 'hero' | 'projects' | 'philosophy' | 'experience' | 'education' | 'connect' | 'custom';

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  imageUrl: string;
  year: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  reportsTo?: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  year: string;
}

export interface SectionData {
  id: string;
  type: SectionType;
  title: string;
  subtitle?: string;
  content?: string; // Markdown supported
  items?: any[]; // Projects, Experience, etc.
  isVisible: boolean;
}

export interface Analytics {
  totalVisits: number;
  lastVisit: string;
  devices: {
    mobile: number;
    desktop: number;
  };
}

export type AIProvider = 'openai' | 'gemini' | 'huggingface';

export interface SiteConfig {
  hero: {
    title: string;
    subtitle: string;
    rotatingWords: string[];
    experienceText: string;
    techStack: string[];
    bgImage: string;
    showRotatingText?: boolean;
  };
  aiConfig: {
    enabled: boolean;
    showWidget: boolean; // Controls visibility of the floating AI button
    provider: AIProvider;
    systemPrompt: string;
    welcomeMessage: string;
    apiKeys: {
      openai: string;
      gemini: string;
      huggingface: string;
    };
    models: {
      openai: string;
      gemini: string;
      huggingface: string;
    };
  };
  footer: {
    title: string;
    message: string;
    socials: {
      twitter: string;
      linkedin: string;
      github: string;
      email: string;
    };
  };
  sections: SectionData[];
  analytics?: Analytics;
}
