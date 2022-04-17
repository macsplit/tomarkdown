console.log("popup.js")
document.querySelector("#convertButton1").addEventListener('click', ()=> {
    document.querySelector("#convertButton1").classList.add("convertPressed");
    let message = (document.getElementById('includeLinks').checked) ? "convert1" : "convert2";
    browser.runtime.sendMessage(message).then((response) => {
        console.log("response: ", response);
        setTimeout(()=>{
            document.querySelector("#convertButton1").classList.remove("convertPressed");
            window.close();
        },250);
    });
},false);

