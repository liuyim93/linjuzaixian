KISSY.add("malldetail/tabbar/reviewsTmall", function (_kissy, _ajax, _dom, _event, _template) {
    var _cfg;
    var _g_config = window.g_config,
		_reviewsTmall_cfg;
    var _dom_id_J_Reviews, _dom_id_J_Show_rate_table, U, _is_loaded = false,
		I = false,
		_gradeAvg, N, _document = document,
		_append, _STR_J_Reviews = "#J_Reviews";
    var L = {
        tags: null,
        selectedTag: {
            id: null,
            posi: null,
            name: ""
        }
    };
    var _change_enter_to_br = function (_rateContent) {
        if (typeof _rateContent == "string") {
            return _rateContent.replace(/\\n/gi, "<br/>").replace(/\\r/gi, "")
        } else {
            return _rateContent
        }
    };
    var K = false;
    var _dom_id_J_Graph;

    function _send_log(_log_cfg) {
        var _log_url = "http://log.mmstat.com/";
        var _log_map = {
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
        var _from = _log_cfg.from,
			_type = _log_cfg.type,
			_log_item = _log_map[_from][_type];
        if (_log_item) {
            _kissy.sendAtpanel(_log_item, {
                shopid: _cfg.rstShopId,
                itemid: _cfg.itemDO.itemId,
                categoryId: _cfg.itemDO.categoryId
            })
        }
    }
    function A() {
        var v = {
            itemId: _cfg.itemDO.itemId,
            spuId: _cfg.itemDO.spuId,
            sellerId: _cfg.itemDO.userId,
            order: 0,
            forShop: 1
        }, t = null,
			u = 0,
			_isSpu = _g_config.isSpu,
			_str_review = "与描述相符",
			x, h, _dom_div_id_bd = _dom.create('<div class="bd">正在加载 ...<br /><div style="min-height:400px;_height:400px;"></div></div>');
        if (_cfg.isMeiz) {
            _cfg.tmallRateType = 1
        }
        if (_cfg.closeTmallRate) {
            _cfg.tmallRateType = 0
        }
        _dom.insertAfter(_dom_div_id_bd, _dom.get("h4.hd", "#J_Reviews"));
        _bind_click_for_bd();
        l();

        function Z(z) {
            var _snippet = '{{#each tags as tag}}								<li class="{{#if tag.posi}}posi{{/if}}">									<a href="#" data-tagid="{{tag.id}}" data-tagtype="{{tag.posi}}"{{#if tag.id==selectedTag.id && tag.posi==selectedTag.posi}} class="selected"{{/if}}>{{tag.tag}}({{tag.count}})<s></s></a>								</li>							{{/each}}',
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
            _dom.html(_dom.get(".btag-list", _dom_id_J_Graph), _kissy.Template(_snippet).render({
                tags: y.sort(AA),
                selectedTag: L.selectedTag
            }))
        }
        function d() {
            I = true;
            _ajax({
                url: _cfg.url.rate + "/listTagClouds.htm",
                data: {
                    itemId: _cfg.itemDO.itemId,
                    isAll: "true",
                    isInner: "true"
                },
                dataType: "jsonp",
                jsonpCallback: "loadtagjsoncallback",
                success: function (AH) {
                    _send_log({
                        from: "all",
                        type: "tmRate-cloud"
                    });
                    var AO = {
                        tags: AH.tags.tagClouds
                    };
                    L.tags = AH.tags.tagClouds;
                    if (AO.tags.length) {
                        if (_cfg.tmallRateType == 1) {
                            _send_log({
                                from: "meiz",
                                type: "tagView"
                            })
                        } else {
                            if (_cfg.tmallRateType == 2) {
                                _send_log({
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
                            _dom_id_J_Graph.innerHTML = '<ul class="btag-list"></ul>' + (AO.tags.length > 8 ? '<em class="pay-toggler" title="\u663e\u793a\u6240\u6709\u4fe1\u606f"></em>' : "");
                            Z(false)
                        } else {
                            _dom.removeClass("#J_RateScore", "tm-tagRate-info");
                            if (x) {
                                _kissy.get("#J_Graph").innerHTML = _kissy.Template(h).render({
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
                        _dom.removeClass("#J_RateScore", "tm-tagRate-info")
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
                            var y = _dom.create('<div class="persentInfo">');
                            y.innerHTML = _kissy.Template('<div class="hd">大家认为</div><div class="bd tb-clearfix">								{{#each tags.innerTagCloudList as tag}}<label>{{tag.dimenName}}: </label><p>									{{#each tag.tagScaleList as scale index}}										{{#if scale.proportion}}										<s class="level_{{scale._order}}" style="left:{{scale._position-25}}px;width:50px;">{{scale.scale}}</s>										<i class="level_{{scale._order}}" style="left:{{scale._ahead*2+scale._proportion-3+index*2}}px;"></i>										<span class="level_{{scale._order}} {{#if index==0}}edge-left{{/if}} {{#if index==tag.tagScaleList.length-1}}edge-right{{/if}} " title="{{scale.scale}}:{{scale.proportion}}%" style="width: {{scale._proportion*2}}px">											{{#if scale._order==0}}{{scale.proportion}}%{{/if}}										</span>										{{/if}}									{{/each}}								</p>{{/each}}								</div>').render(AH);
                            _dom.insertAfter(y, _dom.get("#J_RateScore", _dom_div_id_bd))
                        }
                    }
                }
            })
        }
        function l() {
            _append = v.append;
            _kissy.use("malldetail/data/data", function (_kissy_z, _malldetail_data_data) {
                _malldetail_data_data.onReviewCount(function (_review_cfg) {
                    _gradeAvg = _review_cfg.gradeAvg;
                    _ajax({
                        url: _cfg.url.rate + "/Merchant/Detail/ListDetailRate",
                        data: v,
                        dataType: "jsonp",
                        success: function (_results) {
                            window.TB.detailRate = _results.rateDetail;
                            if (!I) {
                                _dom_div_id_bd.innerHTML = n(_populate_detailRate(window.TB.detailRate));
                                d();
                                _dom_id_J_Show_rate_table = _kissy_z.get("#J_Show-rate-table");
                                b();
                                q(1)
                            } else {
                                _dom_id_J_Show_rate_table.innerHTML = n(_populate_detailRate(window.TB.detailRate))
                            }
                            if (!_dom_id_J_Graph) {
                                _dom_id_J_Graph = _kissy_z.get("#J_Graph")
                            }
                            _show_expand_button();
                            window.TB.detailRate = null;
                            var _detail_type = _isSpu ? "spudetail" : "itemdetail";
                            _send_log({
                                from: "all",
                                type: _detail_type
                            })
                        }
                    })
                })
            })
        }
        function _show_expand_button() {
            _kissy.each(_kissy.query("#J_Show-rate-table .rate-auto"), function (_rate_item) {
                if (_rate_item.offsetHeight / 18 > 10) {
                    _dom.insertAfter(_dom.create("<div class='rate-btn'><a href='javascript:;' title='展开全文' class='b-showMore'>&nbsp;</a></div>"), _rate_item);
                    _dom.addClass(_rate_item, "rate-haveMoreContent")
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
        function _bind_click_for_bd() {
            _event.on(_dom_div_id_bd, "click", function (_event_t) {
                var _target = _event_t.target,
					z;
                switch (true) {
                    case _target.tagName === "A" && _dom.hasClass(_target, "act-showmore"):
                        v.ismore = "1";
                        l();
                        break;
                    case _target.tagName === "A" && ((z = _target.getAttribute("data-page")) != null):
                        if (_kissy.mods.TabBar && _kissy.mods.TabBar.curIndex() == "J_Reviews") {
                            _kissy.sendAtpanel("tmalldetail.12.2")
                        } else {
                            _kissy.sendAtpanel("tmalldetail.12.4")
                        }
                        o(z);
                        break;
                    case (_target.tagName === "A" || _target.tagName === "EM") && ((z = _target.getAttribute("data-forShop")) != null):
                        _event_t.preventDefault();
                        if (_cfg.tmallRateType) {
                            v.append = 0
                        }
                        q(z);
                        break;
                    case (_target.tagName === "A" || _target.tagName === "EM") && ((z = _target.getAttribute("data-tagid")) != null):
                        _event_t.preventDefault();
                        if (L.selectedTag.id == z && L.selectedTag.posi == (_target.getAttribute("data-tagtype") == "true")) {
                            if (_dom.get("#J_allShop")) {
                                _dom.get("#J_allShop").className = "curr"
                            }
                            delete v.tagId;
                            delete v.posi;
                            _dom.removeClass("#J_Graph a", "selected");
                            v.currentPage = 1;
                            L.selectedTag.id = null;
                            L.selectedTag.posi = null;
                            L.selectedTag.name = "";
                            l()
                        } else {
                            if (_cfg.tmallRateType) {
                                v.append = 0
                            }
                            v.append = 0;
                            _dom.removeClass("#J_toggletype a", "curr");
                            c(z, _target.getAttribute("data-tagtype"));
                            _dom.removeClass("#J_Graph a", "selected");
                            _dom.addClass(_target, "selected");
                            _dom.get("#J_addComment").checked = false;
                            L.selectedTag.id = z;
                            L.selectedTag.posi = _target.getAttribute("data-tagtype") == "true" ? true : false;
                            L.selectedTag.name = k()
                        }
                        break;
                    case _dom.hasClass(_target, "J_Reviews2recommend"):
                        _event_t.preventDefault();
                        if (!_reviewsTmall_cfg.switchTab) {
                            return
                        }
                        if (_kissy.mods.TabBar && _kissy.mods.TabBar.curIndex() == "J_Reviews") {
                            _kissy.sendAtpanel("tmalldetail.12.3")
                        } else {
                            _kissy.sendAtpanel("tmalldetail.12.5")
                        }
                        _reviewsTmall_cfg.switchTab("J_TabRecommends");
                        break;
                    case _dom.hasClass(_target, "pay-toggler"):
                        _event_t.preventDefault();
                        if (K) {
                            Z(K = false);
                            _dom.removeClass("#J_RateScore", "tglistOpen")
                        } else {
                            Z(K = true);
                            _dom.addClass("#J_RateScore", "tglistOpen")
                        }
                        break;
                    case _target.tagName === "A" && _dom.hasClass(_target, "b-showMore"):
                        var y = _target.parentNode.previousSibling;
                        if (_dom.hasClass(y, "rate-haveMoreContentShow")) {
                            _dom.removeClass(y, "rate-haveMoreContentShow");
                            _target.title = "展开全文";
                            _dom.removeClass(_target, "b-showMore-open")
                        } else {
                            _dom.addClass(y, "rate-haveMoreContentShow");
                            _target.title = "缩进全文";
                            _dom.addClass(_target, "b-showMore-open")
                        }
                        break
                }
            })
        }
        function b() {
            var y = _dom.query("#J_commentOrder a", _dom_div_id_bd);
            _event.on(y, "click", function () {
                _dom.removeClass(y, "curr");
                _dom.addClass(this, "curr");
                v.currentPage = 1;
                var z = _dom.attr(this, "value");
                if (z == 1) {
                    _send_log({
                        from: "all",
                        type: "tmRate-time"
                    })
                } else {
                    if (z == 2) {
                        _send_log({
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
                        _dom.removeClass("#J_Graph a", "selected")
                    }
                    if (_cfg.tmallRateType == 2) {
                        _send_log({
                            from: "muying",
                            type: "myAppend"
                        })
                    }
                } else {
                    v.order = z;
                    if (_cfg.tmallRateType == 1) {
                        _send_log({
                            from: "meiz",
                            type: "order" + v.order
                        })
                    } else {
                        if (_cfg.tmallRateType == 2) {
                            _send_log({
                                from: "muying",
                                type: "myOrder" + v.order
                            })
                        }
                    }
                }
                if (v.order == 0) {
                    _dom.show(_dom.get(".ui-msg", "#J_commentOrder"))
                } else {
                    _dom.hide(_dom.get(".ui-msg", "#J_commentOrder"))
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
                _send_log({
                    from: "all",
                    type: "tmRate-good"
                })
            } else {
                _send_log({
                    from: "all",
                    type: "tmRate-bad"
                })
            }
            if (_cfg.tmallRateType == 1) {
                _send_log({
                    from: "meiz",
                    type: "tag" + y
                })
            } else {
                if (_cfg.tmallRateType == 2) {
                    _send_log({
                        from: "muying",
                        type: "myTag" + y
                    })
                }
            }
            l()
        }
        function j() {
            _event.on("#J_addComment", "click", function () {
                if (this.checked) {
                    v.append = 1;
                    delete (v.forShop);
                    delete v.tagId;
                    _dom.removeClass("#J_toggletype a", "curr");
                    _dom.removeClass("#J_Graph a", "selected")
                } else {
                    v.append = 0;
                    v.forShop = 1;
                    if (_dom.get("#J_allShop")) {
                        _dom.get("#J_allShop").className = "curr"
                    }
                }
                _send_log({
                    from: "all",
                    type: "tmRate-add"
                });
                l()
            })
        }
        function q(z) {
            var y = _kissy.all("a", _kissy.get(".act-toggletype"));
            if (y.length > 0) {
                _dom.removeClass(y, "curr");
                _kissy.each(y, function (AA) {
                    if (_dom.attr(AA, "data-forshop") == z) {
                        _dom.addClass(AA, "curr")
                    }
                })
            }
            _dom.get("#J_addComment").checked = false;
            v.append = 0;
            v.forShop = z;
            v.currentPage = 1;
            delete v.tagId;
            delete v.posi;
            _dom.removeClass("#J_Graph a", "selected");
            if (z > 0 && _cfg.tmallRateType == 1) {
                _send_log({
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
                z = "请输入一个数字"
            }
            if (z === "" && t && (AA < 1 || AA > t.lastPage)) {
                z = "页码范围在 1 到 " + t.lastPage + " 之间"
            }
            if (z === "") {
                v.currentPage = AA;
                v.ismore = 1;
                _kissy.later(function () {
                    if (_cfg.tmallRateType == 1) {
                        _send_log({
                            from: "meiz",
                            type: "page"
                        })
                    } else {
                        if (_cfg.tmallRateType == 2) {
                            _send_log({
                                from: "muying",
                                type: "myPage"
                            })
                        }
                    }
                    l();
                    var AB = _isSpu ? "spupage" : "itempage";
                    _send_log({
                        from: "all",
                        type: AB
                    });
                    _send_log({
                        from: "all",
                        type: "tmRate-page"
                    });
                    _kissy.scrollToElem(_dom_id_J_Reviews)
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
                rateList: '<tr><td class="cmt">									{{#if rateContent && serviceRateContent }}										<p style="text-align: left; max-width: 100%;" class="rate rate-auto"><s>\u5546\u54c1: </s>{{rateContent}}</p>										<p style="text-align: left; max-width: 100%;" class="rate rate-auto"><s>\u670d\u52a1: </s>{{serviceRateContent}}</p>									{{#else}}										<p style="text-align: left; max-width: 100%;" class="rate rate-auto">{{rateContent}}{{serviceRateContent}}</p>									{{/if}}									{{#if reply }}<p class="reply rate-auto"><span class="appendTitle">\u89e3\u91ca: </span>{{reply}}</p>{{/if}}								</td><td class="sku">									{{#if auctionSku }}									<p class="cmtInfo">{{#each auctionSku.split(";") as item}}<span class="actSku">										<span class="title">{{item.split(":",2)[0]}}</span><span>: {{item.split(":",2)[1]}}</span>									</span>{{/each}}</p>									{{/if}}                                </td><td class="buyer" data-spm="1000822">									{{#if ' + (_g_config.offlineShop ? "true" : "false") + " }}										<a>{{displayUserNick}}</a> 									{{#elseif !fromMall }}										<p>{{displayUserNick1}}</p>										{{#if " + (_cfg.isMeiz ? "true" : "false") + ' && cmsSource }}<p class="from">\u6765\u81ea\uff1a{{cmsSource}}</p>{{/if}}									{{#elseif (fromMall && anony) || !(displayUserNumId > 0)}}										<p>{{displayUserNick1}}  &nbsp;<span class="tb-anonymous">(\u533f\u540d)</span></p>									{{#else}}										<p><a target="_blank" href="{{displayUserLink}}">{{displayUserNick}}</a></p>									{{/if}}									{{#if (tamllSweetLevel||userVipLevel) && tamllSweetLevel>0 }}										<a href="' + (_g_config.offlineShop ? "#" : "http://vip.tmall.com") + '" target="_blank" class="tmallVip"><img src="http://l.tbcdn.cn/apps/membermanager/v2/image/{{tmallSweetPic}}" alt=""/></a>									{{/if}}									{{#if fromMall }}										<span><a											{{#if ' + (_g_config.offlineShop ? "true" : "false") + ' && !anony && displayUserNumId>0}} href="http://rate.taobao.com/user-rate-{{displayUserNumId}}.htm?buyerOrSeller=1" target="_blank"{{/if}}											>{{grade}}</a></span>									{{/if}}									{{#if attributes&&attributes.indexOf("giftBillId")!=-1 }}										<p class="userGift">\u83b7\u8ba4\u771f\u8bc4\u4ef7\u5956  <i class="tb-icon-gift"></i></p>									{{/if}}								</td></tr><tr class="baseline"><td class="time">									<span class="date">[{{rateDate}}]</span>									{{#if appendComment.content }}										<div class="cmt-append"><i class="cmt-append-horn"></i>										<p class="appendRate rate-auto">											<span class="appendTime">{{#if appendComment.days === 0 }}\u5f53\u5929\u8ffd\u52a0: {{#elseif appendComment.days }}{{appendComment.days}}\u5929\u540e\u8ffd\u52a0: {{#else}}{{appendComment.commentTime}}\u8ffd\u52a0: {{/if}}</span>											{{appendComment.content}}										</p>										{{#if appendComment.reply }}<p class="appendReply rate-auto"><span class="appendTitle">\u89e3\u91ca\uff1a</span>{{appendComment.reply}}</p>{{/if}}										</div>									{{/if}}								</td><td class="user">									{{#if userInfo }}<p class="cmtInfo">{{#each userInfo.split(";") as item}}										 {{item.split(":",2)[1]}}									{{/each}}</p>{{/if}}                                </td><td class="times">									{{#if buyTimes }}										\u5728\u672c\u5e97\u4e70\u8fc7<span class="buyTimes">{{buyTimes}}</span>\u6b21									{{/if}}								</td></tr>',
                page: ' <a href="javascript:void(0);" data-page="{page}">{page}</a> '
            }, AB = [],
				AE = [],
				AD = [],
				AG = [];
            if (AF.paginator) {
                if (AF.paginator["pages1"]) {
                    _kissy.each(AF.paginator["pages1"], function (AH) {
                        AE[AE.length] = w(AC.page, AH)
                    })
                }
                if (AF.paginator["pages2"]) {
                    _kissy.each(AF.paginator["pages2"], function (AH) {
                        AD[AD.length] = w(AC.page, AH)
                    })
                }
            } else {
                AC.tfoot = '<tfoot><tr><td colspan="5">' + AA + "</td></tr></tfoot>"
            }
            var y = AF.rateList || AF.rateDetail.rateList;
            _kissy.each(y, function (AH) {
                AG[AG.length] = _template(AC.rateList).render(AH)
            });
            AE = AE.join("");
            AD = AD.join("");
            AG = AG.join("");
            AC.table = AC.table.replace("%tfoot%", AC.tfoot).replace("%pages1%", AE).replace("%pages2%", AD).replace("%rateList%", AG);
            if (!I) {
                if (_cfg.tmallRateType) {
                    AB.push('<div class="rate-meiz">')
                }
                if (!_kissy.cfg("detail").rateCloudDisable && !_kissy.isUndefined(_gradeAvg)) {
                    AB.push(_template(AC.scoreInfo).render(AF))
                }
                AB.push(_template(AC.rateListInfo).render(AF));
                if (_cfg.tmallRateType) {
                    AB.push("</div>")
                }
                AB.push('<div id="J_Show-rate-table">')
            }
            AB.push(w(AC.table, AF.paginator));
            if (!I) {
                AB.push("</div")
            }
            if (!_cfg.tmallRateType) {
                h = null
            }
            if (_cfg.tmallRateType) {
                if (typeof v.append != "undefined" && v.append == 0) {
                    if (_dom.get("select.act-changetype", _dom_div_id_bd)) {
                        var z = _dom.get("select.act-changetype", _dom_div_id_bd);
                        if (z.options[z.selectedIndex].value == 3) {
                            z.options[0].selected = true
                        }
                    }
                }
            }
            return AB.join("")
        }
        function _set_rating_combo(_detailRate) {
            var _rating_combo = {};
            if (!_kissy.isUndefined(_gradeAvg)) {
                _rating_combo.merchandisScore = _gradeAvg;
                _rating_combo.width = _gradeAvg / 5 * 100;
                _rating_combo.rateStar = _gradeAvg.replace(".0", "").replace(".", "d");
                _rating_combo.scoreSummaryTitle = _str_review;
                if (_gradeAvg === "0.0") {
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
        function _populate_detailRate(_detailRate) {
            var _paginator = _detailRate.paginator,
				_rateList = _detailRate.rateList;
            _detailRate.showChooseTopic = _detailRate.rateDanceInfo.showChooseTopic;
            _detailRate.scoreInfo = _set_rating_combo(_detailRate);
            _detailRate.tmallRateType = _cfg.tmallRateType;
            _kissy.each(_rateList, function (_rateItem) {
                var AM = _rateItem;
                var AN = _rateItem;
                _rateItem.grade = _show_rank_pic(AM.displayRateSum, AM.displayRatePic), vipicon = ["http://localhost:7525/Images/T1PbuIXclkXXXXXXXX-16-16.png", "http://localhost:7525/Images/T1FHuIXcNkXXXXXXXX-16-16.png", "http://localhost:7525/Images/T1GYuIXcRkXXXXXXXX-16-16.png", "http://localhost:7525/Images/T1HbuIXcNkXXXXXXXX-16-16.png", "http://img03.taobaocdn.com/tps/i3/T1GbuIXcNkXXXXXXXX-16-16.png", "http://img01.taobaocdn.com/tps/i1/T1pHyIXalkXXXXXXXX-16-16.png"];
                _rateItem.rateDate = _get_date(_rateItem.rateDate);
                if (typeof _rateItem.appendComment == "object") {
                    _rateItem.appendComment.commentTime = _get_date(_rateItem.appendComment.commentTime);
                    if (_rateItem.appendComment.content) {
                        _rateItem.appendComment.content = _change_enter_to_br(_rateItem.appendComment.content)
                    }
                    if (_rateItem.appendComment.reply) {
                        _rateItem.appendComment.reply = _change_enter_to_br(_rateItem.appendComment.reply)
                    }
                    while (_rateItem.appendComment.days < 0) {
                        _rateItem.appendComment.days += 365
                    }
                }
                _rateItem.rateContent = _change_enter_to_br(_rateItem.rateContent);
                _rateItem.serviceRateContent = _change_enter_to_br(_rateItem.serviceRateContent);
                if (_rateItem.reply) {
                    _rateItem.reply = _change_enter_to_br(_rateItem.reply)
                }
                _rateItem.displayUserNick1 = _rateItem.displayUserNick.replace(/(\*+)/, '<span class="tb-anonymous">$1</span>');
                _rateItem.fromMall = _rateItem.fromMall || (typeof _rateItem.fromMall == "undefined")
            });
            var _selected_class_snippet = "selected='selected'";
            _detailRate.commType = {
                isShowAll: v.showContent === "" ? _selected_class_snippet : "",
                isHasContent: v.showContent === "1" ? _selected_class_snippet : "",
                isNoContent: v.showContent === "0" ? _selected_class_snippet : "",
                isHasAppend: v.showContent === "2" ? _selected_class_snippet : ""
            };
            var AH = {};
            if (_paginator.lastPage > 0) {
                var AE = _paginator.page,
					AC, _page_break_snippet = '<span class="page-break">...</span>';
                _paginator.lastPage = _paginator.lastPage > 99 ? 99 : _paginator.lastPage;
                if (AE == 1) {
                    u = _paginator.lastPage
                }
                if (AE < 5) {
                    AC = _paginator.lastPage > u ? _paginator.lastPage : u
                } else {
                    AC = _paginator.lastPage
                }
                AH.page = AE;
                AH.prevPageLink = AE > 1 ? _get_link(AE - 1, "&lt;&lt;上一页", "page-prev") : '<span class="page-start">&lt;&lt;上一页</span>';
                AH.nextPageLink = (AE < AC) ? _get_link(AE + 1, "下一页&gt;&gt;", "page-next") : '<span class="page-end">下一页&gt;&gt;</span>';
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
                AH.prevMore = AD > 1 ? _get_link(1, "1") + (AD > 2 ? _get_link(2, "2") : "") + (AD > 3 ? _page_break_snippet : "") : "";
                AH.nextMore = (AK <= AC && AE != AC && u >= 5) ? _page_break_snippet : ""
            } else {
                AH = null
            }
            _detailRate.paginator = AH;
            _detailRate.tmallRateType = _cfg.tmallRateType;
            return _detailRate
        }
        function w(z, AA) {
            var y;
            for (y in AA) {
                z = z.replace(new RegExp("{" + y + "}", "g"), AA[y])
            }
            return z
        }
        function _get_date(_rateDate) {
            var _date_set = _rateDate.split(" ")[0].split("-"),
				_now = new Date(),
				_year, _month, _day;
            _year = _date_set[0];
            _month = _date_set[1];
            _day = _date_set[2];
            if (_year == _now.getFullYear() && _month - 1 == _now.getMonth() && _day == _now.getDate()) {
                return "今天"
            } else {
                return (_year < _now.getFullYear() ? _year + "." : "") + _month + "." + _day
            }
        }
        function _show_rank_pic(_displayRateSum, _displayRatePic) {
            var _rank_array = [0, 4, 11, 41, 91, 151, 251, 501, 1001, 2001, 5001, 10001, 20001, 50001, 100001, 200001, 500001, 1000001, 2000001, 5000001, 10000001],
				_rank_block = [0, 0];
            var _rank_index = 0,
				AA;
            while (_rank_index < _rank_array.length && _displayRateSum >= _rank_array[_rank_index]) {
                _rank_block[0] = _rank_array[_rank_index];
                ++_rank_index;
                _rank_block[1] = _rank_array[_rank_index]
            } --_rank_index;
            if (!_rank_block[1]) {
                _rank_block.pop();
                _rank_block[0] += "以上"
            } else {
                _rank_block[1] = (_rank_block[1] - 1) + "个"
            }
            _rank_block = _rank_block.join(" - ");
            return _displayRateSum >= 4 ? ['<img align="absmiddle" class="rank" title="', _rank_block, '买家信用积分，请点击查看详情" src="http://a.tbcdn.cn/sys/common/icon/rank_s/', _displayRatePic, '" alt="', _rank_block, '" />'].join("") : ""
        }
        function _get_link(_page_index, _title, _class) {
            return "<a" + (_class ? ' class="' + _class + '"' : "") + ' href="javascript:void(0);" data-page="' + _page_index + '">' + (_title || _page_index) + "</a>"
        }
    }
    return {
        init: function (_reviewsTmall_cfg_t) {
            _reviewsTmall_cfg = _reviewsTmall_cfg_t || {};
            if (!_is_loaded) {
                _cfg = _kissy.cfg();
                if (!(_dom_id_J_Reviews = _dom.get(_STR_J_Reviews))) {
                    return
                }
                var _iframe_in_J_Reviews = _dom.get("iframe", _dom_id_J_Reviews);
                if (_iframe_in_J_Reviews) {
                    _kissy.use("malldetail/common/crossDomain", function () {
                        window.XD.receiveMessage(function (a) {
                            switch (a.action) {
                                case "setHeight":
                                    _dom.height(_iframe_in_J_Reviews, a.height);
                                    break;
                                case "setScrollTop":
                                    document[_kissy.UA.webkit ? "body" : "documentElement"].scrollTop = _dom.offset(_iframe_in_J_Reviews).top * 1 + a.scrollTop * 1;
                                    break
                            }
                        })
                    });
                    _is_loaded = true;
                    return
                }
                if (_kissy.mods.TabBar && _kissy.mods.TabBar.curIndex() == "description") {
                    _kissy.sendAcAtpanel("tmalldetail.4.1")
                }
                A();
                _is_loaded = true
            }
        }
    }
}, {
    requires: ["ajax", "dom", "event", "template"]
});