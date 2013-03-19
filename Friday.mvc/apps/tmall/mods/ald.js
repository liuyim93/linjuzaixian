(function (ALD, S) {
    if (ALD.request) {
        return
    }
    if (!ALD.on) {
        S.mix(ALD, S.EventTarget)
    }
    var win = window,
		DOM = S.DOM,
		Event = S.Event;
    var loadt = +new Date();
    var parseJsonAttr = function (el, attr, obj, key) {
        var val = DOM.attr(el, attr);
        if (val) {
            try {
                var json = eval("(" + val + ")");
                if (S.isPlainObject(json)) {
                    if (S.isPlainObject(obj)) {
                        obj[key] = json
                    }
                    return json
                }
            } catch (e) { }
        }
    };
    ALD.load = function (loadConfig, fn) {
        if (S.isString(loadConfig)) {
            var util = ALD.util;
            var renderFn = util.renders[loadConfig];
            if (renderFn) {
                fn(renderFn)
            } else {
                var moduleConfig = util.getModuleConfig(loadConfig);
                if (!moduleConfig) {
                    S.log("\u6307\u5b9a\u7684\u6a21\u5757" + loadConfig + "\u4e0d\u5b58\u5728\uff0c\u65e0\u6cd5\u52a0\u8f7d");
                    return
                }
                ALD.on("renderLoadSuccess", function (ev) {
                    if (moduleConfig.render === ev.render) {
                        fn(ev.renderFn);
                        ALD.detach("renderLoadSuccess", arguments.callee)
                    }
                });
                util.use(loadConfig)
            }
        } else {
            if (S.isObject(loadConfig)) {
                if (!ALD.util.use(loadConfig.appId)) {
                    return
                }
                ALD.request(loadConfig)
            }
        }
    };
    ALD.request = function (loadConfig, fn) {
        if (!S.isPlainObject(loadConfig)) {
            S.log("\u65e0\u6cd5\u8bf7\u6c42\u963f\u62c9\u4e01\u6570\u636e\uff0cloadCongi\u53c2\u6570\u683c\u5f0f\u4e0d\u6b63\u786e");
            return
        }
        if (!loadConfig.appId) {
            S.log("\u63a8\u8350\u6a21\u5757ID\u4e3a\u7a7a\uff0c\u65e0\u6cd5\u52a0\u8f7d\u6307\u5b9a\u7684\u6a21\u5757");
            return
        }
        var callback = "ald" + S.guid(),
			TIMEOUT = 5000,
			timeoutTimer = win.setTimeout(function () {
			    ALD.fire("timeoutException")
			}, TIMEOUT);
        win[callback] = function (data, params) {
            win.clearTimeout(timeoutTimer);
            var config = S.merge({}, loadConfig),
				DOM = S.DOM;
            var moduleConfig = ALD.util.getModuleConfig(config.appId);
            config.template = moduleConfig.template;
            config.effects = moduleConfig.effects;
            ALD.on("beforeRender", function (calldata) {
                var render = calldata.render;
                if (render.data.acurl) {
                    render.stat(render.data.acurl);
                    delete render.data.acurl
                }
            });
            data = data || [];
            if (S.isArray(data)) {
                data = {
                    datalist: data
                }
            }
            config.data = S.merge(data, params);
            if (S.isFunction(fn)) {
                fn(data, params, config)
            } else {
                ALD.util.invokeRender(data, params, config)
            }
            try {
                delete win[callback]
            } catch (e) { }
        };
        var doc = document;
        var node = doc.createElement("script");
        var params = loadConfig.params || {};
        if (S.isObject(params) && !params.refer) {
            params.refer = doc.referrer
        }
        node.src = "http://ald.taobao.com/recommend.htm?appId=" + loadConfig.appId + "&" + S.param(loadConfig.params) + "&callback=" + callback + "&" + loadt++;
        node.charset = loadConfig.charset || "gbk";
        var head = doc.getElementsByTagName("head")[0];
        setTimeout(function () {
            head.insertBefore(node, head.firstChild)
        }, 0)
    };
    ALD.render = function (root) {
        var self = ALD;
        var DOM = S.DOM;
        S.each(DOM.query(".ald", root || document.body), function (el) {
            if (DOM.data(el, "ald-inited")) {
                return
            }
            DOM.data(el, "ald-inited", true);
            var appId = DOM.attr(el, "ald-appId");
            if (!appId) {
                return
            }
            var config = {
                render: el,
                appId: appId
            };
            parseJsonAttr(el, "ald-params", config, "params");
            parseJsonAttr(el, "ald-extra", config, "extra");
            self.load(config)
        })
    };
    S.ready(function () {
        ALD.render();
        S.each(ALD.queue, function (arr) {
            ALD.load(arr[0], arr[1])
        });
        ALD.queue = []
    })
})(ALD, KISSY);