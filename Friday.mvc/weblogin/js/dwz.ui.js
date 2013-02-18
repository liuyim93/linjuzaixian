function initEnv() {
    $("body").append(DWZ.frag["dwzFrag"]);

    if ($.browser.msie && /6.0/.test(navigator.userAgent)) {
        try {
            document.execCommand("BackgroundImageCache", false, true);
        } catch (e) { }
    }
    //清理浏览器内存,只对IE起效
    if ($.browser.msie) {
        window.setInterval("CollectGarbage();", 10000);
    }

    $(window).resize(function () {
        initLayout();
        $(this).trigger(DWZ.eventType.resizeGrid);
    });

    var ajaxbg = $("#background,#progressBar");
    ajaxbg.hide();
    $(document).ajaxStart(function () {
        ajaxbg.show();
    }).ajaxStop(function () {
        ajaxbg.hide();
    });

    $("#leftside").jBar({ minW: 150, maxW: 700 });

    if ($.taskBar) $.taskBar.init();
    navTab.init();
    if ($.fn.switchEnv) $("#switchEnvBox").switchEnv();
    if ($.fn.navMenu) $("#navMenu").navMenu();

    setTimeout(function () {
        initLayout();
        initUI();

        // navTab styles
        var jTabsPH = $("div.tabsPageHeader");
        jTabsPH.find(".tabsLeft").hoverClass("tabsLeftHover");
        jTabsPH.find(".tabsRight").hoverClass("tabsRightHover");
        jTabsPH.find(".tabsMore").hoverClass("tabsMoreHover");

    }, 10);

}
function initLayout() {
    var iContentW = $(window).width() - (DWZ.ui.sbar ? $("#sidebar").width() + 10 : 34) - 5;
    var iContentH = $(window).height() - $("#header").height() - 34;

    $("#container").width(iContentW);
    $("#container .tabsPageContent").height(iContentH - 34).find("[layoutH]").layoutH();
    $("#sidebar, #sidebar_s .collapse, #splitBar, #splitBarProxy").height(iContentH - 5);
    $("#taskbar").css({ top: iContentH + $("#header").height() + 5, width: $(window).width() });
}
//2013-02-13 basilwang add rel_hook
function initUI(_box, _prefix,_rel_hook) {
    //2013-01-12 basilwang add _url  cause we don't want to keep down compaliaty
    var argsLength = arguments.length;
    var $p;
    var prefix;
    //2013-02-13 basilwang add rel_hook
    var rel_hook;
    var needIdentifiers = false;
    if (argsLength === 0) {
        $p = $(document);
        needIdentifiers = false;
    }
    //2013-02-13 basilwang seems we don't need this situation
//    else if (argsLength === 1 && typeof _box == "string") {
//        $p = $(document);
//        //use _box store url , here we load set it to _url
//        _prefix = _box;
//        needIdentifiers = false;
//    }
    else if (argsLength === 2) {
        $p = $(_box);
        needIdentifiers = true;
    }
    else if (argsLength === 3) {
        $p = $(_box);
        rel_hook = _rel_hook;
        needIdentifiers = true;
    }
    prefix = _prefix;



    //2013-01-12 basilwang we need genIdentifiers befor pagerForm
    if ($.fn.genGlobalRels) {
        $p.genGlobalRels(prefix,rel_hook);
    }

    //$p= $(_box || document);

    $("div.panel", $p).jPanel();

    //tables
    $("table.table", $p).jTable();

    // css tables
    $('table.list', $p).cssTable();

    //auto bind tabs
    $("div.tabs", $p).each(function () {
        var $this = $(this);
        var options = {};
        options.currentIndex = $this.attr("currentIndex") || 0;
        options.eventType = $this.attr("eventType") || "click";
        $this.tabs(options);
    });

    $("ul.tree", $p).jTree();
    $('div.accordion', $p).each(function () {
        var $this = $(this);
        $this.accordion({ fillSpace: $this.attr("fillSpace"), alwaysOpen: true, active: 0 });
    });

    $(":button.checkboxCtrl, :checkbox.checkboxCtrl", $p).checkboxCtrl($p);

    if ($.fn.combox) $("select.combox", $p).combox();

    if ($.fn.xheditor) {
        $("textarea.editor", $p).each(function () {
            var $this = $(this);
            var op = { html5Upload: false, skin: 'vista', tools: $this.attr("tools") || 'full' };
            var upAttrs = [
				["upLinkUrl", "upLinkExt", "zip,rar,txt"],
				["upImgUrl", "upImgExt", "jpg,jpeg,gif,png"],
				["upFlashUrl", "upFlashExt", "swf"],
				["upMediaUrl", "upMediaExt", "avi"]
			];

            $(upAttrs).each(function (i) {
                var urlAttr = upAttrs[i][0];
                var extAttr = upAttrs[i][1];

                if ($this.attr(urlAttr)) {
                    op[urlAttr] = $this.attr(urlAttr);
                    op[extAttr] = $this.attr(extAttr) || upAttrs[i][2];
                }
            });

            $this.xheditor(op);
        });
    }

    if ($.fn.uploadify) {
        $(":file[uploader]", $p).each(function () {
            var $this = $(this);
            var options = {
                uploader: $this.attr("uploader"),
                script: $this.attr("script"),
                buttonImg: $this.attr("buttonImg"),
                cancelImg: $this.attr("cancelImg"),
                queueID: $this.attr("fileQueue") || "fileQueue",
                fileDesc: $this.attr("fileDesc"),
                fileExt: $this.attr("fileExt"),
                folder: $this.attr("folder"),
                fileDataName: $this.attr("name") || "file",
                auto: $this.attr("auto") || false,
                multi: true,
                onError: uploadifyError,
                onComplete: uploadifyComplete,
                onAllComplete: uploadifyAllComplete
            };
            if ($this.attr("onComplete")) {
                options.onComplete = DWZ.jsonEval($this.attr("onComplete"));
            }
            if ($this.attr("onAllComplete")) {
                options.onAllComplete = DWZ.jsonEval($this.attr("onAllComplete"));
            }
            if ($this.attr("scriptData")) {
                options.scriptData = DWZ.jsonEval($this.attr("scriptData"));
            }
            $this.uploadify(options);
        });
    }

    // init styles
    $("input[type=text], input[type=password], textarea", $p).addClass("textInput").focusClass("focus");

    $("input[readonly], textarea[readonly]", $p).addClass("readonly");
    $("input[disabled=true], textarea[disabled=true]", $p).addClass("disabled");

    $("input[type=text]", $p).not("div.tabs input[type=text]", $p).filter("[alt]").inputAlert();

    //Grid ToolBar
    $("div.panelBar li, div.panelBar", $p).hoverClass("hover");

    //Button
    $("div.button", $p).hoverClass("buttonHover");
    $("div.buttonActive", $p).hoverClass("buttonActiveHover");

    //tabsPageHeader
    $("div.tabsHeader li, div.tabsPageHeader li, div.accordionHeader, div.accordion", $p).hoverClass("hover");

    //validate form
    $("form.required-validate", $p).each(function () {
        var $form = $(this);
        $form.validate({
            onsubmit: false,
            focusInvalid: false,
            focusCleanup: true,
            errorElement: "span",
            ignore: ".ignore",
            invalidHandler: function (form, validator) {
                var errors = validator.numberOfInvalids();
                if (errors) {
                    var message = DWZ.msg("validateFormError", [errors]);
                    alertMsg.error(message);
                }
            }
        });

        $form.find('input[customvalid]').each(function () {
            var $input = $(this);
            $input.rules("add", {
                customvalid: $input.attr("customvalid")
            })
        });
    });

    if ($.fn.datepicker) {
        $('input.date', $p).each(function () {
            var $this = $(this);
            var opts = {};
            if ($this.attr("dateFmt")) opts.pattern = $this.attr("dateFmt");
            if ($this.attr("minDate")) opts.minDate = $this.attr("minDate");
            if ($this.attr("maxDate")) opts.maxDate = $this.attr("maxDate");
            if ($this.attr("mmStep")) opts.mmStep = $this.attr("mmStep");
            if ($this.attr("ssStep")) opts.ssStep = $this.attr("ssStep");
            $this.datepicker(opts);
        });
    }

    // navTab
    $("a[target=navTab]", $p).each(function () {
        $(this).click(function (event) {
            var $this = $(this);
            var title = $this.attr("title") || $this.text();
            var tabid = $this.attr("rel") || "_blank";
            var fresh = eval($this.attr("fresh") || "true");
            var external = eval($this.attr("external") || "false");
            var url = unescape($this.attr("href")).replaceTmById($(event.target).parents(".unitBox:first"));

            //2013-02-13 basilwang get rel_hook
            var rel_hook = $this.attr("rel_hook") || "";
            //2013-01-15 basilwang add getDiscriminer for open same dialog/navtab for different items
            tabid = tabid + url.getDiscriminer();
            DWZ.debug(url);
            if (!url.isFinishedTm()) {
                alertMsg.error($this.attr("warn") || DWZ.msg("alertSelectMsg"));
                return false;
            }
            //2013-01-14 basilwang add prefix(tabid or dialogid) to data 
            //navTab.openTab(tabid, url,{title:title, fresh:fresh, external:external});
            //2013-02-13 basilwang add rel_hook
            //navTab.openTab(tabid, url, { title: title, fresh: fresh, external: external, data: { prefix: tabid} });
            navTab.openTab(tabid, url, { title: title, fresh: fresh, external: external, data: { prefix: tabid,"rel_hook":rel_hook} });
            event.preventDefault();
        });
    });

    //dialogs
    $("a[target=dialog]", $p).each(function () {
        $(this).click(function (event) {
            var $this = $(this);
            var title = $this.attr("title") || $this.text();
            var rel = $this.attr("rel") || "_blank";
            var options = {};
            var w = $this.attr("width");
            var h = $this.attr("height");
            if (w) options.width = w;
            if (h) options.height = h;
            options.max = eval($this.attr("max") || "false");
            options.mask = eval($this.attr("mask") || "false");
            options.maxable = eval($this.attr("maxable") || "true");
            options.minable = eval($this.attr("minable") || "true");
            options.fresh = eval($this.attr("fresh") || "true");
            options.resizable = eval($this.attr("resizable") || "true");
            options.drawable = eval($this.attr("drawable") || "true");
            options.close = eval($this.attr("close") || "");
            options.param = $this.attr("param") || "";


            var url = unescape($this.attr("href")).replaceTmById($(event.target).parents(".unitBox:first"));

            //2013-02-17 basilwang get rel_hook
            var rel_hook = $this.attr("rel_hook") || "";

            //2013-01-15 basilwang add getDiscriminer for open same dialog/navtab for different items
            rel = rel + url.getDiscriminer();
            //2013-01-14 basilwang add prefix(tabid or dialogid) to data 
            //2013-02-17 basilwang add rel_hook
            //options.data = { prefix: rel };
            options.data = { prefix: rel,"rel_hook":rel_hook };

            DWZ.debug(url);
            if (!url.isFinishedTm()) {
                alertMsg.error($this.attr("warn") || DWZ.msg("alertSelectMsg"));
                return false;
            }
            $.pdialog.open(url, rel, title, options);

            return false;
        });
    });
    $("a[target=ajax]", $p).each(function () {
        $(this).click(function (event) {
            var $this = $(this);
            var rel = $this.attr("rel_v3");
            var prefix = $this.attr("prefix");
            //2013-01-16 basilwang get target_type "n" or "d"
            var target_type = /__(.){1}.*/ig.exec(prefix);
            target_type=target_type ? target_type[1] : "";
            var $panel;
            if (target_type == "n") {
                $panel = navTab.getCurrentPanel();
            }
            else {
                $panel = $.pdialog.getCurrent();
            }
            if (rel) {
                var $rel = $("#" + rel,$panel);
                //2013-01-16 basilwang add getPrefix for open same dialog/navtab for different items
                //2013-01-16 basilwang we can't choose ajax get method with prefix parameter url , if you post the copy value also via ajax post  which will double the value
                //it's very dangerous to use getPrefix ,so we remove it.
                //2013-02-13 basilwang inject rel_v3
                //var data = { prefix: prefix };
                var data = { prefix: prefix, "rel_v3": rel };
                $rel.loadUrl($this.attr("href"), data, function () {
                    $rel.find("[layoutH]").layoutH();
                });
            }

            event.preventDefault();
        });
    });

    $("div.pagination", $p).each(function () {
        var $this = $(this);
        //2013-02-17 basilwang get the real target_type, don't care about div search because of the same logic
//        $this.pagination({
//            targetType: $this.attr("targetType"),
//            rel: $this.attr("rel"),
//            totalCount: $this.attr("totalCount"),
//            numPerPage: $this.attr("numPerPage"),
//            pageNumShown: $this.attr("pageNumShown"),
//            currentPage: $this.attr("currentPage")
//        });
        var target_type_based_prefix = $.get_target_type(prefix);
        var target_type;
        if (/navtab/i.test(target_type_based_prefix)) {
            target_type = "navTab";
        }
        else if (/dialog/i.test(target_type_based_prefix)) {
            target_type = "dialog";
        }
        $this.pagination({
            targetType: target_type,
            rel: $this.attr("rel"),
            totalCount: $this.attr("totalCount"),
            numPerPage: $this.attr("numPerPage"),
            pageNumShown: $this.attr("pageNumShown"),
            currentPage: $this.attr("currentPage")
        });

    });

    if ($.fn.sortDrag) $("div.sortDrag", $p).sortDrag();

    // dwz.ajax.js
    if ($.fn.ajaxTodo) $("a[target=ajaxTodo]", $p).ajaxTodo();
    if ($.fn.dwzExport) $("a[target=dwzExport]", $p).dwzExport();

    if ($.fn.lookup) $("a[lookupGroup]", $p).lookup();
    if ($.fn.multLookup) $("[multLookup]:button", $p).multLookup();
    if ($.fn.suggest) $("input[suggestFields]", $p).suggest();
    if ($.fn.itemDetail) $("table.itemDetail", $p).itemDetail();
    if ($.fn.selectedTodo) $("a[target=selectedTodo]", $p).selectedTodo();



    if ($.fn.pagerForm) $("form[rel=pagerForm]", $p).pagerForm({ parentBox: $p });


    //2013-01-12 basilwang add prefix to pagerForm
    function _get_entry_url(prefix) {
        var a = /(^.*)\.aspx/.exec(prefix);
        //alert(a);
        return a ? a[1] + "__" : "";
    }
    //	var pre = _get_entry_url(url);

    //	//2013-01-12 basilwang we need genIdentifiers befor pagerForm
    //	if ($.fn.genIdentifiers) {
    //	    if (needIdentifiers)
    //	        $p.genIdentifiers(pre);
    //	}

    //	if ($.fn.pagerForm) $("form[rel=pagerForm]", $p).pagerForm({ parentBox: $p, pagerForm$: "#" + pre + "pagerForm" });

}


