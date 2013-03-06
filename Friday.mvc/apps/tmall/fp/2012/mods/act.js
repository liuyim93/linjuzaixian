KISSY.add("2012/mods/act", function (B) {
    var C = B.DOM,
		A = B.Event;
    var F = document,
		E = window;
    var G = B.UA.ie === 6;

    function D() {
        this._init()
    }
    B.augment(D, {
        _init: function () {
            if (!g_config.closeWinner) {
                this._initWinner()
            }
            if (!g_config.closeBirth) {
                this._birthdayFlash()
            }
        },
        _initWinner: function () {
            B.use("2012/act/winner/winner", function (H, I) {
                new I(true)
            })
        },
        _birthdayFlash: function () {
            B.ready(function () {
                var H = this;
                var I = "http://" + (location.href.indexOf("daily.") != -1 ? "tmm.daily.taobao.net" : "tmm.taobao.com") + "/member/birth_show.do";
                B.IO({
                    dataType: "jsonp",
                    url: I,
                    data: {
                        from: "www.tmall.com"
                    },
                    jsonp: "callback",
                    success: function (N) {
                        if (!!N && N.inLogin) {
                            var K = N.nick;
                            var O = N.buydays;
                            var L = parseInt(N.activeStatus);
                            var P = window.location.href.split("?")[1] || "";
                            var M = B.unparam(P);
                            var J;
                            if (M && M.bfdebug && M.bfdebug == "1") {
                                J = true
                            }
                            if ((N.inBirthday && O != null && L > 0) || J) {
                                B.use("2012/mods/birthday", function (Q, R) {
                                    new R(N)
                                })
                            }
                        }
                    }
                })
            })
        }
    });
    return D
});