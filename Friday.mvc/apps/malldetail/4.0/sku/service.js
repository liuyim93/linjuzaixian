
KISSY.add("malldetail/sku/service", function (_kissy_B, _template) {
    var _mods_SKU = _kissy_B.mods.SKU, _dom = _kissy_B.DOM, _event = _kissy_B.Event;
    function F(G) {
        var _dom_a_snippet = "服务";
        var _service_cfg = { "3c": "http://www.tmall.com/go/act/tmall/ybdbbac.php", house: "http://www.tmall.com/go/act/jzfwpd.php" };
        if (G && _service_cfg[G] && !window.g_config.offlineShop) {
            _dom_a_snippet = '<a href="' + _service_cfg[G] + '" class="tb-serviceLink" target="_blank">' + _dom_a_snippet + "</a>"
        }
        return _dom_a_snippet
    }
    _mods_SKU.Service = function () {
        var _selectSkuId;
        var Q;
        var P;
        var T;
        var I;
        var a = {};
        var W;
        var Y;
        var H;
        var V;
        var _dom_id_J_regionSellServer = _kissy_B.get("#J_regionSellServer");
        function R() {
            I = false;
            if (_dom_id_J_regionSellServer) {
                _dom_id_J_regionSellServer.innerHTML = ""
            }
            W = null;
            if (!P && !P.success) {
                return
            }
            H = Y.elmProps ? Y.elmProps.length : 0;
            _selectSkuId = _mods_SKU.selectSkuId;
            if (typeof P.serviceType != "undefined" && P.serviceType == "3c") {
                Q = 1;
                S();
                if (_selectSkuId || H == 0) {
                    J()
                }
            } else {
                if (typeof P.serviceType != "undefined" && P.serviceType == "house") {
                    Q = 2;
                    G()
                }
            }
        }
        function X(b) {
            return /\.(jpg|gif|png)$/i.test(b) ? "background:url(" + b + ") no-repeat 0 0;" : ""
        }
        function S() {
            if (!P.service3c) {
                return
            }
            if (P.service3c.length > 0) {
                var e = '<ul class="tb-clearfix serviceList">';
                var f = '<dt class="tb-metatit" data-spm="1000987">' + F("3c") + '</dt><dd><div id="J_freeService"></div><div class="j_moreServer">';
                for (var d = 0; d < P.service3c.length; d++) {
                    var b = P.service3c[d];
                    var h = b.tmallFree;
                    if (b.uniqueServices && b.uniqueServices.length > 0) {
                        f += '<ul class="tb-clearfix serviceList">';
                        for (var c = 0; c < b.uniqueServices.length; c++) {
                            var g = b.uniqueServices[c];
                            if (h) {
                                e += '<li class="freeService" date-value="' + b.id + "-" + g.uniqueId + '"><a href="' + b.link + '" href="_target"><span class="serviceIcon" style="' + X(b.tagImage) + '"></span><span>' + b.spuName + (g.uniqueName ? g.uniqueName : "") + '</span><span class="money shucu" >\u72c2\u6691\u5b63 \u8d60\u9001</span></a></li>'
                            } else {
                                if (g.free) {
                                    e += '<li class="freeService" date-value="' + b.id + "-" + g.uniqueId + '"><a href="' + b.link + '" href="_target"><span class="serviceIcon" style="' + X(b.tagImage) + '"></span><span>' + b.spuName + (g.uniqueName ? g.uniqueName : "") + '</span><span class="money mjzs" >\u5546\u5bb6\u8d60\u9001</span></a></li>'
                                } else {
                                    f += '<li date-value="' + b.id + "-" + g.uniqueId + '"><a href="' + b.link + '" href="_target"><span class="serviceIcon" style="' + X(b.tagImage) + '"></span><span>' + b.spuName + (g.uniqueName ? g.uniqueName : "") + '</span><span class="money">--\u5143</span></a></li>'
                                }
                            }
                        }
                        f += "</ul>"
                    } else {
                        if (h) {
                            e += '<li class="freeService" date-value="' + b.id + '"><a href="#"><span class="serviceIcon" style="' + X(b.tagImage) + '"></span><span>' + b.spuName + '</span><span class="money shucu" >\u72c2\u6691\u5b63 \u8d60\u9001</span></a></li>'
                        } else {
                            if (b.isFree) {
                                e += '<li class="freeService" date-value="' + b.id + '"><a href="#"><span class="serviceIcon" style="' + X(b.tagImage) + '"></span><span>' + b.spuName + '</span><span class="money mjzs" >\u5546\u5bb6\u8d60\u9001</span></a></li>'
                            } else {
                                f += '<ul class="tb-clearfix serviceList">';
                                f += '<li date-value="' + b.id + '"><a href="#"><span class="serviceIcon" style="' + X(b.tagImage) + '"></span><span>' + b.spuName + '</span><span class="money">--\u5143</span></a></li>';
                                f += "</ul>"
                            }
                        }
                    }
                }
                e += "</ul>";
                if (_dom_id_J_regionSellServer) {
                    _dom_id_J_regionSellServer.innerHTML = f;
                    _kissy_B.one("#J_freeService").html(e);
                    _kissy_B.all("#J_freeService li").each(function () {
                        this.addClass("tb-selected");
                        this.append("<i>\u5df2\u9009\u4e2d</i>")
                    })
                }
                N(0)
            }
        }
        function J() {
            if (!P.skuInfo) {
                return
            }
            var h = function () {
                _kissy_B.all("#J_regionSellServer li").each(function () {
                    var k = this.attr("date-value").split("-");
                    if (k.length == 2 && a[k[0]] && a[k[0]][k[1]]) {
                        if (!this.hasClass("freeService")) {
                            var i = a[k[0]][k[1]].price;
                            if (i !== null) {
                                this.all(".money")[0].innerHTML = i
                            }
                        }
                    } else {
                        if (a[k[0]]) {
                            if (!this.hasClass("freeService")) {
                                var i = a[k[0]].price;
                                if (i !== null) {
                                    this.all(".money")[0].innerHTML = i
                                }
                            }
                        }
                    }
                })
            };
            var j;
            if (_selectSkuId) {
                j = P.skuInfo[_selectSkuId]
            } else {
                if (H == 0) {
                    j = P.skuInfo["0"]
                }
            }
            if (j) {
                var g = j.service3c;
                if (g.length > 0) {
                    for (var f = 0; f < g.length; f++) {
                        var e = g[f].id;
                        a[e] = a[e] || {};
                        if (g[f].uniqueServices && g[f].uniqueServices.length > 0) {
                            for (var d = 0; d < g[f].uniqueServices.length; d++) {
                                var c = g[f].uniqueServices[d];
                                var b = c.uniqueId;
                                a[e][b] = a[e][b] || {};
                                a[e][b].price = c.price
                            }
                        } else {
                            a[e].price = g[f].price
                        }
                    }
                }
            }
            h()
        }
        function G() {
            if (!P.skuInfo) {
                return
            }
            var c = '<a href="#"><span class="serviceIcon" style="background:url({{tagImage}})"></span><span>{{spuName}}</span><span class="money">{{price}}</span></a>', h = '<a href="#"><span class="serviceIcon" style="background:url({{tagImage}})"></span><span>{{spuName}}</span><span class="money"></span></a>', b = '<input  type="hidden" name="{inputName}">', k = "data-serviceId", f, d;
            if (_selectSkuId) {
                f = 0;
                d = P.skuInfo[_selectSkuId]
            } else {
                if (P.skuInfo["0"]) {
                    f = 0;
                    d = P.skuInfo["0"]
                } else {
                    f = 1;
                    for (var n in P.skuInfo) {
                        if (P.skuInfo[n]) {
                            d = P.skuInfo[n];
                            break
                        }
                    }
                }
            }
            if (d && _dom_id_J_regionSellServer) {
                if (!W) {
                    var e = _dom.create('<dt class="tb-metatit" data-spm="1000987">' + F("house") + "</dt>");
                    var o = _dom.create("<dd></dd>");
                    _dom.append(e, _dom_id_J_regionSellServer);
                    _dom.append(o, _dom_id_J_regionSellServer);
                    W = _dom.create('<ul data-property="\u670d\u52a1" class="tb-clearfix serviceList"></ul>');
                    _dom.append(W, o)
                }
                I = false;
                if (d.houseHoldServicePrices) {
                    _dom.html(W, "");
                    for (var j = 0; j < d.houseHoldServicePrices.length; j++) {
                        var m = d.houseHoldServicePrices[j];
                        var g = _dom.create("<li></li>");
                        _dom.attr(g, k, m.serviceId);
                        var l;
                        if (f === 0) {
                            l = _template(c).render(d.houseHoldServicePrices[j])
                        } else {
                            if (f === 1) {
                                l = _template(h).render(d.houseHoldServicePrices[j])
                            }
                        }
                        _dom.html(g, l);
                        if (j == 0) {
                            I = true;
                            _dom.addClass(g, "tb-selected");
                            _dom.append(_dom.create("<i>\u5df2\u9009\u4e2d</i>"), g);
                            T = m.serviceId
                        }
                        _dom.append(g, W)
                    }
                    N(1)
                }
            }
        }
        function N(b) {
            _kissy_B.all("#J_regionSellServer li").on("click", function (f) {
                f.preventDefault();
                //_kissy_B.sendAtpanel("tmalldetail.13.9");
                var g = _kissy_B.one(this);
                var d = g.parent();
                if (!g.hasClass("freeService")) {
                    if (!g.hasClass("tb-selected")) {
                        d.all("li").removeClass("tb-selected");
                        d.all("i").remove();
                        g.addClass("tb-selected");
                        g.append("<i>\u5df2\u9009\u4e2d</i>");
                        T = _dom.attr(g, "data-serviceId")
                    } else {
                        var c = true;
                        if (b == 1) {
                            if (d.all("li.tb-selected").length == 1) {
                                c = false
                            }
                        }
                        if (c) {
                            d.all("li").removeClass("tb-selected");
                            d.all("i").remove()
                        }
                    }
                }
            })
        }
        function _getAreaID() {
            if (P && P.divisionId) {
                return P.divisionId
            }
        }
        function _getServiceID() {
            return T
        }
        function _getHouseService() {
            return I
        }
        function _init(b) {
            if (typeof b == "undefined") {
                if (_dom_id_J_regionSellServer) {
                    _dom_id_J_regionSellServer.innerHTML = ""
                }
                if (W) {
                    W = null
                }
                P = {};
                I = false;
                return
            }
            P = b;
            _selectSkuId = _mods_SKU.selectSkuId;
            Y = _kissy_B.cfg();
            R();
            if (!V) {
                V = 1;
                _mods_SKU.PropertyHandler.onSkuChange(function () {
                    _selectSkuId = _mods_SKU.selectSkuId;
                    if (_selectSkuId && Y.isSupportCity) {
                        if (Q == 1) {
                            J()
                        } else {
                            if (Q == 2) {
                                G()
                            }
                        }
                    }
                })
            }
        }
        return { init: _init, getAreaID: _getAreaID, getServiceID: _getServiceID, getHouseService: _getHouseService }
    } ()
}, { requires: ["template", "malldetail/sku/propertyHandler"] }); /*pub-1|2013-01-06 16:13:20*/