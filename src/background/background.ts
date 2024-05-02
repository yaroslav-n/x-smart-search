// open settings on icon click
chrome.action.onClicked.addListener(async () => {
    chrome.tabs.create({
        url: chrome.runtime.getURL("assets/settings.html"),
    });
});
