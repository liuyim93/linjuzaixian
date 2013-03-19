KISSY.add("malldetail/other/focusTime", function (S) {
    var DOM = S.DOM,
		Event = S.Event;
    var localData = {
        hname: "TMDFocusTime",
        isLocalStorage: window.localStorage ? true : false,
        dataDom: null,
        initDom: function () {
            if (!this.dataDom) {
                try {
                    this.dataDom = document.createElement("input");
                    this.dataDom.type = "hidden";
                    this.dataDom.style.display = "none";
                    this.dataDom.addBehavior("#default#userData");
                    document.body.appendChild(this.dataDom);
                    var exDate = new Date();
                    exDate = exDate.getDate() + 30
                } catch (ex) {
                    return false
                }
            }
            return true
        },
        set: function (key, value) {
            if (this.isLocalStorage) {
                window.localStorage.setItem(key, value)
            } else {
                if (this.initDom()) {
                    this.dataDom.load(this.hname);
                    this.dataDom.setAttribute(key, value);
                    this.dataDom.save(this.hname)
                }
            }
        },
        get: function (key) {
            if (this.isLocalStorage) {
                return window.localStorage.getItem(key)
            } else {
                if (this.initDom()) {
                    this.dataDom.load(this.hname);
                    return this.dataDom.getAttribute(key)
                }
            }
        },
        removeData: function (key) {
            if (this.isLocalStorage) {
                localStorage.removeItem(key)
            } else {
                if (this.initDom()) {
                    this.dataDom.load(this.hname);
                    this.dataDom.removeAttribute(key);
                    this.dataDom.save(this.hname)
                }
            }
        }
    };
    var id = "focusTime";
    var focusTimeId = null;
    var COUNT = 0,
		isFocus = true,
		timer = null,
		DEBUG = false;
    var heartBeat = function () {
        var bindList = ["mousemove", "click", "scroll", "keypress"];
        S.each(bindList, function (evt) {
            S.Event.on(document, evt, function () {
                focusReload()
            })
        })
    };
    var focusReload = function () {
        COUNT = 0;
        timer == null && autoTime()
    };
    var autoTime = function () {
        timer = setInterval(function () {
            isFocus = (COUNT % 5 == 0 && COUNT != 0) ? false : true;
            COUNT++;
            if (isFocus) {
                Data.time++;
                DEBUG && debug(Data.time);
                setData()
            } else {
                clearInterval(timer);
                timer = null
            }
        }, 1000)
    };
    var getData = function () {
        return localData.get(id)
    };
    var setData = function () {
        var strArray = [];
        S.each(Data, function (value, key) {
            strArray.push(key + ":" + value)
        });
        var str = strArray.join(",");
        localData.set(focusTimeId, str)
    };
    var getfoucsKey = function () {
        if (localData.get("focusKey") == null) {
            return ""
        } else {
            return localData.get("focusKey").split(",")
        }
    };
    var post = function () {
        var focusKey = getfoucsKey();
        if (focusKey && focusKey.length > 5) {
            var items = [];
            var times = [];
            S.each(focusKey, function (key) {
                key = key.replace(/[\[,\]]/gi, "");
                if (key.indexOf("ft") != -1 && isNaN(parseInt(key)) && typeof localData.get(key) != undefined) {
                    if (localData.get(key) != null) {
                        var myData = eval("({" + localData.get(key) + "})");
                        items.push(myData.itemId);
                        times.push(myData.time);
                        localData.removeData(key)
                    }
                }
            });
            localData.removeData("focusKey");
            var url = "http://log.mmstat.com/tmalldetail.99.1";
            (new Image()).src = url + "?cache=" + (new Date()).getTime() + "&itemids=" + items.join(",") + "&staytimes=" + times.join(",")
        }
    };
    var debug = function () {
        S.DOM.append(S.DOM.create('<div style="position:absolute;top:0px;left:0px;background:#fff;">\u60a8\u5df2\u505c\u7559<span id="J_time">0</span>\u79d2</div>'), document.body);
        debug = function (time) {
            S.DOM.html("#J_time", time)
        }
    };
    var config = null;
    var Data = {};
    return S.mods.focusTime = {
        init: function () {
            config = S.cfg();
            var cateIdList = [50011153, 50025883, 50001748, 50010160, 30, 3035, 50010167, 50025884, 50000557, 50010159, 50010158, 50011167, 50011129, 50025885, 50011123, 50000436, 50005867, 50011130, 50011161, 50010402, 50011159, 50011127, 50011165];
            var isFoucsCate = false;
            S.each(cateIdList, function (val) {
                if (val == config.itemDO.categoryId) {
                    isFoucsCate = true
                }
            });
            if (isFoucsCate) {
                Data = {
                    itemId: config.itemDO.itemId,
                    time: 0
                };
                if (window.location.href.indexOf("debug=true") != -1) {
                    DEBUG = true
                }
                post();
                var focusKey = [];
                if (localData.get("focusKey") != null) {
                    focusKey = getfoucsKey()
                }
                focusTimeId = "ft" + Date.parse(Date()) + "" + parseInt(Math.random() * 1000);
                focusKey.push(focusTimeId);
                localData.set("focusKey", focusKey.join(","));
                focusReload();
                heartBeat()
            }
        },
        getData: getData,
        getFocusKey: function () {
            return localData.get("focusKey")
        },
        localData: localData
    }
}); 