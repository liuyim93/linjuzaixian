using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using friday.core.services;
using friday.core.domain;
using Friday.mvc.Models;
using friday.core;
using MvcPaging;
namespace Friday.mvc.Areas.Merchant.Controllers
{
    public class SearchProductController : Controller
    {
        //
        // GET: /Merchant/Search/
        private IMerchantService iMerchantService;
        private IMerchantGoodsTypeService iMerchantGoodsTypeService;
        private IRestaurantService iRestaurantService;
        private IRentService iRentService;
        private IShopService iShopService;
        private IFoodService iFoodService;
        private IHouseService iHouseService;
        private ICommodityService iCommodityService;

        public SearchProductController(IMerchantService iMerchantService, IMerchantGoodsTypeService iMerchantGoodsTypeService, IRestaurantService iRestaurantService, IRentService iRentService, IShopService iShopService, ICommodityService iCommodityService, IHouseService iHouseService, IFoodService iFoodService)
        {
            this.iMerchantService = iMerchantService;
            this.iMerchantGoodsTypeService = iMerchantGoodsTypeService;
            this.iRentService = iRentService;
            this.iRestaurantService = iRestaurantService;
            this.iShopService = iShopService;
            this.iCommodityService = iCommodityService;
            this.iFoodService = iFoodService;
            this.iHouseService = iHouseService;
        }
        public ActionResult SearchGoods()
        {
                   

            return View();
        }

        public ActionResult Index(string page,string keyword, string price1, string price2 )
        {
            double dbprice1, dbprice2;
            if (string.IsNullOrEmpty(price1))
            {
                dbprice1 = -1; //约定-1 表示为空
            }
            else
            {
                dbprice1 = Convert.ToDouble(price1);
            }
            if (string.IsNullOrEmpty(price2))
            {
                dbprice2 = -1;
            }
            else
            {
                dbprice2 = Convert.ToDouble(price2);
            }
            if (!string.IsNullOrEmpty(Request.Params["page"]))
            {
                page = Request.Params["page"];
            }
            if (string.IsNullOrEmpty(keyword))
            {
                keyword = "";
            }
         

            SearchProductModel searchProductModel = new SearchProductModel();


            int currentPage = (page == "" || page == null) ? 1 : Convert.ToInt16(page);
            int numPerPageValue = 50;
            int total;
            int start = (currentPage - 1) * numPerPageValue;
            int limit = numPerPageValue;

            IList<Commodity> commList = iCommodityService.GetCommodityByKeywordAndPrice(page, keyword, dbprice1, dbprice2, start, limit, out total);
            searchProductModel.Commoditys = commList;
            searchProductModel.count = commList.Count;

            searchProductModel.currentPage = currentPage;
            searchProductModel.pageNum = total / numPerPageValue + 1;
            searchProductModel.count = total;

            ViewData["skeyword"] = keyword;
            ViewData["sprice1"] = price1;
            ViewData["sprice2"] = price2;


            return View(searchProductModel);
        }

    }
}
