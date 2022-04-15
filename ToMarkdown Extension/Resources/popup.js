console.log("popup.js")
document.querySelector("#convertButton1").addEventListener('click', ()=> {
    document.querySelector("#convertButton1").classList.add("convertPressed");
    browser.runtime.sendMessage("convert1").then((response) => {
        console.log("response: ", response);
        setTimeout(()=>{
            document.querySelector("#convertButton1").classList.remove("convertPressed");
            window.close();
        },250);
    });
},false);
document.querySelector("#convertButton2").addEventListener('click', ()=> {
    document.querySelector("#convertButton2").classList.add("convertPressed");
    browser.runtime.sendMessage("convert2").then((response) => {
        console.log("response: ", response);
        setTimeout(()=>{
            document.querySelector("#convertButton2").classList.remove("convertPressed");
            window.close();
        },250);
    });
},false);
