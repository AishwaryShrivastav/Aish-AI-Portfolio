
export const generateHuggingFaceResponse = async (
    prompt: string,
    systemInstruction: string,
    history: { role: 'user' | 'model'; content: string }[],
    apiKey: string,
    model: string
): Promise<string> => {
    if (!apiKey) {
        return "ACCESS DENIED. Hugging Face API Token is missing.";
    }

    try {
        // Hugging Face Inference API doesn't have a strict chat format for all models,
        // but most instruct models expect a prompt structure.
        // We'll use a generic formatting for Mistral/Llama style models.
        
        let fullPrompt = `<s>[INST] ${systemInstruction} [/INST]</s>\n`;
        
        history.forEach(msg => {
            if (msg.role === 'user') {
                fullPrompt += `[INST] ${msg.content} [/INST]`;
            } else {
                fullPrompt += ` ${msg.content} </s>`;
            }
        });
        
        fullPrompt += `[INST] ${prompt} [/INST]`;

        const response = await fetch(`https://api-inference.huggingface.co/models/${model}`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                inputs: fullPrompt,
                parameters: {
                    max_new_tokens: 500,
                    return_full_text: false,
                    temperature: 0.7
                }
            })
        });

        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.error || "HF API Error");
        }

        const result = await response.json();
        // HF returns an array of results, usually [{ generated_text: "..." }]
        if (Array.isArray(result) && result.length > 0) {
            return result[0].generated_text;
        } else if (typeof result === 'object' && result.generated_text) {
             return result.generated_text;
        }
        
        return "No text generated.";

    } catch (error) {
        console.error("Hugging Face API Error:", error);
        return `ERROR: ${(error as Error).message}`;
    }
};
