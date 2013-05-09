using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using friday.core.repositories;
using Friday.mvc.Models;
using friday.core.EnumType;

namespace Friday.mvc.Controllers
{
    public class HomeController : Controller
    {
        IMerchantCategoryRepository iMerchantCategoryRepository;
        IGlobalGoodsTypeRepository iGlobalGoodsTypeRepository;
        IActivityRepository iActivityRepository;
        //IRestaurantRepository iRestaurantRepository;
        IShopRepository iShopRepository;
        //IRentRepository iRentRepository;
        //IFoodRepository iFoodRepository;
        //IHouseRepository iHouseRepository;
        ICommodityRepository iCommodityRepository;

        public HomeController(IMerchantCategoryRepository iMerchantCategoryRepository, IGlobalGoodsTypeRepository iGlobalGoodsTypeRepository, IActivityRepository iActivityRepository, IShopRepository iShopRepository, ICommodityRepository iCommodityRepository)
        {
            this.iMerchantCategoryRepository = iMerchantCategoryRepository;
            this.iGlobalGoodsTypeRepository = iGlobalGoodsTypeRepository;
            this.iActivityRepository = iActivityRepository;
            //this.iRestaurantRepository = iRestaurantRepository;
            this.iShopRepository = iShopRepository;
            //this.iRentRepository = iRentRepository;
            //this.iFoodRepository = iFoodRepository;
            //this.iHouseRepository = iHouseRepository;
            this.iCommodityRepository = iCommodityRepository;
        }
        public ActionResult Index()
        {
            MainModel mainModel = new MainModel();
            //mainModel.MerchantRentCategories = this.iMerchantCategoryRepository.SearchByMerchantType(MerchantTypeEnum.租房);
            //mainModel.MerchantRestaurantCategories = this.iMerchantCategoryRepository.SearchByMerchantType(MerchantTypeEnum.餐馆);
            mainModel.MerchantShopCategories = this.iMerchantCategoryRepository.SearchByMerchantType(MerchantTypeEnum.百货);
            mainModel.GlobalGoodsTypeTlevelZero = this.iGlobalGoodsTypeRepository.GetGlobalGoodsTypeByTlevel(0);
            mainModel.GlobalGoodsTypeTlevelFirst = this.iGlobalGoodsTypeRepository.GetGlobalGoodsTypeByTlevel(1);
            for (int i = 0; i < mainModel.GlobalGoodsTypeTlevelZero.Count; i++)
            {
                var goodsType=mainModel.GlobalGoodsTypeTlevelZero.ElementAt(i);
                mainModel.CommoditiesSearchByGoodsType.Add(this.iCommodityRepository.GetCommodityByGoodsType(goodsType.Id));
            }
            long total;
            mainModel.Shops = this.iShopRepository.GetPageList(0, 15,out total);
            //mainModel.Rents = this.iRentRepository.GetPageList(0, 15, out total);
            //mainModel.Restaurants = this.iRestaurantRepository.GetPageList(0, 15, out total);
            mainModel.Activities = this.iActivityRepository.GetAll();
            //mainModel.Foods = this.iFoodRepository.GetAll();
            //mainModel.Houses = this.iHouseRepository.GetAll();
            mainModel.Commoditys = this.iCommodityRepository.GetAll();
            return View(mainModel);
        }

    }
}
