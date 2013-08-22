/**
* ie8/7/6 涓娇鐢╒ML:Vector Markup Language(鐭㈤噺鍙爣璁拌瑷€)瀹炵幇鍦嗚
* @author lingyu.csh@taobao.com
* @datetime 2012/10/28
*/
//瑙ｅ喅ie涓嬫姤鏈寚鏄庨敊璇�
document.namespaces;

KISSY.add('common/round-vml', function (S) {
    var $ = S.all;
    var RoundVML = {
        /**
        * 杩斿洖鐩爣鑺傜偣
        * return {Array} nodes
        */
        targetNodes: function (targetCls) {
            var tempNodes = $(targetCls);
            return tempNodes.length ? tempNodes : null;
        },
        /**
        * 鍒ゆ柇鏄惁搴旂敤VML鍦嗚鎿嶄綔
        * return {boolen} 鏄� 鍚�
        */
        isUse: function () {
            if (!S.UA.ie || S.UA.ie >= 9) return false;
            else return true;
        },
        /**
        * 澧炲姞鍛藉悕绌洪棿
        * 瀹氬簲VML璇█瑙勫垯
        */
        addRule: function () {
            if (document.namespaces && !document.namespaces.v) {
                document.namespaces.add("v", "urn:schemas-microsoft-com:vml");
                var styleSheet = document.createStyleSheet();
                styleSheet.addRule("v\\:roundrect", "behavior: url(#default#VML);");
                styleSheet.addRule("v\\:fill", "behavior: url(#default#VML);");
            }
        },
        /**
        * 缁樺埗鍦嗗舰锛屽苟璁剧疆灞炴€э紝灞炴€ф牱寮忔嫹璐濈洰鏍囪妭鐐�
        * @param {object} o 灞炴€у搴斿璞�
        */
        createRect: function (o) {
            var r = document.createElement('v:roundrect');
            $(r).attr({
                arcsize: o.arcSize,
                strokeColor: o.strokeColor,
                strokeWeight: o.strokeWeight,
                stroked: o.stroked,
                'class': 'roundrect'
            }).css({
                display: 'block',
                width: o.width + 'px',
                height: o.height + 'px',
                position: 'absolute',
                top: o.top + 'px',
                left: o.left + 'px',
                antialias: true,
                zIndex: o.idx
            });
            return r;
        },
        /**
        * 缁樺埗鍦嗗舰澶村儚鏂囦欢锛屽苟璁剧疆灞炴€э紝灞炴€ф牱寮忔嫹璐濈洰鏍囪妭鐐�
        * @param {string} color 鑳屾櫙鑹�
        * @param {string} src 澶村儚璺緞
        */
        createFill: function (color, src) {
            var fill = document.createElement('v:fill'),
                attr = { color: color };
            if (src != 'none') {
                attr.src = src;
                attr.type = 'tile';
                attr.size = '100%,100%';
                $(fill).addClass('vml-fill');
            }
            $(fill).attr(attr);
            return fill;
        },
        /**
        * 鑾峰彇鐩爣鑺傜偣鐨勫睘鎬�
        * @param {node} node kissy鑺傜偣瀵硅薄
        */
        addRectByEl: function (node) {
            var roundAttr = {},
                css = node[0].currentStyle,
                borderRadius = css['border-radius'],
                pos = node.offset(),
                fillColor = css.backgroundColor == 'transparent' ? '#fff' : css.backgroundColor,
                fillSrc;
            if (node[0].tagName.toUpperCase() == 'IMG') {
                fillSrc = node.attr('src');
            } else {
                fillSrc = css.backgroundImage.replace(/^url\(([^\)]+)\)$/, '$1').replace(/"|'/g, '');
            }


            roundAttr['width'] = node.outerWidth();
            roundAttr['height'] = node.outerHeight();
            roundAttr['arcSize'] = Math.min(~borderRadius.indexOf('%') ? (parseInt(borderRadius) / 100) : parseInt(borderRadius) / Math.min(roundAttr['width'], roundAttr['height']), 1);

            roundAttr['strokeColor'] = css.borderColor;
            roundAttr['strokeWeight'] = parseInt(css.borderWidth);
            roundAttr['stroked'] = 'true';
            if (!roundAttr['strokeWeight']) {
                roundAttr['strokeColor'] = roundAttr['fillColor'];
                roundAttr['strokeWeight'] = 0;
                roundAttr['stroked'] = 'false';
            }
            node.css(node[0].tagName != 'A' ? {
                visibility: 'hidden'
            } : {
                visibility: 'visible',
                opacity: 0
            });
            for (var el = node, i = 0, l = 100; i < l; i++) {
                el = el.parent();
                if (typeof el[0] == 'unknown' || el.css('position') == 'relative' || el.css('position') == 'absolute' || el[0].tagName == 'BODY') break;
            }
            el.css('zIndex', +el.css('zIndex') || 0);
            var pPos = el.offset();
            roundAttr['top'] = pos.top - pPos.top;
            roundAttr['left'] = pos.left - pPos.left;
            roundAttr['idx'] = el.css('zIndex') ? el.css('zIndex') - 1 : el.css('zIndex');

            var rect = RoundVML.createRect(roundAttr);
            var fill = RoundVML.createFill(fillColor, fillSrc);
            rect.appendChild(fill);
            el.append(rect);
        },
        /**
        * 閫氳繃鐩爣鑺傜偣瀵瑰簲鍒涘缓DOM缁撴瀯
        */
        createDomEl: function (targetCls) {
            var nodes = RoundVML.targetNodes(targetCls);
            if (nodes) {
                S.each(nodes, function (el) {
                    RoundVML.addRectByEl($(el));
                })
            }
        }
    };

    return {
        init: function (targetCls) {
            //鍒濆鎵ц
            if (RoundVML.isUse()) {
                //澧炲姞鍛藉悕绌洪棿
                RoundVML.addRule();
                //鍒涘缓鑺傜偣瀹炵幇鍦嗚
                RoundVML.createDomEl(targetCls);
            }
        }
    }
});