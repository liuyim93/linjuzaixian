/*
combined files : 

page/mods/userinfo
utils/global
page/mods/hasbuy
utils/scroll
page/mods/app-all
page/mods/expressway
page/mods/cart
page/mods/mystical-item
page/init

*/
/**
* @fileOverview 鎴戠殑娣樺疂棣栭〉涓汉淇℃伅妯″潡
* @author 榫欎繆 <longjun.zfc@taobao.com>
*/
KISSY.add('page/mods/userinfo', function (S, MT) {

    var S = KISSY, DOM = S.DOM, Event = S.Event,
        HIDDEN = 'hidden',
        HOVER = 'hover',
        hideTimer = 100,
        followTipsNode,
    //url
        userInfoGot = false, //鏄惁璇诲彇杩囦紭鎯犱俊鎭�,榛樿false
        aliPayUrl = 'http://i.{serverHost}/json/getZhifubaoBalance.htm',
        infoUrl = 'http://i.{serverHost}/json/privilege.htm',
        sellerTracelogUrl = 'http://i.{serverHost}/seller_go.htm',
        sellCenterUrl = 'http://mai.{serverHost}/seller_admin.htm',
    //鎴戠殑鏀粯瀹�
        myAlipayBtn = DOM.get('#J_MyAlipayBtn'),
        myAlipayInfo = DOM.get('#J_MyAlipayInfo'),
        aliPayMoney = DOM.get('#J_AliPayMoney'),
    //鎴戠殑浼樻儬淇℃伅
        myPrivilegeBtn = DOM.get('#J_MyPrivilegeBtn'),
        myPrivilegeInfo = DOM.get('#J_MyPrivilegeInfo'),
        alipayTimer = null,
        myPrivilegeTimer = null,
    //鍗栧涓績
        sellerCenter = DOM.get('.J_SellerCenter');
    var MTINFO = {
        init: function () {
            MTINFO.alipayinfo();         //alipay淇℃伅
            MTINFO.myprivilegeinfo();    //浼樻儬淇℃伅
            MTINFO.sellerinfo();         //鍗栧涓績
        },
        sellerinfo: function () {
            Event.on('.J_SellerCenter', 'click', function (ev) {
                ev.preventDefault();
                S.ajax({
                    type: "get",
                    url: MT.getApiURI(sellerTracelogUrl),
                    success: function () {
                        window.location.href = MT.getApiURI(sellCenterUrl);
                        MT.tracelog('sns.20.16');
                    },
                    error: function () { }
                });
            });
        },
        alipayinfo: function () {
            if (!myAlipayInfo) {
                return;
            } else {
                var hide = function () {
                    alipayTimer = S.later(function () {
                        DOM.removeClass(myAlipayBtn, 'alipay-hover');
                        DOM.addClass(myAlipayInfo, HIDDEN);
                    }, hideTimer, false);
                },
                    cancelHide = function () {
                        if (alipayTimer && alipayTimer.cancel) alipayTimer.cancel();
                    },
                    btnHover = myAlipayBtn.className + HOVER,
                    enterTimer = null,
                    enterDuration = 400,
                    _clearEnterTimer = function () {
                        enterTimer && enterTimer.cancel && enterTimer.cancel();
                    };


                Event.delegate(myAlipayBtn, "mouseenter mouseleave", ".my-alipaybtn", function (ev) {
                    ev.preventDefault();
                    if (ev.type == 'mouseenter') {
                        enterTimer = S.later(function () {
                            cancelHide();
                            DOM.addClass(myAlipayBtn, 'alipay-hover');
                            DOM.removeClass(myAlipayInfo, HIDDEN);
                        }, enterDuration)
                    } else {
                        _clearEnterTimer();
                        hide();
                    }
                });
                Event.on(myAlipayInfo, "mouseenter mouseleave", function (ev) {
                    ev.preventDefault();
                    if (ev.type == 'mouseenter') {
                        cancelHide();
                    } else {
                        hide();
                    }
                });
                /*Event.on(myAlipayBtn, 'mouseover', function(ev) {
                cancelHide();
                DOM.addClass(myAlipayBtn, 'alipay-hover');
                DOM.removeClass(myAlipayInfo, HIDDEN);
                });
                Event.on(myAlipayBtn, 'mouseout', function(ev) {
                hide();
                });*/
                /*Event.on(myAlipayInfo, 'mouseover', function(ev) {
                if (ev.target == myAlipayInfo || DOM.contains(myAlipayInfo, ev.target)) {
                cancelHide();
                }
                });
                Event.on(myAlipayInfo, 'mouseout', function(ev) {
                hide();
                });*/
                Event.on(myAlipayInfo, 'click', function (ev) {
                    var target = ev.target,
                        getStatus = function (str) {
                            var pattern = /"status"\s*\:\s*(\d+)/i;
                            var ok = str.match(pattern);
                            if (ok) {
                                return RegExp.$1;
                            }
                        },
                        getBalance = function (str) {
                            var pattern = new RegExp("璐︽埛浣欓锛�.*<span>(\\d+\\.\\d+)<\\/span>.*鍏�", "gi");
                            var reg = str.match(pattern);
                            return RegExp.$1;
                        };
                    if ('A' === target.tagName.toUpperCase() && DOM.hasClass(DOM.parent(target, 1), 'check-amount')) {
                        ev.preventDefault();
                        S.ajax({
                            type: 'get',
                            url: MT.getApiURI(aliPayUrl),
                            success: function (data) {
                                if (!data) return;
                                if (getStatus(data) == '1') {
                                    aliPayMoney.innerHTML = '<em>' + getBalance(data) + '</em>鍏�';
                                    DOM.removeClass(aliPayMoney, HIDDEN);
                                    target.className = HIDDEN;
                                }
                                if (getStatus(data) == '0') {
                                    aliPayMoney.innerHTML = '<em>' + '璇风櫥褰曟敮浠樺疂' + '</em>';
                                    DOM.removeClass(aliPayMoney, HIDDEN);
                                    target.className = HIDDEN;
                                }
                            },
                            error: function () {
                                aliPayMoney.innerHTML = '<em>' + '璇风櫥褰曟敮浠樺疂' + '</em>';
                                DOM.removeClass(aliPayMoney, HIDDEN);
                                target.className = HIDDEN;
                            }
                        }, "html");
                    }
                });
            }
        },
        myprivilegeinfo: function () {
            if (!myPrivilegeBtn) {
                return;
            } else {
                //鎴戠殑浼樻儬淇℃伅
                var hide = function () {
                    myPrivilegeTimer = S.later(function () {
                        DOM.removeClass(myPrivilegeBtn, btnHover);
                        DOM.addClass(myPrivilegeInfo, HIDDEN);
                        if (followTipsNode = DOM.get('.J_FollowTip')) {
                            DOM.removeClass(followTipsNode, 'hidden');
                        }
                    }, hideTimer, false);
                }, cancelHide = function () {
                    if (myPrivilegeTimer && myPrivilegeTimer.cancel) {
                        myPrivilegeTimer.cancel();
                        //鍒ゆ柇鏄惁鏈塼ips琚伄鎸�
                        if (followTipsNode = DOM.get('.J_FollowTip')) {
                            DOM.addClass(followTipsNode, 'hidden');
                        }
                    }
                }, btnHover = myPrivilegeBtn.className + HOVER;
                Event.on(myPrivilegeBtn, 'mouseover', function (ev) {
                    cancelHide();
                    DOM.addClass(myPrivilegeBtn, btnHover);
                    DOM.removeClass(myPrivilegeInfo, HIDDEN);
                    if (followTipsNode = DOM.get('.J_FollowTip')) {
                        DOM.addClass(followTipsNode, 'hidden');
                    }
                    if (userInfoGot == false) {
                        var showUserInfo = function (result) {
                            var em = DOM.query('em', myPrivilegeInfo);
                            DOM.html(em[0], result ? result['point'] : 0);
                            DOM.html(em[1], result ? result['shopPromotion'] : 0);
                        }
                        S.ajax({
                            type: "get",
                            url: MT.getApiURI(infoUrl),
                            success: function (data) {
                                var result = null;
                                try {
                                    result = S.JSON.parse(data);
                                } catch (e) {
                                    //
                                }
                                userInfoGot = true;
                                showUserInfo(result);
                            },
                            error: function () {
                                showUserInfo(null);
                            }
                        });
                    }

                });
                Event.on(myPrivilegeBtn, 'mouseout', function (ev) {
                    hide();
                });
                Event.on(myPrivilegeInfo, 'mouseover', function (ev) {
                    if (ev.target == myPrivilegeInfo || DOM.contains(myPrivilegeInfo, ev.target)) {
                        cancelHide();
                    }

                });
                Event.on(myPrivilegeInfo, 'mouseout', function (ev) {
                    hide();
                });
            }
        }
    }
    MTINFO.init();
    if (window.MTB) { MTB.mtInfo = MTINFO; }
}, { requires: [
    'utils/global'
]
});



/**
* 鎴戠殑娣樺疂鍏ㄥ眬妯″潡
* @author lingyu.csh@taobao.com
* @datetime 2013/03/29
*/
KISSY.add('utils/global', function (S) {
    var $ = S.all;
    // 鑷姩鍒ゆ柇褰撳墠鍩熷悕鐨� host
    var serverHost = 'taobao.com',
        cdnHost = 'taobaocdn.com';

    if (pickDocumentDomain(2) == 'taobao.net' || pickDocumentDomain(2) == 'tmall.net' || pickDocumentDomain(2) == 'koubei.net') {
        serverHost = cdnHost = 'daily.taobao.net';
    }

    //document.domain = location.hostname.split('.').slice(-2).join('.');
    //document.domain = location.hostname;
    S.io.setupConfig({
        xdr: {
            subDomain: {
                proxy: '/crossdomain.htm'
            }
        },
        src: 'crossdomain.xml'
    });

    //Node extends
    S.Node.prototype.index = function (node) {
        node = S.DOM.get(node);
        for (var i = 0; i < this.length; i++) {
            if (this[i] == node) {
                return i;
            }
        }
        return -1;
    }

    /**
    * 鍏ㄥ眬MT妗嗘灦
    * @class MT
    * @return {object} MT 鍐呯疆鍏敤鏂规硶.
    */
    MT = window.MT || {};
    S.mix(MT, S.EventTarget);

    /**
    * 鑾峰彇 API 鐨� URI
    * @method getApiURI
    * @param api {String} API 鍦板潃.
    * @param noCache {Boolean} 鏄惁浣跨敤缂撳瓨锛岄粯璁や负 true.
    * @param ignoreToken {Boolean} 鏄惁涓嶅姞 Token.
    * @return {String} 鑾峰彇鍒扮殑瀹為檯 API 鍦板潃.
    */
    MT.getApiURI = function (api, noCache, ignoreToken) {

        if (!(api.substr(0, 7) === 'http://' || api.substr(0, 8) === 'https://') &&
            api.indexOf(':') > 0) {

            var semPos = api.indexOf(':');
            var apiServer = apiServers[api.substr(0, api.indexOf(':'))] || '';
            if (apiServer !== '') {
                api = (apiServer + api.substr(semPos + 1)).replace(/assets\.taobaocdn\.com/, 'a.tbcdn.cn');
            }
        }

        if (typeof noCache == 'undefined' ? true : noCache) {
            api = _buildURI(api, 't=' + new Date().getTime());
        }

        if (!ignoreToken) {
            var elToken = _getToken();
            if (elToken) {
                api = _buildURI(api, TB_TOKEN_KEY + '=' + elToken);
            } else {
                S.log('token娌″彇鍒�');
            }

        }
        return S.substitute(api, {
            serverHost: serverHost,
            cdnHost: cdnHost
        });
    }
    MT.serverHost = serverHost;

    /**
    * 鎷兼帴 URI锛岃嚜鍔ㄥ垽鏂涓€閮ㄥ垎鏄惁鏈� ?锛屽鏋滄湁鍒欎互 & 杩炴帴锛�
    * 鍚﹀垯浠� & 杩炴帴绗竴閮ㄥ垎鍜岀浜岄儴鍒嗭紝鍏朵粬閮ㄥ垎鍧囦互 & 杩炴帴
    * @method buildURI
    * @param uriPart {String} 瑕佹嫾鎺ョ殑 URI 鐗囨.
    * @return {String} 鎷兼帴鐨� URI.
    */
    function _buildURI() {
        var args = Array.prototype.slice.call(arguments);
        if (args.length < 2) {
            return args[0] || '';
        }

        var uri = args.shift();
        uri += uri.indexOf('?') > 0 ? '&' : '?';

        return uri + args.join('&').replace(/&+/g, '&');
    }

    //寮瑰嚭妗�
    MT.dialog = function (html, callback) {

        if (S.startsWith(html, '#') || html.nodeType) {
            html = $(html).html();
        }

        S.use('overlay', function (S, Overlay) {
            var popup = new Overlay({
                content: '',
                elCls: 'MT-popup',
                elStyle: {
                    position: S.UA.ie == 6 ? "absolute" : "fixed"
                },
                mask: true,
                //draggable: true,
                align: {
                    points: ['cc', 'cc']
                }
            });
            popup.render();
            popup.get('contentEl').html(html, true);
            popup.center();
            popup.show();

            $(window).on("resize", function () {
                popup.center();
            });
            $(document).on('keydown', function (ev) {
                $(document).detach('keydown', arguments.callee);
                if (ev.keyCode == 27) popup.destroy();
            });

            var node = popup.get('el');

            node.all('.close').on('click', function (ev) {
                ev.preventDefault();
                popup.destroy();
            });

            callback && callback(popup);
        });
    };

    /**
    * tooltip鎻愮ず灞�
    * @param {string|node} trigger 鐩爣鑺傜偣
    * @param {string} position 瀹氫綅锛岄粯璁ゅ簳閮紝寰呮墿灞�
    * @return {array} 杩斿洖tooltips瀵硅薄鏁扮粍锛岄『搴忔寜selector鑺傜偣
    */
    MT.tooltip = function (trigger, position, clientcontent, callback) {
        S.use('overlay', function (S, Overlay) {
            $(trigger).each(function (item) {
                //涓嶉噸澶嶅姞杞�
                if ($(item).data('tooltip')) return;

                var title = item.attr('data-title');
                if (!title && !clientcontent) return;

                var _laterTime = null,
                    _laterStartTime = null,
                    _tooltip = null,
                    _toolOutTime = null,
                    _creatOverlay = function () {

                        if (!_tooltip) {
                            _tooltip = new Overlay({
                                trigger: item,
                                elCls: 'MT-tooltip',
                                //content:'<i class="arrow ' + (position ? position : 'top') + '"></i><p>' + title + '</p>',
                                content: '<i class="arrow ' + (position ? position : 'top') + '"></i><p>' + (clientcontent ? clientcontent : title) + '</p>',
                                align: {
                                    node: item,
                                    //points:['bb', 'lt'],
                                    points: ((position == 'bottom-left') ? ['tc', 'bl'] : ['tc', 'bc']),
                                    //offset:[0, 10]
                                    offset: ((position == 'bottom-left') ? [8, 18] : [0, -10])
                                },
                                effect: 'slide'
                            });

                            _tooltip.render();
                            _tooltip.get('el').on('mouseenter mouseleave', function (ev) {
                                if (ev.type == 'mouseenter') {
                                    _laterTime && _laterTime.cancel();
                                } else {
                                    _toolOutTime = S.later(function () {
                                        if (_tooltip) {
                                            _tooltip.destroy();
                                            _tooltip = null;
                                        }
                                    }, 200)


                                }
                            });

                            $(item).data('tooltip', _tooltip);

                            callback && callback();
                        }
                        return _tooltip;

                    },
                    _tooltipOut = function () {
                        _laterTime = S.later(function () {
                            if (_tooltip) {
                                _tooltip.destroy();
                                _tooltip = null;
                            }
                        }, 200)
                    };

                item.on("mouseenter mouseleave", function (ev) {
                    if (ev.type == "mouseenter") {
                        //寤惰繜寮€濮嬫椂闂�
                        _toolOutTime && _toolOutTime.cancel();
                        _laterStartTime = S.later(function () {
                            _creatOverlay().show();
                        }, 200)
                    } else {
                        _laterStartTime && _laterStartTime.cancel();
                        _tooltipOut();
                    }
                });
            })
        });
    }
    /**
    * 鎵€鏈夊紓姝ユ帴鍙�
    * @param {string} url ajax璇锋眰鍦板潃
    * @param {object} data 鍙傛暟瀵硅薄
    * @param {function} callback 鎴愬姛鍚庡洖璋冩柟娉�
    * @param {function} errorCallback 澶辫触鍚庤繑鍥炴柟娉�
    */
    MT.IO = function (url, data, callback, errorCallback) {

        if (!url) return;
        if (S.isFunction(data)) {
            errorCallback = callback;
            callback = data;
            dataType = callback;
            data = {};
        }

        var url = url;
        S.mix(data, { _tb_token_: _getToken() });

        S.io.post(url, data, function (json) {
            if (json.status == "-2") {//鏈櫥褰�
                var serverHost = location.hostname.indexOf('taobao.net') > -1 ? 'daily.taobao.net' : 'taobao.com';
                location.href = 'https://login.' + serverHost + '/member/login.jhtml?redirectURL=' + encodeURIComponent(location.href);
            } else if (json.status == "0") { // 澶辫触
                errorCallback ? errorCallback(json.msg) : MT.alert(json.msg);
            } else if (json.location) {
                location.href = json.location;
            } else if (json.status == "1") {
                callback && callback(json.data);

            } else {
                errorCallback ? errorCallback() : "";
                S.log(S.JSON.stringify(json));
            }
        }, 'json');

    }
    /**
    * 鎷疯礉sns缁勪欢
    * tracelog绾﹀畾:
    *		<a data-snstracelog="{'url':'http://log.mmstat.com/sns.2.1.1'}">
    *  鎴�	<a data-snstracelog="sns.2.1.1">
    *
    * 鐢熸垚鍚庣殑url灏嗙被浼间负锛歨ttp://log.mmstat.com/sns.2.1.1?cache=1322732242175
    */
    MT.tracelog = function (logparam) {
        var param = (typeof logparam == 'string') ? logparam : $(logparam).attr('data-snstracelog');

        if (param) {
            if (param.slice(0, 1) == '{') {
                var tracelog = eval('(' + param + ')');
                new Image().src = tracelog.url + '?cache=' + new Date().getTime();
            } else if (/http:\/\//.test(param)) {
                new Image().src = param + '?cache=' + new Date().getTime();
            } else {
                new Image().src = 'http://log.mmstat.com/' + param + '?cache=' + new Date().getTime();
            }
        }
    }

    function _getToken() {
        return $('input').filter(function (input) {
            return $(input).attr('name') == '_tb_token_';
        }).val();
    }

    //鍩熷悕鍒ゆ柇
    function pickDocumentDomain(depth, host) {
        host = host || location.hostname;
        depth = depth || 2;
        var parts = host.split('.'), ret = [];
        while (parts.length > 0 && depth > 0) {
            ret.unshift(parts.pop());
            depth--;
        }

        //return ret.join('.');
        return host;
    }

    return MT;
});

/**
* @fileOverview 宸蹭拱鍒版ā鍧�
* @author lingyu.csh
*/

KISSY.add('page/mods/hasbuy', function (S, MT, Kscroll) {

    var $ = S.all,
        zoomInBoxContainer = $('#has-buy'),
        zoomInBoxNode = $('.J_zoomIn'),
        zoomInTriggerNode = $('.J_hasbuy_more'),
        zoomInScrollNode = $('.J_hasbuy_scroll'),
        flagHasLoad = false,
        zoomInScrollBar = null,
        zoomInMoreNextUrl = null,
        zoomInMoreNextDataFlag = false; //琛ㄧず鏁版嵁鏈纭繑鍥炴椂涓嶈繘琛屽姞杞�

    /**
    * 璁㈠崟瀹濊礉杩涘害鑺傜偣鐐逛寒hover鏁堟灉
    * @method zoomInHover
    */
    function zoomInHover() {
        zoomInTriggerNode.on('mouseover mouseout', function (e) {
            if (e.type == 'mouseover') {
                zoomInBoxContainer.addClass('hasbuy-hover');
            } else {
                zoomInBoxContainer.removeClass('hasbuy-hover');
            }
        })
    }
    /**
    * 鐐瑰嚮鏇村鏃惰Е鍙戜簨浠�
    * @method zoomInExecute
    */
    function zoomInExecute() {
        zoomInTriggerNode.on('click', function (e) {
            var LoadDataURL = $(this).attr('data-url');
            //灞曞紑
            if ($(this).hasClass('open')) {

                zoomInBoxNode
                    .addClass('zoomInExe')
                    .addClass('hasbuy-hover')
                    .css('position', 'absolute');
                zoomInBoxContainer.css('z-index', '4');

                $(this).removeClass('open');

                //涓嶉噸澶嶅姞杞�
                if (flagHasLoad) {
                    zoomInExeScroll();
                    return;
                }
                //鎵ц寮傛鏁版嵁鍔犺浇
                zoomInExeLoad(LoadDataURL);
                MT.tracelog('sns.20.2');

                //鍏抽棴
            } else {
                zoomInClose();
            }
        })
    }
    function zoomInClose() {
        if (!zoomInScrollBar) return;

        zoomInScrollBar.destroy();
        zoomInScrollBar = null;
        zoomInBoxNode
            .removeClass('zoomInExe')
            .removeClass('hasbuy-hover');

        zoomInBoxContainer
            .removeClass('hasbuy-hover')
            .css('z-index', '2');

        zoomInTriggerNode.addClass('open');
    }
    /**
    * 鏇村鏁版嵁寮傛鍔犺浇
    * @method zoomInExeLoad
    * @param {string} url 寮傛鎺ュ彛
    */
    function zoomInExeLoad(url) {
        var _success = function (data) {

            zoomInMoreNextDataFlag = true;
            zoomInMoreNextUrl = data.nexturl;

            var DomDataList = $(S.trim(data.html));

            insertData(DomDataList);
            //DOM娓叉煋瀹屽悗閲嶆柊娓叉煋tooltips
            hasBuyRateTips(DomDataList);

            flagHasLoad = true;
            //DOM娓叉煋瀹屽悗鍔犺浇婊氬姩鏉�
            if (zoomInScrollBar) {
                zoomInScrollBar.resize();
            } else {
                zoomInExeScroll();
            }
        },
            _error = function () { };

        //琛ㄧず鏁版嵁鏈纭繑鍥炴椂涓嶈繘琛屽姞杞�
        zoomInMoreNextDataFlag = false;

        MT.IO(url, {}, _success, _error);
    }
    /**
    * 鏇村鏁版嵁澧炲姞婊氬姩鏉℃晥鏋�
    * @method zoomInExeScroll
    */
    function zoomInExeScroll() {
        zoomInScrollBar = new Kscroll(zoomInScrollNode, {
            clientFn: zoomInMoreScrollData
        });
    }
    /**
    * 婊氬姩鏉℃渶搴曢儴寮傛鍔犺浇涓嬩竴椤垫暟鎹�
    * 濡傛灉涓嬩竴椤祏rl涓嶅瓨鍦ㄥ垯蹇界暐姝ゆ搷浣�
    * @method zoomInMoreScrollData
    */
    function zoomInMoreScrollData() {
        if (!zoomInMoreNextUrl || !zoomInMoreNextDataFlag) return;
        zoomInExeLoad(zoomInMoreNextUrl);
    }
    //鎻掑叆DOM鏁版嵁
    function insertData(data) {
        zoomInScrollNode.append(data);
    }
    /**
    * 璁㈠崟杩涘害鍔ㄧ敾鏁堟灉
    * @method hasBuyRate
    */
    function hasBuyRate() {
        S.each(zoomInBoxContainer.all('section'), function (node) {
            var rateValue = $(node).attr('data-rate');
            if (rateValue) {
                S.later(function () {
                    $(node).addClass(rateValue);
                }, 500)
            }
        })
    }
    /**
    * 璁㈠崟瀹濊礉杩涘害鑺傜偣tooltip鎻愮ず
    * 婊氬姩鏇村闇€瑕侀噸鏂版覆鏌搕ooltip
    * @method hasBuyRateTips
    */
    function hasBuyRateTips(domDataObject) {
        var itemFlowLoadExe = function (url, id, node) {
            MT.IO(url, {}, function (data) {
                var htmlStr = _logistics_tempalte(data);
                $('#' + id).html(htmlStr);
                node.data('tooltip').align(node, ['tc', 'bc'], [0, -10]);

            });
        },
            _initTooltip = function (targetNode) {
                targetNode.all('a').each(function (node) {
                    var tipsValue = $(node).attr('data-title'),
                        itemFlowLoadURL = $(node).attr('data-url');

                    if (tipsValue) {
                        //姝ｅ父闈欐€佹暟鎹�
                        MT.tooltip(node, 'bottom', '', function () {
                            MT.tracelog('sns.20.1');
                        });
                    } else if (itemFlowLoadURL) {
                        //寮傛璇诲彇鐗╂祦淇℃伅
                        var _logisticsId = "logis-" + (new Date()).getTime() + parseInt(10 * Math.random());
                        MT.tooltip(node, 'bottom', '<span id=' + _logisticsId + '>loading...</span>', function () {
                            itemFlowLoadExe(itemFlowLoadURL, _logisticsId, node);
                            MT.tracelog('sns.20.1');
                        });
                    }
                })
            },
            domContainer = null;

        //寮傛鍔ㄦ€佹暟鎹覆鏌撳嚭鍚庢搷浣�
        if (domDataObject) {
            domContainer = [];
            domDataObject.each(function (nodeContainer) {
                if (nodeContainer.nodeName() == 'div') {
                    //鎻愰啋鍗栧鍙戣揣鍔ㄦ€佷簨浠剁粦瀹�
                    remindDeliver(nodeContainer.all('.J_RemindDeliver'));

                    //a鑺傜偣缁戝畾tips鏂规硶
                    _initTooltip(nodeContainer);
                }
            })
        } else {
            //a鑺傜偣缁戝畾tips鏂规硶
            _initTooltip(zoomInBoxContainer);
        }
    }

    function _logistics_tempalte(data) {
        var template = "<p class='hasbuy-tips-flow'>" +
                       data.list[0].time + "&nbsp;&nbsp;" + data.list[0].desc + "</p>" +
                       "<p>" + (data.companyName ? "鐗╂祦鍏徃:" + data.companyName : "") + "&nbsp;&nbsp;杩愬崟鍙风爜:" + data.mailNo +
                            ((S.trim(data.list[0].desc) == "璇ヨ鍗曟棤娴佽浆淇℃伅") ?
                                (data.companyUrl ? "&nbsp;&nbsp;<a target='_blank' href='" + data.companyUrl + "'>鍘诲畼缃戞煡鐪�</a>"
                                : '')
                            : "&nbsp;&nbsp;<a target='_blank' href='" + data.wuliuDetailUrl + "'>鐪嬪畬鏁寸墿娴�</a>") +
                       "</p>";

        return template;
    }
    /**
    * 鎻愰啋鍗栧鍙戣揣
    * @method remindDeliver
    */
    function remindDeliver(targetNodes) {
        targetNodes.on('click', function (ev) {
            ev.halt();
            var url = $(this).attr('data-remind-url');
            SNS.login(function () {

                S.io.jsonp(url, {}, function (json) {
                    if (json.success == 'true') {
                        alert('鎻愰啋鍙戦€佹垚鍔�');
                    } else {
                        alert('鎻愰啋鍙戦€佹垚鍔�');
                    }
                });

                MT.tracelog('sns.20.3');
            });
        })
    }
    /**
    * 浜嬩欢缁戝畾
    * @method otherEventBind
    */
    function otherEventBind() {
        $(document.body).on('click', function (ev) {
            var hasbuyNode = S.one('#has-buy');
            if (hasbuyNode.contains(ev.target) || hasbuyNode == ev.target)
                return;
            zoomInClose();
        });

        //鍖哄煙娌℃湁鏁版嵁鏃秈e6 hover浜嬩欢
        if (S.UA.ie == 6) {
            var markNode = zoomInBoxContainer.one('.app-mark');
            if (!markNode) return;
            zoomInBoxContainer.on("mouseover mouseout", function (ev) {
                if (ev.type == "mouseover") {

                    markNode.css('visibility', 'visible');

                } else {
                    markNode.css('visibility', 'hidden');
                }
            });
        }
    }
    return {
        init: function () {
            //鑺傜偣hover鏁堟灉
            zoomInHover();
            //鏀惧ぇ鏁堟灉
            zoomInExecute();
            //鍔ㄧ敾鐗╂祦杩涘害鏁堟灉
            hasBuyRate();
            //tooltip鍒濆鍖�
            hasBuyRateTips();
            //鎻愰啋鍗栧鍙戣揣
            remindDeliver($('.J_RemindDeliver'));
            //鍏朵粬浜嬩欢缁戝畾
            otherEventBind();
        }
    }

}, { requires: [
    'utils/global',
    'utils/scroll'
]
});

/**
* scrollbar for kissy
* @author changyin@taobao.com,yiminghe@gmail.com
*/
KISSY.add("utils/scroll", function (S, Node) {
    var $ = Node.all,

    //姝ｆ暟
        toPositive = function (n) {
            return n < 0 ? -n : n;
        },

        toInt = function (n) {
            return isNaN(parseInt(n)) ? 0 : parseInt(n);
        },

        SCROLL_HTML = '<div class="{prefix}scrollbar"><div class="{prefix}track" ' +
            '>' +
            '<div class="{prefix}drag" ' +
            '>' +
            '<div class="{prefix}dragtop">' +
            '</div><div class="{prefix}dragbottom"></div>' +
            '<div class="{prefix}dragcenter"></div>' +
            '</div>' +
            '</div></div>',

        ARROW = '<div ' +
            'class="{prefix}arrow{type}">' +
            '<a href="javascript:void(\'scroll {type}\')" ' +
            '>scroll {type}</a>' +
            '</div>';

    function capitalFirst(s) {
        return s.charAt(0).toUpperCase() + s.substring(1);
    }

    /**
    * Scroll鏋勯€犲櫒
    * @param container 瀹瑰櫒
    * @param config 閰嶇疆
    */
    function Scroll(container, config) {
        var self = this;
        Scroll.superclass.constructor.call(self, config);
        self._init(container);
    }

    //灞炴€�
    Scroll.ATTRS = {
        prefix: {
            value: "ks-"
        },
        duration: {
            value: 0.1
        },
        easing: {
            value: "easeNone"
        },
        container: {},
        body: {},
        track: {},
        drag: {},
        arrowUp: {},
        allowArrow: { value: true },
        arrowDown: {},
        step: {},
        scrollBar: {},
        clientFn: null
    };

    S.extend(Scroll, S.Base, {
        //鍒濆鍖朣croll
        _init: function (container) {
            var self = this,
                prefix = "." + self.get("prefix");
            //鍒ゆ柇瀹瑰櫒鏄惁姝ｇ‘
            container = self._wrap($(container));
            //鍒濆鍖朥I灞炴€�
            self.set("container", container);
            self.set("body", container.one(prefix + "body"));
            self.set("track", container.one(prefix + "track"));
            self.set("drag", this.get("track").one(prefix + "drag"));

            if (self.get("allowArrow")) {
                self.set("arrowUp", container.one(prefix + "arrowup"));
                self.arrowUpHeight = self.get("arrowUp").outerHeight();
                self.set("arrowDown", container.one(prefix + "arrowdown"));
                self.arrowDownHeight = self.get("arrowDown").outerHeight();
            } else {
                self.arrowUpHeight = self.arrowDownHeight = 0;
            }
            //缁戝畾鍚勭浜嬩欢
            self._bindEvt();
            //鍒濆鍖栧昂瀵�
            self._setSize();
        },

        destroy: function () {
            var self = this,
                container = self.get("container"),
                track = self.get("track"),
                arrowUp = self.get("arrowUp"),
                arrowDown = self.get("arrowDown"),
                c = container.children().item(0);
            if (arrowUp) {
                arrowUp.remove();
            }
            if (arrowDown) {
                arrowDown.remove();
            }
            c.insertBefore(container);
            container.remove();
            c.css(self.__backup);
            c.removeClass(self.get("prefix") + "body");
        },

        _wrap: function (container) {
            var self = this,
                prefix = self.get("prefix"),
                wrap = $("<div></div>");

            //ie6涓嬭嚜鍔ㄦ墿灞曢棶棰�
            if (S.UA.ie == 6) {
                container.css({ "overflow": "auto" });
            }

            //panel wrap
            wrap.insertAfter(container).append(container);

            //澧炲姞鍩烘湰鏍峰紡
            wrap.addClass(prefix + "container")
                .css({
                    position: "relative",
                    overflow: "hidden",
                    width: container.outerWidth(),
                    height: container.outerHeight()
                });

            //婊氬姩鏉�
            wrap.append(S.substitute(SCROLL_HTML, {
                prefix: prefix
            }));

            var scrollbar = wrap.one("." + prefix + "scrollbar");

            self.set("scrollBar", scrollbar);

            //鍚戜笂锛屽悜涓嬬澶�
            if (self.get("allowArrow")) {
                scrollbar.append(S.substitute(ARROW, {
                    type: 'up',
                    prefix: prefix
                }));
                scrollbar.append(S.substitute(ARROW, {
                    type: 'down',
                    prefix: prefix
                }));
            }

            var style = container[0].style;

            self.__backup = {
                "position": style.position,
                "top": style.top,
                "left": style.left,
                "width": style.width,
                "height": style.height,
                "overflow": style.overflow
            };

            //澧炲姞panel hook
            container.css({
                "position": "absolute",
                "top": 0,
                "left": 0,
                "width": "100%",
                "height": "auto",
                "overflow": "visible"
            }).addClass(prefix + "body");

            return wrap;
        },

        _bindArrow: function (type) {
            var self = this,
                type2 = capitalFirst(type),
                speed = 0,
                timer = null,
                prefix = self.get("prefix"),
                n = self.get("arrow" + type2),
                timeSet = function () {
                    speed += 1;
                    var step = self.get("step");
                    var sh = type == "up" ? step : -step,
                        t = 300 - speed * 25;
                    self.scrollByDistance(sh);
                    if (t <= 30) {
                        t = 30
                    }
                    timer = setTimeout(function () {
                        timeSet();
                    }, t);
                };

            n.on("click",
                function () {
                    var sh = self.get("step");
                    self.scrollByDistance(type == "up" ? sh : -sh);
                }).on("mousedown",
                function () {
                    n.addClass(prefix + "arrow" + type + "-active");
                    timeSet();
                }).on("mouseup",
                function () {
                    n.removeClass(prefix + "arrow" + type + "-active");
                    speed = 0;
                    clearTimeout(timer);
                }).on("mouseleave",
                function () {
                    // 闈爉ouseup娓呴櫎瀹氭椂鍣ㄤ笉闈犺氨锛屽洜涓烘湁浜涙儏鍐典笅鍙互涓嶆墽琛宮ouseup
                    n.removeClass(prefix + "arrow" + type + "-active");
                    speed = 0;
                    n.removeClass(prefix + "arrow" + type + "-hover");
                    clearTimeout(timer);
                }).on("mouseover",
                function () {
                    n.addClass(prefix + "arrow" + type + "-hover");
                });
        },

        _bindDrag: function () {
            var doc = $(document),
                self = this,
                pageY,
                prefix = self.get("prefix"),
                current = 0,
                drag = self.get("drag"),
                track = self.get("track"),
                moveFn = function (ev) {
                    var trackLen = track.outerHeight(),
                        dragLen = drag.outerHeight(),
                        t = trackLen - dragLen,
                        position = current + (ev.pageY - pageY);

                    //鏈€涓婇潰
                    if (position < 0) {
                        position = 0;
                    }

                    //鏈€涓嬮潰
                    if (position > t) {
                        position = t;
                    }

                    drag.css("top", position);

                    self.scrollByPercent(position / t, 1);
                };

            //缁戝畾鍚勭drag浜嬩欢
            drag
                .on("mouseenter", function (ev) {
                    drag.addClass(prefix + "drag-hover");
                })
                .on("mouseleave", function (ev) {
                    drag.removeClass(prefix + "drag-hover");
                })
                .on("click", function (ev) {
                    // prevent track handle it
                    ev.stopPropagation();
                })
                .on("mousedown", function (ev) {
                    drag.addClass(prefix + "drag-active");
                    current = parseInt(drag.css("top")) || 0;
                    pageY = ev.pageY;
                    doc
                        .on("mousemove", moveFn)
                        .on("mouseup", function () {
                            drag.removeClass(prefix + "drag-active");
                            doc.detach("mousemove", moveFn);
                            doc.detach("mouseup", arguments.callee);
                            pageY = 0;
                        });

                });
        },

        //瀹岀編鏀寔閿洏婊氬姩
        _bindHotkey: function () {
            var self = this,
                body = self.get("body"),
                container = self.get("container"),
                canMousewheel = function (direction) {
                    var position = toInt(body.css("top"));
                    if (direction > 0 && position >= 0) {
                        return false;
                    }
                    if (direction < 0 && position + body.outerHeight() <= container.outerHeight()) {
                        return false;
                    }
                    return true;
                };

            //褰撳墠瀹瑰櫒涓€瀹氳鑾峰彇鐒︾偣鎵嶈兘浣跨敤閿洏浜嬩欢
            //鑰冭檻鍒皁utline瀹炲湪褰卞搷缇庤锛岀洿鎺ュ垹鎺�
            container.css("outline", "none").attr("tabindex", S.guid()).on("keydown", function (ev) {
                var keycode = ev.keyCode,
                    sh = self.get("step");

                //淇鍐呭鍖哄煙鍚湁textarea bug
                if (~"INPUT,TEXTAREA".indexOf(ev.target.nodeName.toUpperCase())) {
                    return;
                }

                if (! ~"38,39,36,40,37,35".indexOf(keycode)) {
                    return;
                }

                var d = ~"38,39,36".indexOf(keycode) ? sh : -sh;
                if (canMousewheel(d)) {
                    ev.halt();
                }

                switch (keycode) {
                    case 38:
                    case 39:
                        self.scrollByDistance(sh);
                        break;
                    case 40:
                    case 37:
                        self.scrollByDistance(-sh);
                        break;
                    case 36:
                        self.scrollByPercent(0);
                        break;
                    case 35:
                        self.scrollByPercent(1);
                        break;
                }
            });

        },

        _bindTrack: function () {
            var self = this,
                prefix = self.get("prefix");
            var track = self.get("track");
            track.
                unselectable()
                .on("click",
                function (ev) {
                    self.scrollByPercent((ev.pageY - track.offset().top) / (track.outerHeight()));
                })
                .on("mousedown", function (ev) {
                    // prevent chrome selection
                    ev.preventDefault();
                })
                .on("mouseenter",
                function () {
                    track.addClass(prefix + "track-hover");
                })
                .on("mouseleave", function (ev) {
                    track.removeClass(prefix + "track-hover");
                });
        },

        //鎷栧姩鍐呭鍖哄煙婊氬姩
        _bindBodyDrag: function () {
            var self = this,
                doc = $(document),
                body = self.get("body"),
                pageY = 0,
                moveFn = function (ev) {
                    if (pageY > ev.pageY) {
                        self.scrollByDistance(5);
                    } else {
                        self.scrollByDistance(-5);
                    }
                };

            body.on("mousedown", function (ev) {
                pageY = ev.pageY;
                doc
                    .on("mousemove", moveFn)
                    .on("mouseup", function () {
                        doc.detach("mousemove", moveFn);
                        doc.detach("mouseup", arguments.callee);
                        pageY = 0;
                    });
            });

        },

        _bindContainer: function () {
            var self = this,
            //鍦ㄦ渶涓婃垨鑰呮渶涓嬪啀婊氬姩锛屼笉瑕侀樆姝㈡祻瑙堝櫒榛樿浜嬩欢
                body = self.get("body"),
                container = self.get("container"),
                canMousewheel = function (direction) {
                    var position = toInt(body.css("top"));
                    if (direction > 0 && position >= 0) {
                        return false;
                    }
                    if (direction < 0 && position + body.outerHeight() <= container.outerHeight()) {
                        //婊氬姩鍒版渶涓嬮潰鍚庣殑寮傛鍔犺浇
                        self.get('clientFn') ? (self.get('clientFn'))(self) : '';
                        return false;
                    }
                    return true;
                };
            //婊氳疆浜嬩欢
            self.get("container").on("mousewheel", function (ev) {
                if (canMousewheel(ev.deltaY)) {
                    ev.halt();
                }
                var sh = self.get("step");
                self.scrollByDistance(ev.deltaY > 0 ? sh : -sh);
            });
        },

        //缁戝畾浜嬩欢
        _bindEvt: function () {
            var self = this;

            self._bindContainer();

            //涓婁笅绠ご
            if (self.get("allowArrow")) {
                self._bindArrow("up");
                self._bindArrow("down");
            }

            //鍗曞嚮杞ㄩ亾
            self._bindTrack();

            //鎷栧姩婊氬姩鏉�
            self._bindDrag();

            //閿洏鏀寔
            if (self.get("hotkey") === true) {
                self._bindHotkey();
            }

            //鏀寔鍦ㄥ唴瀹瑰尯鍩熸嫋鍔�
            if (self.get("bodydrag")) {
                self._bindBodyDrag();
            }

        },

        //閲嶇疆澶у皬
        resize: function (w, h) {
            var self = this;
            self.get("container").css({
                width: w,
                height: h
            });
            self._setSize();
        },

        //璁剧疆澶у皬
        _setSize: function () {
            //璁剧疆婊氬姩骞呭害
            var self = this,
                bh = self.get("body").outerHeight(),
                sh,
                ch = self.get("container").innerHeight(),
                arrowUp = self.get("arrowUp"),
                arrowDown = self.get("arrowDown"),
                track = self.get("track"),
                drag = self.get("drag"),
                ah = self.arrowUpHeight + self.arrowDownHeight;

            if (bh <= ch || ch < ah) {
                //姘村効鍙戠幇鐨刡ug,鏌愪簺鎯呭喌涓嬫粴鍔ㄦ潯闅愯棌锛宼op>0
                self.get("body").css({ "top": 0 });
                self.get("scrollBar").hide();
                return;
            } else {
                self.get("scrollBar").show();
            }

            sh = (ch - ah) * ch / bh;

            if (sh < 20) {
                sh = 20;
            }

            if (!self.get("step")) {
                self.set("step", Math.max(sh / 6, 10));
            }

            track.css({
                height: ch - ah,
                top: self.arrowUpHeight
            });

            //drag
            drag.css({
                height: sh
            });

        },

        //婊氬姩鍒版寚瀹氫綅缃�
        _scrollBodyToPosition: function (position) {
            var self = this,
                container = self.get("container"),
                body = self.get("body"),
                t = body.outerHeight() - container.innerHeight();
            if (t < 0) {
                return;
            }
            if (position > 0) {
                position = 0;
            }
            if (toPositive(position) > t) {
                position = -t;
            }
            body.css("top", position);
        },

        scrollByDistance: function (distance, notUpdateBar) {
            var self = this,
                position = parseInt(self.get("body").css("top")) + distance;
            self._scrollBodyToPosition(position);
            if (!notUpdateBar) {
                self._updateBar();
            }
        },

        scrollByPercent: function (percent, notUpdateBar) {
            var self = this;
            percent = parseFloat(percent, 10);
            if (isNaN(percent) || percent > 1 || percent < 0) {
                return;
            }
            var d = (self.get("body").outerHeight() - self.get("container").innerHeight()) * (-percent);
            self._scrollBodyToPosition(d);
            if (!notUpdateBar) {
                self._updateBar();
            }
        },

        //婊氬姩鍒版寚瀹氬厓绱�
        scrollToElement: function (el) {
            el = $(el);
            if (!el.length) {
                return;
            }
            var self = this,
                position = el.offset().top - self.get("body").offset().top;
            self._scrollBodyToPosition(-position);
            self._updateBar();
        },

        //鍚屾婊氬姩鏉′綅缃�
        _updateBar: function () {
            var self = this,
                drag = self.get("drag"),
                th = self.get("track").innerHeight() - drag.outerHeight(),
                body = self.get("body"),
                container = self.get("container"),
                percent = toPositive(parseInt(body.css("top"))) / (body.outerHeight() - container.innerHeight());
            drag.css("top", percent * th);
        }

    });

    return Scroll;

}, {
    requires: ["node"]
});
/**
* 2012-02-24
*  - review and refactor by yiminghe@gmail.com
*  - 1.0 to cdn
*  - TODO for changyin : 妯悜妯℃嫙婊氬姩鏉�
*
* 2012-02-25
*  - bugfix ie6鑷姩鎵╁睍闂锛屽姞涓妎verflow:auto
*  - 娓呯窘鐨勫缓璁紝缁勪欢涓嶈兘婊氬姩鏃讹紝涓嶈闃绘娴忚鍣ㄩ粯璁や簨浠�
* 2012-04-19
*  - 淇姘村効鍙戠幇鐨刡ug
*  - 閿洏鏀寔 key[38,39,36,40,37,35], 娉ㄦ剰锛歬ey浜嬩欢缁戝畾鍦╟ontainer涓婏紝娌℃湁鑾峰緱鐒︾偣鐨勬儏鍐典笅鏃犳硶浣跨敤閿洏鎿嶄綔
*
* 2012-05-05
- 澧炲姞 wrap 鍏冪礌锛岀畝鍖栦唬鐮�
- 澧炲姞鏂扮毊鑲�
**/

/**
* @fileOverview handheld mode
* @author lingyu.csh
*/

KISSY.add('page/mods/app-all', function (S, MT) {

    var $ = S.all;
    //搴楅摵鏀惰棌
    var APPShop = {
        attr: {
            'appShopNode': $('#app-collect-shop'),
            'targetNodes': $('.J_collect_shop').all('img'),
            'shopLogoNodes': $('.J_collect_shop'),
            'headerNode': $('#app-collect-shop').one('header'),
            'shopWhy': $('#app-collect-shop').one('.why')
        },
        roundShop: function () {
            var self = this;
            S.use('common/round-vml', function (S, RoundVML) {
                RoundVML.init(self.attr['targetNodes']);
            });

        },
        shopNameTips: function () {
            MT.tooltip(this.attr['shopLogoNodes'], 'bottom', '', function () {
                MT.tracelog('sns.20.14');
            });
            MT.tooltip(this.attr['shopWhy'], 'bottom');
        },
        bindHeadEvent: function () {
            _bindHeadEvent(this.attr['headerNode']);
        },
        _init: function () {
            if (!this.attr['appShopNode'].length) return;
            this.shopNameTips();
            this.bindHeadEvent();
            //ie6涓媓over
            _bindNoDataHover(this.attr['appShopNode']);
        }
    };
    //瀹濊礉鏀惰棌
    var APPItem = {
        attr: {
            'appItemNode': $('#app-collect-item'),
            'itemImgNodes': $('.J_collect_item'),
            'headerNode': $('#app-collect-item').one('header')
        },
        itemNameTips: function () {
            MT.tooltip(this.attr['itemImgNodes'], 'bottom', '', function () {
                MT.tracelog('sns.20.15');
            });
        },
        bindHeadEvent: function () {
            _bindHeadEvent(this.attr['headerNode']);
        },
        _init: function () {
            if (!this.attr['appItemNode'].length) return;
            this.bindHeadEvent();
            //tips
            this.itemNameTips();
            //ie6涓媓over
            _bindNoDataHover(this.attr['appItemNode']);
        }
    };
    //濂藉弸鍔ㄦ€�
    var FrendFeed = {
        attr: {
            'frendFeed': $('#app-friend-feed'),
            'itemImgNodes': $('#app-friend-feed').one('dd'),
            'headerNode': $('#app-friend-feed').one('header')
        },
        href: function () {
            var url = this.attr['itemImgNodes'] ? this.attr['itemImgNodes'].attr('data-url') : null;
            if (url) {
                this.attr['itemImgNodes'].parent().on('click', function (ev) {
                    window.open(url);
                });
            }
        },
        bindHeadEvent: function () {
            _bindHeadEvent(this.attr['headerNode']);
        },
        _init: function () {
            if (!this.attr['frendFeed'].length) return;
            //濂藉弸feed鍖哄煙鐐瑰嚮
            this.href();
            //澶撮儴鍖哄煙鐐瑰嚮
            this.bindHeadEvent();
            //ie6涓媓over
            _bindNoDataHover(this.attr['frendFeed']);
        }
    };
    //鎵揣灏忓垎闃�
    var Quanzi = {
        attr: {
            'quanzi': $('#app-quanzi'),
            'itemNodes': $('#app-quanzi').all('.qz-item'),
            'headerNode': $('#app-quanzi').one('header')
        },
        itemNameTips: function () {
            MT.tooltip(this.attr['itemNodes'], 'bottom');
        },
        bindHeadEvent: function () {
            _bindHeadEvent(this.attr['headerNode']);
        },
        _init: function () {
            if (!this.attr['quanzi'].length) return;
            //tips
            this.itemNameTips();
            this.bindHeadEvent();
            //ie6涓媓over
            _bindNoDataHover(this.attr['quanzi']);
        }

    };
    //澶撮儴杩炴帴浜嬩欢缁戝畾
    function _bindHeadEvent(targetNode) {
        targetNode.on('click', function (ev) {
            ev.halt();
            var href = $(this).one('a').attr('href');
            window.open(href);
        })
    }
    //鍖哄煙娌℃湁鏁版嵁鏃秇over浜嬩欢
    function _bindNoDataHover(targetNode) {
        if (S.UA.ie == 6) {
            var markNode = targetNode.one('.app-mark');
            if (!markNode) return;
            targetNode.on("mouseover mouseout", function (ev) {

                if (ev.type == "mouseover") {

                    markNode.css('visibility', 'visible');

                } else {
                    markNode.css('visibility', 'hidden');
                }
            });
        }
    }

    return {
        init: function () {
            if (S.UA.ie && S.UA.ie < 9) {
                //搴楅摵鏀惰棌ie涓嬪渾瑙�
                APPShop.roundShop();
            };
            //搴楅摵鏀惰棌
            APPShop._init();
            //瀹濊礉鏀惰棌
            APPItem._init();

            //濂藉弸鍔ㄦ€�
            FrendFeed._init();
            //鎵揣灏忓垎闃�
            Quanzi._init();
        }
    }

}, { requires: [
    'utils/global'
]
});

/**
* @fileOverview 渚挎皯涓績妯″潡(鍦�2012骞存垜鐨勬窐瀹濇敼鐗堟椂閲嶆瀯浜嗚繖涓ā鍧�)
* @author 榫欏垰 <tblonggang@gmail.com>
*/
KISSY.add('page/mods/expressway', function (S) {

    (function () {

        var S = KISSY, DOM = S.DOM, Event = S.Event,

			triggers = DOM.query('.J_MtExpressTab'),
			panels = DOM.query('.J_MtExpressIframe'),

			moreArea = DOM.get('#J_MtMoreExpress'),
			moreAreaUl = DOM.get('UL', moreArea),
			moreAreaTriggers = DOM.query('.J_MtExpressTab', moreArea),
			moreTrigger = DOM.get('#J_MtMoreTrigger'),
			onTop = moreTrigger;
        gameFlag = false;

        var mtExpressway = {
            init: function () {
                var host = this;

                S.use('switchable', function (S, Switchable) {

                    var expressBox = new Switchable.Tabs(DOM.get('#J_MtExpressway'), {
                        activeIndex: 0,
                        activeTriggerCls: 'selected',
                        triggerType: 'click',
                        markupType: 2,
                        triggers: triggers,
                        panels: panels
                    });

                    // KISSY dataLazyLoad妯″潡瀛樺湪宓屽闂锛屾墍浠ヤ汉鑲夎В鍐砽azyload鐨勯棶棰�
                    expressBox.on('switch', function (ev) {

                        var target, content, textarea, iframeInnerHTML, neoIframe;
                        target = ev.target;
                        content = target.panels[ev.currentIndex];
                        textarea = DOM.get('textarea', content);

                        // 棣栦釜TAB涓嬮潰鏄洿鎺ュ垵濮嬪寲锛屾墍浠ュ彲鑳芥槸娌℃湁textarea鐨�
                        if (textarea) {
                            iframeInnerHTML = textarea.value;
                            neoIframe = DOM.create(iframeInnerHTML);
                            content.appendChild(neoIframe);
                            DOM.remove(textarea);
                        }

                        if (ev.currentIndex < 2) {
                            S.one('#J_MtExpressHeader').removeClass('expressway-more-selected');
                        }

                        if (ev.currentIndex == 1) {
                            if (gameFlag) return;
                            host._GameTabFunction();
                        }

                        //鍘绘帀鐒︾偣
                        target.triggers[ev.currentIndex].blur();

                        MT.tracelog(target.triggers[ev.currentIndex]);
                    });

                    host._bindEvent();
                });

                if (S.UA.ie == 6) {
                    var neoNode = DOM.create('<iframe></iframe>', {
                        css: {
                            width: 0,
                            height: 0,
                            border: 0,
                            display: 'none',
                            position: 'absolute',
                            zIndex: -1,
                            top: 51,
                            left: 0,
                            border: 'none'
                        },
                        scrolling: 'no',
                        frameborder: 0
                    });
                    var neoNode2 = DOM.create('<div style="position: relative;"></div>');

                    neoNode2.appendChild(neoNode);
                    DOM.prepend(neoNode2, DOM.get('#J_MtExpressHeader'));

                    host.mask = neoNode;
                }
                //2013-08-22 basilwang 不需要充值
                //host._phoneTabFunction();
            },

            /**
            * 娓告垙鐨剆witchable澶勭悊 & 璧勬簮寮曠敤
            * @author Mu Yun <muyun.my@taobao.com>
            * @date 2013-02-27
            */
            _GameTabFunction: function () {

                var ts = KISSY.one('#J_Game').attr('data-ts'); // 鏃堕棿鎴�
                //琛ㄧず鏄惁鍔犺浇杩�
                gameFlag = true;
                // 鍗曠嫭鍔ㄦ€佸姞杞絫b-home/css/common/v2/new-service.css
                KISSY.config({
                    packages: [
                        {
                            name: 'gallery',
                            path: 'http://a.tbcdn.cn/s/kissy',
                            charset: 'utf-8'
                        },
                        {
                            name: 'recharger',
                            path: 'http://a.tbcdn.cn/apps/tcc',
                            charset: 'utf-8'
                        },
                        {
                            name: 'tb-home',
                            path: 'http://a.tbcdn.cn/app/dp/',
                            charset: 'gbk'
                        }
                    ]
                });
                KISSY.use('node, dom, datalazyload, switchable, sizzle', function (S, Node, DOM, DataLazyLoad, Switchable, Sizzle) {
                    var currentIndex = 0,
                        containerNode = Node.one('#J_Game'),
                        tabs = new Switchable.Tabs(containerNode, {
                            switchTo: currentIndex,
                            markupType: 1,
                            triggerCls: 'J_GameSWTrigger',
                            panelCls: 'J_GameSWPanel',
                            lazyTextareaClass: 'J_GameSWPanel',
                            aria: true,
                            delay: 0
                        });

                    /* 浜嬩欢缁戝畾 */
                    containerNode.delegate('click', '.J_GameSWTrigger', function (ev) {
                        // 瀵艰埅涓嶅彲鐐瑰嚮
                        ev.preventDefault();
                        goldlogFn(S.one(ev.target).attr('data-goldlog'), '', '47700902');
                    });

                    tabs.on('beforeSwitch', function (ev) {
                        // 璁╁鑸厓绱犺仛鐒︿互瑙﹀彂瀹瑰櫒鍐呭脊灞傜殑blur浜嬩欢鏉ユ敹璧峰脊灞�
                        this.triggers[ev.toIndex].focus();
                        //涓婁竴琛岀殑focus涓嶈捣浣滅敤锛屽啀鏉ocusc涓€娆�
                        //hack
                        var tbrCardInputPanel = Node.one("#tbr-card-cat-input-panel");
                        if (ev.toIndex == 1 && tbrCardInputPanel && tbrCardInputPanel.css('display') != 'none') {
                            Node.one("#tbr-card-cat-input")[0].focus();
                        }
                        // 闅愯棌闈炲綋鍓嶅鍣紝闃叉tab鎿嶄綔琚共鎵�
                        // setTabIndex(this.panels[currentIndex], -1);
                        DOM.css(this.panels[currentIndex], 'visibility', 'hidden');
                        currentIndex = ev.toIndex;
                        // setTabIndex(this.panels[currentIndex], 0);
                        DOM.css(this.panels[currentIndex], 'visibility', 'visible');
                    });

                    tabs.on('switch', function (ev) {
                        // 浣垮綋鍓峱anel瀹瑰櫒鍏冪礌涓嶅彲鑱氱劍
                        DOM.attr(this.panels[ev.currentIndex], 'tabindex', '-1');
                        goldlogFn('/wanle.12.' + (ev.currentIndex + 1), '', '47700902');
                    });

                    /* 鍒濆鍖� */
                    S.each(tabs.panels, function (panel, index) {
                        // 闅愯棌闈炲綋鍓嶅鍣紝闃叉tab鎿嶄綔琚共鎵�
                        // setTabIndex(panel, index == currentIndex ? 0 : -1);
                        DOM.css(panel, 'visibility', index == currentIndex ? 'visible' : 'hidden');
                    });
                    // 浣垮綋鍓峱anel瀹瑰櫒鍏冪礌涓嶅彲鑱氱劍
                    DOM.attr(tabs.panels[tabs.activeIndex], 'tabindex', '-1');

                    // 鍖哄垎鏂拌€侀椤�
                    if (S.one('body').attr('data-spm') == '1000386') {
                        containerNode.addClass('new-service-game-fp1');
                    } else {
                        containerNode.addClass('new-service-game-fp2');
                    }

                    S.one('#tbr-game-loading').hide();
                    containerNode.show();

                    goldlogFn('/wanle.12.1', '', '47700902');

                    /**
                    * 鍙戦€侀粍閲戜护绠�
                    * @param {String} logkey
                    * @param {String} gokey
                    * @param {String} chksum
                    */
                    function goldlogFn(logkey, gokey, chksum) {
                        //                window.goldlog_queue || (window.goldlog_queue = []).push({
                        //                    action: "goldlog.record",
                        //                    arguments: [logkey, '', gokey, chksum]
                        //                });
                        //goldlog && goldlog.record(logkey, "", "", chksum);
                    }
                });
            },

            //鎵嬫満榛樿鎵ц鍑芥暟
            _phoneTabFunction: function () {
                S.getScript('http://a.tbcdn.cn/apps/tcc/recharger/build/20130502/tb_home/phone-min.js', function () {
                    KISSY.config({
                        packages: [
                            {
                                name: 'gallery',
                                path: 'http://a.tbcdn.cn/s/kissy',
                                charset: 'utf-8'
                            },
                            {
                                name: 'recharger',
                                path: 'http://a.tbcdn.cn/apps/tcc',
                                charset: 'utf-8'
                            }
                        ]
                    });
                    S.use('recharger/build/20130502/tb_home/phone.css', function (S) {
                        S.use('tbr/loader, tbr/utils/monitor', function (S, RechargerLoader, Monitor) {
                            RechargerLoader.load('phone', 'mytaobao', function (recharger) {
                                var containerNode = S.one('#tbr-phone'),
                                    data = S.namespace('tbr.phone');
                                S.one('#tbr-phone-loading').hide();
                                containerNode.show();

                                if (data.ad2.text) {
                                    containerNode.one('.tbr-btn-link').prop('href', data.ad2.href).html(data.ad2.text).show().on('click', function () {
                                        Monitor.goldlog('/wanle.3.1.1', '', '1535983221');
                                    });
                                    containerNode.one('.tbr-link').addClass('tbr-link-cutoff');
                                }
                                if (data.ad1.text) {
                                    containerNode.one('.tbr-link').prop('href', data.ad1.href).html(data.ad1.text).show();
                                }
                                Monitor.goldlog('/wanle.10.1', '', '47700902');

                            });
                        });
                    });
                }, 'utf-8');
            },

            _bindEvent: function () {
                var host = this;

                Event.on(moreArea, 'mouseenter', function (ev) {
                    DOM.addClass(this, 'expend');
                    host._showIEMask();
                });

                Event.on(moreArea, 'mouseleave', function (ev) {
                    DOM.removeClass(this, 'expend');
                    host._hideIEMask();
                });

                Event.on(moreArea, 'click', function (ev) {
                    var target = ev.target;
                    if (target.id == 'J_MtMoreTrigger') return;

                    //澶勭悊鏇村鐨勭澶存牱寮�
                    S.one(target).parent('#J_MtExpressHeader').addClass('expressway-more-selected');

                    if (target.nodeName.toUpperCase() !== 'LI') {
                        target = DOM.parent(target, 'LI');
                    }

                    if (target != moreTrigger) {
                        DOM.remove(moreTrigger);

                        host._showIEMask();

                        //ie6 7涓媝repend鎶ラ敊锛宬issy1.3瀵艰嚧锛屾殏鏃堕伩鍏�
                        if (S.UA.ie !== 6 && S.UA.ie !== 7) {
                            DOM.prepend(target, moreAreaUl);
                        }

                        // 娣诲姞鏍峰紡
                        DOM.removeClass(onTop, 'mt-top');
                        DOM.addClass(target, 'mt-top');

                        onTop = target;
                    }

                    DOM.removeClass(this, 'expend');
                    host._hideIEMask();

                });

                // 涓嬫媺妗嗙殑 hover 鏁堟灉
                if (S.UA.ie && window.MTB && MTB.mtBase) {
                    var fixHover = MTB.mtBase.fixHover,

						moreExpress = DOM.get('#J_MtMoreExpress'),
						moreExpressItems = DOM.query('.J_MtExpressTab', moreExpress);

                    fixHover(moreExpressItems, 'hover');
                }
            },

            _showIEMask: function () {
                if (S.UA.ie === 6) {
                    DOM.css(this.mask, {
                        width: DOM.width(moreArea),
                        height: DOM.height(moreArea),
                        display: 'block'
                    });
                }
            },

            _hideIEMask: function () {
                if (S.UA.ie === 6) {
                    DOM.css(this.mask, { display: 'none' });
                }
            }

        };

        mtExpressway.init();
        if (window.MTB) { MTB.mtExpressway = mtExpressway; }

    })();
})

/**
* @fileOverview 璐墿杞︽ā鍧楋紝闇€瑕佸紓姝ュ姞杞�
* @author lingyu.csh
*/

KISSY.add('page/mods/cart', function (S) {

    var $ = S.all,
        cartBoxContainer = $('#J_cart_container'),
        cartLoadURL = cartBoxContainer.attr('data-url'),
        cartBoxParent = $('#shop-cart');


    function cartExeLoad() {
        var _success = function (data) {
            if (S.trim(data) == '') {
                //鏁版嵁涓虹┖
                insertDomData('<div class="shop-cart-list cart-0"><a class="nodata-icon">璐墿杞︽病鏈夊疂璐�</a><p class="app-mark"><span><a target="_blank" href="http://cart.taobao.com/my_cart.htm">鎶婃兂涔扮殑瀹濊礉鏀捐繘鏉ュ惂锛屾湁浜嗕紭鎯犳垜浼氭彁閱掍綘鍝︺€�</a></span></p></div>');
                //ie6涓媓over
                _bindNoDataHover(cartBoxContainer);
            } else {
                var cartDOM = $(data);
                cartBoxParent.one('#J_cart_discount_box')
                        .html(cartDOM.one('#J_cart_discount_con').html());

                insertDomData(data);
            }
        }

        MT.IO(cartLoadURL, {}, _success);

    }

    function insertDomData(data) {
        cartBoxContainer.html(data);
    }
    //鍖哄煙娌℃湁鏁版嵁鏃秇over浜嬩欢
    function _bindNoDataHover(targetNode) {
        if (S.UA.ie == 6) {
            var markNode = targetNode.one('.app-mark');
            if (!markNode) return;
            targetNode.on("mouseover mouseout", function (ev) {
                if (ev.type == "mouseover") {
                    markNode.css('visibility', 'visible');

                } else {
                    markNode.css('visibility', 'hidden');
                }
            });
        }
    }

    return {
        init: function () {
            //璐墿杞﹀紓姝ュ姞杞�
            cartExeLoad();
        }
    }

}, { requires: [
]
});

/**
* @fileOverview 绁炵鍖呰９浜や簰
* @author lingyu.csh
*/

KISSY.add('page/mods/mystical-item', function (S, MT) {

    var $ = S.all;
    /**
    * 鎻愰啋鍙戣揣
    * @class ReceiveItem
    */
    var ReceiveItem = {
        targetNode: $('#J_Receive'),
        API: {
            'CREAT_SHARE_URI': 'http://t.taobao.com/cooperate/publish_share.do?_input_charset=utf-8'
        },
        bindEvent: function () {
            var self = this;
            self.targetNode.on('click', function (ev) {

                var url = $(this).attr('data-receiveurl');
                $(this).parent('.mystical-item').addClass('rate-ys mystical-ys-run');
                MT.IO(url, function (data) {
                    //寤惰繜鎵ц鍙戦€佽姹�
                    S.later(function () {
                        self._dialogBox(data);
                    }, 500)
                });

            })
        },
        _dialogBox: function (data) {
            var self = this;
            //data涓哄垎浜姹傞摼鎺�
            MT.dialog(ReceiveItem._getTemplateReceive(), function (D) {
                //鍒嗕韩绔欑偣logo鐐逛寒
                SNS.ui("sharesite", { output: "#J_ShareSite", shareTitle: '鍚屾鍒�', defaultChecked: true, batchCheckbox: true });

                //鍒嗕韩鎸夐挳鐐瑰嚮
                D.get('el').one('.btn-share').on('click', function (ev) {
                    ReceiveItem._sendShareInfo(D.get('el'), data);
                });
            })
        },
        //鍙戦€佸垎浜唴瀹�
        _sendShareInfo: function (dialogNode, url) {
            var dataParam = {
                'siteids': dialogNode.one('.J_SiteInfo').val(),
                'title': '鎴戠殑娣樺疂绁炵鍖呰９',
                'client_id': '176415',
                'comment': '鍦ㄢ€滄垜鐨勬窐瀹濃€濇敹鍒颁竴涓绉樺寘瑁癸紝涓嶇煡閬撴槸鍟ワ紝浣嗗凡缁忓彂璐т簡锛屾槑澶╁氨鑳界鏀躲€傝皝鑳藉憡璇夋垜杩欐槸绁為┈锛熺寽瀵规湁濂栥€傛潵鐪嬬湅#娣樺疂10骞寸绉樺寘瑁�#浣犱篃鏈夈€�',
                'pic': 'http://img01.taobaocdn.com/tps/i1/T1pjSzXEFcXXcUdm2I-400-400.png'
            }

            MT.IO(url, dataParam, function () {
                dialogNode.one('.btn-share').addClass('share-ok');
                dialogNode.one('.share').hide();
                S.later(function () {
                    window.location.reload();
                }, 500);
            })
        },
        _getTemplateReceive: function () {
            return '<div id="J_Mystical" class="receive-box"><h4><a class="close"></a></h4>' +
                '<div class="receive"><a class="btn-share" href="#"></a> <span class="share">' +
                '<p id="J_ShareSite"></p></span></div>'
            '</div>'
        }
    };
    /**
    * 棰嗗彇鍖呰９
    * @class RainItem
    */
    var RainItem = {
        targetNode: $('#J_Rain'),
        bindEvent: function () {
            this.targetNode.on('click', function (ev) {
                var url = $(this).attr('data-rainurl');
                MT.IO(url, function (data) {
                    if (data.awardType == '8') {
                        //鏃跺厜鏈�
                        MT.dialog(_getTimeMachine());

                    } else if (data.awardType == '3' || data.awardType == '4' || data.awardType == '7' || data.awardType == '9') {
                        //铏剧背闊充箰
                        var html = S.substitute(_getTemplateRain().replace('{{html}}', data.html));
                        MT.dialog(html, function (D) {
                            var src = D.get('el').one('#J_FlashBox').attr('data-src'),
                                shareMusic = D.get('el').one('#J_FlashBox').attr('data-id');
                            _LoadSwf(src);
                            _bindShare(D.get('el').one('.share-time'), data.awardType, shareMusic);
                        });

                    } else {
                        var html = S.substitute(_getTemplateRain().replace('{{html}}', data.html));
                        MT.dialog(html, function (D) {
                            /*var rainBtnNode = D.get('el').one('#J_Coupon');
                            if(!rainBtnNode) return;
                            rainBtnNode.on('click',function(ev){
                            window.location.reload();
                            })*/
                        });
                    }
                })
            })
        }
    };
    /**
    * 鏌ョ湅鍖呰９
    * @class LookItem
    */
    var LookItem = {
        targetNode: $('#J_Look'),
        bindEvent: function () {
            this.targetNode.on('click', function (ev) {
                var url = $(this).attr('data-lookurl');
                MT.IO(url, function (data) {
                    if (data.awardType == '8') {
                        //鏃跺厜鏈�
                        MT.dialog(_getTimeMachine());

                    } else if (data.awardType == '3' || data.awardType == '4' || data.awardType == '7' || data.awardType == '9') {
                        //铏剧背闊充箰
                        var html = S.substitute(_getTemplateRain().replace('{{html}}', data.html));
                        MT.dialog(html, function (D) {
                            var src = D.get('el').one('#J_FlashBox').attr('data-src'),
                                shareMusic = D.get('el').one('#J_FlashBox').attr('data-id');

                            _LoadSwf(src);
                            _bindShare(D.get('el').one('.share-time'), data.awardType, shareMusic);

                        });

                    } else {
                        var html = S.substitute(_getTemplateRain().replace('{{html}}', data.html));
                        MT.dialog(html);
                    }
                })
            })
        }
    };

    function _getTemplateRain() {
        return '<div id="J_Mystical" class="rain-box"><h4><a class="close"></a></h4>{{html}}' +
        //            '<dl><dt>浜茬埍鐨刋XXX</dt>' +
        //            '<dd class="gray">5鏈�10鏃ユ槸娣樺疂缃�10鍛ㄥ瞾鐨勭敓鏃ワ紝鎴戜滑涓€璧疯蛋杩囦簡568涓棩鏃ュ澶溿€傝繖浜涙棩瀛愶紝浣犺蛋杩戜簡娣樺疂锛屾窐瀹濅篃寮€濮嬫噦浣犮€�</dd>'+
        //            '<dd class="img"><img src="http://img01.taobaocdn.com/tps/i1/T1e91jXDpbXXX0sWwp-183-142.png" /></dd>' +
        //            '<dd><img src="http://img04.taobaocdn.com/tps/i4/T17T1jXDXbXXXnvLfO-366-80.png" /></dd>' +
        //            '<dd class="list">' +
        //            '<p><img src="http://img.f2e.taobao.net/img.png?x=100x69"/><a>xxxxxx</a></p>' +
        //            '<p><img src="http://img.f2e.taobao.net/img.png?x=100x69"/><a>xxxxxx</a></p>' +
        //            '<p><img src="http://img.f2e.taobao.net/img.png?x=100x69"/><a>xxxxxx</a></p></dd>' +
        //            '<dd><object type="application/x-shockwave-flash" width="257px" height="33px"><param name="movie" value="http://img.xiami.com/widget/0_1769111166_/singlePlayer.swf"></param><param name="wmode" value="transparent"></param></object></dd>'+
        //            '<dd class="btn"><a id="J_Coupon" class="btn-coupon" href="#"></a></dd>' +
        //            '</dl>'
        '</div>'
    }
    function _getTimeMachine() {
        return '<div id="J_Mystical_time"><a class="close"></a><iframe scrolling="no" width="950px" height="500px" frameborder="0" src="' + ((MT.serverHost == 'taobao.com') ? 'http://me.taobao.com?iframe=true' : 'http://pre.me.taobao.com?iframe=true') + '"></iframe></div>'
    }
    //鍔犺浇灏忕背闊充箰flash
    function _LoadSwf(swfSrc) {
        S.use('swf', function (S, SWF) {
            new SWF({
                render: '#J_FlashBox',
                attrs: {
                    'class': "swfstyle",
                    width: 257,
                    height: 33
                },
                params: {
                    wmode: 'transparent'
                },
                src: swfSrc
            });
        });
    }
    //缁戝畾鍒嗕韩
    function _bindShare(targetNode, type, musicShareUrl) {
        var shareParam = {};
        switch (type) {
            case '3':
                shareParam = {
                    'title': '鎴戠殑娣樺疂绁炵鍖呰９',
                    'client_id': '176415',
                    'comment': '閮借姣忎釜浜哄績涓兘鏈変竴棣栨瓕锛屽叧浜庢煇浜恒€佹煇浜嬶紝鎴栬€呮煇涓煄甯傜殑鏌愪釜瑙掕惤銆傚崄骞撮€濆幓锛岀墿鏄汉闈烇紝浣嗛偅姝屽０鍝嶈捣锛屽埞閭ｉ棿鎭嶆儦锛屽績渚濈劧浼氶ⅳ鍔ㄣ€�#娣樺疂10骞寸绉樺寘瑁�#浣犺兘鎯宠捣10骞村墠鐨勮嚜宸变箞锛�' + musicShareUrl,
                    'pic': 'http://img02.taobaocdn.com/tps/i2/T17g5xXqlgXXcUdm2I-400-400.png'
                }
                break;
            case '4':
                shareParam = {
                    'title': '鎴戠殑娣樺疂绁炵鍖呰９',
                    'client_id': '176415',
                    'comment': '鎵撳紑绁炵鍖呰９鐨勫埞閭ｏ紝鎴戠殑蹇冮渿棰や簡銆傝€宠竟鍝嶈捣鐨勭珶鐒舵槸鍝ュ摜鐨勬瓕澹帮紒鍥炲繂闇庢椂娑屼笂蹇冨ご鈥︹€︽窐瀹濓紝鎴戞仺浣狅紒浜哄蹇浣犲紕鍝暒锛佸揩鍘荤湅鐪嬩綘鐨�#娣樺疂10骞寸绉樺寘瑁�#閲屾槸鍟ャ€�' + musicShareUrl,
                    'pic': 'http://img04.taobaocdn.com/tps/i4/T1t11AXpRXXXcUdm2I-400-400.png'
                }
                break;
            case '7':
                shareParam = {
                    'title': '鎴戠殑娣樺疂绁炵鍖呰９',
                    'client_id': '176415',
                    'comment': '鎵撳紑绁炵鍖呰９锛屾垜闇囨儕浜嗐€傜櫨鍙ｈ帿杈╁晩锛佸簡骞歌繖鏃跺€欒€佸﹩娌″湪鏃佽竟銆傛ⅵ涓儏浜猴紝杩樻槸鍙瓨鍦ㄤ簬姊︿腑灏卞ソ銆傚ぇ瀹跺揩鏉ョ湅鐪嬩綘鐨�#娣樺疂10骞寸绉樺寘瑁�#閲岄潰鏄暐銆�' + musicShareUrl,
                    'pic': 'http://img01.taobaocdn.com/tps/i1/T1Kp1zXrNcXXcUdm2I-400-400.png'
                }
                break;
            case '9':
                shareParam = {
                    'title': '鎴戠殑娣樺疂绁炵鍖呰９',
                    'client_id': '176415',
                    'comment': '杩欎釜#娣樺疂10骞寸绉樺寘瑁�#鎸烘湁鎰忔€濓紝娣樺疂涓婁笉姝㈠彲浠ヤ拱鍒颁綘鎯宠鐨勪笢瑗匡紝瀹冭繕鍙互鐭ラ亾浣犲枩娆㈢殑鏄粈涔堬紝鐒跺悗閫佺粰浣犮€傚ぇ瀹跺揩鏉ョ湅鐪嬩綘鐨�#娣樺疂10骞寸绉樺寘瑁�#閲岄潰鏄暐銆�',
                    'pic': 'http://img03.taobaocdn.com/tps/i3/T1LamzXqxbXXcUdm2I-400-400.png'
                }
                break;
        }

        targetNode.on('click', function (ev) {
            SNS.ui("share-v2", shareParam)
        });
    }
    //鍏朵粬浜嬩欢缁戝畾
    function otherBindEvent() {
        $('.mystical-item').one('.item-show').on('click', function (ev) {

            var url = $(this).attr('data-receiveurl');
            $(this).parent('.mystical-item').addClass('rate-ys mystical-ys-run');

            MT.IO(url, function (data) {

                //寤惰繜鎵ц鍙戦€佽姹�
                S.later(function () {
                    ReceiveItem._dialogBox(data);
                }, 500)
            });
        })
    }
    return {
        init: function () {
            if ($('.mystical-item').length == 0) return;
            //鎺ユ敹鍖呰９
            ReceiveItem.bindEvent();
            //棰嗗彇鍖呮灉
            RainItem.bindEvent();
            //鏌ョ湅鍖呮灉
            LookItem.bindEvent();
            //鍏朵粬浜嬩欢缁戝畾
            otherBindEvent();
        }
    }

}, { requires: [
    'utils/global'
]
});

/**
* @fileOverview 
* @author lingyu.csh@taobao.com
* ./mods/userinfo   鐢ㄦ埛淇℃伅鐩稿叧锛屽強鍙充晶浼氬憳绛夌骇
* ./mods/hasbuy     宸蹭拱鍒版ā鍧�
* ./mods/expressway     渚挎皯涓績锛岃€佺増鏈洿鎺ヤ娇鐢�
* ./mods/cart     璐墿杞︽ā鍧�
* ./mods/mystical-item     绁炵鍖呰９妯″潡
*/

KISSY.add('page/init', function (S) {
    var args = S.makeArray(arguments);

    //鍏煎鏃х増base.js锛屼笂瀵艰埅鍙婂乏渚�,浜屾湡浼氬幓鎺�
    S.getScript('http://a.tbcdn.cn/apps/mytaobao/3.0/mt/base/base.js');

    for (var i = 1; i < args.length; i++) {
        var module = args[i] || {};
        module.init && module.init();
    }

    //鎰忚鍙嶉
    if (S.UA.ie !== 6) {
        //var feedback = '<div style="position: fixed; right: 0px; top: 150px;" class="top-bug-btn"><a target="_blank" href="http://ur.taobao.com/survey/view.htm?id=1703">&nbsp;</a></div>';
        //S.one('body').append(feedback);
    }

}, { requires: [
    './mods/userinfo',
    './mods/hasbuy',
    './mods/app-all',
    './mods/expressway',
    './mods/cart',
    './mods/mystical-item'
]
});