KISSY.add("malldetail/sku/util", function (_kissy_imp) {
    var _mods_SKU = _kissy_imp.mods.SKU, _kissy = KISSY, _ua = _kissy.UA, _dom = _kissy.DOM, _window = window;
    function _clearNodes(M) {
        while (M.lastChild) {
            M.removeChild(M.lastChild)
        }
    }
    function _halt(M) {
        alert(M);
        return false
    }
    function _monitorBuyServer(P, N, M) {
        var O = "http://asyncwebserver.monitor.taobao.com/item?";
        var Q = ["src=" + P, "type=" + N, "rq=" + encodeURIComponent(M), "t=" + (+new Date())];
        new Image().src = O + (O.lastIndexOf("?") != -1 ? "&" : "?") + Q.join("&")
    }
    function _buylinkstatus(_id_selector, _link_type) {
        var _dom_a_J_LinkBuy = _kissy.get(_id_selector);
        this.ele = _dom_a_J_LinkBuy ? _dom_a_J_LinkBuy : null;
        var _link_type_tmp = (typeof _link_type == "undefined") ? 3 : _link_type;
        this.app = { init: _link_type_tmp };
        this.curstatu = _link_type_tmp
    }
    _kissy.augment(_buylinkstatus, { getStatu: function () {
        return this.curstatu
    }, statu: function (_prop, _value) {
        if (!this.ele) {
            return
        }
        var self = this;
        var P = null;
        var _status_map = { show: 3, hide: 2, disabled: 1, enabled: 3 };
        var O = ["tb-hidden", "noPost"];
        function S() {
            var T;
            var U = 0;
            for (var V in self.app) {
                if (U > 0) {
                    T = T & self.app[V]
                } else {
                    T = self.app[V]
                }
                U++
            }
            return T
        }
        this.app[_prop] = _status_map[_value];
        if (P) {
            clearTimeout(P)
        }
        P = setTimeout(function () {
            var U = S();
            if (U != self.curstatu) {
                var T = self.curstatu & parseInt(1, 2);
                var W = self.curstatu & parseInt(10, 2);
                var Y = U & parseInt(1, 2);
                var X = U & parseInt(10, 2);
                if (T !== Y) {
                    var V = _dom.parent(self.ele);
                    if (Y == 1) {
                        if (V) {
                            _dom.removeClass(V, "tb-hidden")
                        }
                    } else {
                        if (Y == 0) {
                            if (V) {
                                _dom.addClass(V, "tb-hidden")
                            }
                        }
                    }
                }
                if (W !== X) {
                    if (X == 2) {
                        _dom.removeClass(self.ele, "noPost")
                    } else {
                        _dom.addClass(self.ele, "noPost")
                    }
                }
                self.curstatu = U
            }
        }, 100)
    } 
    });
function _getTrackID(N) {
    //debugger
    //var M = _kissy_imp.cfg("url").tbskip + "/json/get_tb_ck_ps.htm";
    var M = "http://localhost:7525/member/get_tb_ck_ps.do";
        _kissy.use("cookie", function (P, O) {
            O = O || P.Cookie;
            var Q = O.get("t") || _kissy_imp.cfg("valCT");
            P.getScript(_kissy_imp.addTimeStamp(M) + "&varName=TB.Detail.TrackID", { success: function () {
                if (typeof TB.Detail.TrackID === "undefined") {
                    return N(Q)
                }
                _kissy_imp.cfg("valCartInfo").ct = TB.Detail.TrackID.ct;
                N(TB.Detail.TrackID.ct);
                delete TB.Detail.TrackID;
                _kissy_imp.flush()
            }, error: function () {
                N(Q)
            }, timeout: 100
            })
        })
    }
    function _formatDate(O, N) {
        if (O.indexOf("-") > -1) {
            return O
        }
        if (typeof O != "object") {
            O = new Date(parseInt(O))
        }
        N = N || "yyyy-MM-dd hh:mm:ss";
        var P = { "M+": O.getMonth() + 1, "d+": O.getDate(), "h+": O.getHours(), "m+": O.getMinutes(), "s+": O.getSeconds(), "q+": Math.floor((O.getMonth() + 3) / 3), S: O.getMilliseconds() };
        if (/(y+)/.test(N)) {
            N = N.replace(RegExp.$1, (O.getFullYear() + "").substr(4 - RegExp.$1.length))
        }
        for (var M in P) {
            if (new RegExp("(" + M + ")").test(N)) {
                N = N.replace(RegExp.$1, RegExp.$1.length == 1 ? P[M] : ("00" + P[M]).substr(("" + P[M]).length))
            }
        }
        return N
    }
    _mods_SKU.Util = function () {
        return { halt: _halt, clearNodes: _clearNodes, monitorBuyServer: _monitorBuyServer, BuyLinkStatu: _buylinkstatus, getTrackID: _getTrackID, formatDate: _formatDate }
    } ()
}, { requires: [] }); /*pub-1|2013-02-20 11:13:13*/