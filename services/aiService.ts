
import { generateOpenAIResponse } from './openaiService';
import { generateGeminiResponse } from './geminiService';
import { generateHuggingFaceResponse } from './huggingFaceService';
import { SiteConfig } from '../types';

// Helper to serialize site data into a readable context for the LLM
const formatSiteContext = (data: SiteConfig): string => {
    let context = `\n\n--- WEBSITE CONTENT CONTEXT ---\n`;
    
    context += `HERO: Title: ${data.hero.title}, Subtitle: ${data.hero.subtitle}, Experience: ${data.hero.experienceText}, Tech: ${data.hero.techStack.join(', ')}\n\n`;
    
    data.sections.forEach(section => {
        if (!section.isVisible) return;
        context += `SECTION: ${section.title} (${section.type})\n`;
        if (section.content) context += `Content: ${section.content}\n`;
        if (section.items) {
            context += `Items: ${JSON.stringify(section.items)}\n`;
        }
        context += `\n`;
    });

    context += `CONTACT: ${JSON.stringify(data.footer.socials)}\n`;
    context += `--- END CONTEXT ---\n`;
    return context;
};

export const generateAIResponse = async (
    prompt: string, 
    history: { role: 'user' | 'model'; content: string }[],
    siteData: SiteConfig
): Promise<string> => {
    
    const { provider, apiKeys, models, systemPrompt } = siteData.aiConfig;
    
    // Fallbacks for API Keys using process.env (Vite) if not provided in CMS
    const envOpenAI = process.env.API_KEY || (import.meta as any).env?.VITE_API_KEY;
    const envGemini = (import.meta as any).env?.VITE_GEMINI_KEY;
    const envHF = (import.meta as any).env?.VITE_HF_TOKEN;

    const apiKey = apiKeys[provider] || 
        (provider === 'openai' ? envOpenAI : 
         provider === 'gemini' ? envGemini : 
         provider === 'huggingface' ? envHF : '');

    const model = models[provider];

    // Inject Site Data into System Prompt
    const fullSystemPrompt = `${systemPrompt}\n${formatSiteContext(siteData)}`;

    switch (provider) {
        case 'openai':
            return generateOpenAIResponse(prompt, fullSystemPrompt, history, apiKey, model);
        case 'gemini':
            return generateGeminiResponse(prompt, fullSystemPrompt, history, apiKey, model);
        case 'huggingface':
            return generateHuggingFaceResponse(prompt, fullSystemPrompt, history, apiKey, model);
        default:
            return "SYSTEM ERROR: Unknown AI Provider selected.";
    }
};
