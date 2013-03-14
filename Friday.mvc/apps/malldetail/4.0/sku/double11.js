
KISSY.add("malldetail/sku/double11", function (I, M) {
    var K = KISSY, A = K.DOM, P = K.Event, L = K.UA.ie;
    var H = I.mods.SKU, F;
    var N, O;
    function J() {
        var D = "#detail .tb-11-tips{clear:both;margin:10px 0 0 0;position:relative;line-height:25px;z-index:2}";
        D += "#detail .tb-11-tips i{position:absolute;top:-8px;left:20px;background:url(http://img01.taobaocdn.com/tps/i1/T1gTTNXcBeXXcEFrDX-17-8.png);height:8px;line-height:8px;width:17px;overflow:hidden}";
        D += "#detail .tm-bf12 div{padding:5px 10px;border:1px solid #f6f5f3;background:#fbfaf8;}";
        D += "#detail .tm-bf12 p{display:none;position:absolute;left:0;background:#FBFAF8;padding:0 10px;border:1px solid #F6F5F3;margin-top:1px;width:336px;}";
        D += "#detail .tm-bf12:hover p,#detail .tm-d12sy p{display:block}";
        D += "#detail .tm-d12price{font-family:arial;color:#CC0000;font-weight:700;font-size:14px;margin-left:5px;margin-right:5px}";
        D += "#detail .tb-11-tips span{float:none;}";
        D += "#detail .tb-11-tips s{color:#b10000;text-decoration:none;font-style:normal}";
        D += "#detail .tb-11-tips img{vertical-align: middle;}";
        D += "#detail .tb-meta .tb-11-tagTip{float:none}";
        if (L < 7) {
            D += "#detail .tm-bf12 p{margin-left:-11px}"
        }
        A.addStyleSheet(D)
    }
    function C(E) {
        if (!E) {
            return
        }
        var D = '<span class="tb-11-tagTip" id="J_Tb-11-tagTip">(\u4e13\u67dc\u4ef7<strong class="del">' + E + '</strong>\u5143\uff0c<a href="http://service.tmall.com/support/tmall/knowledge-5219994.htm" target="_blank">\u4ec0\u4e48\u662f\u4e13\u67dc\u4ef7\uff1f</a>)</span>';
        N = A.create(D);
        A.append(N, "#J_StrPriceModBox")
    }
    function G(E) {
        if (!E) {
            return
        }
        if (N) {
            var D = A.get("strong", N);
            D.innerHTML = E
        } else {
            C(E)
        }
    }
    function B() {
        var S = H.getCurrentPriceInfoList();
        if (!S[0]) {
            return ""
        }
        var R, D, Q;
        for (var E in S) {
            if (S[E] && (R = S[E]["tagPrice"])) {
                if (!D || parseFloat(R) > parseFloat(D)) {
                    D = R
                }
                if (!Q || parseFloat(R) < parseFloat(Q)) {
                    Q = R
                }
            }
        }
        if (D && Q) {
            return parseFloat(Q) >= parseFloat(D) ? Q : (Q + " - " + D)
        }
        return ""
    }
    return { init: function (R, Q, E, D) {
        if (!R) {
            R = {}
        }
        if (!Q) {
            Q = {}
        }
        if (!E) {
            E = {}
        }
        if (!(F = I.cfg())) {
            return
        }
        if (!E.largeScalePromPeriod) {
            return
        }
        if (R.showTagPriceTip) {
            J();
            C(B(E));
            H.PropertyHandler.onSkuChange(function () {
                var S = H.selectSkuId;
                if (S) {
                    G(H.getPriceInfo(S)["tagPrice"])
                } else {
                    G(O)
                }
            })
        }
    } 
    }
}, { requires: ["template"] });