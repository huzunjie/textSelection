(function(QW) {
    if(!QW)return alert("JS加载异常，可能将导致部分功能无法正常使用，请刷新页面重试。");
    var W = QW.W, Dom = QW.Dom;
    /*** 在光标所在位置插入内容 ***
    * @el  要操作的原生元素
    * @text 要插入的文本内容
    */
    Dom.insertText = function(el,text) {
        var textLen = text.length;
        el.focus();
        if (document.selection) { //ie
            //插入文本
            document.selection.createRange().text = text;
        } else if (el.setSelectionRange) { //W3C
            //插入文本
            var oldVal = el.value, startPos = el.selectionStart, endPos = el.selectionEnd, scrollTop = el.scrollTop, scrollLeft = el.scrollLeft;
            el.value = oldVal.substring(0, startPos) + text + oldVal.substring(endPos, oldVal.length);

            //滚动条按文本调整前重新定位
            el.scrollTop = scrollTop;
            el.scrollLeft = scrollLeft;

            //光标定位到插入文本末尾
            el.selectionStart = el.selectionEnd = startPos + textLen
        } else {
            el.value += text;
        }
        el.focus();
    };

    /*** 按设定参数选中文本内容 ***
    * @el  要操作的原生元素
    * @selSta 选中文本时开始位置偏移量(正负整数)
    * @selEnd 选中文本时结束位置偏移量(正负整数)
    */
    Dom.selectionText = function(el,selSta,selEnd){
       selSta = selSta || 0;
       selEnd = selEnd || 0;
        if (document.selection) { //ie
            selObj.moveStart("character", selSta);
            selObj.moveEnd("character", selEnd);
            selObj.select();
        } else if (el.setSelectionRange) { //W3C
            el.setSelectionRange(selSta, selEnd);
        } else {
            el.select && el.select();
        }
    };

    //在光标位置插入文本
    W.prototype.insertText = function(text){
        this[0] && Dom.insertText(this[0],text);
        return this;
    };

})(QW);
