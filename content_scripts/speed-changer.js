//content script

function setSpeed(speed){
    console.log('setSpeed '+speed);
    let video = document.querySelector('video');
    video.playbackRate = speed*0.01;
}

function getSpeed(){
    return document.querySelector('video').playbackRate * 100;
}

function hasVideo(){
    let response = document.querySelector('video') != null;
    //console.log('hasvideo '+response);
    return response;
}

function askThereIsVideo() {
    browser.runtime.sendMessage({
        question: "hasVideo",
        response: hasVideo(),
        currentSpeed: getSpeed()
      });
}

if(!window.hasRunCS){
    browser.runtime.onMessage.addListener((message) => {
        if(message.command == 'setSpeed'){
            setSpeed(message.speed);
        }
        if(message.command == 'hasVideo'){
            askThereIsVideo();
        }
    });
}

window.hasRunCS = true;
