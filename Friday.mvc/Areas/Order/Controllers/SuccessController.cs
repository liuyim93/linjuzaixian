using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using friday.core.domain;
using friday.core.services;

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
        private ISkuService iSkuService;
        private ISkuPropService iSkuPropService;

        public SuccessController(IUserService iUserService, IShoppingCartService iShoppingCartService, IShopService iShopService, ICartOfCommodityService iCartOfCommodityService, ICommodityService iCommodityService, IAddressService iAddressService, ISkuService iSkuService, ISkuPropService iSkuPropService)
        {
            this.iShopService = iShopService;
            this.iUserService = iUserService;
            this.iShoppingCartService = iShoppingCartService;
            this.iCartOfCommodityService = iCartOfCommodityService;
            this.iCommodityService = iCommodityService;
            this.iAddressService = iAddressService;
            this.iSkuService = iSkuService;
            this.iSkuPropService = iSkuPropService;
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
            return View();
        }

    }
}
