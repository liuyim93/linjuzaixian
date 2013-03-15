using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using friday.core.services;
using friday.core.domain;
using Friday.mvc.Models;
using friday.core;

namespace Friday.mvc.Areas.Merchant.Controllers
{
    public class SearchController : Controller
    {
        //
        // GET: /Merchant/Search/
        private IShopService iShopService;
        private ICommodityService iCommodityService;
        public SearchController(IShopService iShopService, ICommodityService iCommodityService)
        {
            this.iShopService = iShopService;
            this.iCommodityService = iCommodityService;
        }
        public ActionResult Index()
        {         
            SearchModel searchModel = new SearchModel();
            IList<Shop> shoplist = this.iShopService.GetAll();
            Shop shop = this.iShopService.SearchByShortName("银座");
            IList<Commodity> myCommodities = this.iCommodityService.GetCommodityByShopIDOrderByMonthAmountDesc(shop.Id);
            searchModel.SingleShop = shop;
            searchModel.Commoditys= myCommodities;

            return View(searchModel);
        }

    }
}
