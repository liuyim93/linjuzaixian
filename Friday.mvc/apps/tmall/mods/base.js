(function (A) {
    if (A.BaseRender) {
        return
    }
    function B(C) {
        this.el = C.el;
        this.data = C.data;
        this.config = C;
        this._super = B;
        this.initialize()
    }
    B.prototype = {
        setData: function (C) {
            this.data = C;
            if (this.config) {
                this.config.data = C
            }
        },
        initialize: function () { },
        exec: function () { },
        hasUsableData: function () {
            return false
        },
        setHtml: function (E) {
            var D = KISSY;
            var G = D.DOM;
            var C = this.config,
				F = this.el;
            G.removeClass(F, "ald-loading");
            G.addClass(F, "ald-" + C.appId);
            F.innerHTML = E
        },
        stat: function (C) {
            if (typeof C === "string") {
                new Image().src = C
            }
        },
        sendExposure: function (C) {
            if (!C) {
                return
            }
            if (C.indexOf("1.gif") == -1) {
                C = "http://ac.atpanel.com/1.gif?" + C
            }
            this.stat(C.replace(/([?&]cache=)[\d\[\]]+\b/, "$1" + +new Date()))
        }
    };
    A.BaseRender = B
})(ALD.util); 