import { sendSuggestions } from "./send_suggestions";

// open settings on icon click
chrome.action.onClicked.addListener(async () => {
    chrome.runtime.openOptionsPage();
});

// register content scripts
chrome.scripting.registerContentScripts([
    {
        id: `typebar_isolated_context_inject_${Math.random()}`,
        world: "ISOLATED",
        matches: ["https://twitter.com/*", "https://x.com/*"],
        js: ["lib/inject.js"],
        runAt: "document_start",
    },
]);

type Message = {
    type: 'request_suggestion',
    input_id: string,
    text: string,
}

// receive messages
chrome.runtime.onMessage.addListener((message : Message, sender) => {
    console.log(">>> background: received message", message);

    switch (message.type) {
        case "request_suggestion":
            if (sender.tab?.id) {
                const { input_id, text } = message;
                sendSuggestions(sender.tab?.id, input_id, text);
            }
            break;
    }
});


// open settings on first install, so people can add their tokens
chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason === "install") {
        chrome.runtime.openOptionsPage();
    }
});