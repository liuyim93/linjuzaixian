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
using Friday.mvc.Areas.PersonalCenter.Models;
using friday.core;

namespace Friday.mvc.Areas.PersonalCenter.Controllers
{
    public class HomeController : Controller
    {
        //
        // GET: /PersonalCenter/Home/
        private IUserService iUserService;
        private IShoppingCartService iShoppingCartService;
        private IShopService iShopService;
        private ICartOfCommodityService iCartOfCommodityService;
        private ICommodityService iCommodityService;
        private IMyFavoriteService iMyFavoriteService;
        private IMyCommodityOrderService iMyCommodityOrderService;
        private IOrderOfCommodityService iOrderOfCommodityService;
        private ISkuService iSkuService;

        public HomeController(IUserService iUserService, IShoppingCartService iShoppingCartService, IShopService iShopService, ICartOfCommodityService iCartOfCommodityService, ICommodityService iCommodityService, IMyFavoriteService iMyFavoriteService, IMyCommodityOrderService iMyCommodityOrderService, IOrderOfCommodityService iOrderOfCommodityService, ISkuService iSkuService)
        {
            this.iShopService = iShopService;
            this.iUserService = iUserService;
            this.iShoppingCartService = iShoppingCartService;
            this.iCartOfCommodityService = iCartOfCommodityService;
            this.iCommodityService = iCommodityService;
            this.iMyFavoriteService = iMyFavoriteService;
            this.iMyCommodityOrderService = iMyCommodityOrderService;
            this.iOrderOfCommodityService = iOrderOfCommodityService;
            this.iSkuService = iSkuService;
        }

        public ActionResult MyPersonalCenter()
        {
            SystemUser systemUser = iUserService.GetOrCreateUser(this.HttpContext);
            PersonalCenterModel personalCenterModel = new PersonalCenterModel();
            if (systemUser == null)
            {
                return Redirect("http://localhost:7525/member/login.jhtml?redirect_url=http://localhost:7525/PersonalCenter/Home/MyPersonalCenter");
            }

            personalCenterModel.systemUser = systemUser;

            //收藏的商铺
            int a;
            IList<MyFavorite> myFavorites = this.iMyFavoriteService.GetMyFavoriteBySystemUser(systemUser, 0, 3, out a);
            foreach (MyFavorite m in myFavorites)
            {
                personalCenterModel.FavMerchants.Add(m.Merchant);
            }

            //购物车
            List<ShoppingCart> shoppingCarts = iShoppingCartService.getShoppingCartBySystemUser(systemUser.Id);
            foreach (ShoppingCart shoppingCart in shoppingCarts)
            {
                personalCenterModel.CartOfCommodities.AddRange(iCartOfCommodityService.getCommoditiesByShoppingCart(shoppingCart.Id));
            }

            //已买到的宝贝
            IList<MyCommodityOrder> myCommodityOrders = iMyCommodityOrderService.geMyCommodityOrdersBySystemUserID(systemUser.Id);
            IList<OrderOfCommodity> orderOfCommodities;
            if (myCommodityOrders != null)
            {
                foreach (MyCommodityOrder myCommodityOrder in myCommodityOrders)
                {
                    orderOfCommodities = iOrderOfCommodityService.geOrderOfCommoditysByMyCommodityOrderID(myCommodityOrder.Id);
                    foreach (OrderOfCommodity orderOfCommodity in orderOfCommodities)
                    {
                        if (!personalCenterModel.Commodities.Contains(orderOfCommodity.Commodity))
                        {
                            personalCenterModel.Commodities.Add(orderOfCommodity.Commodity);
                            personalCenterModel.OrderOfCommodity.Add(orderOfCommodity);
                        }
                    }
                }
            }

            return View(personalCenterModel);
        }
    }
}
