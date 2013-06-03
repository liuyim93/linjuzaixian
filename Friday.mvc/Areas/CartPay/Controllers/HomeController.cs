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
using System.Runtime.Serialization.Json;
using System.IO;
using System.Text;

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
        private ICommodityService iCommodityService;
        private IMyFavoriteService iMyFavoriteService;
        private ISkuService iSkuService;
        private ISkuPropService iSkuPropService;

        public HomeController(IUserService iUserService, IShoppingCartService iShoppingCartService, IShopService iShopService, ICartOfCommodityService iCartOfCommodityService, ICommodityService iCommodityService, IMyFavoriteService iMyFavoriteService, ISkuService iSkuService, ISkuPropService iSkuPropService)
        {
            this.iShopService = iShopService;
            this.iUserService = iUserService;
            this.iShoppingCartService = iShoppingCartService;
            this.iCartOfCommodityService = iCartOfCommodityService;
            this.iCommodityService = iCommodityService;
            this.iMyFavoriteService = iMyFavoriteService;
            this.iSkuService = iSkuService;
            this.iSkuPropService = iSkuPropService;
        }

        public ActionResult MyCartPay(string item_id, string skuId, string quantity, string from)
        {
            SystemUser systemUser = iUserService.GetOrCreateUser(this.HttpContext);
            if (systemUser == null)
            {
                return Redirect("http://120.192.31.164:7525/member/login.jhtml?redirect_url=http://120.192.31.164:7525/CartPay/Home/MyCartPay");
            }

            if (from == "item_detail")
            {
                friday.core.CartOfCommodity cartOfCommodity = null;
                friday.core.Commodity commodity = iCommodityService.Load(item_id);
                friday.core.domain.Sku sku = iSkuService.getSkubyIntID(skuId);
                ShoppingCart shoppingCart = iShoppingCartService.getShoppingCartBySystemUserAndMerchant(systemUser.Id, commodity.Shop.Id);

                if (shoppingCart == null)
                {
                    shoppingCart = new ShoppingCart()
                    {
                        SystemUser = systemUser,
                        Shop = commodity.Shop,
                        Price = Convert.ToInt16(quantity) * commodity.Price
                    };
                    iShoppingCartService.Save(shoppingCart);

                    cartOfCommodity = new friday.core.CartOfCommodity();
                    cartOfCommodity.Amount = Convert.ToInt16(quantity);
                    cartOfCommodity.Sku = sku;
                    cartOfCommodity.Commodity = commodity;
                    cartOfCommodity.Price = Convert.ToInt16(quantity) * commodity.Price;
                    cartOfCommodity.ShoppingCart = shoppingCart;
                }
                else
                {
                    cartOfCommodity = iCartOfCommodityService.getCommodityBySystemUserIDAndSkuID(systemUser.Id, skuId, false);
                    if (cartOfCommodity == null)
                    {
                        cartOfCommodity = new friday.core.CartOfCommodity();
                        cartOfCommodity.Amount = Convert.ToInt16(quantity);
                        cartOfCommodity.Sku = sku;
                        cartOfCommodity.Commodity = commodity;
                        cartOfCommodity.Price = Convert.ToInt16(quantity) * commodity.Price;
                        cartOfCommodity.ShoppingCart = shoppingCart;
                    }
                    else
                    {
                        cartOfCommodity.Amount = cartOfCommodity.Amount + Convert.ToInt16(quantity);
                        cartOfCommodity.Price = cartOfCommodity.Amount * commodity.Price;
                    }
                }

                iCartOfCommodityService.Save(cartOfCommodity);
            }
            return View();
        }

        public ActionResult Render_Cart(string varName, string callback)
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
                    url = "http://120.192.31.164:7525/merchant/index?scid=" + shop.Id,
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
                        now = Convert.ToInt16(cartOfCommodity.Commodity.Price * 100),
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
                    itemIconMetas.Add(new ItemIconMeta()
                    {
                        title = "消费者保障服务，卖家承诺7天退换",
                        link = "http://120.192.31.164:7525/merchant/detail/index?brandid=" + cartOfCommodity.Commodity.Id,
                        img = "http://120.192.31.164:7525/Images/a_7-day_return_16x16.png"
                    });
                    itemIconMetas.Add(new ItemIconMeta()
                    {
                        title = "消费者保障服务，卖家承诺如实描述",
                        link = "http://120.192.31.164:7525/merchant/detail/index?brandid=" + cartOfCommodity.Commodity.Id,
                        img = "http://120.192.31.164:7525/Images/a_true_description_16x16.png"
                    });
                    itemIconMetas.Add(new ItemIconMeta()
                    {
                        title = "消费者保障服务，卖家承诺假一赔三",
                        link = "http://120.192.31.164:7525/merchant/detail/index?brandid=" + cartOfCommodity.Commodity.Id,
                        img = "http://120.192.31.164:7525/Images/an_authentic_item_16x16.png"
                    });

                    itemIcon itemIcon = new itemIcon()
                    {
                        MALL_CART_XIAOBAO = itemIconMetas
                    };

                    order order = new order()
                    {
                        id = merchantNum + "_" + commodityNum,
                        itemId = cartOfCommodity.Commodity.Id,
                        skuId = cartOfCommodity.Sku.skuId,
                        cartId = cartOfCommodity.Sku.skuId.ToString(),
                        isValid = true,
                        url = "http://120.192.31.164:7525/merchant/detail/index?brandid=" + cartOfCommodity.Commodity.Id,
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
                        itemIcon = itemIcon
                    };

                    dynamic skuObj = new Dictionary<string, string>();

                    IList<SkuProp> skuProps = iSkuPropService.GetAllSkuPropsBySkuID(cartOfCommodity.Sku.skuId.ToString());
                    foreach (SkuProp skuProp in skuProps)
                    {
                        skuObj.Add(skuProp.PropID.PropIDName, skuProp.PropValue.PropValueName);
                    }
                    order.skus = skuObj;

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

            string script = "";
            if (callback == "" || callback == null)
            {
                script = varName + "=" + json;
                return JavaScript(script);
            }
            else
            {
                script = callback + "(" + json + ")";
                return JavaScript(script);
            }

            //string script = varName+"={\"success\":true,\"globalData\":{\"totalSize\":1,\"invalidSize\":0,\"isAllCItem\":false,\"diffTairCount\":0,\"login\":false,\"openNoAttenItem\":false},\"list\":[{\"id\":\"71955116\",\"title\":\"NIKE官方旗舰店\",\"type\":\"shop\",\"url\":\"http://store.taobao.com/shop/view_shop.htm?user_number_id=890482188\",\"seller\":\"nike官方旗舰店\",\"host\":\"B\",\"isValid\":true,\"gmtCompare\":1367550514000,\"bundles\":[{\"orders\":[{\"id\":\"0_0\",\"itemId\":\"17579720278\",\"skuId\":22016895152,\"cartId\":\"27740303030\",\"isValid\":true,\"url\":\"http://detail.tmall.com/item.htm?id=17579720278\",\"pic\":\"http://img01.taobaocdn.com/bao/uploaded/i1/890482188/T2IcdqXgxNXXXXXXXX_!!890482188.png_sum.jpg\",\"title\":\"Nike 耐克官方 AIR FORCE 1 '07 LE 空军一号男子运动鞋 315122\",\"skus\":{\"颜色分类\":\"白/白\",\"鞋尺码\":\"39/6.5\"},\"shopId\":\"71955116\",\"shopName\":\"NIKE官方旗舰店\",\"seller\":\"nike官方旗舰店\",\"sellerId\":890482188,\"price\":{\"now\":76900,\"origin\":76900,\"descend\":0,\"save\":0,\"sum\":76900,\"actual\":0},\"amount\":{\"now\":1,\"max\":6},\"itemIcon\":{\"PAYMENT\":[{\"title\":\"支持信用卡支付\",\"link\":\"\",\"img\":\"http://a.tbcdn.cn/sys/common/icon/trade/xcard.png\"}],\"MALL_CART_XIAOBAO\":[{\"title\":\"消费者保障服务，卖家承诺7天退换\",\"link\":\"http://www.taobao.com/go/act/315/xbqt090304.php?ad_id=&am_id=130011831021c2f3caab&cm_id=&pm_id=\",\"img\":\"http://120.192.31.164:7525/Images/a_7-day_return_16x16.png\"},{\"title\":\"消费者保障服务，卖家承诺如实描述\",\"link\":\"http://www.taobao.com/go/act/315/xfzbz_rsms.php?ad_id=&am_id=130011830696bce9eda3&cm_id=&pm_id=\",\"img\":\"http://120.192.31.164:7525/Images/a_true_description_16x16.png\"},{\"title\":\"消费者保障服务，卖家承诺假一赔三\",\"link\":\"http://www.taobao.com/go/act/315/xfzbz_jyps.php?ad_id=&am_id=1300118304240d56fca9&cm_id=&pm_id=\",\"img\":\"http://120.192.31.164:7525/Images/an_authentic_item_16x16.png\"}]},\"isCod\":false,\"isAttention\":true}]}]}]}";
            //return JavaScript(script);
        }
        public ActionResult Update_Cart()
        {
            //string jsonData = Request.Form["data"];
            //jsonData.Substring('[', jsonData.Length-3);
            var ser = new DataContractJsonSerializer(typeof(List<FormData>));
            var ms = new MemoryStream(Encoding.UTF8.GetBytes(Request.Form["data"]));
            List<FormData> formData = (List<FormData>)ser.ReadObject(ms);
            List<CartItem> cartItems = formData.FirstOrDefault().cart;
            SystemUser systemUser = iUserService.GetOrCreateUser(this.HttpContext);
            friday.core.CartOfCommodity cartOfCommodity;

            UpdateListItem updateListItem = new UpdateListItem();
            updateListItem.orders = new List<UpdateOrderItem>();
            foreach (CartItem cartItem in cartItems)
            {
                cartOfCommodity = iCartOfCommodityService.getCommodityBySystemUserIDAndSkuID(systemUser.Id, cartItem.cartId, false);

                price price = new Models.price()
                {
                    now = Convert.ToInt16(cartOfCommodity.Commodity.Price * 100),
                    origin = Convert.ToInt16(cartOfCommodity.Commodity.Price * 100),
                    descend = 0,
                    save = Convert.ToInt16(cartOfCommodity.Commodity.OldPrice * 100) - Convert.ToInt16(cartOfCommodity.Commodity.Price * 100),
                    sum = Convert.ToInt16(cartOfCommodity.Commodity.Price * 100) * cartItem.quantity,
                    actual = 0
                };

                UpdateOrderItem updateOrderItem = new UpdateOrderItem()
                {
                    id = cartItem.cartId,
                    price = price
                };

                updateListItem.id = cartOfCommodity.ShoppingCart.Shop.Id;
                updateListItem.orders.Add(updateOrderItem);

                cartOfCommodity.Amount = cartItem.quantity;
                cartOfCommodity.Price = cartOfCommodity.Commodity.Price * cartItem.quantity;
                iCartOfCommodityService.Update(cartOfCommodity);
            }

            globalData globalData = new Models.globalData()
            {
                totalSize = cartItems.Count,
                invalidSize = 0,
                isAllCItem = false,
                diffTairCount = 0,
                login = false,
                openNoAttenItem = false
            };

            List<UpdateListItem> updateListItems = new List<UpdateListItem>();
            updateListItems.Add(updateListItem);

            UpdateData updateData = new UpdateData()
            {
                success = true,
                globalData = globalData,
                list = updateListItems
            };

            FormatJsonResult jsonResult = new FormatJsonResult();
            jsonResult.Data = updateData;
            string json = jsonResult.FormatResult();
            string script = json;

            return JavaScript(script);

            //string script = "{\"success\":true,\"globalData\":{\"totalSize\":1,\"invalidSize\":0,\"isAllCItem\":false,\"diffTairCount\":0,\"login\":false,\"openNoAttenItem\":false},\"list\":[{\"id\":\"71955116\",\"orders\":[{\"id\":\"27740303030\",\"price\":{\"now\":76900,\"origin\":76900,\"descend\":0,\"save\":0,\"sum\":153800,\"actual\":0}}]}]}";
            //return JavaScript(script);
        }

        public ActionResult Recommend(string callback)
        {
            IList<friday.core.Commodity> commodities = new List<friday.core.Commodity>();
            if (callback == "recommend.renderRecentViewItemList")
            {
                commodities = iCommodityService.GetRecentCommodity(20);
            }
            if (callback == "recommend.renderRecentFavList")
            {
                commodities = iCommodityService.GetHotCommodity(20);
            }

            RenderList renderList = new RenderList();

            foreach (friday.core.Commodity commodity in commodities)
            {
                RenderItem renderItem = new RenderItem()
                {
                    area_url = "http://ac.atpanel.com/1.gif",
                    id = commodity.Id,
                    img = commodity.Image,
                    price = commodity.Price,
                    title = commodity.Name,
                    url = "http://120.192.31.164:7525/merchant/detail/index?brandId=" + commodity.Id
                };
                renderList.renderItems.Add(renderItem);
            }

            FormatJsonResult jsonResult = new FormatJsonResult();
            jsonResult.Data = renderList.renderItems;
            string json = jsonResult.FormatResult();
            string script = callback + "(" + json + ")";

            return JavaScript(script);
        }

        public ActionResult add_collection_for_cart(string callback, string itemSkuList)
        {
            MyFavorite myFavorite = new MyFavorite();
            SystemUser systemUser = iUserService.GetOrCreateUser(this.HttpContext);
            if (systemUser == null)
            {
                string script = callback + "({\"result\":{\"status\":false,\"message\":{\"errorCode\":1,\"error\":\"请登录后重新操作\"}}})";
                return JavaScript(script);
            }
            else
            {
                string commodityID = itemSkuList.Substring(0, itemSkuList.IndexOf(':'));

                friday.core.Commodity commodity = iCommodityService.Load(commodityID);
                if (iMyFavoriteService.GetMyFavoriteBySystemUserAndMerchant(systemUser, commodity.Shop.Id) != null)
                {
                    string script = callback + "({\"result\":{\"status\":false,\"message\":{\"errorCode\":8,\"error\":\"已收藏该店铺\"}}})";
                    return JavaScript(script);
                }
                else
                {
                    myFavorite.SystemUser = systemUser;
                    myFavorite.Merchant = commodity.Shop;
                    iMyFavoriteService.Save(myFavorite);

                    string script = callback + "({\"result\":{\"status\":true,\"message\":{\"count\":1}}})";
                    return JavaScript(script);
                }
            }
        }

        public ActionResult deleteCart(string data, string callback, string cartId)
        {
            SystemUser systemUser = iUserService.GetOrCreateUser(this.HttpContext);

            if (cartId == "" && cartId == null)
            {
                var ser = new DataContractJsonSerializer(typeof(List<FormData>));
                var ms = new MemoryStream(Encoding.UTF8.GetBytes(data));
                List<FormData> formData = (List<FormData>)ser.ReadObject(ms);
                List<CartItem> cartItems = formData.FirstOrDefault().cart;
                friday.core.CartOfCommodity cartOfCommodity;

                string operateSkuID = formData.FirstOrDefault().operate.FirstOrDefault();
                UpdateListItem updateListItem = new UpdateListItem();
                updateListItem.orders = new List<UpdateOrderItem>();

                foreach (CartItem cartItem in cartItems)
                {
                    if (cartItem.cartId != operateSkuID)
                    {
                        cartOfCommodity = iCartOfCommodityService.getCommodityBySystemUserIDAndSkuID(systemUser.Id, cartItem.cartId, false);

                        price price = new Models.price()
                        {
                            now = Convert.ToInt16(cartOfCommodity.Commodity.Price * 100),
                            origin = Convert.ToInt16(cartOfCommodity.Commodity.Price * 100),
                            descend = 0,
                            save = Convert.ToInt16(cartOfCommodity.Commodity.OldPrice * 100) - Convert.ToInt16(cartOfCommodity.Commodity.Price * 100),
                            sum = Convert.ToInt16(cartOfCommodity.Commodity.Price * 100) * cartItem.quantity,
                            actual = 0
                        };

                        UpdateOrderItem updateOrderItem = new UpdateOrderItem()
                        {
                            id = cartItem.cartId,
                            price = price
                        };

                        updateListItem.id = cartOfCommodity.ShoppingCart.Shop.Id;
                        updateListItem.orders.Add(updateOrderItem);

                    }
                    else
                    {
                        cartOfCommodity = iCartOfCommodityService.getCommodityBySystemUserIDAndSkuID(systemUser.Id, cartItem.cartId, false);
                        friday.core.CartOfCommodity deletedCartOfCommodity = iCartOfCommodityService.getCommodityBySystemUserIDAndSkuID(systemUser.Id, cartItem.cartId, true);
                        if (deletedCartOfCommodity != null)
                        {
                            iCartOfCommodityService.PhysicsDelete(deletedCartOfCommodity.Id);
                        }
                        iCartOfCommodityService.Delete(cartOfCommodity.Id);
                    }
                }
                List<UpdateListItem> updateListItems = new List<UpdateListItem>();
                updateListItems.Add(updateListItem);

                Sss sss = new Sss()
                {
                    token = "ecdf69d87e98ddfc13c0ef61601e0dd4",
                    quantity = -1
                };

                DelGlobalData delGlobalData = new DelGlobalData()
                {
                    sss = sss,
                    totalSize = cartItems.Count - 1,
                    invalidSize = 0,
                    isAllCItem = false,
                    diffTairCount = 0,
                    login = false,
                    openNoAttenItem = false
                };

                DelData delData = new DelData()
                {
                    success = true,
                    globalData = delGlobalData,
                    list = updateListItems
                };

                FormatJsonResult jsonResult = new FormatJsonResult();
                jsonResult.Data = delData;
                string json = jsonResult.FormatResult();
                string script = json;

                return JavaScript(script);
            }
            else
            {
                iCartOfCommodityService.Delete(iCartOfCommodityService.getCommodityBySystemUserIDAndSkuID(systemUser.Id, cartId, false).Id);
                string script = callback + "({\"success\":true,\"globalData\":{\"sss\":{\"token\":\"ecdf69d87e98ddfc13c0ef61601e0dd4\",\"quantity\":-1},\"totalSize\":-100,\"invalidSize\":0,\"isAllCItem\":false,\"diffTairCount\":0,\"login\":true,\"openNoAttenItem\":false}})";
                return JavaScript(script);
            }
        }

        public ActionResult undelCart(string cart_ids)
        {
            SystemUser systemUser = iUserService.GetOrCreateUser(this.HttpContext);
            friday.core.CartOfCommodity cartOfCommodity;
            cartOfCommodity = iCartOfCommodityService.getCommodityBySystemUserIDAndSkuID(systemUser.Id, cart_ids, true);

            int amount = cartOfCommodity.Amount;

            cartOfCommodity.IsDelete = false;
            iCartOfCommodityService.Update(cartOfCommodity);

            string script = "{\"success\":true,\"globalData\":{\"sss\":{\"token\":\"c9db69e31406e49e0116f8842d71ce67\",\"quantity\":" + amount + "},\"totalSize\":0,\"invalidSize\":0,\"isAllCItem\":false,\"diffTairCount\":0,\"login\":false,\"openNoAttenItem\":false}}";
            return JavaScript(script);
        }

    }
}
