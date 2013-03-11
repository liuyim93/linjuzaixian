/**
* 品牌街单个品牌区块
* guiyuan.hj@tmall.com
*/

KISSY.add("2.0/mods/item", function (S, Anim, Switchable) {
    var DOM = S.DOM,
		Event = S.Event,
		isIE6 = S.UA.ie == 6,
		isIE = !!S.UA.ie;

    function brandItem() {
        //IE6 单品hover效果
        if (isIE6) {
            Event.on('.j_BrandItemList', 'mouseenter', function () {
                DOM.addClass(this, 'bIc-slideList-hover');
            });
            Event.on('.j_BrandItemList', 'mouseleave', function () {
                DOM.removeClass(this, 'bIc-slideList-hover');
            });
        }

        //初始化轮播，如果单品数>4，才使用轮播
        S.each(S.query('.j_BrandItemSlide'), function (item) {
            var arr = S.query('.j_BrandItemList', item),
				len = arr.length;

            if (len > 4) {
                DOM.css(arr[len - 1], {
                    marginRight: 0
                });

                new S.Carousel(item, {
                    hasTriggers: false,
                    contentCls: 'bIc-slideList',
                    effect: 'scrollx',
                    easing: 'easeOutStrong',
                    lazyDataType: 'img-src',
                    prevBtnCls: 'bIc-slide-prev',
                    nextBtnCls: 'bIc-slide-next',
                    circular: false,
                    steps: 4,
                    viewSize: [720, 255],
                    autoplay: false
                });
            } else {
                DOM.hide(S.get('.bIc-slide-prev', item));
                DOM.hide(S.get('.bIc-slide-next', item));
            }
        });

        //取消收藏功能
        Event.on('.j_CancelCollectBtn', 'click', function (ev) {
            ev.halt();
            var el = this,
				brandId = DOM.attr(el, 'data-brandId'),
				tbToke = DOM.val('#J_TbToken') || '',
				requestUrl = (DEV_EV == 'demo' || DEV_EV == 'local') ?
					'http://' + DEV_EV + '.tmall.net/brand/2.0/ajax/cancel.php' : SERVER_URL + '/ajax/brandDelFromFav.htm',
				obj = !!tbToke ? {
				    brandId: brandId,
				    _tb_token_: tbToke
				} : {
				    brandId: brandId
				},

				sendRequest = function () {
				    S.IO.jsonp(requestUrl, obj, function (data) {
				        if (!!data && data.is_success == 'T') {
				            var brandItem = DOM.parent(el, function (p) {
				                return DOM.hasClass(p, '.brandItem')
				            });

				            //if(!isIE){
				            var anim = new S.Anim(brandItem, {
				                height: 0,
				                width: 0
				            }, .3);
				            anim.run();
				            anim.on('complete', function () {
				                DOM.remove(brandItem);
				            });
				            //}else{
				            //	DOM.remove(brandItem)
				            //}

				        } else {
				            S.use('2.0/mods/dialog', function (S, Dialog) {
				                new Dialog({
				                    type: 'error',
				                    content: '删除失败，请稍后再试！'
				                });
				            });
				        }

				    });
				};

            S.use('2.0/mods/dialog', function (S, Dialog) {
                new Dialog({
                    height: 150,
                    type: 'attention',
                    content: '是否取消关注该品牌？',
                    confirm: true,
                    callback: sendRequest
                });
            });
        });
    }

    return brandItem;

}, {
    requires: ['anim', 'switchable']
});