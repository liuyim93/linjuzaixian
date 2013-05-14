KISSY.add("2012/util/localstorage", function (C, G) {
    var F = {}, E = window, H = E.document, B = "localStorage", I = "globalStorage", D;
    F.getItem = function (J, K) {
    };
    F.setItem = function (J) {
    };
    F.removeItem = function (J) {
    };
    F.clear = function () {
    };
    if (B in E && E[B]) {
        D = E[B];
        F.setItem = function (J, K) {
            D.setItem(J, K)
        };
        F.getItem = function (J) {
            return D.getItem(J)
        };
        F.removeItem = function (J) {
            D.removeItem(J)
        };
        F.clear = function () {
            D.clear()
        }
    } else {
        if (I in E && E[I]) {
            D = E[I][E.location.hostname];
            F.setItem = function (J, K) {
                D[J] = K
            };
            F.getItem = function (J) {
                return D[J] && D[J].value
            };
            F.removeItem = function (J) {
                delete D[J]
            };
            F.clear = function () {
                for (var J in D) {
                    delete D[J]
                }
            }
        } else {
            if (H.documentElement.addBehavior) {
                function A() {
                    if (D) {
                        return D
                    }
                    D = H.body.appendChild(H.createElement("div"));
                    D.style.display = "none";
                    D.addBehavior("#default#userData");
                    D.load(B);
                    return D
                }
                F.setItem = function (J, K) {
                    var L = A();
                    L.setAttribute(J, K);
                    L.save(B)
                };
                F.getItem = function (J) {
                    var K = A();
                    return K.getAttribute(J)
                };
                F.removeItem = function (J) {
                    var K = A();
                    K.removeAttribute(J);
                    K.save(B)
                };
                F.clear = function () {
                    var M = A();
                    var K = M.XMLDocument.documentElement.attributes;
                    M.load(B);
                    for (var L = 0, J; J = K[L]; L++) {
                        M.removeAttribute(J.name)
                    }
                    M.save(B)
                }
            }
        }
    }
    return F
}, { requires: ["ua"] });