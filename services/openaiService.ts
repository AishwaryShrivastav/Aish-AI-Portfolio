
import OpenAI from 'openai';

export const generateAIResponse = async (
    prompt: string, 
    systemInstruction: string,
    history: { role: 'user' | 'model'; content: string }[] = [],
    modelName: string = 'gpt-4o'
): Promise<string> => {
    try {
        // Support both process.env (mapped in vite.config) and import.meta.env (Vite standard)
        const apiKey = process.env.API_KEY || (import.meta as any).env?.VITE_API_KEY;
        
        if (!apiKey) {
            console.warn("API Key is missing.");
            return "ACCESS DENIED. API Key missing.";
        }

        // Initialize OpenAI Client
        // Note: dangerouslyAllowBrowser is required because we are calling this from the frontend.
        // In a production environment with strict security, this should be proxied through a backend.
        const openai = new OpenAI({
            apiKey: apiKey,
            dangerouslyAllowBrowser: true 
        });

        const formattedHistory = history.map(h => ({
            role: h.role === 'model' ? 'assistant' : 'user' as 'user' | 'assistant',
            content: h.content
        }));

        const completion = await openai.chat.completions.create({
            messages: [
                { role: "system", content: systemInstruction },
                ...formattedHistory,
                { role: "user", content: prompt }
            ],
            model: modelName,
        });

        return completion.choices[0].message.content || "No data received from the core.";
    } catch (error) {
        console.error("OpenAI API Error:", error);
        return "CONNECTION ERROR. The neural link to ChatGPT was interrupted.";
    }
};
