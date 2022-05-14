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

    var download = {
        init: function(paths) {
            if(typeof paths === 'string') {
                // single
                this.start(paths);
                return;
            }
            if(typeof paths === 'object') {
                // more
                for(var i = 0, _l = paths.length; i < _l; i++) this.start(paths[i]);
                return;
            }
        },
        start: function(path) {
            var fileName = path.lastIndexOf("/") > -1 ? path.slice(path.lastIndexOf("/") + 1) : path;
            var isIE = /msie|trident/.test(navigator.userAgent.toLocaleLowerCase());
            var isData = path.slice(0, 10) === "data:image";
            if(isIE) {
                var iframe = document.createElement('iframe');
                iframe.style.display = 'none';
                iframe.src = path;
                document.body.appendChild(iframe);
                isData && iframe.contentWindow.document.write("<img src='" + path + "' />");
                iframe.contentWindow.document.execCommand('SaveAs', false, fileName);
                document.body.removeChild(iframe);
            } else {
                var a = document.createElement("a"),
                    evt = document.createEvent("MouseEvents"),
                    isPath = path.lastIndexOf(".") > -1;
                evt.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                a.download = fileName;
                console.log(isPath)
                a.href = isPath || isData ? path : URL.createObjectURL(new Blob([path]));
                a.dispatchEvent(evt);
            }
        },
        fetch: function(res, name) {
            const blob = new Blob([res], { type: '' });
            const downloadElement = document.createElement('a');
            const href = window.URL.createObjectURL(blob); // 创建下载的链接
            downloadElement.href = href;
            const filenameHeader = name;
            const filename = filenameHeader.substring(filenameHeader.indexOf('=') + 1, filenameHeader.length);
            downloadElement.download = decodeURIComponent(filename); // 下载后文件名
            document.body.appendChild(downloadElement);
            downloadElement.click(); // 点击下载
            document.body.removeChild(downloadElement); // 下载完成移除元素
            window.URL.revokeObjectURL(href); // 释放blob对象
        }
    };

    return download;
});
