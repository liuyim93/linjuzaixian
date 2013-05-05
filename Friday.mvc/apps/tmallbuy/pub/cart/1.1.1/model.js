/*pub-1|2013-04-11 10:17:01*/
KISSY.add("cart/model", function (G, L, J, D, I, B, A) {
    var K = G.isPlainObject;
    var H = {
        cart: {},
        trunk: {},
        bundle: {},
        order: {}
    };
    var F = {
        order: {
            parent: "bundle"
        },
        bundle: {
            parent: "trunk",
            child: "order"
        },
        trunk: {
            parent: "cart",
            child: "bundle"
        },
        cart: {
            child: "trunk"
        }
    };
    var E = {
        reset: function () {
            H = {
                cart: {},
                trunk: {},
                bundle: {},
                order: {}
            };
            this.recentDelOrderIds = null
        },
        fill: function (U, Q, R) {
            var M = Q.id;
            var O = F[U];
            if (!O) {
                return
            }
            var W = O.parent;
            var P = {
                _type: U
            };
            if (W) {
                R = R || "";
                P._parent = {
                    type: W,
                    id: R
                };
                var X = H[W];
                var N = R ? (X[R] || {}) : X;
                var T = N._childs || {};
                var S = T.map || {};
                T.type = U;
                S[M] = true;
                T.map = S;
                T.length = (T.length || 0) + 1;
                N._childs = T;
                if (R) {
                    X[R] = N
                } else {
                    H[W] = N
                }
            }
            var V = H[U];
            V[M] = G.merge(V[M], Q, P)
        },
        display: function () {
            G.log(H)
        },
        find: function (N, T) {
            N = N.split("/");
            var M = N.length;
            if (2 < M) {
                return
            }
            var R = N[0];
            var O = H[R];
            if (!O) {
                return
            }
            T = G.isFunction(T) ? T : function () {
                return true
            };
            if (1 == M) {
                if (O._childs) {
                    if (false !== T(O)) {
                        return O
                    }
                    return
                }
                var P = [];
                for (var Q in O) {
                    var S = O[Q];
                    if (false !== T(S)) {
                        P.push(S)
                    }
                }
                return P
            } else {
                O = O[N[1]];
                if (false !== T(O)) {
                    return O
                }
            }
        },
        isEmpty: function () {
            var N = H.order;
            for (var M in N) {
                return false
            }
            return true
        },
        parent: function (M, O, R) {
            var P = ("string" === typeof M) ? this.find(M) : M;
            if (!P || G.isArray(P)) {
                return
            }
            if (G.isFunction(O)) {
                R = O;
                O = ""
            }
            O = O || "";
            R = R || function () {
                return true
            };
            var N = typeof O;
            if ("string" === N) {
                do {
                    var Q = P._parent;
                    if (!Q) {
                        return
                    }
                    P = this.find(Q.type + "/" + Q.id);
                    if (!P || "" === O || P._type === O) {
                        if (false !== R(P)) {
                            return P
                        }
                        return
                    }
                } while (true)
            }
        },
        children: function (Q, O, M) {
            var R = "string" === typeof Q ? this.find(Q) : Q;
            if (!R || G.isArray(R)) {
                return
            }
            if (G.isFunction(O)) {
                M = O;
                O = ""
            }
            O = O || "";
            M = M || function () {
                return true
            };
            var S = [];
            if ("string" === typeof O) {
                var P = R._childs;
                if (!P) {
                    return S
                }
                var N = P.map;
                var T = P.type;
                if (T === O || "" === O) {
                    for (var U in N) {
                        var R = this.find(T + "/" + U);
                        if (false !== M(R)) {
                            S.push(R)
                        }
                    }
                    return S
                } else {
                    for (var U in N) {
                        var R = N[U];
                        S = S.concat(this.children(T + "/" + U, O, M))
                    }
                }
            }
            return S
        },
        siblings: function (M, N) {
            var O = this.find(M);
            if (!O) {
                return
            }
            return this.children(this.parent(O), function (P) {
                return P.id != object.id
            })
        },
        filterCod: function (N) {
            if (N) {
                var O = [];
                this.find("order", function (Q) {
                    if (Q.isValid && Q.checked && !Q.isCod) {
                        O.push(Q.id)
                    }
                });
                var M = O.length;
                if (M) {
                    this.codUncheckedCartIds = O;
                    this.updateOrderCheckStatus(O, false);
                    this.calculate();
                    A.showCodTip({
                        affectedNum: M
                    })
                }
            } else {
                var P = this.codUncheckedCartIds;
                if (P && P.length) {
                    this.updateOrderCheckStatus(P, true);
                    this.calculate()
                }
                A.closeCodTip()
            }
            this.useCod = N
        },
        isCod: function () {
            return this.useCod
        },
        resetCod: function () {
            this.codUncheckedCartIds = null;
            this.useCod = false;
            L.attr("#J_FilterCod", "checked", false);
            A.closeCodTip()
        },
        updateOrderCheckStatus: function (R, N) {
            var O = this;
            var Q = {};
            G.each(G.isArray(R) ? R : [R], function (T) {
                var U = O.find("order/" + T);
                if (U) {
                    U.checked = N;
                    A.updateOrderCheckStatus(U.id, N);
                    var S = O.parent(U, "trunk");
                    Q[S.id] = S
                }
            });
            for (var P in Q) {
                var M = Q[P];
                if (N) {
                    A.updateTrunkCheckStatus(P, O._checkTrunkChecked(M))
                } else {
                    M.checked = false;
                    A.updateTrunkCheckStatus(P, false)
                }
            }
            A.updateCartCheckStatus(O._checkCartChecked())
        },
        _checkTrunkChecked: function (O) {
            var N = this._normalized(O, "trunk");
            if (!N) {
                return
            }
            var M = true;
            this.children(N, "order", function (P) {
                if (!P.checked) {
                    M = false
                }
            });
            N.checked = M;
            return M
        },
        updateTrunkCheckStatus: function (O, N) {
            var M = this._normalized(O, "trunk");
            if (!M) {
                return
            }
            M.checked = N;
            A.updateTrunkCheckStatus(M.id, N);
            this.children(M, "order", function (P) {
                P.checked = N;
                A.updateOrderCheckStatus(P.id, N)
            });
            A.updateCartCheckStatus(this._checkCartChecked())
        },
        isTrunkHasSelectedValidOrder: function (O) {
            var N = this._normalized(O, "trunk");
            if (!N) {
                return
            }
            var M = false;
            this.children(N, "order", function (P) {
                if (P.isValid && P.checked) {
                    M = true
                }
            });
            return M
        },
        _normalized: function (N, M) {
            return "string" === typeof N ? this.find(M + "/" + N) : N
        },
        _checkCartChecked: function () {
            var N = this.find("cart");
            var M = true;
            this.children(N, function (O) {
                if (!O.checked) {
                    M = false
                }
            });
            N.checked = M;
            return M
        },
        updateCartCheckStatus: function (M) {
            this.find("cart").checked = M;
            this.find("trunk", function (N) {
                N.checked = M
            });
            this.find("order", function (N) {
                N.checked = M
            })
        },
        testAmount: function (X, R) {
            var b = this;
            var T = b.find("order/" + X);
            if (!T) {
                return false
            }
            var M = T.amount;
            var P = M.max;
            var Z = P.val;
            var U = P.type;
            var N = M.now;
            var O = R.container;
            var S = R.amount;
            var V = R.minus;
            var Y = R.plus;
            var W = "doCorrect" in R ? R.doCorrect : true;
            var Q = G.trim(S.value);
            if (!/^[1-9]\d*$/.exec(Q)) {
                S.value = Q = N
            }
            Q = Q - 0;
            L[1 == Q ? "addClass" : "removeClass"](V, "m-minus-disable");
            L[Z <= Q ? "addClass" : "removeClass"](Y, "m-plus-disable");
            b._removeAmountError(O);
            var a = false;
            if (0 >= Z && "stock" === U) {
                a = true;
                b._addAmountError(O, "\u5e93\u5b58\u4e0d\u8db3");
                W && (S.value = 0);
                return false
            }
            if (!a && Z < Q) {
                a = true;
                b._addAmountError(O, "stock" === U ? "\u6700\u591a\u53ea\u80fd\u8d2d\u4e70" + Z + "\u4ef6" : "\u8be5\u5546\u54c1\u9650\u8d2d" + Z + "\u4ef6");
                W && (S.value = Z)
            }
            if (0 < Z && Z <= 3 && "stock" === U) {
                b._addAmountError(O, "\u4f9b\u8d27\u7d27\u5f20", "m-amount-danger")
            }
        },
        _addAmountError: function (N, O, M) {
            N.appendChild(L.create('<em class="' + (M || "m-amount-error") + '">' + O + "</em>"))
        },
        _removeAmountError: function (M) {
            L.remove(L.query("em", M))
        },
        del: function (Q) {
            var S = this.find(Q);
            if (!S) {
                return
            }
            var O = S._childs;
            if (O) {
                var M = O.map;
                var T = O.type;
                for (var U in M) {
                    this.del(T + "/" + U)
                }
            }
            var N = S.id;
            var P = S._parent;
            if (P) {
                var R = this.find(P.type + "/" + P.id);
                if (R) {
                    var O = R._childs;
                    O.length--;
                    delete O.map[N]
                }
            }
            delete H[S._type][N]
        },
        removeOrders: function (N) {
            var M = this;
            G.each(N, function (O) {
                M.del("order/" + O)
            });
            this.recentDelOrderIds = N
        },
        getRecentDelOrderIds: function () {
            return this.recentDelOrderIds || []
        },
        calculateOrder: function (N) {
            var S = "string" === typeof N ? this.find("order/" + N) : N;
            if (!S) {
                return
            }
            var P = S.price;
            var M = S.services;
            var T = 0;
            if (M) {
                var R = S.amount.now;
                for (var Q = 0, U = M.length; Q < U; Q++) {
                    var V = M[Q];
                    var O = V.now * R;
                    T += O;
                    V.sum = O
                }
            }
            P.service = T;
            P.fee = T + P.sum;
            S.price = P
        },
        updateOrder: function (M, N) {
            var Q = this.find("order/" + M);
            if (!Q) {
                return
            }
            C(Q, N);
            this.calculateOrder(Q);
            var P = Q.price;
            N.price && A.updatePrice(M, P);
            N.promos && A.updatePromos(M, Q.promos);
            var O = Q.services;
            if (O) {
                A.updateService(M, O, {
                    amount: Q.amount.now,
                    serviceFee: P.service
                })
            }
            this.calculate()
        },
        calculate: function () {
            var N = 0;
            var P = false;
            var M = 0;
            var O = [];
            this.find("order", function (Q) {
                if (Q.isValid) {
                    if (Q.checked) {
                        N += Q.price.fee || 0;
                        M++
                    } else {
                        O.push(Q.id)
                    }
                    if (Q.isCod) {
                        P = true
                    }
                }
            });
            A.updateCart({
                sum: N,
                hasCod: P,
                checkedNum: M
            });
            this._setCachedUnCheckedCarts(O)
        },
        _cachedUnCheckedKey: "unCheckedCarts",
        getCachedUnCheckedCarts: function () {
            var N = this._cachedUnCheckedKey;
            var Q = "";
            var M = window.localStorage;
            if (M) {
                Q = M.getItem(N)
            } else {
                var O = this._getUserDataEl();
                O.load("localStorage");
                Q = O.getAttribute(N)
            }
            var P = {};
            if (Q) {
                G.each(Q.split(","), function (R) {
                    P[R] = true
                })
            }
            this._cachedUnChecledCarts = P;
            return P
        },
        _setCachedUnCheckedCarts: function (P) {
            var Q = P.join(",");
            var N = this._cachedUnCheckedKey;
            var M = window.localStorage;
            if (M) {
                Q = M.setItem(N, Q)
            } else {
                var O = this._getUserDataEl();
                O.load("localStorage");
                O.setAttribute(N, Q);
                O.save("localStorage")
            }
        },
        _getUserDataEl: function () {
            var M = this._userDataEl;
            if (!M) {
                M = document.createElement("b");
                M.style.display = "none";
                M.style.behavior = "url(#default#userData)";
                L.insertBefore(M, document.body.lastChild);
                this._userDataEl = M
            }
            return M
        },
        prepareSubmit: function () {
            var N = this;
            var S = [];
            var R = false;
            var Q = [];
            var M = {};
            N.find("order", function (V) {
                var U = V.cartId;
                var T = N.parent(V, "trunk");
                if (V.checked && V.isValid) {
                    S.push(U);
                    if (!R && "B" === T.host) {
                        R = true
                    }
                    Q.push([V.cartId, V.itemId, V.amount.now, V.skuId].join("_"));
                    M[U] = 1
                } else {
                    if ("combo" === T.type) {
                        M[U] = 1
                    }
                }
            });
            var P = [];
            for (var O in M) {
                P.push(O)
            }
            return {
                cartIds: S,
                hasMallItems: R,
                tbCartData: Q,
                delCartIds: P
            }
        },
        async: function (T, O, N, R) {
            var V = this;
            var M = [];
            var P = {};
            var U = [];
            R = R || {};
            G.each(O, function (X) {
                var W = V.parent("order/" + X, "trunk");
                P[W.id] = W
            });
            if ("check" === T) {
                G.each(P, function (W) {
                    E.children(W, "order", function (X) {
                        if (X.isValid && X.checked) {
                            U.push({
                                quantity: X.amount.now,
                                cartId: X.id
                            })
                        }
                    });
                    M.push({
                        cart: U,
                        operate: [],
                        type: "check"
                    })
                })
            } else {
                if ("update" === T) {
                    var Q = V.find("order/" + O[0]);
                    if (Q.checked) {
                        G.each(P, function (W) {
                            E.children(W, "order", function (X) {
                                if (X.isValid && X.checked) {
                                    U.push({
                                        quantity: X.id === R.id ? R.quantity : X.amount.now,
                                        cartId: X.id
                                    })
                                }
                            });
                            M.push({
                                cart: U,
                                operate: O,
                                type: "update"
                            })
                        })
                    } else {
                        M.push({
                            type: "update",
                            operate: O,
                            cart: [{
                                quantity: R.quantity,
                                cartId: R.id
                            }]
                        })
                    }
                } else {
                    if ("delete" === T) {
                        var S = R.type || (O.length > 1 ? "deleteSome" : "delete");
                        G.each(P, function (W) {
                            E.children(W, "order", function (X) {
                                if (X.checked) {
                                    if (X.isValid) {
                                        U.push({
                                            quantity: X.amount.now,
                                            cartId: X.id
                                        })
                                    } else {
                                        if (G.inArray(X.id, O)) {
                                            U.push({
                                                quantity: 0,
                                                cartId: X.id
                                            })
                                        }
                                    }
                                }
                            });
                            M.push({
                                cart: U,
                                operate: O,
                                type: S
                            })
                        })
                    }
                }
            }
            D({
                type: "post",
                url: B.getConfig("api/" + T),
                data: {
                    _input_charset: "utf-8",
                    data: I.stringify(M),
                    _tb_token_: B.getConfig("_tb_token_")
                },
                dataType: "json",
                success: function (W) {
                    if (W.success) {
                        var X = W.globalData || {};
                        B.Event.fire("sss", X.sss);
                        N.success(W)
                    } else {
                        N.error(W)
                    }
                },
                error: N.error,
                timeout: 5
            })
        },
        _noAttentionCartIds: [],
        calculateStatusNum: function () {
            var N = 0;
            var O = 0;
            var M = [];
            this.find("order", function (P) {
                if (!P.isValid) {
                    O++
                }
                if (false === P.isAttention) {
                    M.push(P.id)
                }
                N++
            });
            this._noAttentionCartIds = M;
            return {
                total: N,
                invalid: O,
                disable: 0,
                normal: N - O,
                isNotAttenItems: M
            }
        },
        getNoAttentionCartIds: function () {
            return this._noAttentionCartIds
        },
        activeNoAttenItem: function (N) {
            var M = this.find("order/" + N);
            if (M) {
                M.isAttention = true
            }
            var O = [];
            G.each(this._noAttentionCartIds, function (P) {
                if (P !== N) {
                    O.push(P)
                }
            });
            this._noAttentionCartIds = O;
            if (0 === O.length) {
                L.removeClass("#J_StatusBar", "status-clear")
            }
        }
    };

    function C() {
        var M = arguments.length;
        var Q = arguments[0];
        if (2 === M) {
            var P = arguments[1];
            for (var O in P) {
                var R = P[O];
                if (K(Q[O]) && K(R)) {
                    C(Q[O], R)
                } else {
                    Q[O] = R
                }
            }
        } else {
            for (var N = 1; N < M; N++) {
                C(Q, arguments[N])
            }
        }
    }
    return E
}, {
    requires: ["dom", "event", "ajax", "json", "cart/global", "cart/view"]
}); 