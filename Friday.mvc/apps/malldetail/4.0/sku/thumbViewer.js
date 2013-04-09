KISSY.add("malldetail/sku/thumbViewer", function (_kissy, _dom, _event, _imagezoom, _json, _malldetail_common_util) {
    var _body = document.body,
        G,
        A,
        B,
        K,
        L = 100,
        F = "tb-selected",
        N = "hidden",
        O,
        Q = (window.g_config.D950) ? { size: [460, 460], smallSize: [60, 60], bigSize: [477, 335]} : { size: [310, 310], smallSize: [40, 40], bigSize: [430, 310] };
    var H = _malldetail_common_util.createLoader(function (V) {
        if ("ontouchstart" in document) {
            return
        }
        var U = { imageNode: G, width: Q.bigSize[0], height: Q.bigSize[1], bigImageWidth: 800, bigImageHeight: 800, align: { node: _dom.parent(G), points: ["tr", "tl"], offset: [10, -1] }, hasZoom: !("ontouchstart" in document), preload: false, showIcon: true };
        var S = new _imagezoom(U);
        if (S.lensIcon) {
            _event.on(S.lensIcon, "mouseenter", function () {
                _dom.hide(this)
            })
        }
        V(S)
    });
    function C(U, W, V) {
        var S = C.images || (C.images = {});
        S[U] = S[U] || (S[U] = _malldetail_common_util.createLoader(function (Z) {
            var X = new Image();
            _event.on(X, "load", function () {
                Z(X)
            });
            X.src = U;
            var Y = C.elem;
            if (!Y) {
                Y = C.elem = _dom.create('<div style="width:0;height:0;overflow:hidden;">');
                _body.insertBefore(Y, _body.firstChild)
            }
            Y.appendChild(X)
        }));
        return S[U](W, V)
    }
    function M(S) {
        var U = S.src || _dom.attr(S, "data-ks-lazyload");
        return U.replace(new RegExp("_" + Q.smallSize.join("x") + "\\.(jpg|png|gif)$"), "")
    }
    return { init: function () {
        var S = this;
        if (!(G = _dom.get("#J_ImgBooth")) || !(A = _dom.get("#J_UlThumb"))) {
            return
        }
        B = _dom.query("li", A);
        O = parseInt(G.getAttribute("data-hasZoom"), 10);
        S._bindEvents();
        _kissy.ready(function () {
            var U = _dom.query("." + F, A);
            if (U && U.length) {
                S._switchTo(U[0])
            }
        })
    }, _bindEvents: function () {
        var S = this;
        _event.on(A, "click", function (U) {
            U.preventDefault()
        });
        _event.on(B, "mouseenter", function (U) {
            K && K.cancel();
            K = _kissy.later(function () {
                S._switchTo(U.target);
                _kissy.sendAtpanel("tmalldetail.13.6")
            }, L)
        });
        _event.on(B, "mouseleave", function () {
            K && K.cancel()
        })
    }, _switchTo: function (Y) {
        if (!Y) {
            return
        }
        if (Y.tagName !== "LI") {
            Y = _dom.parent(Y, "li")
        }
        var V = Y.getElementsByTagName("img")[0];
        var W = M(V);
        if (!W) {
            return
        }
        var X = W + "_" + Q.size.join("x") + ".jpg";
        var U = _dom.attr(Y, "data-size");
        var S = function (Z) {
            if (Z.zm) {
                H(function (a) {
                    a.set(X);
                    a.set("hasZoom", true);
                    a.set("bigImageSrc", W);
                    a.set("bigImageWidth", Z.w);
                    a.set("bigImageHeight", Z.h)
                })
            }
        };
        this.show(X);
        _dom.addClass(Y, F);
        U = _json.parse(U);
        if (U) {
            S(U)
        } else {
            C(W, function (a) {
                var Z = { w: a.width, h: a.height };
                Z.zm = (a.width >= O) ? 1 : 0;
                _dom.attr(Y, { "data-size": _json.stringify(Z) });
                S(Z)
            })
        }
    }, show: function (S) {
        if (!G || !A) {
            G = G || _dom.get("#J_ImgBooth");
            A = A || _dom.get("#J_UlThumb")
        }
        if (!G || !A) {
            return
        }
        _dom.removeClass(B, F);
        G.src = S;
        H(function (U) {
            U && U.set("hasZoom", false)
        })
    } 
    }
}, { requires: ["dom", "event", "imagezoom", "json", "malldetail/common/util"] }); /*pub-1|2013-01-06 16:13:19*/