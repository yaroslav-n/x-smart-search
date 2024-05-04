/**
 * This is an API client that does the text conversion.
 * Currently it's using GROQ, but it could be changed to any other service.
 */

import { getChrome } from "./get_chrome";
import Groq from "groq-sdk";

const LLM_TOKEN_KEY = 'llm_token'

export class LLMClient {
    public static async getToken(): Promise<string | undefined> {
        const result = (await getChrome().storage.sync.get(LLM_TOKEN_KEY));
        return result[LLM_TOKEN_KEY] ?? undefined;
    }

    public static async setToken(token: string) {
        await getChrome().storage.sync.set({ [LLM_TOKEN_KEY]: token });
    }

    public static async convertText(prompt: string): Promise<string> {
        const token = await LLMClient.getToken();
        const groq = new Groq({
            dangerouslyAllowBrowser: true,
            apiKey: token
        });

        if (!token) {
            throw new Error('No token found');
        }

        const completion = await groq.chat.completions.create({
            messages: [
                {
                    role: "user",
                    content: prompt
                }
            ],
            model: "llama3-70b-8192"
        });
        

        return completion.choices[0]?.message?.content ?? undefined
    }
}