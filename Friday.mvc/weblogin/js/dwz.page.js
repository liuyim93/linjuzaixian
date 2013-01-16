/// <reference path="jquery-1.7.2-vsdoc.js" />
(function ($) {

    $.fn.genIdentifiers = function (prefix) {
        var $this = $(this);
        var $objs;

        $objs = $('*[id]', $this);

        //var pageid = _get_entry_url(url);
        $objs.each(function (i, obj) {
            obj.id = prefix + obj.id;
        });

    }

    $.fn.genGlobalRels = function (prefix) {


        var $this = $(this);
        var $objs;

        prefix = prefix || "";
        //2013-01-16 basilwang don't handle div[rel]
        $objs = $('a[rel]', $this);

        //var pageid = _get_entry_url(url);
        $objs.each(function (i, obj) {
            var $obj = $(obj);
            var old_rel;
            //2013-01-16 basilwang add target_type before the rel to discriminer            
            var target_type;
            if (/navtab/i.test($obj.attr("target")))
            {
              target_type="n";
            }
          else if(/dialog/i.test($obj.attr("target")))
            {
              target_type="d";
            }
            if ($obj.attr("href")) {
                //2013-01-16 basilwang add target_type before the rel to discriminer
                var stripe_url_name = _get_entry_url(target_type,$obj.attr("href"));
                old_rel = stripe_url_name;
            }
            //2013-01-16 basilwang we don't think we have this situation now
            else {
                old_rel = "__" + $obj.attr("id");
            }
            $obj.attr("rel", prefix + old_rel);
        });

    }

    $.no_cache_url = function (a) {
        var b = new Date();
        if (a.indexOf("?") >= 0) {
            a = a + "&_s=" + b.getTime();
        } else {
            a = a + "?_s=" + b.getTime();
        }
        return a;
    }
    $.referer_by_rel = function (referer_url_segment) {

        var url = _get_parent_sliced_url_segment(referer_url_segment);
        return _find_panel_by_rel(url);
    }
    //2013-01-15 basilwang I think we need referer_url more
    $.referer_url = function (referer_url_segment) {

        var url = _get_parent_sliced_url_segment(referer_url_segment);
        return url;
    }
    $.referer = $.referer_by_rel;
    $.self_by_rel = function (self_url_segment) {

        var url = self_url_segment;
        return _find_panel_by_rel(url);
    }
    $.self = $.self_by_rel;
    $.goto_by_relative_rel = function (referer_url_segment, goto_url_segment) {

        var url = referer_url_segment + "__" + goto_url_segment;
        return _find_panel_by_rel(url);
    }
    $.goto = $.goto_by_relative_rel;
    //2013-01-12 basilwang add prefix to pagerForm
    function _get_entry_url(target_type,prefix) {
        var a = /(.*\/){0,}([^.]+).*/ig.exec(prefix);
        //alert(a);
        return a ? "__" + target_type + a[2] : "";
    }
    function _get_parent_sliced_url_segment(url) {
        var a = /(__.*){0,}__.*/ig.exec(url);
        //alert(a);
        return a ? a[1] : "";
    }
    function _find_panel_by_rel(url) {
        //2013-01-14 basilwang don't use panel_type now . maybe need in the future
        if (url === "")
            return null;
        var panel_type = "navtab";
        var $panel = navTab.getPanel(url);
        if (!$panel) {
            $panel = $.pdialog.getDialog(url);
            panel_type = "dialog";
        }
        //2013-01-16 basilwang don't handle div[rel]
        //        if (!$panel) {
        //            $panel = $("[rel=" + url+"]");
        //            panel_type = "panel";
        //        }

        return $panel;
    }




})(jQuery);



