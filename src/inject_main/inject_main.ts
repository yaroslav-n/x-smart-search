import { createChat } from "./create_chat";
import { getGrokSummary } from "./get_grok_summary";
import { clearGrokResponse } from "./render/clear_grok_response";
import { renderGrokResponse } from "./render/render_grok_response";

const defaultHeaders = {
    authorization: '',
    'x-csrf-token': '',
};

let lastQuery = '';

// modern window typings would really help
(<any>window).navigation.addEventListener("navigate", async (e: any) => {
    const destinationUrl = e.destination.url;
    const url = new URL(destinationUrl);
    const userQuery = url.searchParams.get('q');

    if (!!defaultHeaders.authorization && url.pathname === '/search' && !!userQuery && userQuery !== lastQuery) {
        lastQuery = userQuery;
        clearGrokResponse();
        const createdChatId = await createChat({ headers: defaultHeaders });

        if (userQuery && createdChatId) {
            let lastResult = '';
            for await (const response of getGrokSummary({ query: userQuery, conversationId: createdChatId, headers: defaultHeaders })) {
                if (new URL(location.href).pathname === '/search') {
                    renderGrokResponse({ text: response, isLoading: true })
                    lastResult = response;
                }
            }

            if (new URL(location.href).pathname === '/search') {
                renderGrokResponse({ text: lastResult, isLoading: false })
            }
        }
    }
})

/**
 * Save request headers from other API requests, for future use
 * We don't use setTimeout(0) here, because setRequestHeader is called in the current task, otherwise it will be too late
 */
const ogOpen = XMLHttpRequest.prototype.open;
XMLHttpRequest.prototype.open = function (...args: any[]) {
    const urlStr = args[1];
    const url = new URL(urlStr);

    // get current API request headers, we'll need them for our requests
    if (url.hostname === 'x.com' && url.pathname.startsWith('/i/api')) {
        const ogRequestHeader = this.setRequestHeader;

        this.setRequestHeader = (...headerArgs) => {
            const [name, value] = headerArgs as string[];
        
            if (Object.keys(defaultHeaders).includes(name)) {
                defaultHeaders[name as keyof typeof defaultHeaders] = value;
            }

            return ogRequestHeader.apply(this, headerArgs)
        }
    }

    // @ts-ignore
    return ogOpen.apply(this, args)
}