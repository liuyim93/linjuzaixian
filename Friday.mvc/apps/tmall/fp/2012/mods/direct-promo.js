/**
 * Created with JetBrains WebStorm.
 * User: tangtang
 * Date: 13-2-3
 * Time: 下午10:04
 * To change this template use File | Settings | File Templates.
 */
/*pub-1|2013-01-15 17:19:40*/
KISSY.add("2012/mods/direct-promo",function (_kissy_t, O) {
        var _kissy = KISSY,
            _dom = _kissy.DOM,
            N = "http://delta.taobao.com/home/delivery/AllContentByPage.do?resourceIds=",
            _str_J_DirectPromo = "J_DirectPromo",
            _str_J_DirectPromo_ = "J_DirectPromo_",
            _str_J_DirectPromoFloatBox = "J_DirectPromoFloatBox",
            _str_content_results = "__content_results",
            _reg_for_http = /^https?:\/\/\S+$/i,
            _reg_for_image = /^https?:\/\/\S+(png|jpg|gif)$/i,
            _window = window,
            D = false,
            M = {},
            P = [];
        var _config = _window.g_config;
        function C(U, S) {
            var R = U.length, T;
            while (R--) {
                T = U[R];
                if (!_kissy.inArray(T, S))
                { S.push(T) }
            }
            return S
        }
        var DirectPromo = { init: function (U) {
            var _node_class_J_DirectPromo = _kissy.query("." + _str_J_DirectPromo),
                S = [],
                _resid; if (!_node_class_J_DirectPromo || _node_class_J_DirectPromo.length === 0) { return }
            _kissy.each(_node_class_J_DirectPromo, function (_node) {
                _resid = _node.getAttribute("data-resid");
                if (_resid) { S.push(_resid); M[_resid] = _node }
            });
            U && (S = C(U, S));
            this.request(S)
        }
            , request: function (W, V, T) {
                var _directpromo = this;
                var R = N + W.join(",") + "&t=" + +new Date;
                var X = window.location.href.split("?")[1] || "";
                var S = _kissy.unparam(X);
                if (S && S.preview && S.preview == "preview") {
                    R += "&preview=preview"
                }
                _kissy.getScript(R, function () {
                    var Y = _window[_str_content_results], a, Z = 0; if (!Y || Y.length === 0) { return }
                    if (V && V > 0) {
                        for (; Z < V; Z++) {
                            a = Y[Z].content;
                            if (a && _reg_for_image.test(a)) {
                                new Image().src = a
                            }
                        }
                    }
                    P = P.concat(Y);
                    _directpromo.render(T);
                    MFP.fire("directSuccess", { data: _window[_str_content_results] })
                })
            }, render: function (T) {
                var S = P.length, U, R, V;
                while (S--) {
                    U = P[S];
                    V = U.id;
                    if (!M[V])
                    {
                        R = _kissy.get("#" + (V === T ? _str_J_DirectPromoFloatBox : _str_J_DirectPromo_ + V));
                        if (R)
                        {
                            M[V] = R
                        }
                        else
                        {
                            continue
                        }
                    }
                    P.splice(S, 1);
                    this._fill(U)
                }
            }, detect: function (S) {
                var R = 100, V = 50, U = 0, T = this; if (D) { return } D = true;
                (function () {
                    var X, W; _kissy.each(P, function (Z, Y) {
                            X = Z.id;
                            if (!M[X]) {
                                W = _kissy.get("#" + (X === S ? _str_J_DirectPromoFloatBox : _str_J_DirectPromo_ + X));
                                if (W) { M[X] = W }
                            }
                            if (M[X]) {
                                T._fill(P.splice(Y, 1)[0]);
                                return false
                            }
                        }
                    );
                    if (P.length > 0 && ++U < V) { setTimeout(arguments.callee, R) } else { D = false }
                })()
            }, _fill: function (W) {
                var R = M[W.id], V = W.content, U = W.link, S;
                if (!R || !V)
                { return }
                if (_reg_for_image.test(V)) { S = '<img src="' + V + '" />' }
                else {
                    if (V == "http://tms.tms.tms")
                    { return }
                    else {
                        if (_reg_for_http.test(V)) {
                            S = '<iframe src="' + V + '" scrolling="no" frameborder="0" width="330" height="200"></iframe>';
                            U = ""
                        }
                        else {
                            if (W.id == 395) {
                                if (V && V == "chaoshi")
                                { _dom.show(R) }
                                else
                                { _dom.remove(R) }
                                return
                            }
                            else {
                                if (W.id == 396) {
                                    var T = _dom.create(V);
                                    if (_kissy.get("#J_Category")) {
                                        _dom.attr("#J_Category", "data-spm", _dom.attr(T, "data-spm"));
                                        _kissy.one("#j_Menu").html(_kissy.one("#j_Menu", T).html());
                                        _kissy.use("2012/mods/category", function (X, Y) {
                                            new Y("#J_Category",
                                                { viewId: "#J_SubCategory", subViews: ".j_SubView", triggers: ".j_MenuItem", bottomCl: ".j_BottomMenu", dataUrl: "http://" + location.host + "/go/rgn/mfp2012/all-cat-asyn.php"
                                                })
                                        })
                                    }
                                    return
                                }
                                else { S = V }
                            }
                        }
                    }
                }
                R.innerHTML = U ? '<a target="_blank" href="' + U + '">' + S + "</a>" : S
            }
        };
        return DirectPromo
    }
);
