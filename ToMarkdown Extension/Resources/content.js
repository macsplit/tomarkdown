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
            document.documentElement.innerHTML = "<html><head></head><body><pre><code class='language-markdown' style='white-space: pre-wrap; word-wrap: break-word; font-size:12pt;'>"+text+"</code></pre></body></html>";

            
            var newScript3 = document.createElement('link');
            newScript3.rel = 'stylesheet';
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                document.body.style.backgroundColor = 'black';
                newScript3.href = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.1/styles/atom-one-dark.min.css';
            } else {
                document.body.style.backgroundColor = 'white';
                newScript3.href = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.1/styles/atom-one-light.min.css';
            }
            document.head.appendChild(newScript3);
            
            newScript3.addEventListener( 'load', () => {
                var newScript1 = document.createElement("script");
                newScript1.src = "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.1/highlight.min.js";
                document.body.appendChild(newScript1);
        
                newScript1.addEventListener( 'load', () => {
                    var newScript2 = document.createElement("script");
                    newScript2.src = "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.1/languages/markdown.min.js";
                    document.body.appendChild(newScript2);

                    newScript2.addEventListener( 'load', () => {
                        var newScript4 = document.createElement("script");
                        var inlineScript4 = document.createTextNode("function waitForHighlighter(){if(typeof hljs!=='undefined') hljs.highlightAll(); else setTimeout(waitForHiglighter,50);} waitForHighlighter();");
                        newScript4.appendChild(inlineScript4);
                        document.body.appendChild(newScript4);
                        selectAllTextOnPage();
                    });
                    
                });
                
            });
            
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

