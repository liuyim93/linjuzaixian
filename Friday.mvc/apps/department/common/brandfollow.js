(function (B) {
    var A = "tgallery/department/common/brandfollow";
    (!B.config) && B.add(A, { requires: ["core"] });
    B.add(A, function (F, H, C) {
        var D;
        H = H || F.DOM;
        C = C || F.IO;
        function G(K, J) {
            J = J || {};
            if (J.isLogin) {
                K && K();
                return
            }
            F.onTgalleryReady("tgallery/tmall/common/tbuser", function (M, L) {
                L.onLogin(K, J)
            })
        }
        function E(K, J) {
            F.onTgalleryReady("tgallery/tmall/common/tbuser", function (M, L) {
                L.onLogout(K, J)
            })
        }
        function I(K, J) {
            G(function () {
                J = J || {};
                token = J.tbToke || H.val("#J_TbToken");
                if (token) {
                    K && K(token)
                } else {
                    F.onTgalleryReady("tgallery/tmall/common/tbuser", function (M, L) {
                        L.onTokenReady(K, J)
                    })
                }
            }, J)
        }
        return F[A] = F[A] || { add: function (L, K) {
            K = K || {};
            var J = this;
            I(function (M) {
                var N = !!M ? { brandId: L, _tb_token_: M} : { brandId: L };
                C.jsonp(K.addServer || "http://brand.tmall.com/ajax/brandAddToFav.htm", N, function (O) {
                    O = O || {};
                    if (O.is_success == "T") {
                        K.success && K.success()
                    } else {
                        if (O.is_success == "O" && K.reLogin !== false) {
                            K.reLogin = false;
                            K.isLogin = false;
                            E(function () {
                                J.add(L, K)
                            });
                            return
                        }
                        K.error && K.error((O.is_success == "E") ? { code: -1, message: "\u60a8\u5df2\u7ecf\u5173\u6ce8\u8fc7\u8be5\u54c1\u724c\uff01"} : { code: -2, message: "\u5173\u6ce8\u5931\u8d25\uff0c\u8bf7\u7a0d\u540e\u518d\u8bd5\uff01" })
                    }
                })
            }, K)
        }, remove: function (K, J) {
            J = J || {};
            I(function (L) {
                var M = !!L ? { brandId: K, _tb_token_: L} : { brandId: K };
                C.jsonp(J.removeServer || "http://brand.tmall.com/ajax/brandDelFromFav.htm", M, function (N) {
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
