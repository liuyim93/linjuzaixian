KISSY.add("wangpu/mods/official/customer-service", function (S, Core) {
    var DOM = S.DOM;
    function CustomerService(context) {
        var self = this;
        self._mod = context.mod;
        if (!self._mod) {
            return
        }
        self._init()
    }
    S.augment(CustomerService, { _init: function () {
        S.log("CustomerService init start");
        var self = this;
        self._displayWWGroop();
        S.log("CustomerService init end")
    }, _displayWWGroop: function () {
        var self = this, tempwangwang, templi, tempdesc, api = "http://amos.im.alisoft.com/", config = "v=2&site=cntaobao&s=1&charset=utf-8&uid=", uls = S.all("ul.service-group", self._mod), node = uls.item(uls.length - 1), url = node.attr("data-url"), nick = node.attr("data-nick"), gnick = node.attr("data-gnick"), groupIdFilter = node.attr("data-group-filter").split("\u03b1_\u03a9-\u03c0");
        node.children().innerHTML = null;
        S.getScript(url, function () {
            var group = groupMember && eval("(" + groupMember + ")").groups || "";
            if ("" != group && "" != groupIdFilter[0]) {
                var groupMembers = eval("(" + groupMember + ")").groups.group;
                S.each(groupMembers, function (item, temp) {
                    if (S.inArray(groupMembers[temp].groupId.toString(), groupIdFilter) || groupIdFilter[0] == "all") {
                        templi = DOM.create("<li>"), tempdesc = DOM.create("<span>", { "class": "groupname" });
                        DOM.html(tempdesc, groupMembers[temp].groupName);
                        tempwangwang = DOM.create("<a>", { href: api + "getcid.aw?v=3&uid=" + gnick + "&site=cntaobao&groupid=" + groupMembers[temp].groupId + "&s=1&charset=gbk&fromid=cntaobao" + S.Cookie.get("_nk_"), target: "_blank" });
                        tempwangwang.appendChild(DOM.create("<img>", { src: api + "grponline.aw?v=3&uid=" + gnick + "&site=cntaobao&gids=" + groupMembers[temp].groupId + "&s=1", alt: "\u70b9\u51fb\u8fd9\u91cc\u7ed9\u6211\u53d1\u6d88\u606f" }));
                        templi.appendChild(tempdesc);
                        DOM.insertAfter(tempwangwang, tempdesc);
                        node.append(templi)
                    }
                })
            } else {
                templi = DOM.create("<li>", { "data-wangwang": "mainwangwang" }), tempdesc = DOM.create("<span>", { "class": "groupname" });
                DOM.html(tempdesc, "\u5ba2\u670d\u4e2d\u5fc3");
                tempwangwang = DOM.create("<a>", { href: api + "msg.aw?" + config + nick, target: "_blank" });
                tempwangwang.appendChild(DOM.create("<img>", { src: api + "online.aw?" + config + nick, alt: "\u70b9\u51fb\u8fd9\u91cc\u7ed9\u6211\u53d1\u6d88\u606f" }));
                templi.appendChild(tempdesc);
                DOM.insertAfter(tempwangwang, tempdesc);
                node.append(templi)
            }
        })
    } 
    });
    CustomerService.selector = "#customer-box";
    return CustomerService
}, { requires: ["core", "cookie"] });
