KISSY.add(V + "/mods/p4p", function (S, T, Lazy) {
    var D = S.DOM,
		E = S.Event,
		win = window,
		requestUrl = "http://tmatch.simba.taobao.com",
		atpanelUrl = "http://ac.atpanel.com/1.gif?com=02&apply=list&cod=1.3.1&uid=&ver=&ip=&other=";
    countMap = [5, 6, 7], tpl = '<div class="recommend"> <h3 class="recommend-hd">\u5546\u5bb6\u70ed\u5356\uff1a</h3> <div class="recommend-con clearfix recommend-con-{{count}}"> {{#each data as vo loc}} <div class="product"> <a href="{{vo.EURL}}" target="_blank" atpanel="{atpanel}" class="productImg"> <img src="{{vo.TBGOODSLINK}}" /> </a> <p class="productPrice ui-price">&yen;{{vo.GOODSPRICE}}</p> <p class="productTitle"><a href="{{vo.EURL}}" atpanel="{atpanel}" target="_blank">{{vo.TITLE}}</a></p> </div> {{/each}} </div></div>';

    function Recommend(cfg) {
        if (!(this instanceof Recommend)) {
            return new Recommend()
        }
        var defaultCfg = {
            conId: "#J_Recommend",
            dataUrl: requestUrl,
            tpl: tpl,
            imgFix: "_160x160.jpg",
            params: {},
            callback: "__p4p_request_result"
        };
        this.config = S.merge(defaultCfg, cfg || {});
        this.atpanel = "-2,{{vo.RESOURCEID}},,,spu,1,p4p,";
        this.p4pImgFix = "_sum.jpg";
        this.params = {};
        this.count = 5;
        this.content = null
    }
    S.augment(Recommend, S.EventTarget, {
        init: function () {
            var self = this,
				attr, obj, cfg = self.config;
            self.content = S.get(cfg.conId);
            if (!self.content) {
                return
            }
            attr = D.attr(self.content, "data-p4p-cfg") || {};
            if (attr) {
                obj = eval("(" + attr + ")");
                self.params = self._formatParams(obj);
                cfg.dataUrl += "?" + self._param(self.params)
            }
            self.atpanel = D.attr(self.content, "data-atpanel") || self.atpanel;
            cfg.tpl = cfg.tpl.replace(/{atpanel}/g, self.atpanel);
            S.log("p4p request url : " + cfg.dataUrl);
            self._request()
        },
        _param: function (o) {
            var buf = [],
				key, val;
            for (key in o) {
                val = o[key];
                buf.push(key + "=" + val)
            }
            return buf.join("&")
        },
        _formatParams: function (obj) {
            var reverseCat = function (src) {
                if (!src) {
                    return ""
                }
                var strs = src.split(","),
					result = "";
                for (var i = strs.length; i >= 0; i--) {
                    if (!!strs[i]) {
                        result += strs[i] + ","
                    }
                }
                if (result.length > 0) {
                    result = result.substring(0, result.length - 1)
                }
                return result
            };
            obj.catid = reverseCat(obj.catid);
            obj.cat = reverseCat(obj.cat);
            obj.propertyid = reverseCat(obj.propertyid);
            obj.property = reverseCat(obj.property);
            obj.refpid = reverseCat(obj.pid);
            obj.p4p = this.config.callback;
            obj.t = +new Date;
            var view = win.g_config.view || 0,
				page = obj.page || 1;
            this.count = obj.count = countMap[view];
            obj.offset = (page - 1) * obj.count;
            obj = S.merge(obj, this.config.params || {});
            S.log("p4p request params :");
            S.log(obj);
            return obj
        },
        _request: function () {
            var self = this;
            win[self.config.callback] ? self._render() : S.getScript(self.config.dataUrl, function () {
                self._render();
                self.fire("loadSuccess")
            })
        },
        _render: function () {
            var self = this,
				html, obj = {}, result = win[self.config.callback];
            if (!(result && S.isArray(result) && result.length > 0)) {
                return
            }
            obj = self._formatData(result);
            html = T(self.config.tpl).render(obj);
            D.html(self.content, html);
            D.show(self.content);
            self._sendExposure();
            win[self.config.callback] = null
        },
        _formatData: function (arr) {
            var self = this,
				result = [],
				hlKeyword = function (str, key) {
				    if (!!str && !!key) {
				        var key = key.replace(/[,\s\+]+/g, "|").replace(/(\\)+/g, "$1$1");
				        return str.replace(new RegExp("(" + key + ")", "ig"), "<em>$1</em>")
				    } else {
				        return str
				    }
				}, replaceImg = function (src) {
				    return src.replace(self.p4pImgFix, self.config.imgFix)
				};
            S.each(arr, function (item, idx) {
                var obj = S.clone(item),
					params = self.params;
                obj.TITLE = hlKeyword(obj.TITLE, obj.REDKEY);
                obj.GOODSPRICE = (obj.GOODSPRICE / 100).toFixed(2);
                obj.TBGOODSLINK = replaceImg(obj.TBGOODSLINK);
                result.push(obj)
            });
            return {
                data: result,
                count: this.count
            }
        },
        _sendExposure: function () {
            try {
                new Image().src = atpanelUrl + "&cache=" + Math.random().toString().slice(2, 9)
            } catch (err) { }
        }
    });
    return Recommend
}, {
    requires: ["template", "datalazyload"]
}); 