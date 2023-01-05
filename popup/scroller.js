function pageListener(message){
    if(message.question == 'hasVideo' && message.response){

        document.querySelector("#scroll").disabled = false;
        document.querySelector("#scroll").value = message.currentSpeed;
        document.querySelector("#novideo").style.display = 'none';
        document.querySelector("#yesvideo").style.display = 'block';
        
        console.log(message);
        listenForScroll();
    }
}


function listenForScroll(){

    const rate = document.querySelector("#rate")
    const input = document.querySelector("#scroll")

    rate.textContent = input.value;
    
    input.addEventListener("input", (event) => {
        speedValue = event.target.value
        rate.textContent = speedValue
        browser.tabs.query({active: true, currentWindow: true})
            .then(askSpeed)
            .catch(reportError);
    })
}

function reportError(error) {
    console.log(error);
}

function askSpeed(tabs){
    let tabid = tabs[0].id;
    browser.tabs.sendMessage(tabid, {
        command: 'setSpeed',
        speed: speedValue
      });
}

function askVideo(tabs){    
    let tabid = tabs[0].id;
    browser.tabs.sendMessage(tabid,{command: 'hasVideo'}).catch(reportError);
}

function init(){    
    console.log('init');

    browser.runtime.onMessage.addListener(pageListener);

    browser.tabs.query({active: true, currentWindow: true})
        .then(askVideo)
        .catch(reportError);
}

browser.tabs.executeScript({file: "/content_scripts/speed-changer.js"})
.then(init)
.catch(reportError);