/************************************************************************************************************
 * HHGSUN
 * hhgsun.wordpress.com
 * **********************************************************************************************************
 *************************************** Simple Content Reader **********************************************
 ************************************************************************************************************/

'use strict';
var SimpleContentReader = function () {
    var scrToolBox = document.createElement('div');
    var btnReader = document.createElement('button');
    var btnMute = document.createElement('button');
    var btnCancel = document.createElement('button');
    btnReader.onclick = handleRunRead;
    btnMute.onclick = muteVoice;
    btnCancel.onclick = hiddenTool;
    document.onmouseup = handleOnMouseUp;
    var progressReading = false;

    function renderToolBox() {
        scrToolBox.id = "simple_content_reader_tool_box";
        scrToolBox.style.display = "none";
        scrToolBox.style.background = "#808080";
        scrToolBox.style.padding = "5px";
        scrToolBox.style.justifyContent = "space-between";
        scrToolBox.style.width = "80px";
        scrToolBox.style.zIndex = "9999";

        btnReader.id = "btn_read";
        btnReader.type = "button";
        btnReader.innerText = ">";
        btnReader.style.fontSize = "14px";
        
        btnMute.id = "btn_mute";
        btnMute.type = "button";
        btnMute.disabled = true;
        btnMute.innerText = "||";
        btnMute.style.fontSize = "14px";
        
        btnCancel.id = "btn_cancel";
        btnCancel.type = "button";
        btnCancel.innerText = "X";
        btnCancel.style.fontSize = "14px";
        
        scrToolBox.appendChild(btnReader);
        scrToolBox.appendChild(btnMute);
        scrToolBox.appendChild(btnCancel);
        document.body.appendChild(scrToolBox);
    }

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
        progressReading = true;
        btnMute.disabled = false;
        btnReader.disabled = true;
    }

    function endVoiceCallback() {
        progressReading = false;
        btnMute.disabled = true;
        btnReader.disabled = false;
    }

    function readTextVoice(text) {
        muteVoice();
        responsiveVoice.speak(text, "Turkish Male", { onstart: startVoiceCallback, onend: endVoiceCallback });
    }

    function muteVoice() {
        btnMute.disabled = true;
        btnReader.disabled = false;
        responsiveVoice.cancel();
    }

    function handleRunRead() {
        var selectText = getSelectionContentText(); // browser selected text
        readTextVoice(selectText);
    }

    function hiddenTool() {
        muteVoice();
        scrToolBox.style.display = "none";
    }

    function showTool() {
        scrToolBox.style.display = "flex";
    }

    function handleOnMouseUp(e) {
        if (document.getSelection().type == "Range" && e.target.type != "button") {
            var leftPos = e.offsetX - 50;
            var topPos = e.offsetY - 50;
            if (leftPos > document.documentElement.offsetWidth) {
                leftPos = document.documentElement.offsetWidth - scrToolBox.offsetWidth - 50;
            }
            if (leftPos < 0) {
                leftPos = 10;
            }
            if (topPos > document.documentElement.offsetHeight) {
                topPos = document.documentElement.offsetHeight - scrToolBox.offseth - 50;
            }
            if (topPos < 0) {
                topPos = 10;
            }
            if(getSelectionContentText().length > 1){
                showTool();
                scrToolBox.style.position = "fixed";
                scrToolBox.style.left = leftPos + "px";
                scrToolBox.style.top = topPos + "px";
            }
        }
    }

    renderToolBox();

    return SimpleContentReader;
}();