
import OpenAI from 'openai';

export const generateOpenAIResponse = async (
    prompt: string, 
    systemInstruction: string,
    history: { role: 'user' | 'model'; content: string }[],
    apiKey: string,
    modelName: string
): Promise<string> => {
    if (!apiKey) {
        return "ACCESS DENIED. OpenAI API Key is missing.";
    }

    try {
        // Initialize OpenAI Client
        // Note: dangerouslyAllowBrowser is required because we are calling this from the frontend.
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
            model: modelName || 'gpt-4o',
        });

        return completion.choices[0].message.content || "No data received from the core.";
    } catch (error) {
        console.error("OpenAI API Error:", error);
        return "CONNECTION ERROR. The neural link to ChatGPT was interrupted.";
    }
};
