import { LLMClient } from "../generic/llm_client";
import { promptTemplate } from "../generic/prompt_template";

export const sendSuggestions = async (tabId: number, inputId: string, text: string) => {
    if (!(await LLMClient.getToken())) {
        chrome.tabs.sendMessage(tabId, {
            type: "error",
            input_id: inputId,
            error: '⚠ Please add your Groq API key in the extension settings.'
        });

        return;
    }

    const prompt = promptTemplate(text);
    try {
        const suggestion = await LLMClient.convertText(prompt);

        chrome.tabs.sendMessage(tabId, {
            type: "suggestion",
            input_id: inputId,
            suggestion: suggestion
        });
    }  catch (e) {
        chrome.tabs.sendMessage(tabId, {
            type: "error",
            input_id: inputId,
            error: '⚠ An error occurred. Please check your network connection or API key.'
        });
    }
}