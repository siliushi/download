/**
 * download file
 * @date   2016-06-10
 * @author ganzw@guahao.com
 * @site   https://github.com/baixuexiyang/download.git
 */
;(function (name, fun) {
    if(typeof module !== 'undefined' && module.exports) {
        module.exports = fun();
    } else if(typeof define === 'function' && define.amd) {
        define(fun);   
    }else {
        this[name] = fun();
    }
})('download', function () {
    "use strict";
    function download(src) {
        var fileName = src.lastIndexOf("/") > -1 ? src.slice(src.lastIndexOf("/") + 1) : src;
        var contentOrPath = src;
        var bool = true;
        var isIE = /Trident|MSIE/.test(navigator.userAgent);
        if(isIE) {
            var isImg = contentOrPath.slice(0, 10) === "data:image",
                ifr = document.createElement('iframe');
            ifr.style.display = 'none';
            ifr.src = contentOrPath;
            document.body.appendChild(ifr);
            isImg && ifr.contentWindow.document.write("<img src='" + contentOrPath + "' />");
            ifr.contentWindow.document.execCommand('SaveAs', false, fileName);
            document.body.removeChild(ifr);
        } else {
            var aLink = document.createElement("a"),
                evt = document.createEvent("MouseEvents"),
                isData = contentOrPath.slice(0, 5) === "data:",
                isPath = contentOrPath.lastIndexOf(".") > -1;
            evt.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            aLink.download = fileName;
            aLink.href = isPath || isData ? contentOrPath : URL.createObjectURL(new Blob([contentOrPath]));
            aLink.dispatchEvent(evt);
        }
    }

    return download;
});
