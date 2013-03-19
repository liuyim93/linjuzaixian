KISSY.add("malldetail/tabbar/localData", function (A) {
    var D = window,
		C = document;
    var B = {
        hname: location.hostname ? location.hostname : "localStatus",
        isLocalStorage: D.localStorage ? true : false,
        dataDom: null,
        initDom: function () {
            if (!this.dataDom) {
                try {
                    this.dataDom = C.createElement("input");
                    this.dataDom.type = "hidden";
                    this.dataDom.style.display = "none";
                    this.dataDom.addBehavior("#default#userData");
                    C.body.appendChild(this.dataDom);
                    var F = new Date();
                    F = F.getDate() + 30
                } catch (E) {
                    return false
                }
            }
            return true
        },
        set: function (E, F) {
            if (this.isLocalStorage) {
                D.localStorage.setItem(E, F)
            } else {
                if (this.initDom()) {
                    this.dataDom.load(this.hname);
                    this.dataDom.setAttribute(E, F);
                    this.dataDom.save(this.hname)
                }
            }
        },
        get: function (E) {
            if (this.isLocalStorage) {
                return D.localStorage.getItem(E)
            } else {
                if (this.initDom()) {
                    this.dataDom.load(this.hname);
                    return this.dataDom.getAttribute(E)
                }
            }
        },
        removeData: function (E) {
            if (this.isLocalStorage) {
                localStorage.removeItem(E)
            } else {
                if (this.initDom()) {
                    this.dataDom.load(this.hname);
                    this.dataDom.removeAttribute(E);
                    this.dataDom.save(this.hname)
                }
            }
        }
    };
    A.localData = B
}); 