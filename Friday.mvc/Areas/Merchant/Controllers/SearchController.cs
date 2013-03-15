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
        public ActionResult Index(string merchantId)//,string goodsTypeId)
        {         
            SearchModel searchModel = new SearchModel();

            merchantId = "885009d2-e184-41c3-913e-0b0caa058d41";
            //goodsTypeId="07c50a63-336a-492b-8a41-88e97bac37ed";

            friday.core.Merchant merchant = iMerchantService.Load(merchantId);
            
            //searchModel.SingleMerchantGoodsType = iMerchantGoodsTypeService.Load(goodsTypeId);

            if (merchant.MerchantType == friday.core.EnumType.MerchantTypeEnum.百货)
            {
                IList<Commodity> myCommodities = this.iCommodityService.GetCommodityByShopIDOrderByMonthAmountDesc(merchantId);
                Shop shop = this.iShopService.Load(merchantId);
                searchModel.SingleShop = shop;
                searchModel.Commoditys = myCommodities;
            }
            else if (merchant.MerchantType == friday.core.EnumType.MerchantTypeEnum.餐馆)
            {
                IList<Food> myFoods = this.iFoodService.GetFoodByRestaurantIDOrderByMonthAmountDesc(merchantId);
                Restaurant restaurant = this.iRestaurantService.Load(merchantId);
                searchModel.SingleRestaurant = restaurant;
                searchModel.Foods = myFoods;
            }
            else 
            {
                IList<House> myHouses = this.iHouseService.GetHouseByRentIDOrderByMonthAmountDesc(merchantId);
                Rent rent = this.iRentService.Load(merchantId);
                searchModel.SingleRent = rent;
                searchModel.Houses = myHouses;
            }

            return View(searchModel);
        }

    }
}
