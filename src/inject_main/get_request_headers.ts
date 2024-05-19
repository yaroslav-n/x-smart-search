import { getTransactionId } from "./get_transaction_id";

export const getRequestHeaders = (headers: Record<string, string>) => {
    const language = navigator.language.split('-')[0];

    const reqHeaders = {
        'Accept': '*/*',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Cookie': document.cookie,
        'Origin': 'https://x.com',
        'Pragma': 'no-cache',
        'Referer': 'https://x.com/i/grok',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-origin',
        'User-Agent': navigator.userAgent,
        'content-type': 'application/json',
        'x-client-transaction-id': getTransactionId(),
        'x-twitter-active-user': 'yes',
        'x-twitter-auth-type': 'OAuth2Session',
        'x-twitter-client-language': language,
        ...headers,
    };

    return reqHeaders;
}