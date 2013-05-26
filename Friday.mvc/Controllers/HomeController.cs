using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using friday.core.repositories;
using Friday.mvc.Models;
using friday.core.EnumType;
using friday.core.domain;
using friday.core.services;

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
        IUserService iUserService;
        ISchoolService iSchoolService;

        public HomeController(IMerchantCategoryRepository iMerchantCategoryRepository, IGlobalGoodsTypeRepository iGlobalGoodsTypeRepository, IActivityRepository iActivityRepository, IShopRepository iShopRepository, ICommodityRepository iCommodityRepository, IUserService iUserService, ISchoolService iSchoolService)
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
            this.iUserService = iUserService;
            this.iSchoolService = iSchoolService;
        }
        public ActionResult Index()
        {
            MainModel mainModel = new MainModel();
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
            mainModel.Activities = this.iActivityRepository.GetAll();
            mainModel.Commoditys = this.iCommodityRepository.GetAll();

            SystemUser systemUser = iUserService.GetOrCreateUser(this.HttpContext);
            if (systemUser != null)
            {
                mainModel.LoginStateFamily[0] = "isLogin";
                mainModel.LoginStateFamily[1] = systemUser.School.Family + systemUser.School.Id;
            }
            else
            {
                string[] areaString = friday.core.components.IPAndLocationHelper.GetAddress();
                School ipLeafSchool = iSchoolService.FilterSchoolByAreaString(areaString[1]).FirstOrDefault();
                if (ipLeafSchool != null)
                {
                    mainModel.LoginStateFamily[0] = "isIP";
                    mainModel.LoginStateFamily[1] = ipLeafSchool.Family + ipLeafSchool.Id;
                }
                else
                {
                    mainModel.LoginStateFamily[0] = "noAll";
                }
            }

            return View(mainModel);
        }

    }
}
