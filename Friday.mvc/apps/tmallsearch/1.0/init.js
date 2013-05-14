(function (_kissy_F, _window, _document) {
    var _dom = _kissy_F.DOM,
		_event = _kissy_F.Event,
		_dom_script_id_J_CoreJs = _kissy_F.get("#J_CoreJs"),
		_data_type = _dom.attr(_dom_script_id_J_CoreJs, "data-type") || "",
		_is_ie6 = _kissy_F.UA.ie == 6,
		B = "ontouchstart" in document;
    _kissy_F.log("start init ... | page-type :" + _data_type);
    Function.prototype.debounce = function (D, E) {
        var O = this,
			P;
        return function N() {
            var S = this,
				R = arguments;

            function Q() {
                if (!E) {
                    O.apply(S, R)
                }
                P = null
            }
            if (P) {
                clearTimeout(P)
            } else {
                if (E) {
                    O.apply(S, R)
                }
            }
            P = setTimeout(Q, D || 100)
        }
    };

    function G() {
        var D = "no-touch";
        if (B) {
            _dom.removeClass("body", D)
        } else {
            _dom.addClass("body", D)
        }
        G = function () { }
    }
    function J(D, P, E) {
        G();
        E = E || "hover";
        if (B || _is_ie6) {
            P = _is_ie6 ? "mouse" : (P || "click");

            function O(S) {
                if (this.disableHoverIn) {
                    return
                }
                _dom.addClass(this, E)
            }
            function N(S) {
                if (this.disableHoverOut) {
                    return
                }
                _dom.removeClass(this, E)
            }
            var R = null;
            switch (P) {
                case "mouse":
                    R = function () {
                        _event.on(this, "mouseenter", O);
                        _event.on(this, "mouseleave", N)
                    };
                    break;
                case "click":
                    var Q = this;
                    pool = Q._hoverPool || (Q._hoverPool = []);
                    R = function () {
                        var S = this;
                        _event.on(this, "mousedown touchstart", function (T) {
                            S._hoverCls = E;
                            pool[pool.length] = S;
                            O.call(S, T)
                        })
                    };
                    !this._bundDefHover4Doc && (_event.on(_document, "mousedown touchstart", function (X) {
                        var U = X.target;
                        for (var T = 0, S = pool.length; T < S; T++) {
                            var W = pool[T];
                            !(W == U || _dom.contains(W, U)) && (_dom.removeClass(W, W._hoverCls), pool.splice(T, 1), T--, S--)
                        }
                    }), this._bundDefHover4Doc = true);
                    break;
                default:
                    R = function () {
                        _event.on(this, "touchstart", O);
                        _event.on(this, "touchend", N)
                    }
            }
            _kissy_F.log("bind hover events for ie6 or pad!");
            _dom.query(D).each(function (S) {
                if (_is_ie6 && S.tagName == "A") {
                    return
                }
                R.call(S)
            })
        }
    }
    LIST.msg.on("ie6Hover", function (Q) {
        var P = Q.classname,
			R = Q.id,
			D = P || R,
			O = R ? "#" : ".",
			E = Q.hoverType;
        if (!(D && (B || _is_ie6))) {
            return
        }
        var N = function (T, S) {
            var U = ((S && Q.hoverCls) ? Q.hoverCls[S] : Q.hoverCls) || (T + "-hover");
            J(O + T, E, U)
        };
        if (_kissy_F.isString(D)) {
            N(D)
        } else {
            if (_kissy_F.isArray(D)) {
                _kissy_F.each(D, function (T, S) {
                    N(T, S)
                })
            }
        }
    });
    LIST.msg.on("expand", function (Q) {
        var P = Q.el || null,
			D = Q.classname || "",
			N = D + "-expand",
			R = Q.text || {
			    drop: "更多",
			    expand: "收起"
			}, E = Q.status || "drop",
			S = Q.debounce || {
			    threshold: 100,
			    execAsap: true
			}, O = Q.manual;
        if (!P) {
            return
        }
        P.expandSwitchFn = function () {
            var T = _dom.attr(this, "data-status") || "drop",
				X = R[T],
				U = T == "drop" ? "expand" : "drop",
				W = R[U],
				Y = _dom.parent(this, "." + D);
            this.className = this.className.replace(T, U);
            this.innerHTML = this.innerHTML.replace(X, W);
            this.innerHTML = this.innerHTML.replace(T, U);
            _dom.attr(this, "data-status", U);
            T == "drop" ? _dom.addClass(Y, N) : _dom.removeClass(Y, N)
        };
        !O && _event.on(P, "click", P.expandSwitchFn.debounce(S.threshold, S.execAsap));
        if (E !== (_dom.attr(P, "data-status") || "drop")) {
            P.expandSwitchFn()
        }
    });
    LIST.util.bindScrollAsync = function (E, P, N, O) {
        if (!(E && "function" === typeof P)) {
            return
        }
        E = _dom.query(E);
        if (!E.length) {
            return
        }
        var D = function (U) {
            var Z = _dom.viewportHeight(),
				Y = "number" === typeof N ? N : 0,
				T = E.length;
            if (!T) {
                _event.detach(_window, "scroll", D);
                return
            }
            for (var Q = 0; Q < T; Q++) {
                var X = _dom.scrollTop(),
					W = _dom.offset(E[Q]),
					S = W.top || 0,
					R = Z + Y + X;
                if (R >= S) {
                    _kissy_F.log("Send scroll async request...");
                    P.call(E[Q]);
                    E.splice(Q--, 1);
                    T = E.length
                }
            }
        }; !!O && D();
        _event.on(_window, "scroll", D)
    };
    LIST.util.exposureFn = function (E) {
        var D = new Image(),
			N = "_img_" + Math.random();
        _window[N] = D;
        D.onload = D.onerror = function () {
            _window[N] = null
        };
        D.src = E;
        D = null
    };
    if (_data_type == "spu") {
        _kissy_F.use(V + "/spu/spu")
    } else {
        if (_data_type == "list") {
            _kissy_F.use(V + "/list")
        } else {
            if (_data_type == "shop") {
                _kissy_F.use(V + "/shop")
            } else {
                if (_data_type == "shopItem") {
                    _kissy_F.use(V + "/shop-item")
                }
            }
        }
    }
    //2013-05-14 basilwang we don't use feedback now
    /*
    _kissy_F.ready(function (_kissy_N) {
    var _documentElement = _document.documentElement,
    _str_for_cookie = "scroll:" + _documentElement.scrollWidth + "*" + _documentElement.scrollHeight + "-";
    _str_for_cookie += "client:" + _documentElement.clientWidth + "*" + _documentElement.clientHeight + "-";
    _str_for_cookie += "offset:" + _documentElement.offsetWidth + "*" + _documentElement.offsetHeight + "-";
    _str_for_cookie += "screen:" + screen.width + "*" + screen.height;
    _kissy_N.Cookie.set("res", _str_for_cookie);
    _kissy_N.later(function () {
    var P = {
    "id:7": "tmallsearch"
    };
    if (P["id:" + _window.g_config.appId]) {
    _kissy_N.getScript("http://a.tbcdn.cn/apps/tmall/mui/backtop/js/backtop.js");
    (function _show_feed_wrapper() {
    var _view_url = "http://ur.taobao.com/survey/view.htm?id=187",
    _html_sinnpet = '<a href="' + _view_url + '" class="ui-feed" target="_blank"></a>',
    W, _dom_a = _dom.create(_html_sinnpet);
    _dom.append(_dom_a, "body");
    if (_is_ie6) {
    var _show_feed = function () {
    var _top = _dom.scrollTop(_window) + _dom.viewportHeight() - 320;
    _dom.css(_dom_a, "top", _top);
    _dom.show(_dom_a)
    }, _show_feed_buffer_fn = _kissy_N.buffer(_show_feed, 100);
    _show_feed();
    _event.on(_window, "scroll", function () {
    _dom.hide(_dom_a);
    _show_feed_buffer_fn()
    })
    }
    })()
    }
    }, 500)
    })
    */

})(KISSY, window, document);