﻿/*pub-1|2013-03-05 16:37:17*/function addfavor(A, D) {
    var B = navigator.userAgent.toLowerCase(); if (B.indexOf("msie 8") > -1) { external.AddToFavoritesBar(A, D, "") }
    else {
        try { window.external.addFavorite(A, D) }
        catch (C) {
            try { window.sidebar.addPanel(D, A, "") }
            catch (C) { alert("\u52a0\u5165\u6536\u85cf\u5931\u8d25\uff0c\u8bf7\u4f7f\u7528Ctrl+D\u8fdb\u884c\u6dfb\u52a0") }
        }
    }
    return false
}
function parseQueryString(E) {
    if (E == "" || E == null) { E = window.location.search.substr(1) }
    var A = E.split("&"); if (A == "") {
        return {}
    }
    var C = {}
; for (var B = 0; B < A.length; ++B) {
        var D = A[B].split("="); if (D.length != 2) { continue }
        if (D[1] != null && D[1].length > 0) { C[D[0]] = decodeURIComponent(D[1].replace(/\+/g, " ")) }
    }
    return C
}
var queryString = parseQueryString(); KISSY.add("RulesHeader", function (B) {
    var C = function (D) { this.cfg = D; this.searchIco = D.searchIco && B.one(D.searchIco); this.itemKeyword = D.itemKeyword && B.one(D.itemKeyword); this.formmarket = D.formmarket && B.one(D.formmarket); this.searchtriggers = D.searchtriggers && B.one(D.searchtriggers); this.mainnav = D.mainnav && B.one(D.mainnav); this.selected = B.one(".selected") }
; var A = function (D) { return new C(D) }
; B.augment(C, { init: function () {
    var D = this; if (D.itemKeyword) { D.itemKeyword.val("") }
    B.DOM.attr(B.one("#typecode"), { value: this.selected ? this.selected.attr("data-searchtype") : "" }
); this.nav(); this.searchico(); this.addfav(); B.all("#J_Feedback").attr("href", "http://bbs.taobao.com/catalog/thread/15296510-257837159.htm").attr("target", "_blank")
}
, addfav: function () {
    try {
        B.all("#J_AddFav").on("click", function (F) { var G = document.title, E = document.location.href; addfavor(E, G) }
)
    }
    catch (D) { }
}
, searchvip: function () {
    var D = this; B.DOM.attr(B.one("#typecode"), { value: this.selected ? this.selected.attr("data-searchtype") : "" }
)
}
, searchico: function () {
    var D = this; if (!D.itemKeyword || !D.searchIco) { return }
    D.itemKeyword.on("focusin focusout", function (E) {
        if (E.type == "focusin") { D.searchIco.removeClass(".ts-show") }
        else {
            if (D.itemKeyword.val() == "") { D.searchIco.addClass(".ts-show") }
        }
    }
); B.each(D.searchtriggers.all("li"), function (F, E) {
    F = new B.Node(F); F.on("click", function (G) { G.halt(); D.switchToTab(E) }
)
}
)
}
, switchToTab: function (E) {
    var D = this; B.each(D.searchtriggers.all("li"), function (G, F) { G = new B.Node(G); G[(F == E) ? "addClass" : "removeClass"]("selected") }
); D.searchvip()
}
, nav: function () {
    if (!this.mainnav) { return }
    var D = this, F = document.location.href, E = document.location.pathname; B.each(D.mainnav.all("li"), function (H) {
        var G = B.one(H).one("a").attr("id"); if (E.indexOf(G) != -1) { B.one(H).addClass("c-select") }
        if (E === "/") { D.mainnav.one("li").addClass("c-select") }
        B.one(H).on("mouseenter mouseleave", function (I) {
            if (I.type == "mouseenter") { B.one(H).addClass("hover") }
            else { B.one(H).removeClass("hover") }
        }
)
    }
)
}
}
); B.RulesHeader = C
}
, { requires: ["suggest"] }
); KISSY.use("switchable,RulesHeader", function (A, B) {
    A.ready(function (C) {
        var D = new C.RulesHeader({ searchIco: ".J_Placeholder", itemKeyword: ".J_KeyWord", searchtriggers: ".search-triggers", mainnav: "#J_Main_nav", formmarket: "#J_TSearchForm" }
).init(); if (C.one(".search-btn")) {
            C.one(".search-btn").on("click", function () { var E = 0; var F = "http://rule.taobao.com/search.htm?key=" + encodeURIComponent(encodeURIComponent(C.one("#q").val())) + "&pageIndex=" + E + "&codes=" + C.one("#typecode").val(); window.location.href = F }
)
        }
    }
)
}
);