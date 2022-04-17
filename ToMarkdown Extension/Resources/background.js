console.log("background.js")
browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("received: ", request);
    sendResponse("acknowledge: " + request);
    
    /*
     if (request=='hello') {
     contentTabId = sender.tab.id;
     }
     */
    if (request.substring(0,7)=='convert') {
        browser.tabs.getCurrent((tab) => {
            browser.tabs.sendMessage(tab.id, request);
        });
    }
});
