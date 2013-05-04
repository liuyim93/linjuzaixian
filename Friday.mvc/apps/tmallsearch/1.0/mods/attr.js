KISSY.add(V + "/mods/attr", function (S, T) {
    var D = S.DOM,
		E = S.Event,
		J = S.JSON,
		doc = document,
		win = window,
		isIE6 = (S.UA.ie === 6);
    var FORM = "#J_FilterNavForm",
		BRAND = ".j_Brand",
		CATE = ".j_Cate",
		PROP = ".j_Prop",
		ATTR = ".attr",
		MORE_BTN = ".j_More",
		MORE_ATTRS_BTN = ".j_MoreAttrs",
		MORE_ATTRS_CONT = ".j_MoreAttrsCont",
		MULTIPLE_BTN = ".j_Multiple",
		SUBMIT_BTN = ".j_SubmitBtn",
		CANCLE_BTN = ".j_CancelBtn",
		BRAND_SEARCH = ".j_BrandSearch",
		DISABLE_BTN_CLS = "ui-btn-disable",
		VAL_SELECTED_CLS = "av-selected",
		MINI_ATTR_CLS = "miniAttr",
		MINI_ATTRS_CLS = "miniAttrs",
		UL_EXPAND_CLS = "av-expand",
		UL_COLLAPSE_CLS = "av-collapse",
		UL_SCROLL_CLS = "av-scroll",
		FOR_MULTIPLE_CLS = "forMultiple",
		FOR_MULTIPLE_BTN_CLS = "forMultipleBtn",
		MULTIPLE_ROW_CLS = "multipleRow",
		MORE_ATTRS_DROP_CLS = "attrExtra-more-drop",
		SHOW_LOGO_CLS = "showLogo",
		ATTR_TRIGGER = "#J_attrTrigger";
    var form = D.get(FORM),
		brand = D.get(BRAND, form),
		cates = D.query(CATE),
		props = D.query(PROP, form),
		moreAttrsBtn = D.get(MORE_ATTRS_BTN, form),
		moreAttrsCont = D.get(MORE_ATTRS_CONT, form),
		searchUrl = D.attr(D.get(MORE_BTN, brand), "data-url"),
		logoUrl = D.attr(D.get("." + SHOW_LOGO_CLS, brand), "data-url");
    var util = {
        extend: function (obj, base, methodName, func, isFore) {
            if (methodName in base) {
                if (isFore) {
                    obj[methodName] = function () {
                        func.apply(this, arguments);
                        base[methodName].apply(this, arguments)
                    }
                } else {
                    obj[methodName] = function () {
                        base[methodName].apply(this, arguments);
                        func.apply(this, arguments)
                    }
                }
            }
        },
        bindPlaceholder: function (selector) {
            var inputs = null,
				placeholderColor = "#BFBFBF";
            if (S.isString(selector)) {
                inputs = D.query(selector)
            } else {
                if (S.isObject(selector)) {
                    inputs = [selector]
                }
            }
            var typeStr = ["text", "search", "url", "tel", "email", "password"].join(",");
            S.each(inputs, function (input) {
                if (typeStr.indexOf(input.type) != -1) {
                    if (D.hasAttr(input, "placeholder")) {
                        if (S.trim(D.val(input)) == "" || S.trim(D.val(input)) == D.attr(input, "placeholder")) {
                            D.css(input, "color", placeholderColor);
                            D.val(input, D.attr(input, "placeholder"))
                        }
                        E.on(input, "focus", function (e) {
                            D.css(input, "color", "");
                            if (S.trim(D.val(input)) == D.attr(input, "placeholder")) {
                                D.val(input, " ")
                            }
                        });
                        E.on(input, "blur", function (e) {
                            if (S.trim(D.val(input)) == "") {
                                D.css(input, "color", placeholderColor);
                                D.val(input, D.attr(input, "placeholder"))
                            }
                        })
                    }
                }
            })
        },
        getCustomKey: function (el, key) {
            if (!el || el.tagName != "A") {
                return
            }
            if (el._map && key in el._map) {
                return el._map[key]
            }
            var re = new RegExp("(\\?|\\&)" + key + "=([^&#]*)(\\&|\\#|$)", "g"),
				href = el.href || el.link || "",
				value, result;
            value = (result = re.exec(href)) ? result[2] : D.attr(el, "data-" + key) || "";
            el._map = el._map || {};
            el._map[key] = value;
            return el._map[key]
        },
        fixIE6Hover: function (selector, callback) {
            if (isIE6) {
                if (!this._initedHoverCallback) {
                    S.mix(this, S.EventTarget);
                    this._selectorRegs = {
                        cls: /^[.][_a-z]+[-_0-9a-z]*$/i,
                        cls_tag: /^([.][_a-z]+[-_0-9a-z]*)( )+([a-z]+)$/i,
                        id_tag: /^[#][_a-z]+[-_0-9a-z]*( )+[a-z]+$/i
                    };
                    this._hoverEventFns = {
                        add: function (selector, callback) {
                            var hoverCls = selector.replace(/[.#]/g, "") + "-hover";
                            E.on(selector, "mouseenter", function (e) {
                                D.addClass(this, hoverCls);
                                callback && callback.call(this, e)
                            });
                            E.on(selector, "mouseleave", function (e) {
                                D.removeClass(this, hoverCls);
                                callback && callback.call(this, e)
                            })
                        },
                        delegate: function (selector, filter, callback) {
                            var hoverCls = filter.replace(/[.#]/g, "") + "-hover";
                            E.delegate(selector, "mouseenter", filter, function (e) {
                                D.addClass(e.currentTarget, hoverCls);
                                callback && callback.call(e.currentTarget, e)
                            });
                            E.delegate(selector, "mouseleave", filter, function (e) {
                                D.removeClass(e.currentTarget, hoverCls);
                                callback && callback.call(e.currentTarget, e)
                            })
                        }
                    };
                    var self = this,
						bindEvent = function (selector, callback) {
						    var regs = self._selectorRegs,
								fns = self._hoverEventFns;
						    if (regs.cls.test(selector)) {
						        fns.add(selector, callback);
						        S.log('mod:Attr::fixIE6Hover succeeded for "' + selector + '"!')
						    } else {
						        if (regs.cls_tag.test(selector)) {
						            var res = selector.match(regs.cls_tag);
						            fns.delegate(res[1], res[3], callback);
						            S.log('mod:Attr::fixIE6Hover succeeded for "' + selector + '"!')
						        } else {
						            if (regs.id_tag.test(selector)) {
						                var res = selector.match(regs.id_tag);
						                fns.delegate(res[1], res[3], callback);
						                S.log('mod:Attr::fixIE6Hover succeeded for "' + selector + '"!')
						            } else {
						                S.log('mod:Attr::fixIE6Hover failed for "' + selector + '"!', "error")
						            }
						        }
						    }
						};
                    this.on("ie6Hover", function (e) {
                        var selector = e.selector,
							callback = e.callback;
                        if (!selector) {
                            return
                        } else {
                            if (S.isString(selector)) {
                                bindEvent(selector, callback)
                            } else {
                                if (S.isArray(selector)) {
                                    S.each(selector, function (item) {
                                        bindEvent(item, callback)
                                    })
                                }
                            }
                        }
                    });
                    this._initedHoverCallback = true
                }
                this.fire("ie6Hover", {
                    selector: selector,
                    callback: (callback && S.isFunction(callback)) ? callback : null
                })
            }
        },
        reviseImg: function (src, prefix, suffix, clean) {
            if (!src) {
                return src
            } else {
                if (src.indexOf("taobaocdn") === -1) {
                    src = src.replace(/([^\/]*\/)*i\d\//, "");
                    var codeSum = 0;
                    for (var i = 0, len = src.length; i < len; i++) {
                        codeSum += src.charCodeAt(i)
                    }
                    codeSum %= 4;
                    codeSum += 1;
                    if ("number" === typeof prefix) {
                        clean = suffix;
                        suffix = prefix;
                        prefix = null
                    } else {
                        if ("string" === typeof prefix) {
                            switch (prefix) {
                                case "tps":
                                case "imgextra":
                                case "bao/uploaded":
                                case "poster_pic":
                                    break;
                                default:
                                    clean = suffix;
                                    suffix = prefix;
                                    prefix = null
                            }
                        } else {
                            if ("boolean" === typeof prefix) {
                                clean = prefix;
                                prefix = null
                            }
                        }
                    }
                    src = "http://img0" + codeSum + ".taobaocdn.com/" + (prefix || "tps") + "/i" + codeSum + "/" + src
                }
                if ("number" === typeof suffix) {
                    suffix = suffix + "x" + suffix
                }
                if (suffix) {
                    src = src.replace(/(\.\w+)_\w+\1$/, "$1");
                    var matches = suffix.match(/\.\w+$/) || src.match(/\.\w+$/);
                    src = src + "_" + suffix.replace(/_|\.\w*/g, "") + (matches.length ? matches[0] : "jpg")
                }
                return clean ? src.replace(/i\d\/([^\/]+\/)*/gi, "") : src
            }
        }
    };
    var moreBtn = {
        init: function (attr) {
            var minDiffRow = attr.minDiffRow || 1,
				as = attr.valueAnchors,
				offsetHeight = as.length ? Math.max(as[0].offsetHeight, parseFloat(D.css(as[0], "lineHeight"))) : 25;
            if (attr.moreBtn) {
                !S.trim(new RegExp("((.|\n)*)<i", "gi").exec(attr.moreBtn.innerHTML)[1]) && (attr.moreBtn.innerHTML = (D.hasClass(attr.ul, UL_EXPAND_CLS) ? "\u6536\u8d77" : "\u66f4\u591a") + attr.moreBtn.innerHTML);
                var hasToggleState = D.hasClass(attr.ul, UL_COLLAPSE_CLS) || D.hasClass(attr.ul, UL_EXPAND_CLS),
					unopenMultiple = !attr.openMultiple,
					isVisible = D.style(attr.moreBtn, "visibility") == "visible",
					moreThanMinRow = (as.length ? (as[as.length - 1].offsetTop - as[0].offsetTop) : 0) >= minDiffRow * offsetHeight,
					hasMiniAttr = D.hasClass(attr.parentNode, MINI_ATTR_CLS),
					forMiniAttr = hasMiniAttr && attr.multipleBtn;
                if (hasToggleState && unopenMultiple && (isVisible || moreThanMinRow || forMiniAttr)) {
                    if (D.hasClass(attr.ul, UL_EXPAND_CLS)) {
                        moreBtn.open(attr)
                    }
                    moreBtn.show(attr);
                    attr.moreBtn.shouldShow = true;
                    hasMiniAttr && D.addClass(attr.ul, MULTIPLE_ROW_CLS)
                } else {
                    moreBtn.hide(attr);
                    attr.moreBtn.shouldShow = false
                }
            } else {
                D.style(attr.ul, "height", "auto")
            }
        },
        close: function (attr) {
            if (attr.moreBtn) {
                D.addClass(attr.moreBtn, "ui-more-drop-l");
                D.removeClass(attr.moreBtn, "ui-more-expand-l");
                var html = D.html(attr.moreBtn);
                html = html.replace("\u6536\u8d77", "\u66f4\u591a");
                html = html.replace("expand", "drop");
                D.html(attr.moreBtn, html)
            }
        },
        open: function (attr) {
            if (attr.moreBtn) {
                D.addClass(attr.moreBtn, "ui-more-expand-l");
                D.removeClass(attr.moreBtn, "ui-more-drop-l");
                var html = D.html(attr.moreBtn);
                html = html.replace("\u66f4\u591a", "\u6536\u8d77");
                html = html.replace("drop", "expand");
                D.html(attr.moreBtn, html)
            }
        },
        show: function (attr) {
            attr.moreBtn && D.show(attr.moreBtn)
        },
        hide: function (attr) {
            attr.moreBtn && D.hide(attr.moreBtn)
        }
    };
    var multipleBtn = {
        init: function (attr) {
            D.hasClass(attr.parentNode, MINI_ATTR_CLS) && attr.multipleBtn && D.addClass(attr.ul, FOR_MULTIPLE_BTN_CLS)
        },
        show: function (attr) {
            if (attr.multipleBtn) {
                D.show(attr.multipleBtn);
                attr.multipleBtn.isHidden = false
            }
        },
        hide: function (attr) {
            if (attr.multipleBtn) {
                D.hide(attr.multipleBtn);
                attr.multipleBtn.isHidden = true
            }
        }
    };
    var formBtns = {
        show: function (attr) {
            attr.submitBtn && D.show(attr.submitBtn.parentNode)
        },
        hide: function (attr) {
            attr.submitBtn && D.hide(attr.submitBtn.parentNode)
        }
    };
    var list = {
        collapse: function (attr) {
            D.replaceClass(attr.ul, UL_EXPAND_CLS, UL_COLLAPSE_CLS);
            D.scrollTop(attr.ul, 0)
        },
        expand: function (attr) {
            D.replaceClass(attr.ul, UL_COLLAPSE_CLS, UL_EXPAND_CLS)
        },
        openMultiple: function (attr) {
            this.expand(attr);
            multipleBtn.hide(attr);
            moreBtn.hide(attr);
            formBtns.show(attr);
            D.addClass(attr, FOR_MULTIPLE_CLS);
            attr.openMultiple = true
        },
        close: function (attr) {
            this.collapse(attr);
            this._clearValSelectedCls(attr);
            this._disableSubmitBtn(attr);
            formBtns.hide(attr);
            D.removeClass(attr, FOR_MULTIPLE_CLS);
            attr.openMultiple = false;
            multipleBtn.show(attr);
            if (attr.moreBtn && attr.moreBtn.shouldShow) {
                moreBtn.close(attr);
                moreBtn.show(attr)
            }
        },
        closeAll: function (attrs) {
            S.each(attrs, function (attr) {
                this.close(attr)
            }, this)
        },
        _clearValSelectedCls: function (attr) {
            S.each(attr.valueAnchors, function (val) {
                D.removeClass(val.parentNode, VAL_SELECTED_CLS)
            })
        },
        _disableSubmitBtn: function (attr) {
            if (attr.submitBtn && !D.hasClass(attr.submitBtn, DISABLE_BTN_CLS)) {
                D.addClass(attr.submitBtn, DISABLE_BTN_CLS);
                attr.valueAnchors.selectedCount = 0
            }
        }
    };
    var ajax = S.merge(S.EventTarget, {
        initLogos: function (handler, attr) {
            var self = this,
				ids = [],
				reg = /(\?|&)brand=(\d*)\b/i,
				timestamp = isIE6 ? +new Date : 0;
            S.each(attr.valueAnchors, function (val) {
                var res = val.search.match(reg);
                ids[ids.length] = val._brandId = D.attr(val, "data-id") || (res && res.length == 3) ? res[2] : ""
            });
            logoUrl && S.io.get(logoUrl, (logoUrl.indexOf("brand_ids=") !== -1) ? {
                t: timestamp
            } : {
                brand_ids: ids.join(","),
                t: timestamp
            }, function (data) {
                S.each(attr.valueAnchors, function (val) {
                    var logo = util.reviseImg(data[val._brandId]);
                    logo && D.prepend(D.create('<img src="' + logo + '" alt="' + (val.text || val.innerText) + '" />'), val)
                })
            }, "json")
        },
        expandBrand: function (handler, attr) {
            D.show(attr.brandSearch);
            if (attr.ajaxData) {
                this.replaceUlHtml(attr, attr.ajaxData);
                handler.bindEventForValue(attr)
            } else {
                !attr.ulCopy && (attr.ulCopy = D.clone(attr.ul, true, true, true));
                this.searchAndRender(handler, attr)
            }
        },
        collapseBrand: function (handler, attr) {
            var keywordInput = D.get("input", brand.brandSearch);
            D.val(keywordInput, "");
            E.fire(keywordInput, "blur");
            D.hide(attr.brandSearch);
            this.replaceUlHtml(attr, "");
            D.prepend(D.children(D.clone(attr.ulCopy, true, true, true)), attr.ul)
        },
        searchAndRender: function (handler, attr, key, callback) {
            var self = this;
            D.style(attr.ul, "visibility", "hidden");
            if (!self._initedSearchCallBack) {
                self.on("render", function (e) {
                    var result = e.result,
						key = e.key,
						attr = e.attr;
                    self.replaceUlHtml(attr, result);
                    this.bindEventForValue(attr);
                    D.style(attr.ul, "visibility", "visible");
                    !S.trim(key) && (attr.ajaxData = result)
                }, handler);
                self._initedSearchCallBack = true
            }
            self._search(attr, searchUrl, key, callback)
        },
        _search: function (attr, dataUrl, key, callback) {
            var self = this;
            dataUrl && S.io.get(dataUrl, S.trim(key) ? {
                brandkey: encodeURIComponent(S.trim(key)),
                t: isIE6 ? +new Date : 0
            } : {
                t: isIE6 ? +new Date : 0
            }, function (data) {
                callback && callback();
                self.fire("render", {
                    result: self.render(data),
                    key: key,
                    attr: attr
                })
            })
        },
        _searchTip: "\u62b1\u6b49\uff0c\u6ca1\u6709\u627e\u5230\u76f8\u5173\u54c1\u724c",
        render: function (data) {
            var tpl = '{{#each data as val idx}}<li><a atpanel="{{val.atpanel}}" href="{{val.href}}" title="{{val.title}}">{{#if val.img !==undefined && val.img !== ""}}<img src="http://img01.taobaocdn.com/bao/uploaded/{{val.img}}"/>{{/if}}{{val.title}}</a></li>{{/each}}';
            data = eval(data);
            var html = (html = T(tpl).render({
                data: data
            })) ? html.replace(/title=(["'])[^"']*\1/g, function ($) {
                return $.replace(/<\/?strong>/g, "")
            }) : "";
            if (data.length == 0) {
                html = this._searchTip
            }
            return html
        },
        replaceUlHtml: function (attr, str) {
            this.detachEventsForValue(attr);
            D.html(attr.ul, str);
            this.correctStyle(attr)
        },
        appendUlHtml: function (attr, str) {
            this.detachEventsForValue(attr);
            D.html(attr.ul, D.html(D.clone(attr.ulCopy, true, true, true)) + str);
            this.correctStyle(attr)
        },
        detachEventsForValue: function (attr) {
            S.each(attr.valueAnchors, function (val) {
                E.detach(val, "click")
            })
        },
        correctStyle: function (attr) {
            D.removeClass(attr.ul, UL_SCROLL_CLS);
            if (isIE6 && typeof attr.ul.initHeight !== "undefined") {
                D.style(attr.ul, "height", attr.ul.initHeight)
            }
            attr.valueAnchors = D.query("a", attr.ul);
            if (attr.valueAnchors.length == 0) {
                return
            }
            var cell = attr.valueAnchors[0].parentNode,
				celWidth = D.outerWidth(cell, true),
				column = Math.floor(attr.ul.offsetWidth / celWidth),
				row = attr.valueAnchors.length / column;
            if (row > 5) {
                if (isIE6) {
                    attr.ul.initHeight = D.style(attr.ul, "height");
                    D.style(attr.ul, "height", "")
                }
                D.addClass(attr.ul, UL_SCROLL_CLS)
            }
        }
    });
    var Base = {
        init: function (extraFn) {
            this.scope && S.each(this.scope, function (attr) {
                attr.ul = D.get("ul", attr);
                attr.valueAnchors = D.query("a", attr.ul);
                attr.multipleBtn = D.get(MULTIPLE_BTN, attr);
                attr.moreBtn = D.get(MORE_BTN, attr);
                attr.submitBtn = D.get(SUBMIT_BTN, attr);
                attr.cancelBtn = D.get(CANCLE_BTN, attr);
                moreBtn.init(attr);
                multipleBtn.init(attr);
                this._bindEvents(attr);
                extraFn && S.isFunction(extraFn) && extraFn.call(this, attr)
            }, this)
        },
        _bindEvents: function (attr) {
            this.bindEventForMultipleBtn(attr);
            this.bindEventForMoreBtn(attr);
            this.bindEventForValue(attr);
            this.bindEventForCancelBtn(attr);
            this.bindEventForSubmitBtn(attr)
        },
        bindEventForMultipleBtn: function (attr) {
            attr.multipleBtn && E.on(attr.multipleBtn, "click", function (e) {
                list.closeAll(this.scope);
                list.openMultiple(attr)
            }, this)
        },
        bindEventForMoreBtn: function (attr) {
            attr.moreBtn && E.on(attr.moreBtn, "click", function (e) {
                if (D.hasClass(attr.ul, UL_COLLAPSE_CLS)) {
                    list.expand(attr);
                    moreBtn.open(attr)
                } else {
                    if (D.hasClass(attr.ul, UL_EXPAND_CLS)) {
                        list.collapse(attr);
                        moreBtn.close(attr)
                    } else { }
                }
            })
        },
        bindEventForValue: function (attr) {
            attr.valueAnchors.selectedCount = 0;
            attr.submitBtn && D.addClass(attr.submitBtn, DISABLE_BTN_CLS);
            S.each(attr.valueAnchors, function (val) {
                E.on(val, "click", function () {
                    if (attr.multipleBtn && attr.multipleBtn.isHidden && D.hasClass(attr.ul, UL_EXPAND_CLS)) {
                        if (D.html(val).indexOf("<i></i>") == -1) {
                            D.html(val, D.html(val) + "<i></i>")
                        }
                        if (!D.hasClass(val.parentNode, VAL_SELECTED_CLS)) {
                            D.addClass(val.parentNode, VAL_SELECTED_CLS);
                            attr.valueAnchors.selectedCount++
                        } else {
                            D.removeClass(val.parentNode, VAL_SELECTED_CLS);
                            attr.valueAnchors.selectedCount--
                        }
                        if (attr.submitBtn) {
                            if (attr.valueAnchors.selectedCount > 0) {
                                D.removeClass(attr.submitBtn, DISABLE_BTN_CLS)
                            } else {
                                if (!D.hasClass(attr.submitBtn, DISABLE_BTN_CLS)) {
                                    D.addClass(attr.submitBtn, DISABLE_BTN_CLS)
                                }
                            }
                        }
                        return false
                    }
                })
            })
        },
        submit: function (attr) { },
        bindEventForSubmitBtn: function (attr) {
            attr.submitBtn && E.on(attr.submitBtn, "click", function (e) {
                if (!D.hasClass(attr.submitBtn, DISABLE_BTN_CLS)) {
                    this.submit(attr)
                }
                return false
            }, this)
        },
        bindEventForCancelBtn: function (attr) {
            attr.cancelBtn && E.on(attr.cancelBtn, "click", function (e) {
                list.close(attr)
            })
        }
    };

    function Handler(scope) {
        if (!scope) {
            return
        } !S.isArray(scope) && (scope = [scope]);
        this.scope = scope
    }
    S.augment(Handler, Base);
    var bindEventForMoreAttrsBtn = function () {
        E.on(moreAttrsBtn, "click", function (e) {
            var attrs = [];
            if (moreAttrsCont.style.display == "none") {
                D.addClass(moreAttrsBtn, MORE_ATTRS_DROP_CLS);
                D.html(moreAttrsBtn, D.html(moreAttrsBtn).replace("\u66f4\u591a\u9009\u9879", "\u7cbe\u7b80\u9009\u9879"));
                D.show(moreAttrsCont);
                attrs = attrs.concat(D.query(ATTR, moreAttrsCont));
                var miniAttrses = D.query("." + MINI_ATTRS_CLS);
                S.each(miniAttrses, function (miniAttrs) {
                    D.replaceClass(miniAttrs, MINI_ATTRS_CLS, "_" + MINI_ATTRS_CLS);
                    S.each(D.query("." + MINI_ATTR_CLS, miniAttrs), function (miniAttr) {
                        D.replaceClass(miniAttr, MINI_ATTR_CLS, "_" + MINI_ATTR_CLS);
                        var attr = D.get(ATTR, miniAttr);
                        attrs[attrs.length] = attr
                    })
                })
            } else {
                D.removeClass(moreAttrsBtn, MORE_ATTRS_DROP_CLS);
                D.html(moreAttrsBtn, D.html(moreAttrsBtn).replace("\u7cbe\u7b80\u9009\u9879", "\u66f4\u591a\u9009\u9879"));
                D.hide(moreAttrsCont);
                var miniAttrses = D.query("._" + MINI_ATTRS_CLS);
                S.each(miniAttrses, function (miniAttrs) {
                    D.replaceClass(miniAttrs, "_" + MINI_ATTRS_CLS, MINI_ATTRS_CLS);
                    S.each(D.query("._" + MINI_ATTR_CLS, miniAttrs), function (miniAttr) {
                        D.replaceClass(miniAttr, "_" + MINI_ATTR_CLS, MINI_ATTR_CLS);
                        attrs[attrs.length] = D.get(ATTR, miniAttr)
                    })
                });
                list.closeAll(attrs)
            }
            S.each(attrs, function (attr) {
                moreBtn.init(attr)
            })
        })
    };
    return {
        init: function () {
            S.UA.ie == 7 && D.query(ATTR).each(function (attr) {
                D.query("a", attr).each(function (a) {
                    a.setAttribute("hideFocus", "true")
                })
            });
            S.each(cates, function (attr) {
                attr.minDiffRow = 2
            });
            var handlerForCates = new Handler(cates);
            handlerForCates.init();
            if (!form) {
                return
            }
            bindEventForMoreAttrsBtn();
            var handlerForProps = new Handler(props);
            handlerForProps.submit = function (attr) {
                var KEY = "prop",
					key = "",
					values = [];
                S.each(attr.valueAnchors, function (val) {
                    if (D.hasClass(val.parentNode, VAL_SELECTED_CLS)) {
                        var pv = D.attr(val, "data-pv"),
							fragments = (pv || "").split(":");
                        key = fragments[0];
                        fragments[1] && values.push(fragments[1])
                    }
                });
                var str = key == "" ? "" : key + ":" + values.join(",");
                var v = D.val(form.prop);
                D.val(form.prop, v == "" ? str : v + ";" + str);
                form.submit()
            };
            handlerForProps.init();
            var handlerForBrand = new Handler(brand);
            util.extend(handlerForBrand, handlerForProps, "bindEventForMoreBtn", function (attr) {
                attr.moreBtn && E.on(attr.moreBtn, "click", function (e) {
                    if (D.hasClass(attr.ul, UL_EXPAND_CLS)) {
                        ajax.expandBrand(this, attr)
                    } else {
                        ajax.collapseBrand(this, attr)
                    }
                }, this)
            });
            util.extend(handlerForBrand, handlerForProps, "bindEventForMultipleBtn", function (attr) {
                attr.multipleBtn && E.on(attr.multipleBtn, "click", function (e) {
                    ajax.expandBrand(this, attr)
                }, this)
            });
            util.extend(handlerForBrand, handlerForProps, "bindEventForCancelBtn", function (attr) {
                E.on(attr.cancelBtn, "click", function (e) {
                    ajax.collapseBrand(this, attr)
                }, this)
            }, true);
            handlerForBrand.submit = function (attr) {
                var value = [];
                S.each(attr.valueAnchors, function (val) {
                    if (D.hasClass(val.parentNode, VAL_SELECTED_CLS)) {
                        value.push(util.getCustomKey(val, "brand"))
                    }
                });
                D.val(form.brand, value.join(","));
                form.submit()
            };
            if (brand) {
                brand.minDiffRow = 2;
                brand.brandSearch = D.get(BRAND_SEARCH, brand);
                var searchTimer = null,
					keywordInput = D.get("input", brand.brandSearch);
                util.bindPlaceholder(keywordInput);
                E.on(brand.brandSearch, "keyup", function (e) {
                    var keyword = D.val(keywordInput);
                    if (S.trim(keyword) !== S.trim(keywordInput.lastVal)) {
                        clearTimeout(searchTimer);
                        searchTimer = setTimeout(function () {
                            ajax.searchAndRender(handlerForBrand, brand, keyword)
                        }, 200);
                        keywordInput.lastVal = keyword
                    }
                })
            }
            handlerForBrand.init(function (attr) { });
            util.fixIE6Hover(["." + MINI_ATTR_CLS, BRAND + " li"]);
            if (D.get("." + MINI_ATTRS_CLS, form)) {
                var miniAttrs = D.query("." + MINI_ATTR_CLS, form);
                var z = parseInt(D.css(miniAttrs[0], "zIndex"));
                S.each(miniAttrs, function (miniAttr) {
                    E.on(miniAttr, "mouseleave", function (e) {
                        var el = D.get("." + FOR_MULTIPLE_CLS, miniAttr);
                        if (el) {
                            D.style(miniAttr, "zIndex", 11)
                        } else {
                            D.style(miniAttr, "zIndex", "")
                        }
                    })
                })
            }
            var attrs = [].concat(cates, props);
            if (brand) {
                attrs.push(brand)
            }
            LIST.msg.on("viewchange", function (e) {
                S.each(attrs, function (attr) {
                    moreBtn.init(attr)
                })
            });
            E.on(ATTR_TRIGGER, "click", function (e) {
                var _target = e.target;
                var panelForHide = D.next(_target);
                D.toggleClass(_target, "expand");
                _target.className.indexOf("expand") === -1 ? D.show(panelForHide) : D.hide(panelForHide)
            })
        }
    }
}, {
    requires: ["template"]
});