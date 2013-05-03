KISSY.add(V + "/mods/dsr", function (F, C) {
    var J = F.DOM,
		H = F.Event,
		G = '<p class="shopDsr-title">\u5e97\u94fa\u52a8\u6001\u8bc4\u5206<span>\u4e0e\u540c\u884c\u4e1a\u76f8\u6bd4</span></p> <ul class="shopDsr-con"> <li>\u63cf\u8ff0\u76f8\u7b26\uff1a<em class="sDc-num">{{dsValue}}</em> {{#if dsHigh}} <b class="sDc-high">{{dsCpText}}</b><em class="sDc-high">{{dsCompare}}</em> {{#else}} <b class="sDc-low">{{dsCpText}}</b><em class="sDc-low">{{dsCompare}}</em> {{/if}} </li> <li>\u670d\u52a1\u6001\u5ea6\uff1a<em class="sDc-num">{{sqValue}}</em> {{#if sqHigh}} <b class="sDc-high">{{sqCpText}}</b><em class="sDc-high">{{sqCompare}}</em> {{#else}} <b class="sDc-low">{{sqCpText}}</b><em class="sDc-low">{{sqCompare}}</em> {{/if}} </li> <li>\u53d1\u8d27\u901f\u5ea6\uff1a<em class="sDc-num">{{ssValue}}</em> {{#if ssHigh}} <b class="sDc-high">{{ssCpText}}</b><em class="sDc-high">{{ssCompare}}</em> {{#else}} <b class="sDc-low">{{ssCpText}}</b><em class="sDc-low">{{ssCompare}}</em> {{/if}} </li><ul>',
		A = '<p>\u670d\u52a1\u6001\u5ea6\uff1a<em class="pId-num">{{sqValue}}</em> <a target="_blank" atpanel="{{atpanel}}" href="{{rateUrl}}"> {{#if sqHigh}} <b class="pId-high">{{sqCpText}}</b><em class="pId-high">{{sqCompare}}</em> {{#else}} <b class="pId-low">{{sqCpText}}</b><em class="pId-low">{{sqCompare}}</em> {{/if}} </a> <i class="pId-arrow"></i></p><ul class="pId-expand"> <li class="pIde-title"><strong>\u5e97\u94fa\u52a8\u6001\u8bc4\u5206</strong>\u4e0e\u540c\u884c\u4e1a\u76f8\u6bd4</li> <li>\u63cf\u8ff0\u76f8\u7b26\uff1a<em class="pId-num">{{dsValue}}</em> <a target="_blank" atpanel="{{atpanel}}" href="{{rateUrl}}"> {{#if dsHigh}} <b class="pId-high">{{dsCpText}}</b><em class="pId-high">{{dsCompare}}</em> {{#else}} <b class="pId-low">{{dsCpText}}</b><em class="pId-low">{{dsCompare}}</em> {{/if}} </a> </li> <li>\u670d\u52a1\u6001\u5ea6\uff1a<em class="pId-num">{{sqValue}}</em> <a target="_blank" atpanel="{{atpanel}}" href="{{rateUrl}}"> {{#if sqHigh}} <b class="pId-high">{{sqCpText}}</b><em class="pId-high">{{sqCompare}}</em> {{#else}} <b class="pId-low">{{sqCpText}}</b><em class="pId-low">{{sqCompare}}</em> {{/if}} </a> </li> <li>\u53d1\u8d27\u901f\u5ea6\uff1a<em class="pId-num">{{ssValue}}</em> <a target="_blank" atpanel="{{atpanel}}" href="{{rateUrl}}"> {{#if ssHigh}} <b class="pId-high">{{ssCpText}}</b><em class="pId-high">{{ssCompare}}</em> {{#else}} <b class="pId-low">{{ssCpText}}</b><em class="pId-low">{{ssCompare}}</em> {{/if}} </a> </li><ul>',
		B = {
		    cls: ".j_ShopDsr",
		    dataUrl: DEV_EV == "demo" || DEV_EV == "local" ? "/ajax/dsr.php" : (J.val("#J_ShopDsrUrl") || ""),
		    expand: false,
		    tpl: G,
		    cpText: ["\u4f4e\u4e8e", "\u6301\u5e73", "\u9ad8\u4e8e"]
		};

    function I(D) {
        if (!(this instanceof I)) {
            return new I(D)
        }
        this.config = F.merge(B, D || {});
        this._init()
    }
    F.augment(I, F.EventTarget, {
        _init: function () {
            if (J.query(this.config.cls).length > 0) {
                this._request()
            }
        },
        _request: function () {
            var D = this,
				E = D.config.dataUrl;
            if (!E) {
                return
            }
            F.io.get(E, {
                t: +new Date
            }, function (K) {
                D._render(K)
            }, "json")
        },
        _formatData: function (L) {
            if (!(L && F.isObject(L))) {
                return
            }
            var E = {}, K = this.config.cpText,
				D = function (M) {
				    var O = parseFloat(L[M].compare);
				    var N = E[M + "High"] = O >= 0;
				    E[M + "Value"] = L[M].value;
				    E[M + "CpText"] = N ? K[2] : K[0];
				    if (O == 0) {
				        E[M + "Compare"] = "---------";
				        E[M + "CpText"] = K[1]
				    } else {
				        if (O > 0) {
				            E[M + "Compare"] = L[M].compare
				        } else {
				            E[M + "Compare"] = L[M].compare.substr(1)
				        }
				    }
				};
            E.rateUrl = L.rateUrl || "";
            D("ds");
            D("sq");
            D("ss");
            return E
        },
        _render: function (L) {
            var E = this,
				D = E.config,
				K = D.expand ? A : D.tpl;
            F.each(F.query(D.cls), function (O, M) {
                var N = "shop" + (M + 1),
					P = E._formatData(L[N]);
                P.atpanel = J.attr(O, "data-atpanel") || "";
                if (P && F.isObject(P)) {
                    J.html(O, C(K).render(P))
                }
            });
            D.expand && LIST.msg.fire("ie6Hover", {
                classname: "proInfo-dsr"
            })
        }
    });
    return {
        init: function (D) {
            new I(D)
        },
        setCfg: function (D) {
            B = F.merge(B, D || {})
        }
    }
}, {
    requires: ["template"]
});