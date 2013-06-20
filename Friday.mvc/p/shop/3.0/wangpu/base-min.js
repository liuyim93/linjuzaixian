KISSY.add("wangpu/base", function (e, h, c) {
    var g = document,
		f = e.DOM,
		b = e.Event;

    function d(j) {
        var i = this;
        i._mod = j.mod;
        i._context = j;
        if (!i._mod) {
            return
        }
        i._init()
    }
    e.augment(d, {
        _init: function () {
            e.log("Base init start");
            var j = this,
				i = j._context.pageType;
            j._changeDomain();
            j._updateToken();
            if (i != "cdetail") {
                j._initCollectDialog()
            }
            e.log("Base init end")
        },
        _changeDomain: function () {
            try {
                var j = document.domain.split(".");
                //document.domain = j.slice(j.length - 2).join(".")
            } catch (i) { }
        },
        _updateToken: function () {
            var k = f.get("#J_TokenField");
            if (!k) {
                return
            }
            var l = /_tb_token_=[^&]*/i,
				i = f.query("a.J_TokenSign", g),
				j = "_tb_token_=" + k.value;
            e.each(i, function (n) {
                var m = n.href;
                if (l.test(m)) {
                    n.href = m.replace(l, j)
                } else {
                    n.href += (m.lastIndexOf("&") !== -1 ? "&" : "?") + j
                }
            })
        },
        _initCollectDialog: function () {
            var i, j = location.hostname.indexOf("tmall.com") !== -1 || location.hostname.indexOf("tmall.net") !== -1;
            i = f.create('<div id="popupPanel">');
            g.body.appendChild(i);
            e.each(f.query(".J_TDialogTrigger"), function (l) {
                var n = l.getAttribute("data-width"),
					k = l.getAttribute("data-height"),
					m = new c.Dialog({
					    srcNode: i,
					    width: n,
					    height: k,
					    closable: false,
					    elStyle: {
					        display: "block",
					        visibility: "hidden",
					        position: "absolute",
					        left: "-9999px",
					        top: "-9999px"
					    }
					});
                b.on(l, "click", function (o) {
                    o.preventDefault();
                    m.hide();
                    f.show(i);
                    m.show()
                });
                m.on("show", function () {
                    var p = this,
						o = a(l.href) + (j ? "&isTmall=1" : ""),
						q = '<a class="close-btn" href="javascript:void(0)"style="position: absolute; top: 5px; right: 4px; outline: none;display: block; width: 15px; height: 15px; background: url(http://localhost:7525/Images/close_btn.png) no-repeat; text-decoration: none; text-indent: -99999px">X</a><iframe src="' + o + '" width="' + n + '" height="' + k + '" name="popupIframe" frameborder="0" scrolling="no"></iframe>';
                    p.set("width", n);
                    p.set("height", k);
                    f.html(i, q);
                    m.center();
                    b.on(f.get(".close-btn", i), "click", function () {
                        m.hide()
                    });
                    if (f.hasClass(l, "collection") && window.g_config.type == "b") {
                        (new Image).src = "http://www.atpanel.com/jsclick?cache=" + +new Date + "&auc_detail=b_collect_item"
                    }
                    f.removeClass("#shop-info", "expanded")
                })
            })
        }
    });

    function a(j) {
        var i = e.now();
        return j + (j.indexOf("?") === -1 ? "?" : "&") + "t=" + i
    }
    d.selector = "body";
    d.type = "base";
    return d
}, {
    requires: ["core", "overlay"]
});