﻿                        O = O || {};
                        if (O.is_success == "T") {
                            K.success && K.success()
                        } else {
                            if (O.is_success == "O" && K.reLogin !== false) {
                                K.reLogin = false;
                                K.isLogin = false;
                                E(function() {
                                    J.add(L, K)
                                });
                                return
                            }
                            K.error && K.error((O.is_success == "E") ? {code: -1,message: "\u60a8\u5df2\u7ecf\u5173\u6ce8\u8fc7\u8be5\u54c1\u724c\uff01"} : {code: -2,message: "\u5173\u6ce8\u5931\u8d25\uff0c\u8bf7\u7a0d\u540e\u518d\u8bd5\uff01"})
                        }
                    })
                }, K)
            },remove: function(K, J) {
                J = J || {};
                I(function(L) {
                    var M = !!L ? {brandId: K,_tb_token_: L} : {brandId: K};
                    C.jsonp(J.removeServer || "http://brand.tmall.com/ajax/brandDelFromFav.htm", M, function(N) {
                        N = N || {};
                        if (N.is_success == "T") {
                            J.success && J.success()
                        } else {
                            if (N.is_success == "O" && J.reLogin !== false) {
                                J.reLogin = false;
                                J.isLogin = false;
                                E(function() {
                                    self.add(K, J)
                                });
                                return
                            }
                            J.error && J.error((N.is_success == "E") ? {code: -1,message: "\u60a8\u6ca1\u6709\u5173\u6ce8\u8fc7\u8be5\u54c1\u724c\uff01"} : {code: -2,message: "\u53d6\u6d88\u5173\u6ce8\u5931\u8d25\uff0c\u8bf7\u7a0d\u540e\u518d\u8bd5\uff01"})
                        }
                    })
                }, J)
            }}
    }, {requires: ["dom", "ajax"]})
})(KISSY);