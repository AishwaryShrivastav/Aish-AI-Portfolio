import { GoogleGenAI } from "@google/genai";

const getClient = () => {
    const apiKey = process.env.API_KEY || '';
    if (!apiKey) {
        console.warn("API Key is missing. AI features will not work.");
    }
    return new GoogleGenAI({ apiKey });
};

export const generateAIResponse = async (
    prompt: string, 
    systemInstruction: string,
    history: { role: 'user' | 'model'; content: string }[] = []
): Promise<string> => {
    try {
        const client = getClient();
        
        // Construct the full context including history for a simple stateless chat experience 
        // or use the Chat API if we were maintaining a session object properly.
        // For this implementation, we will use the Chat API to maintain simple context.
        
        const chat = client.chats.create({
            model: 'gemini-2.5-flash',
            config: {
                systemInstruction: systemInstruction,
            },
            history: history.map(h => ({
                role: h.role,
                parts: [{ text: h.content }]
            }))
        });

        const result = await chat.sendMessage({ message: prompt });
        return result.text || "I processed that, but have no textual response.";
    } catch (error) {
        console.error("Gemini API Error:", error);
        return "Connection interruption. My neural link is unstable. Please check the API Key configuration.";
    }
};