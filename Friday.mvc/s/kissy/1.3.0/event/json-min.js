KISSY.add("json", function (c, a) {
    a || (a = JSON);
    return c.JSON = {
        parse: function (b) {
            return null == b || "" === b ? null : a.parse(b)
        },
        stringify: a.stringify
    }
}, {
    requires: [KISSY.Features.isNativeJSONSupported() ? "" : "json/json2"]
});