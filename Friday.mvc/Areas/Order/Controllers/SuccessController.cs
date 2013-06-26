﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using friday.core.domain;
using friday.core.services;
using friday.core;

namespace Friday.mvc.Areas.Order.Controllers
{
    public class SuccessController : Controller
    {
        private IUserService iUserService;
        private IShoppingCartService iShoppingCartService;
        private IShopService iShopService;
        private ICartOfCommodityService iCartOfCommodityService;
        private ICommodityService iCommodityService;
        private IAddressService iAddressService;
        private IMyCommodityOrderService iMyCommodityOrderService;
        private IOrderOfCommodityService iOrderOfCommodityService;
        private IMessageContentService iMessageContentService;
        private IMessageService iMessageService;

        public SuccessController(IUserService iUserService, IShoppingCartService iShoppingCartService, IShopService iShopService, ICartOfCommodityService iCartOfCommodityService, ICommodityService iCommodityService, IAddressService iAddressService, IMyCommodityOrderService iMyCommodityOrderService, IOrderOfCommodityService iOrderOfCommodityService, IMessageContentService iMessageContentService, IMessageService iMessageService)
        {
            this.iShopService = iShopService;
            this.iUserService = iUserService;
            this.iShoppingCartService = iShoppingCartService;
            this.iCartOfCommodityService = iCartOfCommodityService;
            this.iCommodityService = iCommodityService;
            this.iAddressService = iAddressService;
            this.iMyCommodityOrderService = iMyCommodityOrderService;
            this.iOrderOfCommodityService = iOrderOfCommodityService;
            this.iMessageContentService = iMessageContentService;
            this.iMessageService = iMessageService;
        }
        //
        // GET: /Order/Success/

        public ActionResult Index(string phone, string address, string isCod, string orderData, string totalFee)
        {
            SystemUser systemUser = iUserService.GetOrCreateUser(this.HttpContext);
            if (systemUser == null)
            {
                return Redirect("http://localhost:7525/member/login.jhtml?redirect_url=http://localhost:7525/index.html");
            }

            if (isCod != null && isCod != "")
            {
                //购物车信息
                List<ShoppingCart> shoppingCarts = iShoppingCartService.getShoppingCartBySystemUser(systemUser.Id);
                List<friday.core.CartOfCommodity> cartOfCommoditys = new List<friday.core.CartOfCommodity>();
                foreach (ShoppingCart shoppingCart in shoppingCarts)
                {
                    iShoppingCartService.Delete(shoppingCart.Id);
                    cartOfCommoditys.AddRange(iCartOfCommodityService.getCommoditiesByShoppingCart(shoppingCart.Id));
                }

                if (cartOfCommoditys.Count == 0)
                {
                    return Redirect("http://localhost:7525/CartPay/Home/MyCartPay");
                }

                Dictionary<string, List<friday.core.CartOfCommodity>> merchantListItem = new Dictionary<string, List<friday.core.CartOfCommodity>>();

                Shop shop;

                //商品按商铺分类
                foreach (friday.core.CartOfCommodity cartOfCommodity in cartOfCommoditys)
                {
                    iCartOfCommodityService.Delete(cartOfCommodity.Id);
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
                Address addr = null;
                foreach (Address a in systemUser.Addresses)
                {
                    if (a.prov != null && a.IsDelete == false)
                    {
                        addr = a;
                        break;
                    }
                }

                foreach (string key in merchantListItem.Keys.ToList())
                {
                    shop = iShopService.Load(key);
                    MyCommodityOrder myCommodityOrder = new MyCommodityOrder() {
                        Address = addr.AddressName,
                        Linkman = addr.Linkman,
                        OrderNumber = new Guid().ToString(),
                        OrderStatus = friday.core.EnumType.MyOrderStatusEnum.配送中,
                        Shop = shop,
                        SystemUser = systemUser,
                        Tel = addr.Tel,
                        Price = 0,
                        BackupTel = addr.BackupTel,
                        Description = addr.post
                    };
                    iMyCommodityOrderService.Save(myCommodityOrder);

                    double sumPrice = 0;
                    foreach (friday.core.CartOfCommodity cartOfCommodity in merchantListItem[key])
                    {
                        OrderOfCommodity orderOfCommodity = new OrderOfCommodity() {
                            Amount = cartOfCommodity.Amount,
                            Price = cartOfCommodity.Price,
                            MyCommodityOrder = myCommodityOrder,
                            Commodity = cartOfCommodity.Commodity,
                            Sku = cartOfCommodity.Sku
                        };
                        sumPrice += cartOfCommodity.Price;
                        iOrderOfCommodityService.Save(orderOfCommodity);
                    }

                    MessageContent messageCotent = new MessageContent() {
                        Content = "您有新的订单，请及时处理！"
                    };
                    iMessageContentService.Save(messageCotent);

                    friday.core.Message message = new friday.core.Message() {
                        IsNew = true,
                        LoginUser = systemUser.LoginUser,
                        Merchant = myCommodityOrder.Shop,
                        MessageContent = messageCotent
                    };
                    iMessageService.Save(message);

                    myCommodityOrder.Price = sumPrice;
                    iMyCommodityOrderService.Update(myCommodityOrder);

                }
            }

            return View();
        }

    }
}
