/**
* Taobao Labs JS
* @author   xiaomacji@gmail.com
*/

(function (host) {
    var domain = document.domain, win = window, doc = document, COOKIES = {},
        IS_DAILY = (domain.indexOf('taobao.com') + domain.indexOf('tmall.com')) === -2,
        defConfig = {
            cookieName: 'l', // 鍏ㄥ眬 cookie 鍚嶇О
            baseUrl: 'http://megatron.' + (IS_DAILY ? 'daily.taobao.net' : 'labs.taobao.com') + '/services', // TLabs 鐗规€х殑鍩烘湰璺緞,
            remoteDevUrl: 'http://dev.labs.' + (IS_DAILY ? 'daily.taobao.net:8080' : 'taobao.com') + '/', //蹇€熼儴缃插紑鍙戠増鏈矾寰�
            queryParams: '?{nick}',
            featureUrl: 'http://' + (IS_DAILY ? 'img01.daily.taobaocdn.net/L1/98/8628/' : 'tu.taobaocdn.com/s1/')
        },
        TLABSJS_CONFIG = {
            base: 'http://' + (IS_DAILY ? 'assets.daily.taobao.net' : 'a.tbcdn.cn') + '/libs/',
            alias: {
                "jquery": "jquery/1.6.2/jquery",
                "mustache": "mustache/0.3.1/mustache",
                "underscore": "underscore/1.1.6/underscore",
                "backbone": "backbone/0.5.1/backbone",
                "jquery-1.6.1": "jquery/1.6.1/jquery"
            }
        };

    for (var k in TLABSJS_CONFIG.alias) {
        TLABSJS_CONFIG.alias[k] = TLABSJS_CONFIG.base + TLABSJS_CONFIG.alias[k];

    }

    host.TLabs = {
        version: '1.0.0',

        loaded: false,

        description: 'TLabs is taobao labs JS engine, cc @macji<xiaomacji@gmail.com>',

        /**
        * 鐗规€у垪琛�
        */
        features: [],

        /**
        * 涓嶇鍚堝綋鍓嶉〉闈㈢壒鎬у垪琛�, 鎴栬€� 绛涢€夊け璐ョ殑. 渚涜皟璇曠敤
        */
        _errorFeatures: [],

        /**
        * 娣诲姞鐗规€�
        * @param Object
        */
        addFeature: function (feature) {
            var m = feature.mods, i = 0, l = m.length, matches;
            for (; i < l; i++) {
                if (m[i].matches && this.isMatchCurrentPage(m[i].matches)) {
                    this.features.push(feature);
                } else {
                    this._errorFeatures.push(feature);
                }
            }
        },

        /**
        * 鍒ゆ柇鏌愪釜妯″潡鐨勬鍒欐槸鍚﹀尮閰嶅綋鍓嶉〉闈㈠湴鍧€
        */
        isMatchCurrentPage: function (reg) {
            if (reg === '*') return true; // 鏀寔 * 鍙峰尮閰嶆墍鏈�

            try {
                return new RegExp(reg, 'i').test(location.href);
            } catch (ex) {
                return false;
            }
        },

        /**
        * 鍒嗘瀽骞跺姞杞界壒鎬�
        */
        _loadFeature: function () {
            var self = this, i = 0, l = self.features.length,
                locUrl = 'http://dev.tlabs/', url = self.config.featureUrl, devurl = self.config.remoteDevUrl,
                j, jl, feature, revision, rev;

            for (; i < l; i++) {
                feature = self.features[i];

                revision = feature.id;
                rev = revision && revision.split('/');

                for (j = 0, jl = feature.mods.length; j < jl; j++) {
                    // 濡傛灉寮€鍚� 寮€鍙戞ā寮� , 鍙互鏍规嵁dev_feature_id鏉ユ浛鎹负鏈湴Feature
                    if (self.dev && self.dev_feature_id === feature.id) {
                        seajs.use(locUrl + self.dev_feature_mod);

                    } else {
                        if ((!!rev && rev[0]) && rev[0] === 'dev') {
                            seajs.use(devurl + revision + '/' + feature.mods[j].path);

                        } else {
                            seajs.use(url + revision + '/' + feature.mods[j].path);

                        }
                    }
                }

            }

            // 濡傛灉寮€鍚� 寮€鍙戞ā寮� , 浣嗘病鏈夋彁渚� dev_feature_id, 浣滄彃鍏ユ柊Feature澶勭悊
            if (self.dev && self.dev_feature_mod) {
                seajs.use(locUrl + self.dev_feature_mod);
            }
        },

        /**
        * init
        * loaded: 闃叉鐗瑰緛鍒楄〃鑴氭湰閲嶅鍔犺浇,涓昏鐢ㄤ簬鍟嗗煄鐨刲ogin浠ｇ悊
        */
        init: function (config) {
            var self = this, loc = host.location + '', _feature_id, queryParams,
                loaded = self.loaded;


            self.config = mix(defConfig, config || {});

            // dev:  __tlabs-dev -> __tlabs_feature_id, __tlabs_feature_mod
            if (loc.indexOf('__tlabs-dev') !== -1) {
                self.dev = true;
                self.dev_feature_id = (loc.match(/__tlabs_feature_id\=([^&]+)/i) || [])[1];
                self.dev_feature_mod = (loc.match(/__tlabs_feature_mod\=([^&]+)/i) || [])[1];
            }

            // 纭isBlock鏄惁鏈夌敤
            if (!self.dev && (loaded || isBlock(config.nick))) { return; }

            if (!self.dev && !isLogin()) {
                return;
            }



            queryParams = substitute(self.config.queryParams, self.config, function (key) {
                var config = self.config, ret;

                switch (key) {
                    case 'nick':
                        ret = !!config.nick && isLogin() ? 'nick=' + config.nick : '';
                        break;
                    default:
                        ret = config.key;
                        break;
                };

                return ret;
            });

            // 鑾峰彇鐗规€у垪琛�
            getScript(self.config.baseUrl + queryParams, function () {
                self.loaded = true;

                if (self.features.length === 0) return;

                if (window.seajs) {
                    seajs.config(TLABSJS_CONFIG);
                    return self._loadFeature();
                }

                // get SeaJS 
                getScript(TLABSJS_CONFIG.base + 'seajs/1.0.0/sea.js', function () {
                    seajs.config(TLABSJS_CONFIG);
                    self._loadFeature();
                });

            });
        }
    };

    function getScript(url, callback, charset) {
        var doc = document,
            head = doc.getElementsByTagName("head")[0],
            node = doc.createElement('script');

        node.src = url;
        node.async = true;
        if (charset) {
            node.charset = charset
        }

        scriptOnload(node, function () {
            callback && callback.call(node);

            // Don't remove inserted node when debug is on.
            try {
                // Reduces memory leak.
                if (node.clearAttributes) {
                    node.clearAttributes();
                } else {
                    for (var p in node) delete node[p];
                }
            } catch (x) { }
            head.removeChild(node);
        });
        head.insertBefore(node, head.firstChild);
        return node;
    }

    function scriptOnload(node, callback) {
        return document.addEventListener ?
            node.addEventListener('load', callback, false) :
            (function () {
                var oldCallback = node.onreadystatechange;
                node.onreadystatechange = function () {
                    var rs = node.readyState;
                    if (/loaded|complete/i.test(rs)) {
                        node.onreadystatechange = null;
                        oldCallback && oldCallback();
                        callback.call(this);
                    }
                };
            })();
    }

    function mix(r, s) {
        for (var k in s) {
            r[k] = s[k];
        }
        return r;
    }

    function substitute(s, o, f) {
        return ((s.replace) ? s.replace(/\{(\w+)\}/g, function (match, key) {
            var ret = !f ? o[key] : f(key);
            return ret !== undefined ? ret : match;
        }) : '');
    }

    /**
    * 缂栫爜 HTML (from prototype framework 1.4)
    */
    function escapeHTML(str) {
        var div = doc.createElement('div'),
            text = doc.createTextNode(str);
        div.appendChild(text);
        return div.innerHTML;
    }

    function getCookie(name) {
        if (win.userCookie && !win.userCookie[name] !== undefined) {
            return win.userCookie[name];
        }

        if (COOKIES[name] === undefined) {
            var m = doc.cookie.match('(?:^|;)\\s*' + name + '=([^;]*)');
            COOKIES[name] = (m && m[1]) ? decodeURIComponent(m[1]) : '';
        }
        return COOKIES[name];
    }

    /**
    * 鐧诲綍鍒ゆ柇閫昏緫浠巊lobal涓墺绂�
    */
    function isLogin() {
        var trackNick = getCookie('tracknick'),
            nick = getCookie('_nk_') || trackNick;

        return !!(getCookie('_l_g_') && nick || getCookie('ck1') && trackNick);
    }


    function isBlock(nick) {
        var l = getCookie('l'), arr = l.split('::'), nick = isLogin() ? nick : '',
            ret = false, cnick = arr[0], ctime = arr[1], tag = arr[2] || '', tagged;

        tagged = tag.substring(0, 1) === '1';

        cnick = encodeURIComponent(escapeHTML(unescape(cnick.replace(/\\u/g, '%u'))));

        if (cnick !== undefined) {
            ret = cnick === nick && tagged && new Date().getTime() < ctime;
        }

        return ret;
    }

    //compat mode
    host.LabsJS = host;
})(this);

/**
* NOTES:
*
*  - 娴佺▼鍥撅細
*      http://img03.taobaocdn.com/tps/i3/T1EAigXlXhXXXXXXXX-660-673.png
*
*  - 鐩墠鐨勭瓥鐣ワ細
*      1. 浠� cookie 鑾峰彇褰撳墠鐧诲綍 nick,鑰冭檻鍒扮伆搴﹀彂甯�,宸茬粡灏嗙櫥闄嗗垽鏂Щ闄�,姝ら€昏緫淇敼涓哄鏋滃瓨鍦╪ick鍒欎紶閫�
*      2. 鍒ゆ柇 detail || cookie('l'), 鍘� megatron.taobao.com 鑾峰彇褰撳墠鐢ㄦ埛璁㈤槄鍒楄〃
*      3. 鏍规嵁 features 鍜屽綋鍓嶉〉闈㈢幆澧冿紝鍔犺浇 SeaJS, 閫氳繃 SeaJS 鍔犺浇婊¤冻鏉′欢鐨� feature
*
*  - 娉ㄦ剰绗� 3 姝ュ姞杞� feature 鏃讹紝姣忎釜 feature鐨勪笅杞芥槸鐙珛鐨勶紝杩欐牱鍋氱殑濂藉鏄細
*      1. 浠讳綍涓€涓� feature 涓嬭浇瀹屾垚鍗冲彲鐢紝濡傛灉 combo 鐨勮瘽锛屽緱绛夊叏閮ㄤ笅杞藉畬鎴�
*      2. 涓€涓� feature 鍑洪敊鏃讹紝涓嶄細褰卞搷鍙︿竴涓� feature 鐨勬墽琛�
*      3. 閾炬帴鏁扮殑澧炲姞浼氬澶ф湇鍔″櫒鐨勨€滃帇鍔涒€濓紝浣嗚兘鎻愬崌鐢ㄦ埛鍙療瑙夌殑浣撻獙
*      4. 缂撳瓨涓婏紝浠庡叏绔欒€冭檻锛屾瘮 combo 杩樺ソ
*
*  - 寮€鍙戞ā寮�:
*      1. windows鐜, 鍙互閲囩敤fiddler鏇挎崲鏉ュ紑鍙�
*      2. TLabs鎻愪緵鍦╱rl閲屽姞涓婂弬鏁� __tlabs-dev , 鏉ュ紑鍚紑鍙戞ā寮�
*      3. 鍏佽鎻愪緵 __tlabs_feature_id 鍜� __tlabs_feature_mod
*      4. 濡傛灉涓嶆彁渚� __tlabs_feature_id , 閭ｄ箞褰撲綔鏂癋eature鏉ュ鐞�
*      5. __tlabs_feature_mod 涓� 鏈湴Feature鍦板潃(js鍦板潃), 涓哄畨鍏ㄨ€冭檻, 鍦板潃鑷姩鍔犱笂鍓嶇紑 http://dev.tlabs/
*      6. 寮€鍙戞椂缁戝畾 127.0.0.1 dev.tlabs
*/
