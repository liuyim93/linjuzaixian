/*pub-1|2013-04-24 11:36:29*/KISSY.add("2012/mods/triangle", function (a) {
    var b = a.DOM;
    var d = "update";
    var c = "check";
    var e = a.merge(a.EventTarget, { _updateTriangle: function (g) {
        if (!this.cateMod) {
            this.cateMod = b.query("ul", g.cateModID)
        }
        var m;
        var j = parseInt(b.height(this.cateMod), 10);
        var l = b.viewportHeight();
        var k;
        var i = b.offset(this.cateMod);
        var f = i.top - b.scrollTop(window);
        k = l - f;
        m = j < k ? j : l;
        var h = this._getMouseCoordinate(g.eventObject);
        this.triangleCoordinate = this._getCoordinate(g.eventObject, h, m)
    }, _getMouseCoordinate: function (f) {
        if (!this.cateModWidth) {
            this.cateModWidth = parseInt(b.width(this.cateMod), 10)
        }
        var h = b.offset(this.cateMod);
        var g = [h.left + this.cateModWidth, h.top];
        return [f.pageX - g[0], g[1] - f.pageY]
    }, _isInTriangle: function (g) {
        if (!this.triangleCoordinate) {
            this._updateTriangle(g)
        }
        var i = this.triangleCoordinate;
        var h = this._getMouseCoordinate(g.eventObject);
        if (h[1] >= (i.originMouseLine.k) * h[0] + 1) {
            return false
        }
        if (h[1] <= i.originCateViewLine.b - 1) {
            return false
        }
        var f = i.mouseCateViewLine;
        if (h[1] <= f.k * h[0] + f.b - 1) {
            return false
        }
        return true
    }, _getOriginMouseLine: function (f) {
        return { k: f[1] / f[0], b: 0 }
    }, _getOriginCateViewLine: function (f) {
        return { k: 0, b: f[1] }
    }, _getMouseCateViewLine: function (h, i) {
        var f = i[1];
        var g = (h[1] - f) / h[0];
        return { k: g, b: f }
    }, _getCoordinate: function (g, h, m) {
        var l = [0, 0];
        var k = [0, -m];
        this.mouseCoordinate = h;
        this.originMouseLine = l;
        this.cateViewRightBottom = k;
        var l = this._getOriginMouseLine(h);
        var j = this._getOriginCateViewLine(k);
        var f = this._getMouseCateViewLine(h, k);
        var i = { originMouseLine: l, originCateViewLine: j, mouseCateViewLine: f };
        this.triangleObject = i;
        return i
    } 
    });
    e.on(d, e._updateTriangle);
    e.on(c, e._isInTriangle);
    return e
});
