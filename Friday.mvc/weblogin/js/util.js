function get_entry_url() {
    var a = /(\/.+\.aspx)/.exec(url);
    //alert(a);
    return a ? a[1] : ""
}
function no_cache_url(a) {
    var b = new Date();
    if (a.indexOf("?") >= 0) {
        a = a + "&_s=" + b.getTime()
    } else {
        a = a + "?_s=" + b.getTime()
    }
    return a
}