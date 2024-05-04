import { LLMClient } from "../generic/llm_client";
import { promptTemplate } from "../generic/prompt_template";

export const sendSuggestions = async (tabId: number, inputId: string, text: string) => {
    const prompt = promptTemplate(text);
    const suggestion = await LLMClient.convertText(prompt);

    chrome.tabs.sendMessage(tabId, {
        type: "suggestion",
        input_id: inputId,
        suggestion: suggestion
    });
}