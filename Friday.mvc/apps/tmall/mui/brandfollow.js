KISSY.add("tmall/mui/brandfollow", function (_kissy_imp, _dom, _ajax) {
        var D;
        _dom = _dom || _kissy_imp.DOM;
        _ajax = _ajax || _kissy_imp.IO;
        function _add_to_favorite_imp(_fn, _opts) {
            _opts = _opts || {};
            if (_opts.isLogin) {
                _fn && _fn();
                return
            }
            _kissy_imp.use("tmall/mui/tbuser", function (_kissy, _tbuser) {
                _tbuser.onLogin(_fn, _opts)
            })
        }
        function E(_fn, _opts) {
            _kissy_imp.use("tmall/mui/tbuser", function (_kissy, _tbuser) {
                _tbuser.onLogout(_fn, _opts)
            })
        }
        function _add_to_favorite(_callback_fn, _opts) {
            _add_to_favorite_imp(function () {
                _opts = _opts || {};
                token = _opts.tbToke || _dom.val("#J_TbToken");
                if (token) {
                    _callback_fn && _callback_fn(token)
                } else {
                    _kissy_imp.use("tmall/mui/tbuser", function (_kissy, _tbuser) {
                        _tbuser.onTokenReady(_callback_fn, _opts)
                    })
                }
            }, _opts)
        }
        return _kissy_imp["tmall/mui/brandfollow"] = _kissy_imp["tmall/mui/brandfollow"] || { add: function (_brandid, _opts) {
            _opts = _opts || {};
            var _brandfollow = this;
            _add_to_favorite(function (_token) {
                var _data = !!_token ? { brandId: _brandid, _tb_token_: _token} : { brandId: _brandid };
                _ajax.jsonp(_opts.addServer || "http://brand.tmall.com/ajax/brandAddToFav.htm", _data, function (_rets) {
                    _rets = _rets || {};
                    if (_rets.is_success == "T") {
                        _opts.success && _opts.success()
                    } else {
                        if (_rets.is_success == "O" && _opts.reLogin !== false) {
                            _opts.reLogin = false;
                            _opts.isLogin = false;
                            E(function () {
                                _brandfollow.add(_brandid, _opts)
                            });
                            return
                        }
                        _opts.error && _opts.error((_rets.is_success == "E") ? { code: -1, message: "您已经关注过该品牌！"} : { code: -2, message: "关注失败，请稍后再试！" })
                    }
                })
            }, _opts)
        }, remove: function (_brandid, _opts) {
            _opts = _opts || {};
            _add_to_favorite(function (_token) {
                var _data = !!_token ? { brandId: _brandid, _tb_token_: _token} : { brandId: _brandid };
                _ajax.jsonp(_opts.removeServer || "http://brand.tmall.com/ajax/brandDelFromFav.htm", _data, function (_callback_info) {
                    _callback_info = _callback_info || {};
                    if (_callback_info.is_success == "T") {
                        _opts.success && _opts.success()
                    } else {
                        if (_callback_info.is_success == "O" && _opts.reLogin !== false) {
                            _opts.reLogin = false;
                            _opts.isLogin = false;
                            E(function () {
                                self.add(_brandid, _opts)
                            });
                            return
                        }
                        _opts.error && _opts.error((_callback_info.is_success == "E") ? { code: -1, message: "\u60a8\u6ca1\u6709\u5173\u6ce8\u8fc7\u8be5\u54c1\u724c\uff01"} : { code: -2, message: "\u53d6\u6d88\u5173\u6ce8\u5931\u8d25\uff0c\u8bf7\u7a0d\u540e\u518d\u8bd5\uff01" })
                    }
                })
            }, _opts)
        }
        }
    }, { requires: ["dom", "ajax"] })
