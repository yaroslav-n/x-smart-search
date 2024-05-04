// open settings on icon click
chrome.action.onClicked.addListener(async () => {
    chrome.tabs.create({
        url: chrome.runtime.getURL("assets/settings.html"),
    });
});

// ----- messages from typebar.app
chrome.scripting.registerContentScripts([
    {
        id: `typebar_isolated_context_inject_${Math.random()}`,
        world: "ISOLATED",
        matches: ["https://twitter.com/*", "https://x.com/*"],
        js: ["lib/inject.js"],
        runAt: "document_start",
    },
]);