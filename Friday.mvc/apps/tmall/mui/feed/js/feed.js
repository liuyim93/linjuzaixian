(function (J, F, I) {
    var G = F.Event,
		H = F.DOM,
		B = F.Anim,
		K = F.UA.ie == 6;

    function C() {
        this.config = {
            scriptId: "#J_UiFeedScript",
            bgImg: "http://a.tbcdn.cn/apps/tmall/mui/feed/img/feed.png"
        };
        this._init()
    }
    C.prototype = {
        _init: function () {
            this.feedUrl = this.getFeedUrl();
            if (this.feedUrl) {
                this.createEl();
                this.bindEvent()
            }
        },
        getFeedUrl: function () {
            var A = F.get(this.config.scriptId);
            if (!A) {
                return
            }
            return H.attr(A, "data-url")
        },
        createEl: function () {
            var A = '<a target="_blank" href="' + this.feedUrl + '" class="ui-feed">\u610f\u89c1\u53cd\u9988</a>',
				D = H.create(A);
            this.setCss();
            H.append(D, "body");
            this.feedEl = D
        },
        setCss: function () {
            var A = '.ui-feed{background: url("' + this.config.bgImg + '") no-repeat;bottom: 263px;display: block;height: 52px;outline-style: none;overflow: hidden;position: fixed;_position:absolute; right: 11px;text-indent: -999px;width: 58px;z-index: 110;opacity:0.5; filter:alpha(opacity=50); -moz-transition: opacity 0.3s ease-in,opacity 0.3s ease-out;  -webkit-transition: opacity 0.3s ease-in,opacity 0.3s ease-out;  -o-transition: opacity 0.3s ease-in,opacity 0.3s ease-out;  transition: opacity 0.3s ease-in,opacity 0.3s ease-out; }.ui-feed:hover{opacity:1; filter:alpha(opacity=100); ';
            H.addStyleSheet(A)
        },
        ieScroll: function (E) {
            var A = parseInt(H.scrollTop(I), 10),
				D = H.viewportHeight(I),
				L = (A + D) - 315;
            H.css(E, "top", L)
        },
        bindEvent: function () {
            var A = this,
				L = A.feedEl,
				M, D = 200,
				E = L.style.display == "none";
            if (L && K) {
                A.ieScroll(L);
                G.on(J, "scroll", function () {
                    clearTimeout(M);
                    if (!E) {
                        E = true;
                        H.hide(L)
                    }
                    M = setTimeout(function () {
                        A.ieScroll(L);
                        E = false;
                        H.show(L)
                    }, D)
                })
            }
        }
    };
    F.ready(function () {
        var A = new C()
    })
})(window, KISSY, document);