/*pub-1|2013-04-11 10:17:01*/
KISSY.add("cart/topsearch", function (D, E, F, A) {
    var C = "tsearch-tabs-active";
    var B = [
 		["item", "\u8f93\u5165\u60a8\u60f3\u8981\u7684\u5b9d\u8d1d"],
 		["shop", "\u8f93\u5165\u60a8\u60f3\u8981\u7684\u5e97\u94fa\u540d\u6216\u638c\u67dc\u540d"]
 	];
    var G = {
        init: function () {
            var H = D.one("#J_TSearchTabs");
            var I = D.one("#J_TSearchForm");
            if (!H || !I) {
                return
            }
            D.mix(this, {
                containerEl: D.one("#J_TSearch"),
                formEl: I,
                tabEls: H.all("li"),
                inputEl: D.one("#q"),
                labelEl: I.one("label")
            });
            this._bindEvents();
            D.later(this._resetForm, 0, false, this)
        },
        _bindEvents: function () {
            A.on(this.tabEls, "click", this._toggleTabHandler, this);
            A.on(this.formEl, "submit", this._submitHandler, this);
            A.on(this.inputEl, "focus", this._inputFocusHandler, this);
            A.on(this.inputEl, "blur", this._inputBlurHandler, this)
        },
        _toggleTabHandler: function (I) {
            I.preventDefault();
            var J = D.one(F.parent(I.target, "li"));
            if (!J.hasClass(C)) {
                this.tabEls.removeClass(C);
                J.addClass(C);
                var H = D.indexOf(J.getDOMNode(), this.tabEls);
                if (H !== -1) {
                    this.formEl.getDOMNode()["search_type"].value = B[H][0];
                    this.labelEl.html(B[H][1])
                }
            }
            this._focusInput()
        },
        _submitHandler: function (J) {
            J.halt();
            var I = this.formEl.getDOMNode();
            var L = "http://www.atpanel.com/tmalljy.2.6?type=item";
            switch (I.search_type.value) {
                case "item":
                    if (q.value === "") {
                        form.action = "http://list.taobao.com/browse/cat-0.htm"
                    }
                    break;
                case "shop":
                    L = "http://www.atpanel.com/tmalljy.2.6?type=shop";
                    I.action = "http://shopsearch.taobao.com/browse/shop_search.htm";
                    break
            }
            var H = new Image();
            var M = D.later(function () {
                I.submit()
            }, 250);
            var K = function () {
                M.cancel();
                I.submit()
            };
            H.onload = K;
            if (H.complete) {
                K()
            }
            H.src = L
        },
        _inputFocusHandler: function () {
            this.labelEl.addClass("hidden")
        },
        _inputBlurHandler: function () {
            if (D.trim(this.inputEl.val()) === "") {
                this.labelEl.removeClass("hidden")
            }
        },
        _focusInput: function () {
            this.inputEl.getDOMNode().focus();
            D.UA.ie && this.inputEl.val(this.inputEl.val())
        },
        _resetForm: function () {
            var H = this.formEl.getDOMNode();
            H.search_type.value = "item"
        }
    };
    return G
}, {
    requires: ["ua", "dom", "event"]
}); 