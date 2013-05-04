KISSY.add(V + "/mods/item-sku", function (I, R) {
    var A = I.DOM,
		T = I.Event,
		K = I.get("#J_ItemList"),
		H = I.query(".product", K),
		G = "productImg",
		N = "productThumb",
		O = "proThumb-wrap",
		J = "proThumb-img",
		Q = "proThumb-selected",
		M = "j_ProThumbPrev",
		P = "j_ProThumbNext",
		C = "proThumb-disable",
		F = "_30x30.jpg",
		B = "_b.jpg";

    function L() {
        if (!(this instanceof L)) {
            return new L()
        }
        var D = A.hasClass(K, "miniView");
        B = D ? "_160x160.jpg" : B;
        this.stepsNum = D ? 3 : 5;
        this.width = D ? 111 : 185;
        this._init()
    }
    I.augment(L, I.EventTarget, {
        _init: function () {
            var D = this;
            I.each(H, function (W) {
                var X = I.get("." + N, W),
					S = I.query("." + J, X),
					Y = S.length > D.stepsNum;
                D._thumb(W);
                if (Y) {
                    var U = I.get("." + M, W),
						E = I.get("." + P, W);
                    A.css(U, "visibility", "visible");
                    A.css(E, "visibility", "visible");
                    T.on(X, "mouseenter", function () {
                        if (!A.attr(X, "data-init")) {
                            A.attr(X, "data-init", "true");
                            D._carousel(W)
                        } else {
                            T.detach(this, "mouseenter")
                        }
                    })
                }
            })
        },
        _carousel: function (S) {
            var E = this,
				D = I.get("." + N, S);
            I.log("carousel start init ...");
            I.use("switchable", function (W, U) {
                var X = new U.Carousel(D, {
                    effect: "scrollx",
                    steps: E.stepsNum,
                    viewSize: [E.width],
                    circular: false,
                    prevBtnCls: M,
                    nextBtnCls: P,
                    disableBtnCls: C,
                    hasTriggers: false,
                    lazyDataType: "img-src"
                })
            })
        },
        _thumb: function (U) {
            var E = this,
				X = I.query("." + J, U),
				S = I.get("." + G, U),
				W = I.get("img", S),
				D = function (Y) {
				    return !!I.get("i", Y)
				};
            I.each(X, function (Y) {
                if (!D(Y)) {
                    A.append(A.create("<i>"), Y)
                }
            });
            T.on(X, "click", function () {
                var Y = this,
					Z = I.get("img", Y).src;
                I.each(X, function (a) {
                    A.removeClass(a, Q)
                });
                A.addClass(Y, Q);
                if (!D(Y)) {
                    A.append(A.create("<i>"), Y)
                }
                W.src = Z.replace(F, B);
                S.href = E._addParam(A.attr(Y, "data-sku"), S.href)
            })
        },
        _addParam: function (S, E) {
            var U = /(\?|\&)sku_properties=(.*)(\&|$)/,
				D;
            D = U.test(E) ? E.replace(U, "$1sku_properties=" + S + "$3") : E + "&sku_properties=" + S;
            return D
        }
    });
    return {
        init: function () {
            new L()
        }
    }
});