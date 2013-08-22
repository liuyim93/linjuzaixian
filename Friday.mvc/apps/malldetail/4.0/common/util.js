KISSY.add("malldetail/common/util", function (_kissy, _dom, _event) {
    var D = {};
    return { createLoader: function (_loader_fn) {
        var _t_object, _is_fn_load, _filter_fn_array = [], _t_filter_fn;
        return function (_filter_fn, _state) {
            if (_state !== 0 && !_state) {
                _state = 1
            }
            if ((_state & 1) && !_is_fn_load) {
                _is_fn_load = true;
                _loader_fn(function (object) {
                    _t_object = object;
                    while (_t_filter_fn = _filter_fn_array.shift()) {
                        _t_filter_fn && _t_filter_fn.apply(null, [_t_object])
                    }
                })
            }
            if (_t_object) {
                _filter_fn && _filter_fn.apply(null, [_t_object]);
                return _t_object
            }
            if (!(_state & 2)) {
                _filter_fn && _filter_fn_array.push(_filter_fn)
            }
            return _t_object
        }
    }, createAsyn: function (_asyn_loader_fn, _time) {
        var _is_fn_load, _t_defaultModelObject, _is_already_load_defaultModelObject, _t_child_filter_fn, _child_filter_fn_array = [];
        _asyn_loader_fn(function (_defaultModelObject) {
            _t_defaultModelObject = _defaultModelObject;
            while (_t_child_filter_fn = _child_filter_fn_array.shift()) {
                _t_child_filter_fn.handle.apply(null, [_t_defaultModelObject])
            }
        }, 0);
        return function (_asyn_child_filter_fn, _state) {
            if (_state !== 0 && !_state) {
                _state = 1
            }
            if ((_state & 1) && !_is_fn_load) {
                setTimeout(function () {
                    if (_t_defaultModelObject !== undefined) {
                        return
                    }
                    _is_already_load_defaultModelObject = true;
                    for (var _index = 0; _index < _child_filter_fn_array.length; _index++) {
                        _child_filter_fn_array[_index].handle.apply(null, [_t_defaultModelObject]);
                        if (!(_child_filter_fn_array[_index].type & 8)) {
                            _child_filter_fn_array.splice(_index, 1);
                            _index--
                        }
                    }
                }, _time || 200);
                _asyn_loader_fn(null, _state)
            }
            if (!_asyn_child_filter_fn) {
                return
            }
            if (_t_defaultModelObject !== undefined || !(_state & 4)) {
                _asyn_loader_fn(_asyn_child_filter_fn, _state);
                return
            }
            if (_is_already_load_defaultModelObject) {
                _asyn_child_filter_fn();
                if (_state & 8) {
                    _asyn_loader_fn(_asyn_child_filter_fn, _state)
                }
            } else {
                _child_filter_fn_array.push({ handle: _asyn_child_filter_fn, type: _state })
            }
        }
    }, loadAssets: function (_url, L, F) {
        var J;
        if (F) {
            if ((J = F()) !== undefined) {
                L && L(J);
                return
            }
        }
        _url = _url.replace(/^[\/\\]+/g, "").replace(/\?\?/g, "?");
        var E = _url.split("?", 2), K = E[0], I = E[1] || "", H = D[K] || (D[K] = { path: K, status: 0, callbacks: [], timestamp: [] });
        if (F) {
            H.getter = F
        }
        if (H.status == 2) {
            L && L(F ? F() : undefined)
        }
        L && H.callbacks.push(L);
        I && H.timestamp.push(I);
        setTimeout(function () {
            var S = {};
            for (var W in D) {
                var Y = D[W];
                if (Y.status) {
                    continue
                }
                Y.status = 1;
                var a = /\.([^\.$]+)$/.test(W), U = (a && a[1]) || "js";
                var X = S[U] || (S[U] = { items: [] });
                X.items.push(Y)
            }
            for (var W in S) {
                //var X = S[W], T = X.items, M = window.g_config.assetsHost || "http://l.tbcdn.cn", Z = [], R = [], Q = undefined, P;
                var X = S[W], T = X.items, M = window.g_config.assetsHost || "http://localhost:7525/", Z = [], R = [], Q = undefined, P;
                M += "/";
                for (var O = 0; O < T.length; O++) {
                    var N = T[O].path;
                    if (Q === undefined) {
                        Q = N;
                        P = Q.length
                    } else {
                        while (Q && (N.substring(0, P) != Q)) {
                            var V = Q.lastIndexOf("/", Q.length - 2);
                            if (V < 0) {
                                Q = "";
                                break
                            }
                            Q = Q.substring(0, V + 1);
                            P = Q.length
                        }
                    }
                    Z.push(T[O].path);
                    R = R.concat(T[O].timestamp)
                }
                if (Q && Z.length > 1) {
                    M += Q + "??";
                    for (var O = 0; O < Z.length; O++) {
                        Z[O] = Z[O].substring(P)
                    }
                } else {
                    M += "??"
                }
                M += Z.join(",");
                R.sort();
                for (var O = R.length - 1; O >= 0; O--) {
                    if (R[O] == R[O - 1]) {
                        R.splice(O, 1)
                    }
                }
                if (R[0]) {
                    M += "?" + R.join("&")
                }
                _kissy.getScript(M, function () {
                    for (var c = 0; c < T.length; c++) {
                        T[c].status = 2;
                        var b, d = T[c].callbacks;
                        while (b = d.shift()) {
                            b(T[c].getter ? T[c].getter() : undefined)
                        }
                    }
                })
            }
        }, 16)
    }, initHover: function () {
        var E = arguments.callee._hover;
        if (E === undefined) {
            if (E = arguments.callee._hover = !("ontouchstart" in document)) {
                _dom.addClass("body", "enableHover")
            } else {
                _dom.removeClass("body", "enableHover")
            }
        }
        return E
    }, fixHover: function (H, G, F) {
        var E = this.initHover(), I = _kissy.UA.ie == 6;
        F = F || "hover";
        if (!E || I) {
            G = I ? "mouse" : (G || "click");
            _kissy.each(_dom.query(H), function (L) {
                if (!E || (I && L.nodeName != "A")) {
                    function K(M) {
                        _dom.addClass(L, F)
                    }
                    function J(M) {
                        if (G != "touch" && G != "mouse" && (M.target == L || _dom.contains(L, M.target))) {
                            return
                        }
                        _dom.removeClass(L, F)
                    }
                    if (G == "touch") {
                        _event.on(L, "touchstart", K);
                        _event.on(L, "touchend", J);
                        _dom.style(L, { WebkitTouchCallout: "none" })
                    } else {
                        if (G == "mouse") {
                            _event.on(L, "mouseenter", K);
                            _event.on(L, "mouseleave", J)
                        } else {
                            _event.on(L, "mousedown touchstart", K);
                            _event.on(document, "mousedown touchstart", J)
                        }
                    }
                }
            })
        }
    } 
    }
}, { requires: ["dom", "event"] });