
'use strict';

var words = document.getElementById('words');

var btnRead = document.getElementById('btn_read');

btnRead.addEventListener("click", function () {
    words.append('a');
    oku();
})

function getSelectedParagraphText() {
    // console.log(document.getSelection().anchorNode.textContent);
}

document.addEventListener("mouseup", getSelectedParagraphText);

var count = 0;
document.onmousedown = function(){
    count = 0;
}
document.onselectionchange = function () {
    count++;
    console.log('select count', count);
}

function oku(){
    var msg = new SpeechSynthesisUtterance();
    msg.text  = "Merhaba Dünya !";
    msg.voiceURI = "Yelda";
    msg.lang = "tr-TR";
    speechSynthesis.speak(msg);
}

oku();