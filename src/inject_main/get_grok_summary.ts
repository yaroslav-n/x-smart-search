import { getRequestHeaders } from './get_request_headers';

type Input = {
    query: string;
    conversationId: string;
    headers: Record<string, string>;
}

export const getGrokSummary = async function* ({ query, conversationId, headers }: Input) {
    const url = 'https://api.x.com/2/grok/add_response.json';
    const reqHeaders  = getRequestHeaders(headers);

    const prompt = `Make a short summary about "${query}"`;

    const response = await fetch(url, {
        method: 'POST',
        headers: reqHeaders,
        credentials: 'include',
        body: JSON.stringify({"responses":[{"message": prompt, "sender":1}], "systemPromptName":"", conversationId })
    });
  
    if (!response.ok || !response.body) {
        throw new Error(response.status.toString());
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    let responseText = '';
    while (true) {
        const { done, value } = await reader.read();
        if (done) {
            break;
        }
        const messageStr = decoder.decode(value, { stream: true })
                            .split('\n')
                            .map((str) => str.trim())
                            .filter(Boolean);

        try {
            const newText = messageStr.map((msg) => {
                const msgObj = JSON.parse(msg)

                if (msgObj.result?.sender?.toLowerCase() === 'assistant') {
                    return msgObj.result.message;
                } else {
                    return '';
                }
            }).join('');

            responseText = cleanResponse(responseText + newText);

            yield responseText.trim();
        } catch(e) {
            console.error('Failed to parse response: ', messageStr);
        }
    }
}

// cleaning response from tweet cards and special "==" line breaks
const cleanResponse = (text: string) => text.replace(/\[.*?\]\(.*?\)/g, '').replace(/==/g, '');