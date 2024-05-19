import { getCreateChatQueryId } from "./get_create_chat_query_id";
import { getRequestHeaders } from "./get_request_headers";

type Input = {
    headers: Record<string, string>;
}

/**
 * Create a grok chat and return the conversation id
 */
export const createChat = async ({ headers }: Input): Promise<string | null> => {
    const reqHeaders = getRequestHeaders(headers);

    const sendRequest =  (queryId: string): Promise<Response> => 
        fetch(`https://x.com/i/api/graphql/${queryId}/CreateGrokConversation`, {
            method: 'POST',
            headers: reqHeaders,
            body: JSON.stringify({
                variables: {},
                queryId,
            })
        });


    // trying hardcoded queryId first, to avoid extra requests
    let response = await sendRequest('UBIjqHqsA5aixuibXTBheQ');

    if (response.status === 404) { // queryId has changed
        const queryId = await getCreateChatQueryId();

        if (queryId) {
            response = await sendRequest(queryId); 
        }
    }

    if (!response.ok) {
        return null;
    }

    // API output: {"data":{"create_grok_conversation":{"conversation_id":"%number%"}}}
    const { data } = await response.json();
    return data.create_grok_conversation.conversation_id as string;
}
