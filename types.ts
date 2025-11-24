
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

export interface SiteConfig {
  hero: {
    title: string; // The Name (e.g., AISH)
    subtitle: string; // Static part of the one-liner
    rotatingWords: string[]; // Dynamic part
    experienceText: string;
    techStack: string[];
    bgImage: string;
  };
  aiConfig: {
    systemPrompt: string;
    modelName: string; // 'gemini' or 'custom'
    welcomeMessage: string;
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
}
