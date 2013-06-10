using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Collections;
using friday.core.domain;
using friday.core.services;
using friday.core.components;
using System.Runtime.Serialization.Json;
using System.IO;
using System.Text;
using Friday.mvc.Models;

namespace Friday.mvc.Areas.Order.Controllers
{
    public class HomeController : Controller
    {
        //
        // GET: /Order/Home/
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

        public ActionResult ConfirmOrder()
        {
            //SystemUser systemUser = iUserService.GetOrCreateUser(this.HttpContext);
            //if (systemUser == null)
            //{
            //    return Redirect("http://localhost:7525/member/login.jhtml?redirect_url=http://localhost:7525/Order/Home/ConfirmOrder");
            //}
            OrderModel orderModel = new OrderModel();
            return View(orderModel);
        }

    }
}
