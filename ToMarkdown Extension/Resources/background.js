console.log("background.js")
browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("received: ", request);
    sendResponse("acknowledge: " + request);
    
    if (request.substring(0,7)=='convert') {
        browser.tabs.getCurrent((tab) => {
            console.log("query_url");
            browser.runtime.sendNativeMessage("uk.co.hanken.ToMarkdown.Extension", {
                message: "query_url"
            }, (response) => {
                console.log(response);
                browser.tabs.sendMessage(tab.id, {
                    request: request,
                    url: response.url
                });
            });
        });
    }
});
