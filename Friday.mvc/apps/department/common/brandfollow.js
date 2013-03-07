(function (_kissy) {
    var _namespace_brandfollow = "tgallery/department/common/brandfollow";
    (!_kissy.config) && _kissy.add(_namespace_brandfollow, { requires: ["core"] });
    _kissy.add(_namespace_brandfollow, function (_kissy_imp, _dom, _ajax) {
        var D;
        _dom = _dom || _kissy_imp.DOM;
        _ajax = _ajax || _kissy_imp.IO;
        function G(K, J) {
            J = J || {};
            if (J.isLogin) {
                K && K();
                return
            }
            _kissy_imp.onTgalleryReady("tgallery/tmall/common/tbuser", function (M, L) {
                L.onLogin(K, J)
            })
        }
        function E(K, J) {
            _kissy_imp.onTgalleryReady("tgallery/tmall/common/tbuser", function (M, L) {
                L.onLogout(K, J)
            })
        }
        function I(K, J) {
            G(function () {
                J = J || {};
                token = J.tbToke || _dom.val("#J_TbToken");
                if (token) {
                    K && K(token)
                } else {
                    _kissy_imp.onTgalleryReady("tgallery/tmall/common/tbuser", function (M, L) {
                        L.onTokenReady(K, J)
                    })
                }
            }, J)
        }
        return _kissy_imp[_namespace_brandfollow] = _kissy_imp[_namespace_brandfollow] || { add: function (L, _opts) {
            _opts = _opts || {};
            var _brandfollow = this;
            I(function (M) {
                var N = !!M ? { brandId: L, _tb_token_: M} : { brandId: L };
                _ajax.jsonp(_opts.addServer || "http://brand.tmall.com/ajax/brandAddToFav.htm", N, function (O) {
                    O = O || {};
                    if (O.is_success == "T") {
                        _opts.success && _opts.success()
                    } else {
                        if (O.is_success == "O" && _opts.reLogin !== false) {
                            _opts.reLogin = false;
                            _opts.isLogin = false;
                            E(function () {
                                _brandfollow.add(L, _opts)
                            });
                            return
                        }
                        _opts.error && _opts.error((O.is_success == "E") ? { code: -1, message: "\u60a8\u5df2\u7ecf\u5173\u6ce8\u8fc7\u8be5\u54c1\u724c\uff01"} : { code: -2, message: "\u5173\u6ce8\u5931\u8d25\uff0c\u8bf7\u7a0d\u540e\u518d\u8bd5\uff01" })
                    }
                })
            }, _opts)
        }, remove: function (K, J) {
            J = J || {};
            I(function (L) {
                var M = !!L ? { brandId: K, _tb_token_: L} : { brandId: K };
                _ajax.jsonp(J.removeServer || "http://brand.tmall.com/ajax/brandDelFromFav.htm", M, function (N) {
                    N = N || {};
                    if (N.is_success == "T") {
                        J.success && J.success()
                    } else {
                        if (N.is_success == "O" && J.reLogin !== false) {
                            J.reLogin = false;
                            J.isLogin = false;
                            E(function () {
                                self.add(K, J)
                            });
                            return
                        }
                        J.error && J.error((N.is_success == "E") ? { code: -1, message: "\u60a8\u6ca1\u6709\u5173\u6ce8\u8fc7\u8be5\u54c1\u724c\uff01"} : { code: -2, message: "\u53d6\u6d88\u5173\u6ce8\u5931\u8d25\uff0c\u8bf7\u7a0d\u540e\u518d\u8bd5\uff01" })
                    }
                })
            }, J)
        } 
        }
    }, { requires: ["dom", "ajax"] })
})(KISSY);
