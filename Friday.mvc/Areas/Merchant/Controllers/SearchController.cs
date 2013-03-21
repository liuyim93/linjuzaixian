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
    public class SearchController : Controller
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

        public SearchController(IMerchantService iMerchantService, IMerchantGoodsTypeService iMerchantGoodsTypeService, IRestaurantService iRestaurantService, IRentService iRentService, IShopService iShopService, ICommodityService iCommodityService, IHouseService iHouseService, IFoodService iFoodService)
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
        public ActionResult SearchGoods(string page ,string scid,string goodTypeId)// ,string baobei_type,string searchRange)//,string goodsTypeId)
        {

            SearchModel searchModel = new SearchModel();

            scid = "885009d2-e184-41c3-913e-0b0caa058d41";
        
            friday.core.Merchant merchant = iMerchantService.Load(scid);
            searchModel.SingleMerchant = merchant;
            if (!string.IsNullOrEmpty(goodTypeId))
            {
                searchModel.SingleMerchantGoodsType = iMerchantGoodsTypeService.Load(goodTypeId);
            }
            else 
            {
                goodTypeId = "0";
            }
            searchModel.merchantGoodsTypes = merchant.MerchantGoodsTypes.ToList();
            int currentPage = (page == "" || page == null) ? 1 : Convert.ToInt16(page);
            int numPerPageValue = 20;
            int total;
            int start = (currentPage - 1) * numPerPageValue;
            int limit = numPerPageValue;

            //if (merchant.MerchantType == friday.core.EnumType.MerchantTypeEnum.百货)
            //{
                IList<Commodity> myCommodities = this.iCommodityService.GetCommodityByShopIDAndMerchantGoodsTypeIDOrderByMonthAmountDesc(scid, goodTypeId, start, limit, out total);
                Shop shop = this.iShopService.Load(scid);
                searchModel.SingleShop = shop;
                searchModel.Commoditys = myCommodities;
            //}
            //else if (merchant.MerchantType == friday.core.EnumType.MerchantTypeEnum.餐馆)
            //{
            //    IList<Food> myFoods = this.iFoodService.GetFoodByRestaurantIDOrderByMonthAmountDesc(scid);
            //    Restaurant restaurant = this.iRestaurantService.Load(scid);
            //    searchModel.SingleRestaurant = restaurant;
            //    searchModel.Foods = myFoods;
            //}
            //else
            //{
            //    IList<House> myHouses = this.iHouseService.GetHouseByRentIDOrderByMonthAmountDesc(scid);
            //    Rent rent = this.iRentService.Load(scid);
            //    searchModel.SingleRent = rent;
            //    searchModel.Houses = myHouses;
            //}
            searchModel.currentPage = currentPage;
            searchModel.pageNum = total / numPerPageValue + 1;
            searchModel.count = total;
            ViewData["sscid"] = scid;
            ViewData["sgoodTypeId"] = goodTypeId;

            return View("Index",searchModel);
        }

        public ActionResult Index(string page, string scid, string orderType, string viewType, string keyword, string price1, string price2, string goodTypeId)// ,string baobei_type,string searchRange)//,string goodsTypeId)
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
                keyword =""; 
            }
            SearchModel searchModel = new SearchModel();

            scid = "885009d2-e184-41c3-913e-0b0caa058d41";
            friday.core.Merchant merchant = iMerchantService.Load(scid);
            searchModel.SingleMerchant =merchant;
            if (!string.IsNullOrEmpty(goodTypeId))
            {
                searchModel.SingleMerchantGoodsType = iMerchantGoodsTypeService.Load(goodTypeId);
            }
            else 
            {
                goodTypeId = "0";
            }
            searchModel.merchantGoodsTypes = merchant.MerchantGoodsTypes.ToList();
            int currentPage = (page == "" || page == null) ? 1 : Convert.ToInt16(page);
            int numPerPageValue = 20;
            int total;
            int start = (currentPage - 1) * numPerPageValue;
            int limit = numPerPageValue;

         
            if (merchant.MerchantType == friday.core.EnumType.MerchantTypeEnum.百货)
            {
                IList<Commodity> myCommodities = this.iCommodityService.GetCommodityByShopIDAndKeywordAndBetweenPriceOrderBy(scid, keyword, dbprice1, dbprice2, goodTypeId, orderType, start, limit, out total);
                Shop shop = this.iShopService.Load(scid);
                searchModel.SingleShop = shop;
                searchModel.Commoditys = myCommodities;         
            }
            else if (merchant.MerchantType == friday.core.EnumType.MerchantTypeEnum.餐馆)
            {
                IList<Food> myFoods = this.iFoodService.GetFoodByRestaurantIDAndKeywordAndBetweenPriceOrderBy(scid, keyword, dbprice1, dbprice2, orderType, start, limit, out total);
                Restaurant restaurant = this.iRestaurantService.Load(scid);
                searchModel.SingleRestaurant = restaurant;
                searchModel.Foods = myFoods;
            }
            else
            {
                IList<House> myHouses = this.iHouseService.GetHouseByRentIDAndKeywordAndBetweenPriceOrderBy(scid, keyword, dbprice1, dbprice2, orderType, start, limit, out total);
                Rent rent = this.iRentService.Load(scid);
                searchModel.SingleRent = rent;
                searchModel.Houses = myHouses;
            }
            searchModel.currentPage = currentPage;
            searchModel.pageNum = total / numPerPageValue + 1;
            searchModel.count = total;
            ViewData["skeyword"] = keyword;
            ViewData["sprice1"] = price1;
            ViewData["sprice2"] = price2;
            ViewData["sviewType"] = viewType;
            ViewData["sorderType"] = orderType;
            ViewData["sscid"] = scid;
            ViewData["sgoodTypeId"] = goodTypeId;

            return View(searchModel);
        }

    }
}
