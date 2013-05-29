/*pub-1|2013-01-25 14:16:03*/
KISSY.add("malldetail/recommend/waterfall", function (_kissy_G, _dom, _waterfall, _template, _malldetail_tabbar_tabbar) {
    var _document = document;
    var Waterfall = {};
    var E;
    var P;
    var K = 1;
    var J = false;
    var F;
    var Q = false;
    var D = [];
    var B;
    var U = '<li class="ald-wf-li"><a href="{{url}}" class="ald-wf-pic" target="_blank"><img height="220" src="{{img}}_250x250.jpg"><em class="ald-wf-em"></em><span class="ui-price"><span class="ui-price-icon">&yen;</span>{{price}}</span>{{#if macketPrice}}<span class="ui-price-original"><span class="ui-price-icon">&yen;</span><del>{{macketPrice}}</del></span>{{/if}}</a>{{#each comments as comment}}{{#if comment.content.length<60}}<p><b>{{comment.nick}}</b>{{comment.content}}</p>{{/if}}{{/each}}</li>';

    function C(Y, S) {
        var W = _kissy_G.mods.tabbarAttr.curTag();
        var V = W.id ? true : false;
        var Z = setTimeout(function () {
            _dom.hide(P)
        }, 2000);
        _dom.show(P);
        if (D.length) {
            Y(D);
            D = []
        }
        var X = _kissy_G.cfg("isDaily") ? "13975762416" : window.g_config.itemId;
        _kissy_G.Asyn.add("AldTabWaterfall", {
            //url: "http://ald.taobao.com/recommend.htm",
            url: "http://localhost:7525/Merchant/Detail/Tab_Recommend",
            data: {
                appId: "03040",
                itemId: X,
                vid: W.id,
                curPage: K,
                refer: _document.referrer,
                step: 6
            },
            jsonpCallback: "jsonpAldTabWaterfall",
            success: function (b) {
                b = b[0];
                M(b.acurl);
                if (Z) {
                    clearTimeout(Z)
                }
                _dom.hide(P);
                if (!b.list || b.list.length == 0) {
                    S();
                    return
                }
                K++;
                var a = [];
                _kissy_G.each(b.list, function (d) {
                    d.macketPrice = d.macketPrice || "";
                    d.comments = d.comments || [];
                    if (V && !Q && W.id != d.vid) {
                        D.push(_template(U).render(d))
                    } else {
                        a.push(_template(U).render(d))
                    }
                });
                Y(a);
                if (D.length) {
                    Q = true;
                    var c = _dom.create('<div class="ald-wf-line">以上是' + W.name + '的全部结果，我再看看其他类型的吧！</div><ul id="J_TjWaterfallOther" class="clearfix ald-03040"></ul>');
                    _dom.append(c, E);
                    F.destroy();
                    F = N("#J_TjWaterfallOther")
                }
                if (K >= b.maxPage) {
                    S();
                    return
                }
                if (_malldetail_tabbar_tabbar.curIndex() == "description") {
                    F.pause();
                    B = true;
                    return
                }
            }
        }).run()
    }
    function M(S) {
        if (!J) {
            _kissy_G.sendImg(S);
            J = true
        }
    }
    function N(S) {
        return new Waterfall.Loader({
            container: S,
            load: function (W, V) {
                return C(W, V)
            },
            minColCount: 3,
            colWidth: 240,
            effect: ""
        })
    }
    function A() {
        var S = _dom.create('<ul id="J_TjWaterfall" class="clearfix ald-03040"></ul>');
        if (!E) {
            E = _dom.create('<div id="J_Tjwrap"></div>')
        } else {
            _dom.remove(_dom.children(E))
        }
        _dom.append(S, E)
    }
    _kissy_G.mix(Waterfall, {
        init: function () {
            var S = this;
            _malldetail_tabbar_tabbar.onSwitch(function (V) {
                if (V == "J_TabRecommends" && B) {
                    F.resume();
                    B = false
                }
            });
            A();
            P = _dom.create('<div style="height:200px;background-color:#fff" class="ui-loading"></div>');
            _dom.append(E, "#J_TabRecommends");
            _dom.append(P, "#J_TabRecommends");
            F = N("#J_TjWaterfall");
            _kissy_G.on("AttrTagChange", function () {
                S.reload()
            })
        },
        reload: function () {
            K = 1;
            Q = false;
            D.length = 0;
            if (F) {
                F.destroy();
                A()
            }
            F = N("#J_TjWaterfall")
        }
    });
    return Waterfall
}, {
    requires: ["dom", "waterfall", "template", "malldetail/tabbar/tabbar", "malldetail/recommend/waterfall.css"]
});