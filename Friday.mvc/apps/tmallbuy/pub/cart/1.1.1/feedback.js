/*pub-1|2013-04-11 10:17:01*/
KISSY.add("cart/feedback", function (D, G, B, F, C) {
    var E = function (I) {
        return D.substitute(['<div id="J_Feedback" class="feedback J_Feedback" style="{style}">', '<span><a href="{href}" target="_blank">{title}</a><s></s></span>', "</div>"].join(""), I)
    };
    var H = [".feedback{background-repeat: repeat-y;background-color: #fff;width:25px;overflow:hidden;position: fixed;right:0;top:50%;z-index:90000;border: 1px solid #e8e8e8;border-radius: 2px;-webkit-border-radius: 2px;-moz-border-radius: 2px;_position:absolute;}", ".feedback:hover{right:2px;}", ".feedback span{display:block;}", ".feedback span a{display:block;word-wrap:break-word;word-break:normal;width:13px;text-align:center;color:#666;padding:8px 6px 10px;line-height:1.1em;}", ".feedback span a:hover{color: #f50;text-decoration:none;}", ".feedback span s {width: 0;height: 0;border: 3px solid #19377f;display: block;position: relative;top: -1px;right: -1px;border-color: #fff #19377f #19377f #fff;margin: -6px 0 0 19px;overflow: hidden;_margin-left: 17px;zoom: 1;}"].join("");
    var A = function (L) {
        L = D.one(L);
        var M = G.offset(L).top,
 			I = G.height(L),
 			K = 500,
 			N = D.later(function () { }, 0),
 			J = new C(L, {
 			    opacity: 1
 			}, 0.2, "easeIn", null, false);
        L.css("top", M + G.scrollTop());
        B.on(window, "scroll resize", function (P) {
            var O = G.scrollTop();
            M = (G.viewportHeight() - I) / 2;
            N.cancel();
            J.stop();
            L.css("opacity", 0);
            N = D.later(function () {
                if (G.scrollTop() === O) {
                    L.css("top", M + G.scrollTop());
                    D.later(function () {
                        J.run()
                    })
                }
            }, K)
        })
    };
    return {
        init: function (I) {
            D.ready(function () {
                D.later(function () {
                    I = D.merge({
                        title: "\u8bf7\u8bf4\u8bf4\u60a8\u7684\u611f\u53d7"
                    }, I);
                    I.href = "http://ur.taobao.com/survey/view.htm?id=" + (I.feedbackId || 1398);
                    var J = I.title.length * 6;
                    I.style = "margin-top: -" + J + "px;";
                    G.addStyleSheet(H);
                    D.one(G.create(E(I))).appendTo(document.body);
                    if (F.ie === 6) {
                        G.get("#J_Feedback") && A(G.get("#J_Feedback"))
                    }
                }, 2000)
            })
        }
    }
}, {
    requires: ["dom", "event", "ua", "anim"]
});