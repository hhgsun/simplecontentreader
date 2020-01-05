'use strict';

var SimpleContentReader = function () {

    var btn_reader = document.getElementById("btn_read");
    btn_reader.onclick = handleRunRead;
    document.onmouseup = handleOnMouseUp;

    function getSelectionContentText() {
        var text = "";
        if (window.getSelection) {
            text = window.getSelection().toString();
        } else if (document.selection && document.selection.type != "Control") {
            text = document.selection.createRange().text;
        }
        return text;
    }

    function startVoiceCallback() {
        console.log('startVoiceCallback');
    }

    function endVoiceCallback() {
        console.log('endVoiceCallback');
    }

    function readTextVoice(text) {
        responsiveVoice.cancel();
        responsiveVoice.speak(text, "Turkish Male", { onstart: startVoiceCallback, onend: endVoiceCallback });
    }

    function handleRunRead() {
        readTextVoice(getSelectionContentText());
    }

    function handleOnMouseUp(e) {
        btn_reader.style.display = "none";
        if (document.getSelection().type == "Range") {
            var leftPos = e.offsetX - 50;
            var topPos = e.offsetY - 50;
            if (leftPos > document.documentElement.offsetWidth) {
                leftPos = document.documentElement.offsetWidth - btn_reader.offsetWidth - 50;
            }
            if (leftPos < 0) {
                leftPos = 10;
            }
            if (topPos > document.documentElement.offsetHeight) {
                topPos = document.documentElement.offsetHeight - btn_reader.offseth - 50;
            }
            if (topPos < 0) {
                topPos = 10;
            }
            btn_reader.style.display = "block";
            btn_reader.style.position = "fixed";
            btn_reader.style.left = leftPos + "px";
            btn_reader.style.top = topPos + "px";
        }
    }

    return SimpleContentReader;
}();