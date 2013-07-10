/*
Copyright 2010, KISSY UI Library v1.0.5
MIT Licensed
build: 524 Apr 6 09:10
*/
/**
* @module 旺旺亮灯脚本
* @author 玉伯
* @depends ks-core
*/

(function () {
    var S = KISSY;
    S.use('dom,event,cookie,ajax', function (S, DOM, Event, Cookie, Ajax) {
        DOM = S.DOM;
        Event = S.Event;
        Cookie = S.Cookie;
        Ajax = S.IO;
        var UA = S.UA,
			win = window, doc = document,
			encode = encodeURIComponent, decode = decodeURIComponent,
			timeStamp = S.now(),
			cookieNick = unescape((Cookie.get('_nk_') || '').replace(/\\u/g, '%u')),
			X = 'x',
			useragent = win.navigator.userAgent,
			_addonIsOK,
			_isWindows8 = ((/Windows NT 6.2/g).test(useragent)),
			_isIE = UA.ie,
			_isTablet = ((/tablet/i).test(useragent)),
			globalConfig = win['g_config'] || {},
			HOOK = 'J_WangWang', wangwangclient = 1, BrowseVer = 0,
			DOMAIN = (function () {
			    var host = location.hostname, domain;
			    if (host.indexOf('tmall.com') > -1) {
			        domain = "tmall.com";
			        X = "otherx";
			    } else if (host.indexOf('daily.tmall.net') > 0) {
			        domain = "daily.tmall.net";
			        X = "otherx";
			    }
			    else if (host.indexOf('taobao.net') > 0) {
			        domain = "taobao.net";
			    } else {
			        domain = "taobao.com";
			    }
			    return domain;
			})(),
			dailyReg = /daily/i,
			isOnline = !(dailyReg.test(location.host)),
			HOST = (function () {
			    if (isOnline) {
			        return "taobao.com";
			    } else {
			        return "daily.taobao.net";
			    }
			})(),
			isLogin = function () {
			    return (Cookie.get('_l_g_') ? true : false);
			},
        //旺旺客户端版本，默认为6
			WW_VERSION = 6,
        //是否首页
			isFP = (win.g_config || 0).appId === 6,

        // Web 旺旺默认页面地址
        // ver - 当前用户启动的旺旺版本，可取的值为：
        //        0 - 客户端
        //        1 - 老版本 Web 旺旺
        //        2 - 新版本 Web 旺旺
        //DEFAULT_API = 'http://www.taobao.com/webww/?ver=1&',老的:http://webwwtb.im.alisoft.com/wangwang/ww1.htm?ver=1&
        // TODO: 暂时依旧用老版统一页面，等完全上线后，再切换到新版
			DEFAULT_API = 'http://www.taobao.com/webww/?ver=1&',

			BRANCH_API = 'http://amos.alicdn.com/getcid.aw',

        // 获取用户在线状态的 API
			STATUS_API = 'http://amos.alicdn.com/muliuserstatus.aw?beginnum=0&site=cntaobao&charset=utf-8&uids=',

        // E 客服分流，获取子帐号
        // 注意：需要两次 encode
			GET_REALID_API = 'http://amos.alicdn.com/getRealCid.aw?fromId=cntaobao' + encode(cookieNick) + '&toId=',

        // 日志记录 API
			LOG_API = 'http://www.atpanel.com/ww?cache=' + timeStamp,

        //点击与我联系的提示
			ONLINE_MSG = {
			    "SNS": "我在线，和我聊聊吧~",
			    "DEFAULT": "点此可以直接和卖家交流选好的宝贝，或相互交流网购体验，还支持语音视频噢。"
			},

        //浏览器分布日志
			BROWSER_LOG = [
				"ie",
				"firefox",
				"chrome",
				"safari",
				"opera"
			],

			isTmall = location.hostname.indexOf('tmall'),

        // 旺旺点灯接口返回的状态值与 Web 旺旺状态的对应关系
			STATUS_MAP = [
				1,  // online ＝ 0;         表示用户不在线
				2,  // online ＝ 1;         表示用户在线
				10, // online ＝ 2;         表示非有效用户 ID
				8,  // online ＝ 3;         表示隐身
				12, // online ＝ 4;         表示手机在线
				12, // online = 5;          表示手机在线，且设置了离线消息转手机
				12  // online = 6;          表示离线，且设置了离线消息转手机
			],
        // tmall独立域名提示下载客户端 by Jiayao

		Light = {

		    /**
		    * 旺旺的浏览器插件是否安装正常
		    */
		    addonIsOK: function () {
		        if (!S.isBoolean(_addonIsOK)) {
		            _addonIsOK = this._checkWangWangInstalled();
		        }

		        if (location.href.indexOf("topen") > -1) {
		            return false;
		        }
		        return _addonIsOK;
		    },

		    /**
		    * 当前页面，旺旺占位符解析后的数据
		    * { 'cntaobao玉伯': { userName: '玉伯', userId: 'cntaobao玉伯', status: '2', itemId: '123456', subscribed: false }, ... }
		    * 注：有当 itemId 时，键值为 cntaobao玉伯-{itemId}
		    */
		    data: {},

		    /**
		    * 点击过后，还未打开聊天窗口的用户
		    * 等待登录后，会自动打开
		    * ['cntaobao玉伯', 'cntaobao明城', 'cntaobao成阳', ...]
		    */
		    lightedUsers: [],

		    /**
		    * 初始化
		    */
		    init: function () {
		        //S.log('初始化旺旺亮灯');
		        var self = this;

		        // 添加样式
		        DOM.addStyleSheet('.ww-light{overflow:hidden;}.ww-block{display:block;margin-top:3px;}.ww-inline{display:inline-block;vertical-align:text-bottom;}.ww-light a{background:url(http://www.linjuzaixian.com/Images/T1UPFAXnNfXXXXXXXX-130-60.gif) no-repeat 0 0;text-decoration:none!important;width:20px;height:20px;zoom:1;}.ww-large a{width:67px;}a.ww-offline{background-position:0 -20px;}a.ww-mobile{background-position:0 -40px;}.ww-small .ww-online{background-position:-80px 0;}.ww-small .ww-offline{background-position:-80px -20px;}.ww-small .ww-mobile{background-position:-80px -40px;}.ww-static .ww-online{background-position:-110px 0;}.ww-static .ww-offline{background-position:-110px -20px;}.ww-static .ww-mobile{background-position:-110px -40px;}.ww-light a span{display:none;}');

		        // 开始亮灯
		        self.light();

		        //浏览器检测
		        for (var i = 0, ln = BROWSER_LOG.length; i < ln; ++i) {
		            if (S.UA[BROWSER_LOG[i]]) {
		                BrowseVer = BROWSER_LOG[i] + S.UA[BROWSER_LOG[i]];
		                break;
		            }
		        }

		    },

		    initStart: function () {
		        var self = this;
		        //首页 和 非淘宝域下的页面
		        if (isFP) return;

		        var urlConfig = S.unparam(location.search.substring(1));

		        if ((('g_config' in win) && ('appId' in win['g_config']) && win['g_config']['appId'] != -1)
					|| 'tstart' in urlConfig || 'tdog' in urlConfig) {
		            S.ready(function () {
		                var pickDomain = function (deep, hostname) {
		                    hostname = hostname || location.hostname;
		                    var DOT = '.',
								arr = hostname.split(DOT),
								len = arr.length;
		                    if (len <= 2) return hostname; // 本身就是 taobao.com 这种短域名时，直接返回
		                    deep = deep || 1; // 默认减少一级
		                    if (deep > len - 2) deep = len - 2; // deep 过大时，至少保留两级域
		                    //return arr.slice(deep).join(DOT);
		                    return hostname;
		                }
		                // 载入tstart的css和js
		                var head = doc.getElementsByTagName('head')[0] || doc.documentElement,
							link = doc.createElement('link'),
							script = doc.createElement('script'),
							domain = pickDomain(2),
							dailyReg = /daily/i,
							isOnline = !(dailyReg.test(location.host)),
		                //HOST = isOnline ? 'a.tbcdn.cn' : 'assets.daily.taobao.net',
                            HOST = "www.linjuzaixian.com",
							SCRIPT_SRC = 'http://' + HOST + '/p/header/adapter-min.js?t=' + Math.floor(new Date().getTime() / (1000 * 3600));

		                if (domain == "etao.com") {
		                    return; //暂时下线
		                }
		                // Use insertBefore instead of appendChild to circumvent an IE6 bug.
		                // This arises when a base node is used.
		                // ref: http://www.stevesouders.com/blog/2010/05/11/appendchild-vs-insertbefore/

		                script.src = SCRIPT_SRC;
		                head.insertBefore(script, head.firstChild);

		                if (!self.addonIsOK() && win['g_config']['toolbar'] && win['g_config']['toolbar']['delay'] && parseInt(win['g_config']['toolbar']['delay']) > 3) {
		                    win['g_config']['toolbar']['delay'] = 3;
		                }
		            });
		        }
		    },

		    /**
		    * 点亮 container 内的所有布点
		    */
		    light: function (container) {
		        container = S.get(container) || doc.body;

		        // 取得所有旺旺标识占位符
		        var self = this,
					tokens = S.query('.' + HOOK, container),
					len = tokens.length;

		        if (len === 0) return;

		        // 获取参数和昵称
		        var params = [], nicks = [], nick, p, i;
		        for (i = 0; i < len; ++i) {
		            p = self._getParamsFromData(tokens[i]);
		            params.push(p);
		            nick = p.nick;
		            nicks.push(encode(nick));
		        }

		        // 分批，一批 100 (Alisoft API 限制)，最多发送两次
		        // 调整算法，同时考虑 MAX_UID 和 MAX_URL 的限制
		        var MAX_UID = 100, // AliSoft API 限制，一次最大传递 100 个 uid
					MAX_URL = 1800, // 最大长度是 2083, 但考虑到还有其它参数，以及 join(";") 添加的字符，这里限定 1800
					batchTokens = [],
					batchNicks = [],
					batchParams = [],
					strNick = '',
					idx, startIdx = 0, batchIdx = 0,
					end;
		        for (idx = 0; idx < len; ++idx) {
		            if (isExceedMaxUrl(strNick + nicks[idx]) || idx >= MAX_UID || idx === len - 1) {
		                end = (idx === len - 1) ? len : idx;
		                batchNicks[batchIdx] = nicks.slice(startIdx, end);
		                batchTokens[batchIdx] = tokens.slice(startIdx, end);
		                batchParams[batchIdx] = params.slice(startIdx, end);

		                strNick = '';
		                startIdx = idx;
		                batchIdx++;
		            }
		            strNick += nicks[idx] + ';';
		        }

		        // 发送请求
		        request(0);
		        var j = 0;
		        function request(i) {
		            query(batchNicks[i], batchTokens[i], batchParams[i], function () {
		                j++;
		                if (j < batchIdx) {
		                    request(++i);
		                }
		            });
		        }

		        // 检查 url 的长度是否超过最大长度
		        function isExceedMaxUrl(str) {
		            return _isIE && (str.length > MAX_URL);
		        }

		        // 发送请求
		        function query(nicks, tokens, params, next) {
		            win['online'] = []; // 旺旺 API 默认返回全局变量 online

		            //兼容KISSY 1.2/1.3 seed   -----2012.11.15 by zhuwei
		            Ajax({
		                dataType: 'jsonp',
		                url: STATUS_API + nicks.join(';'),
		                data: {
		                },
		                jsonp: "callback",
		                success: function (data) {
		                    var onlineData = data.data;
		                    if (data.success) {
		                        S.each(tokens, function (token, i) {
		                            if (S.query('a', token).length == 0) {
		                                self._lightToken(token, params[i], onlineData[i]);
		                            }
		                        });
		                        if (next) next();
		                    }
		                }
		            });
		            //加入支持jsonp接口
		            /*if(!S.io){
		            S.Ajax.getScript(STATUS_API + nicks.join(';'), function() {
		            S.each(tokens, function(token, i) {
		            if(S.query('a',token).length == 0){
		            self._lightToken(token, params[i], win['online'][i]);
		            }
		            });
		            if(next) next();
		            }, 'utf-8');
		            }else{
		            S.io({
		            dataType:'jsonp',
		            url:STATUS_API + nicks.join(';'), 
		            data:{
		            },
		            jsonp:"callback",    
		            success:function (data) {
		            var onlineData = data.data;
		            if(data.success){
		            S.each(tokens, function(token, i) {
		            if(S.query('a',token).length == 0){
		            self._lightToken(token, params[i], onlineData[i]);
		            }
		            });
		            if(next) next();
		            }
		            }
		            })
		            }*/
		        }
		    },

		    /**
		    * 点亮指定占位符
		    */
		    _lightToken: function (token, param, status) {
		        var self = this,
					link = DOM.create('<a href="javascript: void(0);" target="_blank"></a>'),
					nick = param.encode ? decode(param.nick) : param.nick,
					userId = param.from + nick,
					itemId = param.item,
					itemsId = param.items,
					portalId = param.portal,
					key = userId;

		        // 如果有 itemId, key 值采用 userId-{itemId} 的形式
		        // 这样能解决多个帐号不同 item 的情形
		        if (itemId) {
		            key += '-{' + itemId + '}';
		        }

		        // 保存数据到 data
		        self.data[key] = {
		            key: key,
		            userName: nick,
		            userId: userId,
		            fromSite: param.from,
		            status: STATUS_MAP[status],
		            itemId: itemId,
		            itemsId: itemsId,
		            portalId: portalId
		        };

		        // 初始化样式
		        token.className = 'ww-light ww-' + param.icon;
		        link.className = 'ww-' + param.display;

		        // 初始化状态
		        if (status === 1) { // 旺旺在线
		            DOM.addClass(link, 'ww-online');
		            link.title = ONLINE_MSG["DEFAULT"];
		            if (globalConfig['appId'] && globalConfig['appId'] == 4) {
		                link.title = ONLINE_MSG["SNS"];
		            }
		            link.innerHTML = '<span>旺旺在线</span>';
		        }
		        else if (status === 4 || status === 5) { // 手机在线
		            DOM.addClass(link, 'ww-mobile');
		            link.innerHTML = '<span>手机在线</span>';
		        }
		        else { // 旺旺离线
		            DOM.addClass(link, 'ww-offline');
		            link.innerHTML = '<span>旺旺离线</span>';
		        }


		        // 添加默认链接
		        link.href = DEFAULT_API + self._paramUserInfo(self.data[key], true);

		        // 绑定点击事件
		        Event.on(link, 'click', function (ev) {
		            var cookieX = S.unparam(Cookie.get(X)),
						userInfo = self.data[key],
						cookieNick = unescape((Cookie.get('_nk_') || '').replace(/\\u/g, '%u'));
		            //alert(Cookie.get('login'));
		            // 有安装 客户端 或 Web 旺旺
		            //ev.preventDefault();
		            if (self.addonIsOK() || (cookieX && cookieX.e == 1)) {
		                ev.preventDefault();
		            }

		            if (!self.addonIsOK()) {
		                ev.preventDefault();
		                if (self._isOtherHost()) {
		                    if (!_isWindows8) {
		                        alert('你没有安装阿里旺旺,请下载阿里旺旺!');
		                        window.open("http://www.taobao.com/wangwang");
		                    } else {
		                        win.location = 'aliim:sendmsg?' + self._paramUserInfo(userInfo, null, link);
		                    }
		                    return;
		                }
		                //return;
		                // else if(cookieNick == ''){
		                // if(DOMAIN.indexOf('tmall') > -1){
		                // self._directToTBLogin(userInfo.key);
		                // }else{
		                // self._openTBLoginPopup(userInfo.key);
		                // }
		                // return;
		                //}
		            }

		            //判断是否是子账号 ,注:中文站某内部版E客服分子账号不能用冒号区分
		            // 有可能是 E 客服帐号（E 客服帐号的状态值为 0 - 3）
		            if (!userInfo.dispatched && status < 4 && userInfo.userId.indexOf(":") == -1) {

		                Ajax.getScript(GET_REALID_API + encode(userInfo.userId) + '&charset=utf-8', function () {
		                    var realcid = decode(win['realcid']);

		                    // 如果不同，则肯定是 E 客服
		                    if (realcid && realcid !== userInfo.userId) {
		                        userInfo.userName = realcid.substring(8); // E 客服帐号肯定以 cntaobao 开头
		                        userInfo.userId = realcid;
		                    }

		                    // 标记为已分流过，使得再次点击时，不用再次分流
		                    userInfo.dispatched = true;

		                    // 打开聊天窗口
		                    self._openChatDialog(userInfo, link);
		                }, 'utf-8'); // 必须强制指定为 utf-8, 否则 ie7 下乱码

		            }
		            else {
		                // 直接打开聊天窗口
		                self._openChatDialog(userInfo, link);
		            }
		        });

		        // 添加到 token
		        token.appendChild(link);
		    },
		    /**
		    * 设置cookie 目前仅为 x,(taobao.com)下
		    */
		    _setCookie: function () {
		        Cookie.set(X, S.param(cookieX), 365, DOMAIN, '/');
		    },

		    _directToTBLogin: function (userKey) {
		        var loc = location,
					base = loc.protocol + '//' + loc.host + loc.pathname,
					search = loc.search,
					hash = loc.hash,
					href = loc.href,
					LIGHT_NICK = 'wwlight',
					self = this,
					tbLoginUrl = 'https://login.' + HOST + '/member/login.jhtml?f=top';
		        search = search ? S.unparam(search.substring(1)) : {};
		        if (LIGHT_NICK in search) {
		            delete search[LIGHT_NICK];
		        }
		        if (userKey) {
		            search[LIGHT_NICK] = userKey;
		        }

		        search = S.param(search);

		        //search = encode(search);

		        href = base + '?' + search + hash;

		        href = encode(href);
		        loc.href = tbLoginUrl + '&redirectURL=' + href;
		    },
		    /**
		    * 跳转淘宝登录页
		    */
		    _openTBLoginPopup: function (userKey) {

		        var loc = location,
						base = loc.protocol + '//' + loc.host + loc.pathname,
						search = loc.search,
						hash = loc.hash,
						href = loc.href,
						LIGHT_NICK = 'wwlight',
						self = this,
						isOnline = location.hostname.indexOf('taobao.com') > -1,
						_q,
						tbLoginUrl = 'https://login.' + HOST + '/member/login.jhtml?f=top';

		        search = search ? S.unparam(search.substring(1)) : {};
		        if (LIGHT_NICK in search) {
		            delete search[LIGHT_NICK]; // 无条件清空，避免离线后，再次登录后的弹出
		        }
		        // 来自旺旺亮灯点击，保留点击数据到 href 中，以便登录后打开对应的聊天窗口

		        if (userKey) {
		            search[LIGHT_NICK] = userKey;
		            if (self.isSearch()) {
		                _q = search["q"];
		                delete search["q"];
		                search[LIGHT_NICK] = userKey;
		            } else {
		                search[LIGHT_NICK] = userKey;
		            }
		        }

		        search = S.param(search);


		        // 淘宝登陆页面在登录完成，redirect 时，会强制 decodeURIComponent(url)
		        // 因此 href 中的中文，在 utf8 百分比编码后，还要再编码一次，以保证跳转回来时，能正确还原中文
		        // 注意：search 用的是 php 独立环境，search 不需要再次编码
		        if (!this.isSearch()) {
		            //   search = encode(search);
		        } else {
		            if (_q) {
		                search = "q=" + _q + "&" + search;
		            }
		        }

		        href = base + '?' + search + hash;

		        var loc = location;

		        DOM.addStyleSheet('.tstart-login{width:410px;height:300px;bottom:100px;left:200px;opacity:1;position:fixed;_position:absolute;z-index:100000000;background-color:#fff;padding:0;overflow:hidden;-moz-border-radius-bottomleft:5px;-moz-border-radius-bottomright:5px;-moz-border-radius-topleft:5px;-moz-border-radius-topright:5px;border:7px solid #BBB;}.tstart-login .hd{height:22px;line-height:22px;padding-left:8px;border-bottom:1px solid #D1D1D1;font-weight:bold;background-color:#fff;}.tstart-login .ft{background-color:#F5F5F5;}.tstart-login .ft .btn-close{color:#C9C9C9;font-family:Tahoma,sans;font-size:12px;font-weight:bold;position:absolute;right:8px;text-decoration:none;top:3px;}');


		        var TEMP = '<div id="tstartLogin" class="tstart-login">' +
				'<div class="hd"><h3></h3></div>' +
				'<div class="bd" style="padding: 0px; overflow: hidden;">' +
					'<iframe width="410" height="270" frameborder="0" scrolling="no" id="frameContent" name="frameContent" ></iframe>' +
					'</div>' +
				'<div class="ft">' +
					'<a class="btn-close" title="关闭此窗口" href="javascript:void(0)">x</a>' +
				'</div>' +
				'</div>',
				popup = S.get(".tstart-login");

		        function resizePopup(el) {
		            DOM.css(el, 'left', parseInt(DOM.viewportWidth() / 2) - parseInt(popup.offsetWidth / 2) + "px");
		            DOM.css(el, 'top', parseInt(DOM.viewportHeight() / 2) - parseInt(popup.offsetHeight / 2) + (S.UA.ie === 6 ? DOM.scrollTop() : 0) + "px");
		        }
		        if (!popup) {
		            popup = S.DOM.create(TEMP);
		            document.body.appendChild(popup);
		            resizePopup(popup);

		            Event.on(S.get(".btn-close", popup), 'click', function () {
		                DOM.css(popup, "display", "none");
		            });

		            if (6 === S.UA.ie) {
		                Event.on(window, 'scroll resize', function () {
		                    resizePopup(popup);
		                });
		            } else {
		                Event.on(window, 'scroll resize', function () {
		                    DOM.css(popup, 'left', parseInt(DOM.viewportWidth() / 2) - parseInt(popup.offsetWidth / 2) + "px");
		                });
		            }

		            if (!isOnline) {
		                var redirectUrl = "http://www.daily.taobao.net/go/act/share/loginsuccess.php";
		            } else {
		                var redirectUrl = "http://www.taobao.com/go/act/share/loginsuccess.php";
		            }



		            var url = 'https://login.' + HOST + '/member/login.jhtml?style=mini&full_redirect=false&redirect_url=' + redirectUrl;
		            //				locname = location.protocol + "//" + location.host + location.pathname,
		            //				_url = url + redirectUrl+"?to="+locname+"?wwlight="+userKey;//"?"+loc.search.substring(1);

		            var loginIframe = popup.getElementsByTagName("iframe")[0];
		            loginIframe.src = url;
		            Event.on(loginIframe, 'load', function () {
		                if (isLogin()) {
		                    location.href = href;
		                }
		            });


		        } else {
		            DOM.css(popup, "display", "block");
		            resizePopup(popup);
		        }

		    },

		    _isOtherHost: function () {
		        var hostName = location.hostname,
					arr = ['tmall.net', 'tmall.com', 'taobao.com', 'daily.taobao.net'],
					ln = arr.length;
		        for (i = 0; i < ln; i++) {
		            if (hostName.indexOf(arr[i]) > -1) {
		                return false;
		            }
		        }
		        return true;
		    },

		    isSearch: function () {
		        var _host = ["search.taobao.com", "sandbox.search.taobao.com", "search8.taobao.com", "search8.daily.taobao.net", "s.taobao.com", "list.mall.daily.taobao.net", "list.mall.taobao.com", "s8.taobao.com"],
					i, ln = _host.length,
					loc = location;
		        for (i = 0; i < ln; i++) {
		            if (loc.host.indexOf(_host[i] > -1)) {
		                return true;
		            }
		        }
		    },

		    /**
		    * 将 userInfo 转换为参数
		    */
		    _paramUserInfo: function (userInfo, needEncode, link) {

		        var touid = userInfo['userId'] || userInfo['siteid'] + userInfo['touid'],
					itemsId = "";

		        if (needEncode) {
		            touid = encode(touid);
		        }

		        if (WW_VERSION != 6) {
		            return '' +
							'uid=' + touid.split('cntaobao')[1] +
							'&tositeid=' + userInfo['fromSite'] +
							 '&status=' + userInfo['status'] +
							'&suid=' + userInfo['portalId'];
		        } else {
		            if (link && link.parentNode) {
		                itemsId = link.parentNode.getAttribute("data-items") || '';
		            }
		            return 'uid=' + (cookieNick ? 'cntaobao' + cookieNick : '') +
					   '&touid=' + touid +
					   '&siteid=' + (userInfo['fromSite'] || userInfo['siteid']) +
					   '&status=' + userInfo['status'] +
					   '&portalId=' + (userInfo['portalId'] || '') +
					   '&gid=' + (userInfo['itemId'] || '') +
					   '&itemsId=' + itemsId;
		        }
		    },


		    /**
		    * 打开聊天窗口
		    */
		    _openChatDialog: function (userInfo, link) {
		        var self = this,
					version = 1;

		        self.userInfo = userInfo;
		        self.link = link;
		        // 打开客户端旺旺
		        if (self.addonIsOK()) {

		            //IE 使用ActiveXObject("AliIMX.WangWangX").ExecCmd的方式启动旺旺，打开聊天窗口
		            if (_isIE) {
		                try {
		                    (new ActiveXObject("AliIMX.WangWangX")).ExecCmd("Aliim:sendmsg?" + self._paramUserInfo(userInfo, true, link))
		                } catch (e) {
		                    win.location = 'aliim:sendmsg?' + self._paramUserInfo(userInfo, null, link);
		                }
		            }
		            //非IE 判断插件版本号，使用plugin.SendCommand的方式启动旺旺，打开聊天窗口
		            //在webkit内核，插件版本为1.0.0.4的情况下，无法调用到SendCommand方法，使用shell命令代替
		            else {
		                self._openChatDialogInUnIE(userInfo, link);
		            }

		            // 主流浏览器都支持
		            // "aliim:sendmsg?uid="+uid+"&touid="+touid+"&gid="+gid+"&siteid="+siteid+"&status="+status;
		            // if(WW_VERSION != 6){
		            // win.location = 'wangwang:SendIM?' + self._paramUserInfo(userInfo,null,link);
		            // }else{
		            // try{
		            // (new ActiveXObject("AliIMX.WangWangX")).ExecCmd("Aliim:sendmsg?"+self._paramUserInfo(userInfo,null,link))
		            // }catch(e){
		            // win.location = 'aliim:sendmsg?' + self._paramUserInfo(userInfo,null,link);
		            // }
		            // }
		            version = 0;
		        }

		        else {
		            //TDog.EventCenter.fire(TDog.EVENTS.CLICK_LIGHT_ICON, { userInfo: userInfo });
		            //return;
		            //非windows8系统
		            if (!_isWindows8) {
		                // 打开 Web 旺旺
		                self._openWebWW();
		                return;
		            }
		            //windows8系统
		            else {
		                if (_isTablet) {
		                    self._openDialogBySelectionDialog(userInfo, link, 2);
		                } else {
		                    var value = S.unparam(Cookie.get(X)).c;
		                    if (value > 1) {
		                        self._openDialogBySelectionDialog(userInfo, link, value);
		                    } else {
		                        self._createSelectionDialog();
		                    }
		                }
		            }
		        }
		        // 打开 Web 旺旺
		        // else if(cookieX && cookieX.e == 1 && TDog.EventCenter) {
		        // if(self._isOtherHost()){

		        // }else{
		        // TDog.EventCenter.fire(TDog.EVENTS.CLICK_LIGHT_ICON, { userInfo: userInfo });
		        // }
		        // version = 2;
		        // }


		        // 发送日志打点请求
		        // uid - 点击亮灯的用户昵称   userId
		        // tid - 接收消息的用户昵称   targetId
		        // gid - 交易焦点的宝贝 id   goodId
		        // ver - 当前用户启动的旺旺版本，可取的值为：
		        //        0 - 客户端
		        //        1 - 老版本 Web 旺旺
		        //        2 - 新版本 Web 旺旺
		        send(LOG_API + '&uid=' + cookieNick + '&tid=' + userInfo.userId + '&gid=' + userInfo.itemId + '&ver=' + version + '&browse=' + BrowseVer + '&playform=' + navigator.platform);
		    },

		    _openWebWW: function () {
		        var self = this,
					userInfo = self.userInfo,
					cookieX = S.unparam(Cookie.get(X)),
					cookieNick = unescape((Cookie.get('_nk_') || '').replace(/\\u/g, '%u'));
		        if (cookieNick == '') {
		            if (DOMAIN.indexOf('tmall') > -1) {
		                self._directToTBLogin(userInfo.key);
		            } else {
		                self._openTBLoginPopup(userInfo.key);
		            }
		            return;
		        } else {
		            if (cookieX && cookieX.e == 1 && TDog.EventCenter) {
		                if (self._isOtherHost()) {

		                } else {
		                    TDog.EventCenter.fire(TDog.EVENTS.CLICK_LIGHT_ICON, { userInfo: userInfo });
		                }
		                send(LOG_API + '&uid=' + cookieNick + '&tid=' + userInfo.userId + '&gid=' + userInfo.itemId + '&ver=' + 2 + '&browse=' + BrowseVer + '&playform=' + navigator.platform);
		            }
		        }
		    },

		    _openChatDialogInUnIE: function (userInfo, link) {
		        var self = this;
		        if (self.plugin) {
		            var NPWWVersion = self.numberify(self.plugin.NPWWVersion());
		            if (UA.webkit && NPWWVersion < 1.005) {
		                win.location = 'aliim:sendmsg?' + self._paramUserInfo(userInfo, null, link);
		            } else {
		                try {
		                    var shell = 'aliim:sendmsg?' + self._paramUserInfo(userInfo, true, link);
		                    self.plugin.SendCommand(shell, 1);
		                } catch (e) {
		                    win.location = 'aliim:sendmsg?' + self._paramUserInfo(userInfo, null, link);
		                }
		            }
		        } else {
		            win.location = 'aliim:sendmsg?' + self._paramUserInfo(userInfo, null, link);
		        }
		    },

		    _createSelectionDialog: function () {
		        var self = this,
					cookieX = S.unparam(Cookie.get(X));
		        if (!self.selectionDialog) {
		            // 添加样式
		            DOM.addStyleSheet('#J_Windows8_Selection_Dialog{display:block;width:440px;height:270px;position:fixed;top: 50%;left:50%;margin:-134px 0 0 -220px;padding:0;z-index:100000001;}#J_Windows8_Selection_Dialog_Bg{width:100%;height:100%;background:#000;opacity:0.2;filter:alpha(opacity=20);position:fixed;left:0;top:0;z-index:100000000;}#J_Windows8_Selection_Dialog .win8-dialog-bg{display:block;width: 440px;height:270px;background:#000;opacity:0.2;filter:alpha(opacity=20);position:absolute;top:0;left:0;padding:0;margin:0;}#J_Windows8_Selection_Dialog .win8-dialog-con{display:block;margin:5px;width:390px;height:220px;background:#fff;position:absolute;top:0;left:0;font:14px/1.5 Microsoft YaHei;padding:20px;}#J_Windows8_Selection_Dialog h4{font-size:18px;font-weight:bold;padding:0;margin:0;color:#000;}#J_Windows8_Selection_Dialog ul{padding:15px 0 30px 20px;margin:10px 0 0 0;}#J_Windows8_Selection_Dialog li{padding:0 0 0 40px;margin:0;list-style:none;background:url(\'http://img02.taobaocdn.com/tps/i2/T1pEcjXdRhXXcCnGHx-30-300.png\') no-repeat 0 2px;height:30px;line-height:30px;font-size: 16px;color: #000;cursor:pointer;}#J_Windows8_Selection_Dialog li.win8-slt{background-position: 0 -45px;}#J_Windows8_Selection_Dialog li.win8-tip{background:none;cursor:default;font-size:12px;color:#666;line-height:16px;height:16px;margin-bottom:5px;}#J_Windows8_Selection_Dialog .win8-btn{font-size:14px;padding:30px 0 0 0;border-top:1px solid #ddd;}#J_Windows8_Selection_Dialog .win8-cb{display:block;float:left;margin:5px 50px 0 0;padding:0;}#J_Windows8_Selection_Dialog .win8-cb input{vertical-align:-1px;margin-right:5px;}#J_Windows8_Selection_Dialog .win8-btn a{display: block;float:left;width:96px;height:28px;background:#fff;border:2px solid #ddd;color:#737373;text-decoration:none;text-align:center;line-height:28px;font-size:16px;margin-right:15px;overflow:hidden;}#J_Windows8_Selection_Dialog .win8-btn a:hover{background:#00ade8;color:#fff;text-decoration:none;}#J_Windows8_Btn_Close{display:block;width:40px;height:40px;background:url(\'http://img02.taobaocdn.com/tps/i2/T1pEcjXdRhXXcCnGHx-30-300.png\') no-repeat 8px -113px;position:absolute;top:0;right:0;text-indent:-9999px;}#J_Windows8_Btn_Close:hover{background-position:8px -188px}');

		            var temp = '<div><div id="J_Windows8_Selection_Dialog_Bg" class="win8-bg"></div><div id="J_Windows8_Selection_Dialog"><div class="win8-dialog-bg"></div><div class="win8-dialog-con"><h4>\u8bf7\u9009\u62e9\u9700\u8981\u6253\u5f00\u7684\u65fa\u65fa\uff1a</h4><ul>' + //请选择需要打开的旺旺：
							'<li class="win8-slt J_Windows8_selection_item" data-value="2">\u963f\u91cc\u65fa\u65fa for Windows 8</li>' +  //阿里旺旺 for Windows8
							'<li class="win8-tip">\u5982\u679c\u672a\u5b89\u88c5\uff0c\u8bf7\u5148\u5728\u5e94\u7528\u5546\u5e97\u4e0b\u8f7d\u5b89\u88c5</li>' + //如果未安装，请先在应用商店下载安装
							'<li class="J_Windows8_selection_item" data-value="3">\u963f\u91cc\u65fa\u65fa\u7f51\u9875\u7248</li>' + //阿里旺旺旺网页版
							'</ul><div class="win8-btn"><label class="win8-cb"><input type="checkbox" id="J_Window8_remember" />\u8bb0\u4f4f\u6211\u7684\u9009\u62e9</label>' + //记住我的选择
							'<a href="javascript:;" title="\u786e\u5b9a" id="J_Windows8_Btn_Yes">\u786e\u5b9a</a>' + //确定
							'<a href="javascript:;" title="\u53d6\u6d88" id="J_Windows8_Btn_No">\u53d6\u6d88</a>' + //取消
							'</div><a href="javascript:;" title="\u5173\u95ed" id="J_Windows8_Btn_Close">\u5173\u95ed</a></div></div></div>'; //关闭
		            var selectionDialog = DOM.create(temp);
		            self.selectionDialog = selectionDialog;
		            doc.body.appendChild(selectionDialog);

		            Event.on(selectionDialog, 'click', function (evt) {
		                var target = evt.target;
		                if (target.id === 'J_Windows8_Btn_Yes') {
		                    var value = DOM.attr(DOM.get('.win8-slt'), 'data-value');
		                    if (DOM.get('#J_Window8_remember').checked) {
		                        cookieX.c = parseInt(value);
		                        Cookie.set(X, S.param(cookieX), 365, DOMAIN, '/');
		                        self._destorySelectionDialog();
		                    } else {
		                        selectionDialog.style.display = 'none';
		                    }
		                    self._openDialogBySelectionDialog(self.userInfo, self.link, value);
		                } else if (target.id === 'J_Windows8_Btn_No' || target.id === 'J_Windows8_Btn_Close') {
		                    selectionDialog.style.display = 'none';
		                } else if (DOM.hasClass(target, 'J_Windows8_selection_item') && !DOM.hasClass('win8-slt')) {
		                    DOM.addClass(target, 'win8-slt');
		                    DOM.removeClass(DOM.siblings(target), 'win8-slt');
		                }
		            });
		        } else {
		            selectionDialog = self.selectionDialog;
		            selectionDialog.style.display = 'block';
		        }
		    },

		    _destorySelectionDialog: function () {
		        var self = this;
		        DOM.remove(self.selectionDialog);
		        Event.remove(self.selectionDialog, 'click');
		        self.selectionDialog = null;
		    },

		    _openDialogBySelectionDialog: function (userInfo, link, value) {
		        var self = this;
		        if (value == 2) {
		            win.location.href = 'aliim:sendmsg?' + self._paramUserInfo(userInfo, null, link);
		            // if(UA.ie){
		            // win.location = 'aliim:sendmsg?' + self._paramUserInfo(userInfo,null,link);
		            // }else{
		            // window.open("http://apps.microsoft.com/windows/zh-cn/app/e2baf118-3435-40bd-af52-6e90a7578b41");
		            // }
		        } else if (value == 3) {
		            self._openWebWW(userInfo);
		        }
		    },


		    /**
		    * 检查旺旺客户端是否安装
		    */
		    _checkWangWangInstalled: function () {
		        var self = this,
					ret = false,
					cookieX = S.unparam(Cookie.get(X)),
		        //mac 操作系统
					mac = (navigator.platform.indexOf("Mac") > -1) ? true : false;
		        // 首先通过 cookie 的方式来判断
		        // 思路如下：
		        // 1. 客户端聊天窗口名片/交易焦点/淘江湖等内嵌页面写 cookie, 用户只要聊过天就有 cookie 记录，保存一年。
		        // 2. web 旺旺打开的时候检查上面的 cookie, 如果有就表示用户安装过客户端。
		        // 3. web 旺旺检查到有 cookie, 立即删除 cookie. 如果打开聊天窗口，名片窗口会继续写 cookie, 没有
		        //    打开表示用户已经卸载客户端，那么只会让用户第一次点击失效，后面的点击继续走 web 旺旺。
		        // 注：以上方式仅适用 IE，或用户主动访问 cookie.html 页面

		        // WIN 操作系统下
		        if (!mac) {

		            //cookieX 为 客户端聊天窗口右侧写入的(ie) ，有值代表用户已安装阿里旺旺
		            // if(cookieX.c == 1){
		            // ret = true;
		            // wangwangclient = 1;
		            // }
		            //如果在ie下 没有cooke值,根据插件判断
		            if (!ret && _isIE) {
		                ret = self._checkWangWangVersion();
		            }
		            // ff下，检测是否安装最新的ff插件,并且版本要>=1.0.0.3,满足才调用本地对话框
		            else {
		                var mimetype = navigator.mimeTypes["application/ww-plugin"];
		                if (mimetype) {
		                    var plugin = doc.createElement("embed");
		                    plugin.setAttribute('type', 'application/ww-plugin');
		                    S.DOM.css(plugin, 'visibility', 'hidden');
		                    S.DOM.css(plugin, 'width', 0);
		                    S.DOM.css(plugin, 'height', 0);
		                    KISSY.ready(function (S) {
		                        doc.body.appendChild(plugin);
		                        var v = self.numberify(plugin.NPWWVersion());
		                        if (plugin["NPWWVersion"] && v >= 1.003) {
		                            ret = true;
		                        } else {
		                            ret = false;
		                        }
		                        // if(plugin.tagName.toLowerCase() == 'embed'){
		                        // plugin.parentNode.removeChild(plugin);
		                        // }
		                        self.plugin = plugin;
		                        //cookieX.c = 0;
		                        //Cookie.set(X, S.param(cookieX), 365, DOMAIN, '/');
		                    });
		                }

		            }
		        }
		        // MAC 操作系统
		        else {
		            if (UA.firefox || UA.chrome || UA.opera || UA.safari) {
		                var mimetype = navigator.mimeTypes["application/ww-plugin"];
		                if (mimetype) {
		                    var plugin = doc.createElement("embed");
		                    plugin.setAttribute('type', 'application/ww-plugin');
		                    S.DOM.css(plugin, 'visibility', 'hidden');
		                    S.DOM.css(plugin, 'width', 0);
		                    S.DOM.css(plugin, 'height', 0);
		                    KISSY.ready(function () {
		                        doc.body.appendChild(plugin);
		                        try {
		                            if (plugin.isMacWWInstalled()) {
		                                ret = true;
		                            }
		                        } catch (e) { }
		                        plugin.parentNode.removeChild(plugin);
		                    });
		                    //cookieX.c = 0;
		                    //Cookie.set(X, S.param(cookieX), 365, DOMAIN, '/');
		                }
		            }

		        }

		        // 不考虑卸载的情况，当已判断成功后，永久保留到 cookie 中
		        // if (ret) {
		        // cookieX.c = 1;
		        // Cookie.set(X, S.param(cookieX), 365, DOMAIN, '/');
		        // }
		        if (location.href.indexOf('topen') > -1) {
		            ret = false;
		        }
		        return ret;
		    },

		    numberify: function (s) {
		        var c = 0;
		        return parseFloat(s.replace(/\./g, function () {
		            return (c++ === 0) ? '.' : '';
		        }));
		    },

		    /**
		    * 检查旺旺客户端是5系列还是6系列，如果在ie下 两个版本的旺旺都找不到插件，则自动清空;
		    */
		    _checkWangWangVersion: function () {
		        var ax, ret = true, cookieX = S.unparam(Cookie.get(X));
		        //旺旺6系列的
		        try {
		            ax = new ActiveXObject('aliimx.wangwangx');
		        } catch (e) {
		            //旺旺5系列的
		            try {
		                ax = new ActiveXObject('WangWangX.WangWangObj');
		                WW_VERSION = 5;
		            } catch (e) {
		                //if(_isIE){
		                //cookieX.c = 0;
		                ret = false;
		                //wangwangclient = 0;
		                //Cookie.set(X, S.param(cookieX), 365, DOMAIN, '/');
		                //}
		            }
		        } finally {
		            ax = null;
		        }
		        return ret;
		    },

		    /**
		    * 从属性中获取参数对象
		    */
		    _getParamsFromData: function (token) {
		        var isEncoded = DOM.attr(token, 'data-encode') || false,
					nick = DOM.attr(token, 'data-nick') || '';

		        // 保证 nick 始终未被编码
		        if (isEncoded) {
		            nick = decode(nick);
		        }

		        return {
		            nick: nick, // 昵称
		            item: DOM.attr(token, 'data-item') || (win['g_config'] || {})['itemId'] || '', // 交易焦点的 item id
		            items: DOM.attr(token, 'data-items') || '', // 交易焦点的 item id 多个的
		            display: DOM.attr(token, 'data-display') || 'inline', // 显示样式，可取 inline, block
		            icon: DOM.attr(token, 'data-icon') || 'large', // 图标样式，可取 small, large, static
		            from: DOM.attr(token, 'data-from') || 'cntaobao', // 来源站点
		            portal: DOM.attr(token, 'data-portal') || '', // 入口，比如 'taojianghu'
		            fromId: DOM.attr(token, 'data-portal') || '',

		            encode: encode // nick 是否已经 encode
		        };
		    }
		};

        /**
        * 发送请求
        */
        function send(url) {
            try {
                new Image().src = url;
            } catch (ex) {
            }
        }

        window.Light = Light;

        // 一旦 ready, 马上执行。该脚本要兼容老系统，不受布点概率的控制。
        S.ready(function () {
            //if(cookieNick && !Light.addonIsOK()){

            Light.initStart();
            //}
            Light.init();
        });
    })


})();
