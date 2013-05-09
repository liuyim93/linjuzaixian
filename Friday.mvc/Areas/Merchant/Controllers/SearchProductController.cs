﻿using System;
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
        private IGlobalGoodsTypeService iGlobalGoodsTypeService;
        //private IRestaurantService iRestaurantService;
        //private IRentService iRentService;
        private IShopService iShopService;
        //private IFoodService iFoodService;
        //private IHouseService iHouseService;
        private ICommodityService iCommodityService;

        public SearchProductController(IMerchantService iMerchantService, IGlobalGoodsTypeService iGlobalGoodsTypeService,  IShopService iShopService, ICommodityService iCommodityService)
        {
            this.iMerchantService = iMerchantService;
            this.iGlobalGoodsTypeService = iGlobalGoodsTypeService;
            //this.iRentService = iRentService;
            //this.iRestaurantService = iRestaurantService;
            this.iShopService = iShopService;
            this.iCommodityService = iCommodityService;
            //this.iFoodService = iFoodService;
            //this.iHouseService = iHouseService;
        }
        public ActionResult SearchGoods()
        {
                   

            return View();
        }

        public ActionResult Index(string page,string keyword, string price1, string price2 ,string pagenum)
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
            //page 边界限定
            if (!String.IsNullOrEmpty(page) && !String.IsNullOrEmpty(pagenum))
            {
                if (Convert.ToInt16(page) <= 1)
                {
                    currentPage = 1;
                    page = "1";
                }
                else if (Convert.ToInt16(page) >= Convert.ToInt16(pagenum))  //pageCount即PageNum
                {
                    currentPage = Convert.ToInt16(pagenum);
                    page = pagenum;
                }
              
            }
            else 
            {
                currentPage = 1;
            }

            int numPerPageValue = 50;
            int total;
            int start = (currentPage - 1) * numPerPageValue;
            int limit = numPerPageValue;

            IList<Commodity> commList = iCommodityService.GetCommodityByKeywordAndPrice(page, keyword, dbprice1, dbprice2, start, limit, out total);
            searchProductModel.Commoditys = commList;
            searchProductModel.count = commList.Count;

            //需要根据 commlist  找出其对应的 Merchants            
            foreach (var i in commList)
            {
                bool flag = true;
                foreach (var j in  searchProductModel.Merchants)
                {
                    if (i.Shop.Name == j.Name)
                    {
                        flag = false;
                    }
                }

                if(flag)
                {             
                  searchProductModel.Merchants.Add(i.Shop);
                }
            }

            //商品推荐
            IList<Commodity> recommendCommdties= iCommodityService.GetHotRecommendCommoditiesByKeyWord("");
            searchProductModel.recommendComdties = recommendCommdties;

            //您是不是想找。。。
            IList<GlobalGoodsType> GdsTpList = iGlobalGoodsTypeService.GetSimilarGoodsTypeListInThirdLevelByKeyword(keyword);
            searchProductModel.globalGoodsTypes = GdsTpList;

            searchProductModel.currentPage = currentPage;
            searchProductModel.pageNum = total / numPerPageValue + 1;
            searchProductModel.count = total;

            ViewData["skeyword"] = keyword;
            ViewData["sprice1"] = price1;
            ViewData["sprice2"] = price2;
            ViewData["pagenum"] = total / numPerPageValue + 1;

            return View(searchProductModel);
        }

    }
}
