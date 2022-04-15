setTimeout(() => {
    console.log("content.js")
    browser.runtime.sendMessage("hello").then((response) => {
        console.log("response: ", response);
    });
}, 250);

var alreadyConverted = false;

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    
    if (request.substring(0,7)=='convert' && !alreadyConverted) {
        console.log('Requested convert!');
        alreadyConverted=true;
        if (request=='convert1') {
            convertToMarkdown(false);
        }
        if (request=='convert2') {
            convertToMarkdown(true);
        }
    }
    
    sendResponse("acknowledge: " + request);
    
});

function convertToMarkdown(linkless=false) {
    var request=new XMLHttpRequest();
    var herokuurl="https://urltomarkdown.herokuapp.com/";
    if (linkless) {
        herokuurl += '?links=false';
    }
    
    request.onreadystatechange=function()
    {
            if(request.readyState==4&&request.status==200) {
                let text = '# ' + decodeURIComponent(request.getResponseHeader('X-Title')) +  '\n' + request.responseText;
                document.documentElement.innerHTML = "<head></head><body><pre style='white-space: pre-wrap; word-wrap: break-word; font-size:12pt;'>"+text+"</pre><body>";
                selectAllTextOnPage();
            }
    };

    request.open("POST", herokuurl, true);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    html=document.documentElement.innerHTML;
    requestUrl = "html="+encodeURIComponent(html)+"&url="+encodeURIComponent(window.location.href);
    request.send(requestUrl);
}

function selectAllTextOnPage() {
    document.body.contentEditable = "true";
    if (document.createTextRange) {
        const range = document.createTextRange();
        range.moveToElementText(document.body);
        range.select();
    } else if (window.getSelection) {
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(document.body);
        selection.removeAllRanges();
        selection.addRange(range);
    }
}
