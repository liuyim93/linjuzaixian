ALD_INIT_JS_URL = "http://" + ASSETS_SERVER + "/apps/tmall/ald/init.js?t=" + ALD_T;
KISSY.add(V + "/mods/ald", function (S) {
    var D = S.DOM,
		E = S.Event,
		win = window,
		criticalView = 1,
		aldElCls = "j_Ald",
		styleCls = "aldItem",
		aldCon = S.get("#J_AldRight"),
		container = D.prev(aldCon, ".container"),
		loadingCls = "aldRight-loading",
		aldCfgAttr = "data-ald-cfg",
		aldInitAttr = "data-ald-init";

    function Ald() {
        if (!(this instanceof Ald)) {
            return new Ald()
        }
        this.hasBindEvent = false;
        this.isInit = false;
        this.aldNum = 0;
        this.usableNum = 0;
        this._init()
    }
    S.augment(Ald, S.EventTarget, {
        _init: function () {
            var self = this,
				curView = win.g_config.view;
            if (!self.hasBindEvent) {
                self._bindEvent()
            }
            if (curView < criticalView) {
                return
            } !!aldCon && D.show(aldCon);
            self._requestAld()
        },
        _bindEvent: function () {
            var self = this;
            LIST.msg.on("viewchange", function (e) {
                if (e.view < criticalView) {
                    D.hide(aldCon)
                } else {
                    D.show(aldCon);
                    !self.isInit && self._init()
                }
            })
        },
        _getConfig: function (el) {
            var attr = D.attr(el, aldCfgAttr) || "",
				cfg = eval("(" + attr + ")");
            cfg = S.merge(cfg, {
                render: el.id ? "#" + el.id : el
            });
            S.log(cfg);
            return cfg
        },
        _requestAld: function () {
            var self = this,
				renderCount = 0,
				timeCount = 0,
				renderAld = function () {
				    S.each(S.query("." + aldElCls), function (item) {
				        var cfg = self._getConfig(item);
				        ALD.load(cfg);
				        self.aldNum++
				    });
				    ALD.on("afterRender", function (ev) {
				        S.log("ald after render....");
				        var el = S.get(ev.config.render);
				        renderCount++; !!container && D.height(container) < D.height(aldCon) ? D.hide(el) : D.addClass(el, styleCls);
				        ev.render.hasUsableData() ? self.usableNum++ : D.hide(el);
				        if (renderCount == self.aldNum && self.usableNum == 0) {
				            self.fire("noresult")
				        }
				        self.removeLoading()
				    });
				    ALD.on("timeoutException", function () {
				        S.log("ald timeout exception...");
				        timeCount++;
				        if (timeCount == self.aldNum) {
				            self.fire("noresult")
				        }
				    })
				};
            self.isInit = true;
            window.ALD ? renderAld() : S.getScript(ALD_INIT_JS_URL, renderAld);
            S.log("ald recommend init ...")
        },
        removeLoading: function () {
            if (aldCon) {
                D.removeClass(aldCon, loadingCls)
            }
        }
    });
    return {
        init: function () {
            var ald = new Ald(),
				p4pTpl = '<p class="recRight-hd">\u5546\u5bb6\u70ed\u5356</p>{{#each data as vo loc}}<div class="recRight-item"> <a href="{{vo.EURL}}" atpanel="{atpanel}" target="_blank" class="rR-item-img"><img src="{{vo.TBGOODSLINK}}" /></a> <a href="{{vo.EURL}}" atpanel="{atpanel}" target="_blank" class="rR-item-title">{{vo.TITLE}}</a> <p class="ui-price">&yen;{{vo.GOODSPRICE}}</p></div>{{/each}}';
            ald.on("noresult", function () {
                S.log("ald no result ...");
                D.hide("." + aldElCls);
                ald.removeLoading();
                KISSY.use(V + "/mods/p4p", function (S, P4P) {
                    new P4P({
                        conId: "#J_RightRecommend",
                        tpl: p4pTpl,
                        imgFix: "_80x80.jpg",
                        params: {
                            count: 5
                        }
                    }).init()
                });
                ald.detach("noresult")
            })
        }
    }
}); 