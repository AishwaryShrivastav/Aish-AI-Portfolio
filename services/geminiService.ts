
import { GoogleGenAI } from "@google/genai";

export const generateGeminiResponse = async (
    prompt: string, 
    systemInstruction: string,
    history: { role: 'user' | 'model'; content: string }[],
    apiKey: string,
    modelName: string
): Promise<string> => {
    if (!apiKey) {
        return "ACCESS DENIED. Gemini API Key is missing.";
    }

    try {
        const client = new GoogleGenAI({ apiKey });
        
        // Convert history to Gemini format
        // Gemini expects 'user' and 'model' roles.
        const geminiHistory = history.map(h => ({
            role: h.role,
            parts: [{ text: h.content }]
        }));

        const chat = client.chats.create({
            model: modelName || 'gemini-2.5-flash',
            config: {
                systemInstruction: systemInstruction,
            },
            history: geminiHistory
        });

        const result = await chat.sendMessage({ message: prompt });
        return result.text || "I processed that, but have no textual response.";
    } catch (error) {
        console.error("Gemini API Error:", error);
        return "Connection interruption. My neural link is unstable. Please check the API Key configuration.";
    }
};
