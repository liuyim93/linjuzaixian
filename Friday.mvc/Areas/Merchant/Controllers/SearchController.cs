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
        public ActionResult Index(string scid, string orderType, string viewType, string keyword, string price1, string price2)// ,string baobei_type,string searchRange)//,string goodsTypeId)
        {         
            SearchModel searchModel = new SearchModel();

            scid = "885009d2-e184-41c3-913e-0b0caa058d41";

            friday.core.Merchant merchant = iMerchantService.Load(scid);

            if (merchant.MerchantType == friday.core.EnumType.MerchantTypeEnum.百货)
            {
                IList<Commodity> myCommodities = this.iCommodityService.GetCommodityByShopIDAndKeywordAndBetweenPrice(scid,keyword,price1,price2,orderType);
                Shop shop = this.iShopService.Load(scid);
                searchModel.SingleShop = shop;
                searchModel.Commoditys = myCommodities;
            }
            else if (merchant.MerchantType == friday.core.EnumType.MerchantTypeEnum.餐馆)
            {
                IList<Food> myFoods = this.iFoodService.GetFoodByRestaurantIDOrderByMonthAmountDesc(scid);
                Restaurant restaurant = this.iRestaurantService.Load(scid);
                searchModel.SingleRestaurant = restaurant;
                searchModel.Foods = myFoods;
            }
            else 
            {
                IList<House> myHouses = this.iHouseService.GetHouseByRentIDOrderByMonthAmountDesc(scid);
                Rent rent = this.iRentService.Load(scid);
                searchModel.SingleRent = rent;
                searchModel.Houses = myHouses;
            }

            return View(searchModel);
        }

    }
}
