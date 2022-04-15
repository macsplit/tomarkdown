console.log("background.js")
var contentTabId;
browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("received: ", request);
    sendResponse("acknowledge: " + request);
    
    if (request=='hello') {
        contentTabId = sender.tab.id;
    }
    if (request.substring(0,7)=='convert') {
        browser.tabs.sendMessage(contentTabId, request);
    }
});
