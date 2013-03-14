/**
* 品牌街品牌关注组件
* guiyuan.hj@tmall.com
*
*  - depend TML miniLogin & dialog
*  ＠ 10-18 文案“收藏”改为“关注”
*/

KISSY.add("2.0/mods/collect", function (S, D, E, IO) {
    var defaultConfig = {
        triggerCls: 'j_CollectBrand',
        cfgAttr: 'data-brandId'
    };

    function Collect(cfg) {
        this._init(S.merge(defaultConfig, cfg || {}));
    }

    S.augment(Collect, {
        _init: function (cfg) {
            function onTgalleryReady(name, callback) {
                function onLoad() {
                    S.onTgalleryReady(name, callback);
                }
                S.configTgallery = {
                    tag: '20121031',
                    path: 'http://' + ASSETS_SERVER + '/apps/'
                }; //Tgallery的全局时间戳
                S.onTgalleryReady ? onLoad() : S.getScript(S.configTgallery.path + "tmall/common/tgallery.js?t=" + S.configTgallery.tag, onLoad);
            }
            //显示品牌收藏按钮
            onTgalleryReady("tgallery/department/common/brandbar", function (S, Brandbar) {
                Brandbar.show({
                    urlMyBrand: SERVER_URL + '/myBrandsIndex.html'
                });
                Brandbar.bindEl('.' + cfg.triggerCls, {
                    attrName: cfg.cfgAttr,
                    addServer: SERVER_URL + "/ajax/brandAddToFav.htm"
                });
                Brandbar.on("flyComplete", function () {
                    cfg.callback && cfg.callback();
                })
                Brandbar.on("error", function (error) {
                    S.use('2.0/mods/dialog', function (S, Dialog) {
                        new Dialog({
                            type: (error.code == -1 ? 'attention' : 'error'),
                            content: error.message + '<p class="brandMsgTips-p">查看<a href="myBrandsIndex.html">我关注的品牌>></a></p>',
                            closeCallBack: cfg.callback
                        });
                    })
                    return false;
                });
            });
        }
    });

    return Collect;

}, {
    requires: ['dom', 'event', 'ajax']
});