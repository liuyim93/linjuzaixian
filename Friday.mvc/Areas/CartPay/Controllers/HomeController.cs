using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Collections;
using friday.core.domain;
using friday.core.services;
using Friday.mvc.Areas.CartPay.Models;
using friday.core.components;

namespace Friday.mvc.Areas.CartPay.Controllers
{
    public class HomeController : Controller
    {
        //
        // GET: /CartPay/Home/
        private IUserService iUserService;
        private IShoppingCartService iShoppingCartService;
        private IShopService iShopService;
        private ICartOfCommodityService iCartOfCommodityService;

        public HomeController(IUserService iUserService, IShoppingCartService iShoppingCartService, IShopService iShopService, ICartOfCommodityService iCartOfCommodityService)
        {
            this.iShopService = iShopService;
            this.iUserService = iUserService;
            this.iShoppingCartService = iShoppingCartService;
            this.iCartOfCommodityService = iCartOfCommodityService;
        }

        public ActionResult MyCartPay()
        {
            return View();
        }

        public ActionResult Render_Cart(string varName)
        {
            SystemUser systemUser = iUserService.GetOrCreateUser(this.HttpContext);
            List<ShoppingCart> shoppingCarts = iShoppingCartService.getShoppingCartBySystemUser(systemUser.Id);
            List<friday.core.CartOfCommodity> cartOfCommoditys = new List<friday.core.CartOfCommodity>();
            foreach (ShoppingCart shoppingCart in shoppingCarts)
            {
                cartOfCommoditys.AddRange(iCartOfCommodityService.getCommoditiesByShoppingCart(shoppingCart.Id));
            }

            Shop shop;

            globalData globalData = new globalData()
            {
                totalSize = cartOfCommoditys.Count,
                invalidSize = 0,
                isAllCItem = false,
                diffTairCount = 0,
                login = false,
                openNoAttenItem = false
            };

            Dictionary<string, List<friday.core.CartOfCommodity>> merchantListItem = new Dictionary<string, List<friday.core.CartOfCommodity>>();

            //商品按商铺分类
            foreach (friday.core.CartOfCommodity cartOfCommodity in cartOfCommoditys)
            {
                shop = cartOfCommodity.ShoppingCart.Shop;
                if (merchantListItem.ContainsKey(shop.Id))
                {
                    merchantListItem[shop.Id].Add(cartOfCommodity);
                }
                else
                {
                    List<friday.core.CartOfCommodity> cartOfCommodities = new List<friday.core.CartOfCommodity>();
                    cartOfCommodities.Add(cartOfCommodity);
                    merchantListItem.Add(shop.Id, cartOfCommodities);
                }
            }

            List<listItem> listItems = new List<listItem>();

            int merchantNum = 0;
            foreach (string key in merchantListItem.Keys.ToList())
            {
                shop = iShopService.Load(key);
                listItem listItem = new listItem()
                {
                    id = shop.Id,
                    title = shop.Name,
                    type = "shop",
                    url = "http://localhost:7525/merchant/search?scid=" + shop.Id,
                    seller = shop.Name,
                    host = "B",
                    isValid = true,
                    gmtCompare = 1367849564000
                };

                IList<order> orders = new List<order>();

                int commodityNum = 0;
                foreach (friday.core.CartOfCommodity cartOfCommodity in merchantListItem[key])
                {

                    price price = new price()
                    {
                        now = Convert.ToInt16(cartOfCommodity.Commodity.Price*100),
                        origin = Convert.ToInt16(cartOfCommodity.Commodity.OldPrice * 100),
                        descend = 0,
                        save = Convert.ToInt16(cartOfCommodity.Commodity.OldPrice * 100) - Convert.ToInt16(cartOfCommodity.Commodity.Price * 100),
                        sum = Convert.ToInt16(cartOfCommodity.Commodity.Price * 100) * cartOfCommodity.Amount,
                        actual = 0
                    };

                    amount amount = new amount()
                    {
                        now = cartOfCommodity.Amount,
                        max = Convert.ToInt16(cartOfCommodity.Commodity.InventoryCount)
                    };

                    List<ItemIconMeta> itemIconMetas = new List<ItemIconMeta>();
                    itemIconMetas.Add(new ItemIconMeta() {
                        title = "消费者保障服务，卖家承诺7天退换",
                        link = "http://localhost:7525/merchant/detail/index?brandid=" + cartOfCommodity.Commodity.Id,
                        img = "http://a.tbcdn.cn/tbsp/icon/xiaobao/a_7-day_return_16x16.png"
                    });
                    itemIconMetas.Add(new ItemIconMeta()
                    {
                        title = "消费者保障服务，卖家承诺如实描述",
                        link = "http://localhost:7525/merchant/detail/index?brandid=" + cartOfCommodity.Commodity.Id,
                        img = "http://a.tbcdn.cn/tbsp/icon/xiaobao/a_true_description_16x16.png"
                    });
                    itemIconMetas.Add(new ItemIconMeta()
                    {
                        title = "消费者保障服务，卖家承诺假一赔三",
                        link = "http://localhost:7525/merchant/detail/index?brandid=" + cartOfCommodity.Commodity.Id,
                        img = "http://a.tbcdn.cn/tbsp/icon/xiaobao/an_authentic_item_16x16.png"
                    });

                    itemIcon itemIcon = new itemIcon()
                    {
                        MALL_CART_XIAOBAO = itemIconMetas
                    };

                    order order = new order()
                    {
                        id = merchantNum+"_"+commodityNum,
                        itemId = cartOfCommodity.Commodity.Id,
                        skuId = 41878380917,
                        cartId = cartOfCommodity.Commodity.Id,
                        isValid = true,
                        url = "http://localhost:7525/merchant/detail/index?brandid=" + cartOfCommodity.Commodity.Id,
                        pic = cartOfCommodity.Commodity.Image,
                        title = cartOfCommodity.Commodity.Name,
                        shopId = shop.Id,
                        shopName = shop.Name,
                        seller = shop.Name,
                        sellerId = 890482188,
                        isCod = false,
                        isAttention = true,
                        price = price,
                        amount = amount,
                        itemIcon =itemIcon
                    };
                   
                    orders.Add(order);
                    commodityNum++;
                }

                List<Bundles> bundles = new List<Bundles>();
                bundles.Add(new Bundles()
                {
                    orders = orders
                });

                listItem.bundles = bundles;
                listItems.Add(listItem);
                merchantNum++;
            }

            Mcartdata mcartdata = new Mcartdata()
            {
                success = true,
                globalData = globalData,
                list = listItems,
            };

            FormatJsonResult jsonResult = new FormatJsonResult();
            jsonResult.Data = mcartdata;
            string json = jsonResult.FormatResult();
            string script = varName + "=" + json;

            return JavaScript(script);
            //string script = varName+"={\"success\":true,\"globalData\":{\"totalSize\":1,\"invalidSize\":0,\"isAllCItem\":false,\"diffTairCount\":0,\"login\":false,\"openNoAttenItem\":false},\"list\":[{\"id\":\"71955116\",\"title\":\"NIKE官方旗舰店\",\"type\":\"shop\",\"url\":\"http://store.taobao.com/shop/view_shop.htm?user_number_id=890482188\",\"seller\":\"nike官方旗舰店\",\"host\":\"B\",\"isValid\":true,\"gmtCompare\":1367550514000,\"bundles\":[{\"orders\":[{\"id\":\"0_0\",\"itemId\":\"17579720278\",\"skuId\":22016895152,\"cartId\":\"27740303030\",\"isValid\":true,\"url\":\"http://detail.tmall.com/item.htm?id=17579720278\",\"pic\":\"http://img01.taobaocdn.com/bao/uploaded/i1/890482188/T2IcdqXgxNXXXXXXXX_!!890482188.png_sum.jpg\",\"title\":\"Nike 耐克官方 AIR FORCE 1 '07 LE 空军一号男子运动鞋 315122\",\"skus\":{\"颜色分类\":\"白/白\",\"鞋尺码\":\"39/6.5\"},\"shopId\":\"71955116\",\"shopName\":\"NIKE官方旗舰店\",\"seller\":\"nike官方旗舰店\",\"sellerId\":890482188,\"price\":{\"now\":76900,\"origin\":76900,\"descend\":0,\"save\":0,\"sum\":76900,\"actual\":0},\"amount\":{\"now\":1,\"max\":6},\"itemIcon\":{\"PAYMENT\":[{\"title\":\"支持信用卡支付\",\"link\":\"\",\"img\":\"http://a.tbcdn.cn/sys/common/icon/trade/xcard.png\"}],\"MALL_CART_XIAOBAO\":[{\"title\":\"消费者保障服务，卖家承诺7天退换\",\"link\":\"http://www.taobao.com/go/act/315/xbqt090304.php?ad_id=&am_id=130011831021c2f3caab&cm_id=&pm_id=\",\"img\":\"http://a.tbcdn.cn/tbsp/icon/xiaobao/a_7-day_return_16x16.png\"},{\"title\":\"消费者保障服务，卖家承诺如实描述\",\"link\":\"http://www.taobao.com/go/act/315/xfzbz_rsms.php?ad_id=&am_id=130011830696bce9eda3&cm_id=&pm_id=\",\"img\":\"http://a.tbcdn.cn/tbsp/icon/xiaobao/a_true_description_16x16.png\"},{\"title\":\"消费者保障服务，卖家承诺假一赔三\",\"link\":\"http://www.taobao.com/go/act/315/xfzbz_jyps.php?ad_id=&am_id=1300118304240d56fca9&cm_id=&pm_id=\",\"img\":\"http://a.tbcdn.cn/tbsp/icon/xiaobao/an_authentic_item_16x16.png\"}]},\"isCod\":false,\"isAttention\":true}]}]}]}";
            //return JavaScript(script);
        }
        public ActionResult Update_Cart()
        {
            string script = "{\"success\":true,\"globalData\":{\"totalSize\":1,\"invalidSize\":0,\"isAllCItem\":false,\"diffTairCount\":0,\"login\":false,\"openNoAttenItem\":false},\"list\":[{\"id\":\"71955116\",\"orders\":[{\"id\":\"27740303030\",\"price\":{\"now\":76900,\"origin\":76900,\"descend\":0,\"save\":0,\"sum\":153800,\"actual\":0}}]}]}";
            return JavaScript(script);
        }

    }
}
