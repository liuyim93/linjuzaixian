﻿/*pub-1|2013-04-09 11:52:55*/
(function (E, D, A) {
    if (E.ALD) {
        return
    }
    A.log("Init base ALD object...");
    var B = 1;
    E.ALD = {
        queue: [],
        load: function (F, G) {
            this.queue.push([F, G]);
            A.log("ALD queue length = " + ALD.queue.length);
            if (B) {
                B = 0;
                C()
            }
        },
        dev: location.href.indexOf("ald-dev") > -1
    };
    if (A && A.mix) {
        A.mix(E.ALD, A.EventTarget)
    }
    function C() {
        A.log("Load ald assets resources...");
        var G = D.createElement("script");
        var F = D.getElementsByTagName("head")[0];
        G.charset = "gbk";
        G.async = true;
        if (G.readyState) {
            G.onreadystatechange = function () {
                if (G.readyState === "loaded" || G.readyState === "complete") {
                    G.onreadystatechange = null;
                    A.log("Ald assets resources can be used...")
                }
            }
        } else {
            G.onload = function () {
                A.log("Ald assets resources can be used...")
            }
        }
        //2013-08-22 basilwang 暂时不需要这个
//        G.src = "http://" + (ALD.dev ? "localhost" : "l.tbcdn.cn") + "/apps/tmall/ald/??util.js,use.js,effect.js,mods/base.js,juicer.js,ald.js?20130203";
//        F.insertBefore(G, F.firstChild)
    }
    if (!B) {
        C()
    }
})(window, document, KISSY);