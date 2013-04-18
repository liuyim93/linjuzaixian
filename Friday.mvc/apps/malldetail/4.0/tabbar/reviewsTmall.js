KISSY.add("malldetail/tabbar/reviewsTmall", function (G, D, V, Y, X) {
    var W;
    var H = window.g_config,
		F;
    var T, M, U, R = false,
		I = false,
		P, N, C = document,
		B, J = "#J_Reviews";
    var L = {
        tags: null,
        selectedTag: {
            id: null,
            posi: null,
            name: ""
        }
    };
    var Q = function (S) {
        if (typeof S == "string") {
            return S.replace(/\\n/gi, "<br/>").replace(/\\r/gi, "")
        } else {
            return S
        }
    };
    var K = false;
    var E;

    function O(b) {
        var a = "http://log.mmstat.com/";
        var d = {
            meiz: {
                tagtrue: "tmallmz.2.6",
                tagfalse: "tmallmz.2.5",
                order1: "tmallmz.2.4",
                order2: "tmallmz.2.3",
                forshop1: "tmallmz.2.2",
                page: "tmallmz.2.7",
                tagView: "tmallmz.2.1",
                tag: "tmallmz.2.1"
            },
            all: {
                spudetail: "tmallrate.1.5.2",
                spupage: "tmallrate.1.5.4",
                "tmRate-add": "tmallrate.6.2.7",
                "tmRate-time": "tmallrate.6.2.6",
                "tmRate-page": "tmallrate.6.2.5",
                "tmRate-good": "tmallrate.6.2.4",
                "tmRate-bad": "tmallrate.6.2.3",
                "tmRate-xy": "tmallrate.6.2.2",
                "tmRate-cloud": "tmallrate.6.2.1",
                "tmRate-userName": "tmallrate.1.1",
                "tmRate-xyLv": "tmallrate.1.3",
                "tmRate-dr": "tmallrate.1.4",
                itemdetail: "tmallrate.1.5.1",
                itempage: "tmallrate.1.5.3"
            },
            muying: {
                myAppend: "tmallrate.6.1.7",
                myPage: "tmallrate.6.1.6",
                myTagtrue: "tmallrate.6.1.5",
                myTagfalse: "tmallrate.6.1.4",
                myOrder1: "tmallrate.6.1.3",
                myOrder2: "tmallrate.6.1.2",
                myTag: "tmallrate.6.1.1"
            }
        };
        var S = b.from,
			c = b.type,
			Z = d[S][c];
        if (Z) {
            G.sendAtpanel(Z, {
                shopid: W.rstShopId,
                itemid: W.itemDO.itemId,
                categoryId: W.itemDO.categoryId
            })
        }
    }
    function A() {
        var v = {
            itemId: W.itemDO.itemId,
            spuId: W.itemDO.spuId,
            sellerId: W.itemDO.userId,
            order: 0,
            forShop: 1
        }, t = null,
			u = 0,
			f = H.isSpu,
			_str_review = "与描述相符",
			x, h, g = V.create('<div class="bd">正在加载 ...<br /><div style="min-height:400px;_height:400px;"></div></div>');
        if (W.isMeiz) {
            W.tmallRateType = 1
        }
        if (W.closeTmallRate) {
            W.tmallRateType = 0
        }
        V.insertAfter(g, V.get("h4.hd", "#J_Reviews"));
        p();
        l();

        function Z(z) {
            var AB = '{{#each tags as tag}}								<li class="{{#if tag.posi}}posi{{/if}}">									<a href="#" data-tagid="{{tag.id}}" data-tagtype="{{tag.posi}}"{{#if tag.id==selectedTag.id && tag.posi==selectedTag.posi}} class="selected"{{/if}}>{{tag.tag}}({{tag.count}})<s></s></a>								</li>							{{/each}}',
				y = L.tags.sort(function (AC, AD) {
				    return AD.count - AC.count
				});

            function AA(AC, AD) {
                var AE = (AD.posi ? 1 : 0) - (AC.posi ? 1 : 0);
                if (AE) {
                    return AE
                }
                return AD.count - AC.count
            }
            if (!z) {
                y = y.slice(0, 8)
            }
            V.html(V.get(".btag-list", E), G.Template(AB).render({
                tags: y.sort(AA),
                selectedTag: L.selectedTag
            }))
        }
        function d() {
            I = true;
            D({
                url: W.url.rate + "/listTagClouds.htm",
                data: {
                    itemId: W.itemDO.itemId,
                    isAll: "true",
                    isInner: "true"
                },
                dataType: "jsonp",
                jsonpCallback: "loadtagjsoncallback",
                success: function (AH) {
                    O({
                        from: "all",
                        type: "tmRate-cloud"
                    });
                    var AO = {
                        tags: AH.tags.tagClouds
                    };
                    L.tags = AH.tags.tagClouds;
                    if (AO.tags.length) {
                        if (W.tmallRateType == 1) {
                            O({
                                from: "meiz",
                                type: "tagView"
                            })
                        } else {
                            if (W.tmallRateType == 2) {
                                O({
                                    from: "muying",
                                    type: "myTag"
                                })
                            }
                        }
                        var AC = 0;
                        for (var AI = 0; AI < AO.tags.length; AI++) {
                            AC += AO.tags[AI].count
                        }
                        if (AC >= 20) {
                            E.innerHTML = '<ul class="btag-list"></ul>' + (AO.tags.length > 8 ? '<em class="pay-toggler" title="\u663e\u793a\u6240\u6709\u4fe1\u606f"></em>' : "");
                            Z(false)
                        } else {
                            V.removeClass("#J_RateScore", "tm-tagRate-info");
                            if (x) {
                                G.get("#J_Graph").innerHTML = G.Template(h).render({
                                    scoreInfo: x
                                })
                            }
                        }
                        if (-1 !== location.href.indexOf("on_comment=1")) {
                            var AK = location.href.match(/on_tagid=(\d+)/);
                            if (AK) {
                                var AD = AK[1];
                                for (var AI = 0, AG = AO.tags.length; AI < AG; AI++) {
                                    if (AO.tags[AI]["id"] == AD && AO.tags[AI]["posi"]) {
                                        c(AD, "true");
                                        break
                                    }
                                }
                            }
                        }
                    } else {
                        V.removeClass("#J_RateScore", "tm-tagRate-info")
                    }
                    var AB = AH.tags.innerTagCloudList;
                    if (AB && AB[0]) {
                        var AM = 0;
                        for (var AI = AB.length - 1; AI >= 0; AI--) {
                            var AL = AB[AI].tagScaleList,
								AE = 0,
								AG, AF;
                            AM += AB[AI].total;
                            for (AG = 0; AG < AL.length; AG++) {
                                if (!AL[AG].proportion) {
                                    AL.splice(AG, 1);
                                    AG--;
                                    continue
                                }
                                AL[AG]._index = AG;
                                AL[AG]._ahead = AE;
                                AL[AG]._width = AL[AG].scale.length * 14;
                                AL[AG]._proportion = Math.max(4, AL[AG].proportion);
                                AL[AG]._position = AE * 2 + AL[AG]._proportion;
                                AE += AL[AG]._proportion
                            }
                            list1 = AL.slice(0).sort(function (AQ, AP) {
                                return AP.proportion - AQ.proportion
                            });
                            for (AF = list1.length - 1; AF >= 0; AF--) {
                                AG = list1[AF]._index;
                                var AJ = AL[AG]._position,
									AA = AL[AG]._width,
									AN = AL[AG]._index == 0 ? (AJ + 100) : (AJ - AL[AG - 1]._position - AA / 2 - AL[AG - 1]._width / 2),
									z = AL[AG]._index == AL.length - 1 ? (250 - AJ) : (AL[AG + 1]._position - AJ - AA / 2 - AL[AG + 1]._width / 2);
                                if (AN < z && AN < 0) {
                                    AL[AG]._position -= Math.max(AN, -AA / 2)
                                } else {
                                    if (AN > z && z < 0) {
                                        AL[AG]._position += Math.max(z, -AA / 2)
                                    }
                                }
                                AL[AG]._order = AF
                            }
                        }
                        if (AM > 20) {
                            var y = V.create('<div class="persentInfo">');
                            y.innerHTML = G.Template('<div class="hd">\u5927\u5bb6\u8ba4\u4e3a</div><div class="bd tb-clearfix">								{{#each tags.innerTagCloudList as tag}}<label>{{tag.dimenName}}: </label><p>									{{#each tag.tagScaleList as scale index}}										{{#if scale.proportion}}										<s class="level_{{scale._order}}" style="left:{{scale._position-25}}px;width:50px;">{{scale.scale}}</s>										<i class="level_{{scale._order}}" style="left:{{scale._ahead*2+scale._proportion-3+index*2}}px;"></i>										<span class="level_{{scale._order}} {{#if index==0}}edge-left{{/if}} {{#if index==tag.tagScaleList.length-1}}edge-right{{/if}} " title="{{scale.scale}}:{{scale.proportion}}%" style="width: {{scale._proportion*2}}px">											{{#if scale._order==0}}{{scale.proportion}}%{{/if}}										</span>										{{/if}}									{{/each}}								</p>{{/each}}								</div>').render(AH);
                            V.insertAfter(y, V.get("#J_RateScore", g))
                        }
                    }
                }
            })
        }
        function l() {
            B = v.append;
            G.use("malldetail/data/data", function (z, y) {
                y.onReviewCount(function (AA) {
                    P = AA.gradeAvg;
                    D({
                        url: W.url.rate + "/list_detail_rate.htm",
                        data: v,
                        dataType: "jsonp",
                        success: function (AB) {
                            window.TB.detailRate = AB.rateDetail;
                            if (!I) {
                                g.innerHTML = n(m(window.TB.detailRate));
                                d();
                                M = z.get("#J_Show-rate-table");
                                b();
                                q(1)
                            } else {
                                M.innerHTML = n(m(window.TB.detailRate))
                            }
                            if (!E) {
                                E = z.get("#J_Graph")
                            }
                            i();
                            window.TB.detailRate = null;
                            var AC = f ? "spudetail" : "itemdetail";
                            O({
                                from: "all",
                                type: AC
                            })
                        }
                    })
                })
            })
        }
        function i() {
            G.each(G.query("#J_Show-rate-table .rate-auto"), function (y) {
                if (y.offsetHeight / 18 > 10) {
                    V.insertAfter(V.create("<div class='rate-btn'><a href='javascript:;' title='\u5c55\u5f00\u5168\u6587' class='b-showMore'>&nbsp;</a></div>"), y);
                    V.addClass(y, "rate-haveMoreContent")
                }
            })
        }
        function k() {
            var y = L.tags;
            var AC = L.selectedTag.id;
            var AB = L.selectedTag.posi;
            var AA = "";
            for (var z = 0; z < y.length; z++) {
                if (y[z]["id"] == AC && y[z]["posi"] == AB) {
                    AA = y[z]["tag"];
                    break
                }
            }
            return AA
        }
        function p() {
            Y.on(g, "click", function (AB) {
                var AA = AB.target,
					z;
                switch (true) {
                    case AA.tagName === "A" && V.hasClass(AA, "act-showmore"):
                        v.ismore = "1";
                        l();
                        break;
                    case AA.tagName === "A" && ((z = AA.getAttribute("data-page")) != null):
                        if (G.mods.TabBar && G.mods.TabBar.curIndex() == "J_Reviews") {
                            G.sendAtpanel("tmalldetail.12.2")
                        } else {
                            G.sendAtpanel("tmalldetail.12.4")
                        }
                        o(z);
                        break;
                    case (AA.tagName === "A" || AA.tagName === "EM") && ((z = AA.getAttribute("data-forShop")) != null):
                        AB.preventDefault();
                        if (W.tmallRateType) {
                            v.append = 0
                        }
                        q(z);
                        break;
                    case (AA.tagName === "A" || AA.tagName === "EM") && ((z = AA.getAttribute("data-tagid")) != null):
                        AB.preventDefault();
                        if (L.selectedTag.id == z && L.selectedTag.posi == (AA.getAttribute("data-tagtype") == "true")) {
                            if (V.get("#J_allShop")) {
                                V.get("#J_allShop").className = "curr"
                            }
                            delete v.tagId;
                            delete v.posi;
                            V.removeClass("#J_Graph a", "selected");
                            v.currentPage = 1;
                            L.selectedTag.id = null;
                            L.selectedTag.posi = null;
                            L.selectedTag.name = "";
                            l()
                        } else {
                            if (W.tmallRateType) {
                                v.append = 0
                            }
                            v.append = 0;
                            V.removeClass("#J_toggletype a", "curr");
                            c(z, AA.getAttribute("data-tagtype"));
                            V.removeClass("#J_Graph a", "selected");
                            V.addClass(AA, "selected");
                            V.get("#J_addComment").checked = false;
                            L.selectedTag.id = z;
                            L.selectedTag.posi = AA.getAttribute("data-tagtype") == "true" ? true : false;
                            L.selectedTag.name = k()
                        }
                        break;
                    case V.hasClass(AA, "J_Reviews2recommend"):
                        AB.preventDefault();
                        if (!F.switchTab) {
                            return
                        }
                        if (G.mods.TabBar && G.mods.TabBar.curIndex() == "J_Reviews") {
                            G.sendAtpanel("tmalldetail.12.3")
                        } else {
                            G.sendAtpanel("tmalldetail.12.5")
                        }
                        F.switchTab("J_TabRecommends");
                        break;
                    case V.hasClass(AA, "pay-toggler"):
                        AB.preventDefault();
                        if (K) {
                            Z(K = false);
                            V.removeClass("#J_RateScore", "tglistOpen")
                        } else {
                            Z(K = true);
                            V.addClass("#J_RateScore", "tglistOpen")
                        }
                        break;
                    case AA.tagName === "A" && V.hasClass(AA, "b-showMore"):
                        var y = AA.parentNode.previousSibling;
                        if (V.hasClass(y, "rate-haveMoreContentShow")) {
                            V.removeClass(y, "rate-haveMoreContentShow");
                            AA.title = "展开全文";
                            V.removeClass(AA, "b-showMore-open")
                        } else {
                            V.addClass(y, "rate-haveMoreContentShow");
                            AA.title = "缩进全文";
                            V.addClass(AA, "b-showMore-open")
                        }
                        break
                }
            })
        }
        function b() {
            var y = V.query("#J_commentOrder a", g);
            Y.on(y, "click", function () {
                V.removeClass(y, "curr");
                V.addClass(this, "curr");
                v.currentPage = 1;
                var z = V.attr(this, "value");
                if (z == 1) {
                    O({
                        from: "all",
                        type: "tmRate-time"
                    })
                } else {
                    if (z == 2) {
                        O({
                            from: "all",
                            type: "tmRate-xy"
                        })
                    }
                }
                if (z == 3) {
                    v.append = 1;
                    if (v.tagId) {
                        delete v.tagId;
                        delete v.posi;
                        V.removeClass("#J_Graph a", "selected")
                    }
                    if (W.tmallRateType == 2) {
                        O({
                            from: "muying",
                            type: "myAppend"
                        })
                    }
                } else {
                    v.order = z;
                    if (W.tmallRateType == 1) {
                        O({
                            from: "meiz",
                            type: "order" + v.order
                        })
                    } else {
                        if (W.tmallRateType == 2) {
                            O({
                                from: "muying",
                                type: "myOrder" + v.order
                            })
                        }
                    }
                }
                if (v.order == 0) {
                    V.show(V.get(".ui-msg", "#J_commentOrder"))
                } else {
                    V.hide(V.get(".ui-msg", "#J_commentOrder"))
                }
                l();
                return false
            });
            j()
        }
        function c(z, y) {
            v.tagId = z;
            v.currentPage = 1;
            v.posi = y == "true" ? "1" : "-1";
            if (y == "true") {
                O({
                    from: "all",
                    type: "tmRate-good"
                })
            } else {
                O({
                    from: "all",
                    type: "tmRate-bad"
                })
            }
            if (W.tmallRateType == 1) {
                O({
                    from: "meiz",
                    type: "tag" + y
                })
            } else {
                if (W.tmallRateType == 2) {
                    O({
                        from: "muying",
                        type: "myTag" + y
                    })
                }
            }
            l()
        }
        function j() {
            Y.on("#J_addComment", "click", function () {
                if (this.checked) {
                    v.append = 1;
                    delete (v.forShop);
                    delete v.tagId;
                    V.removeClass("#J_toggletype a", "curr");
                    V.removeClass("#J_Graph a", "selected")
                } else {
                    v.append = 0;
                    v.forShop = 1;
                    if (V.get("#J_allShop")) {
                        V.get("#J_allShop").className = "curr"
                    }
                }
                O({
                    from: "all",
                    type: "tmRate-add"
                });
                l()
            })
        }
        function q(z) {
            var y = G.all("a", G.get(".act-toggletype"));
            if (y.length > 0) {
                V.removeClass(y, "curr");
                G.each(y, function (AA) {
                    if (V.attr(AA, "data-forshop") == z) {
                        V.addClass(AA, "curr")
                    }
                })
            }
            V.get("#J_addComment").checked = false;
            v.append = 0;
            v.forShop = z;
            v.currentPage = 1;
            delete v.tagId;
            delete v.posi;
            V.removeClass("#J_Graph a", "selected");
            if (z > 0 && W.tmallRateType == 1) {
                O({
                    from: "meiz",
                    type: "forshop1"
                })
            }
            l()
        }
        function o(AA, y) {
            var z = "";
            AA = +AA;
            if (isNaN(AA)) {
                z = "\u8bf7\u8f93\u5165\u4e00\u4e2a\u6570\u5b57"
            }
            if (z === "" && t && (AA < 1 || AA > t.lastPage)) {
                z = "\u9875\u7801\u8303\u56f4\u5728 1 \u5230 " + t.lastPage + " \u4e4b\u95f4"
            }
            if (z === "") {
                v.currentPage = AA;
                v.ismore = 1;
                G.later(function () {
                    if (W.tmallRateType == 1) {
                        O({
                            from: "meiz",
                            type: "page"
                        })
                    } else {
                        if (W.tmallRateType == 2) {
                            O({
                                from: "muying",
                                type: "myPage"
                            })
                        }
                    }
                    l();
                    var AB = f ? "spupage" : "itempage";
                    O({
                        from: "all",
                        type: AB
                    });
                    O({
                        from: "all",
                        type: "tmRate-page"
                    });
                    G.scrollToElem(T)
                }, 0)
            } else {
                alert(z);
                y && y.focus && y.focus()
            }
        }
        function n(AF) {
            var AA = '<a class="reviews2recommend J_Reviews2recommend" id="J_Reviews2recommend" href="#" >\u5176\u4ed6\u540c\u7c7b\u5546\u54c1<span class="rarr J_Reviews2recommend"></span></a>';
            h = '<div class="scroller"><span style="width: {{scoreInfo.width}}%;"><em {{scoreInfo.hideMerchandisScore}}>{{scoreInfo.merchandisScore}}</em></span></div><div class="rate-desc"><ul><li>\u975e\u5e38\u4e0d\u6ee1</li><li>\u4e0d\u6ee1\u610f</li><li>\u4e00\u822c</li><li>\u6ee1\u610f</li><li>\u975e\u5e38\u6ee1\u610f</li></ul></div>';
            var AC = {
                scoreInfo: '<div id="J_RateScore" class="tm-tagRate-info tm-clear"><div class="score-box"><h4>{{scoreInfo.scoreSummaryTitle}}</h4><strong class="score">{{scoreInfo.merchandisScore}}</strong><p class="scoreInfo"><span class="c-value-no c-value-{{scoreInfo.rateStar}}"><em>{{scoreInfo.merchandisScore}} \u5206</em></span></div><div class="rate-seprate"><div class="hotTag">\u5927\u5bb6\u90fd\u5199\u9053</div></div><div class="tm-rate-info"><div class="graph" id="J_Graph">' + h + "</div></div></div>",
                rateListInfo: '<div class="rate-select tm-clear"><ul class="act-toggletype" id="J_toggletype">{{#if showChooseTopic}}<li><a href="#" data-forShop="0" >\u7cbe\u9009\u8bc4\u4ef7</a></li><li><a href="#" data-forShop="1" class="curr" id="J_allShop">\u672c\u5e97\u6240\u6709\u8bc4\u4ef7</a></li>{{/if}}<input type="checkbox" id="J_addComment"></input><label class="addLabel" for="J_addComment">\u67e5\u770b\u8ffd\u52a0{{#if rateCount && rateCount.used}}({{rateCount.used}}){{/if}}</label></ul><div id="J_TagSelected" style="float:left;"></div><ul class="act-changetype" aria-labelledby="\u9009\u62e9\u8981\u663e\u793a\u7684\u8bc4\u4ef7" id="J_commentOrder"><li><div class="ui-msg tb-clearfix"><div class="ui-msg-tip"> \u6709\u5185\u5bb9\u8bc4\u4ef7(10\u5b57\u53ca\u4ee5\u4e0a)  <s class="ui-msg-icon"></s> </div> <s class="ui-msg-arrow ui-msg-arrow-right"></s></div><a href="#" value="0" class="curr" {{commType.isShowAll}}}>\u9ed8\u8ba4</a></li><li><a href="#" value="1" {{commType.isHasContent}}>\u6309\u65f6\u95f4<i></i></a></li><li><a href="#" value="2" {{commType.isNoContent}}>\u6309\u4fe1\u7528<i></i></a></li></ul></div>',
                tfoot: '<tfoot><tr><td colspan="5">' + AA + '<div class="pagination"> {prevPageLink} {prevMore}%pages1%<span class="page-cur">{page}</span>%pages2%{nextMore}{nextPageLink} </div></td></tr></tfoot>',
                table: '<table style="width: 100%;" class="show-rate-table"><tbody>%rateList%</tbody>%tfoot%</table>',
                rateList: '<tr><td class="cmt">									{{#if rateContent && serviceRateContent }}										<p style="text-align: left; max-width: 100%;" class="rate rate-auto"><s>\u5546\u54c1: </s>{{rateContent}}</p>										<p style="text-align: left; max-width: 100%;" class="rate rate-auto"><s>\u670d\u52a1: </s>{{serviceRateContent}}</p>									{{#else}}										<p style="text-align: left; max-width: 100%;" class="rate rate-auto">{{rateContent}}{{serviceRateContent}}</p>									{{/if}}									{{#if reply }}<p class="reply rate-auto"><span class="appendTitle">\u89e3\u91ca: </span>{{reply}}</p>{{/if}}								</td><td class="sku">									{{#if auctionSku }}									<p class="cmtInfo">{{#each auctionSku.split(";") as item}}<span class="actSku">										<span class="title">{{item.split(":",2)[0]}}</span><span>: {{item.split(":",2)[1]}}</span>									</span>{{/each}}</p>									{{/if}}                                </td><td class="buyer" data-spm="1000822">									{{#if ' + (H.offlineShop ? "true" : "false") + " }}										<a>{{displayUserNick}}</a> 									{{#elseif !fromMall }}										<p>{{displayUserNick1}}</p>										{{#if " + (W.isMeiz ? "true" : "false") + ' && cmsSource }}<p class="from">\u6765\u81ea\uff1a{{cmsSource}}</p>{{/if}}									{{#elseif (fromMall && anony) || !(displayUserNumId > 0)}}										<p>{{displayUserNick1}}  &nbsp;<span class="tb-anonymous">(\u533f\u540d)</span></p>									{{#else}}										<p><a target="_blank" href="{{displayUserLink}}">{{displayUserNick}}</a></p>									{{/if}}									{{#if (tamllSweetLevel||userVipLevel) && tamllSweetLevel>0 }}										<a href="' + (H.offlineShop ? "#" : "http://vip.tmall.com") + '" target="_blank" class="tmallVip"><img src="http://l.tbcdn.cn/apps/membermanager/v2/image/{{tmallSweetPic}}" alt=""/></a>									{{/if}}									{{#if fromMall }}										<span><a											{{#if ' + (H.offlineShop ? "true" : "false") + ' && !anony && displayUserNumId>0}} href="http://rate.taobao.com/user-rate-{{displayUserNumId}}.htm?buyerOrSeller=1" target="_blank"{{/if}}											>{{grade}}</a></span>									{{/if}}									{{#if attributes&&attributes.indexOf("giftBillId")!=-1 }}										<p class="userGift">\u83b7\u8ba4\u771f\u8bc4\u4ef7\u5956  <i class="tb-icon-gift"></i></p>									{{/if}}								</td></tr><tr class="baseline"><td class="time">									<span class="date">[{{rateDate}}]</span>									{{#if appendComment.content }}										<div class="cmt-append"><i class="cmt-append-horn"></i>										<p class="appendRate rate-auto">											<span class="appendTime">{{#if appendComment.days === 0 }}\u5f53\u5929\u8ffd\u52a0: {{#elseif appendComment.days }}{{appendComment.days}}\u5929\u540e\u8ffd\u52a0: {{#else}}{{appendComment.commentTime}}\u8ffd\u52a0: {{/if}}</span>											{{appendComment.content}}										</p>										{{#if appendComment.reply }}<p class="appendReply rate-auto"><span class="appendTitle">\u89e3\u91ca\uff1a</span>{{appendComment.reply}}</p>{{/if}}										</div>									{{/if}}								</td><td class="user">									{{#if userInfo }}<p class="cmtInfo">{{#each userInfo.split(";") as item}}										 {{item.split(":",2)[1]}}									{{/each}}</p>{{/if}}                                </td><td class="times">									{{#if buyTimes }}										\u5728\u672c\u5e97\u4e70\u8fc7<span class="buyTimes">{{buyTimes}}</span>\u6b21									{{/if}}								</td></tr>',
                page: ' <a href="javascript:void(0);" data-page="{page}">{page}</a> '
            }, AB = [],
				AE = [],
				AD = [],
				AG = [];
            if (AF.paginator) {
                if (AF.paginator["pages1"]) {
                    G.each(AF.paginator["pages1"], function (AH) {
                        AE[AE.length] = w(AC.page, AH)
                    })
                }
                if (AF.paginator["pages2"]) {
                    G.each(AF.paginator["pages2"], function (AH) {
                        AD[AD.length] = w(AC.page, AH)
                    })
                }
            } else {
                AC.tfoot = '<tfoot><tr><td colspan="5">' + AA + "</td></tr></tfoot>"
            }
            var y = AF.rateList || AF.rateDetail.rateList;
            G.each(y, function (AH) {
                AG[AG.length] = X(AC.rateList).render(AH)
            });
            AE = AE.join("");
            AD = AD.join("");
            AG = AG.join("");
            AC.table = AC.table.replace("%tfoot%", AC.tfoot).replace("%pages1%", AE).replace("%pages2%", AD).replace("%rateList%", AG);
            if (!I) {
                if (W.tmallRateType) {
                    AB.push('<div class="rate-meiz">')
                }
                if (!G.cfg("detail").rateCloudDisable && !G.isUndefined(P)) {
                    AB.push(X(AC.scoreInfo).render(AF))
                }
                AB.push(X(AC.rateListInfo).render(AF));
                if (W.tmallRateType) {
                    AB.push("</div>")
                }
                AB.push('<div id="J_Show-rate-table">')
            }
            AB.push(w(AC.table, AF.paginator));
            if (!I) {
                AB.push("</div")
            }
            if (!W.tmallRateType) {
                h = null
            }
            if (W.tmallRateType) {
                if (typeof v.append != "undefined" && v.append == 0) {
                    if (V.get("select.act-changetype", g)) {
                        var z = V.get("select.act-changetype", g);
                        if (z.options[z.selectedIndex].value == 3) {
                            z.options[0].selected = true
                        }
                    }
                }
            }
            return AB.join("")
        }
        function e(z) {
            var _rating_combo = {};
            if (!G.isUndefined(P)) {
                _rating_combo.merchandisScore = P;
                _rating_combo.width = P / 5 * 100;
                _rating_combo.rateStar = P.replace(".0", "").replace(".", "d");
                _rating_combo.scoreSummaryTitle = _str_review;
                if (P === "0.0") {
                    _rating_combo.merchandisScore = "";
                    _rating_combo.merchandisScoreSuffix = "";
                    _rating_combo.hideMerchandisScore = 'style="display:none"'
                } else {
                    _rating_combo.merchandisScoreSuffix = "分";
                    _rating_combo.hideMerchandisScore = ""
                }
            }
            return _rating_combo
        }
        function m(AJ) {
            var AI = AJ.paginator,
				AL = AJ.rateList;
            AJ.showChooseTopic = AJ.rateDanceInfo.showChooseTopic;
            AJ.scoreInfo = e(AJ);
            AJ.tmallRateType = W.tmallRateType;
            G.each(AL, function (AO) {
                var AM = AO;
                var AN = AO;
                AO.grade = r(AM.displayRateSum, AM.displayRatePic), vipicon = ["http://img03.taobaocdn.com/tps/i3/T1PbuIXclkXXXXXXXX-16-16.png", "http://img04.taobaocdn.com/tps/i4/T1FHuIXcNkXXXXXXXX-16-16.png", "http://img01.taobaocdn.com/tps/i1/T1GYuIXcRkXXXXXXXX-16-16.png", "http://img02.taobaocdn.com/tps/i2/T1HbuIXcNkXXXXXXXX-16-16.png", "http://img03.taobaocdn.com/tps/i3/T1GbuIXcNkXXXXXXXX-16-16.png", "http://img01.taobaocdn.com/tps/i1/T1pHyIXalkXXXXXXXX-16-16.png"];
                AO.rateDate = a(AO.rateDate);
                if (typeof AO.appendComment == "object") {
                    AO.appendComment.commentTime = a(AO.appendComment.commentTime);
                    if (AO.appendComment.content) {
                        AO.appendComment.content = Q(AO.appendComment.content)
                    }
                    if (AO.appendComment.reply) {
                        AO.appendComment.reply = Q(AO.appendComment.reply)
                    }
                    while (AO.appendComment.days < 0) {
                        AO.appendComment.days += 365
                    }
                }
                AO.rateContent = Q(AO.rateContent);
                AO.serviceRateContent = Q(AO.serviceRateContent);
                if (AO.reply) {
                    AO.reply = Q(AO.reply)
                }
                AO.displayUserNick1 = AO.displayUserNick.replace(/(\*+)/, '<span class="tb-anonymous">$1</span>');
                AO.fromMall = AO.fromMall || (typeof AO.fromMall == "undefined")
            });
            var z = "selected='selected'";
            AJ.commType = {
                isShowAll: v.showContent === "" ? z : "",
                isHasContent: v.showContent === "1" ? z : "",
                isNoContent: v.showContent === "0" ? z : "",
                isHasAppend: v.showContent === "2" ? z : ""
            };
            var AH = {};
            if (AI.lastPage > 0) {
                var AE = AI.page,
					AC, AF = '<span class="page-break">...</span>';
                AI.lastPage = AI.lastPage > 99 ? 99 : AI.lastPage;
                if (AE == 1) {
                    u = AI.lastPage
                }
                if (AE < 5) {
                    AC = AI.lastPage > u ? AI.lastPage : u
                } else {
                    AC = AI.lastPage
                }
                AH.page = AE;
                AH.prevPageLink = AE > 1 ? S(AE - 1, "&lt;&lt;\u4e0a\u4e00\u9875", "page-prev") : '<span class="page-start">&lt;&lt;\u4e0a\u4e00\u9875</span>';
                AH.nextPageLink = (AE < AC) ? S(AE + 1, "\u4e0b\u4e00\u9875&gt;&gt;", "page-next") : '<span class="page-end">\u4e0b\u4e00\u9875&gt;&gt;</span>';
                var AA, AB, y, AD, AK, AG = {
                    1: 4,
                    2: 4,
                    3: 4,
                    4: 3
                };
                AB = [];
                y = (AE === AC ? 4 : 2);
                for (AA = AE - y > 0 ? AE - y : 1; AA > 0 && AA < AE; ++AA) {
                    AB.push({
                        page: AA
                    })
                }
                AH.pages1 = AB;
                AB = [];
                y = AE < 5 ? AG[AE] : 2;
                for (AA = AE + 1; AA <= AE + y && AA <= AC; ++AA) {
                    AB.push({
                        page: AA
                    })
                }
                AH.pages2 = AB;
                AD = AE == 1 ? AE : AH.pages1[0].page;
                AK = AE == AC ? AE : AH.pages2[AH.pages2.length - 1].page;
                AH.prevMore = AD > 1 ? S(1, "1") + (AD > 2 ? S(2, "2") : "") + (AD > 3 ? AF : "") : "";
                AH.nextMore = (AK <= AC && AE != AC && u >= 5) ? AF : ""
            } else {
                AH = null
            }
            AJ.paginator = AH;
            AJ.tmallRateType = W.tmallRateType;
            return AJ
        }
        function w(z, AA) {
            var y;
            for (y in AA) {
                z = z.replace(new RegExp("{" + y + "}", "g"), AA[y])
            }
            return z
        }
        function a(AC) {
            var AB = AC.split(" ")[0].split("-"),
				AA = new Date(),
				AE, z, AD;
            AE = AB[0];
            z = AB[1];
            AD = AB[2];
            if (AE == AA.getFullYear() && z - 1 == AA.getMonth() && AD == AA.getDate()) {
                return "\u4eca\u5929"
            } else {
                return (AE < AA.getFullYear() ? AE + "." : "") + z + "." + AD
            }
        }
        function r(AB, z) {
            var y = [0, 4, 11, 41, 91, 151, 251, 501, 1001, 2001, 5001, 10001, 20001, 50001, 100001, 200001, 500001, 1000001, 2000001, 5000001, 10000001],
				AD = [0, 0];
            var AC = 0,
				AA;
            while (AC < y.length && AB >= y[AC]) {
                AD[0] = y[AC];
                ++AC;
                AD[1] = y[AC]
            } --AC;
            if (!AD[1]) {
                AD.pop();
                AD[0] += "\u4ee5\u4e0a"
            } else {
                AD[1] = (AD[1] - 1) + "\u4e2a"
            }
            AD = AD.join(" - ");
            return AB >= 4 ? ['<img align="absmiddle" class="rank" title="', AD, '\u4e70\u5bb6\u4fe1\u7528\u79ef\u5206\uff0c\u8bf7\u70b9\u51fb\u67e5\u770b\u8be6\u60c5" src="http://a.tbcdn.cn/sys/common/icon/rank_s/', z, '" alt="', AD, '" />'].join("") : ""
        }
        function S(z, AA, y) {
            return "<a" + (y ? ' class="' + y + '"' : "") + ' href="javascript:void(0);" data-page="' + z + '">' + (AA || z) + "</a>"
        }
    }
    return {
        init: function (S) {
            F = S || {};
            if (!R) {
                W = G.cfg();
                if (!(T = V.get(J))) {
                    return
                }
                var Z = V.get("iframe", T);
                if (Z) {
                    G.use("malldetail/common/crossDomain", function () {
                        window.XD.receiveMessage(function (a) {
                            switch (a.action) {
                                case "setHeight":
                                    V.height(Z, a.height);
                                    break;
                                case "setScrollTop":
                                    document[G.UA.webkit ? "body" : "documentElement"].scrollTop = V.offset(Z).top * 1 + a.scrollTop * 1;
                                    break
                            }
                        })
                    });
                    R = true;
                    return
                }
                if (G.mods.TabBar && G.mods.TabBar.curIndex() == "description") {
                    G.sendAcAtpanel("tmalldetail.4.1")
                }
                A();
                R = true
            }
        }
    }
}, {
    requires: ["ajax", "dom", "event", "template"]
});