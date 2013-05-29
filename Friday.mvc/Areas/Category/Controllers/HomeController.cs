using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Friday.mvc.Areas.Category.Models;
using Friday.mvc.Controllers;
using friday.core.services;
using friday.core.repositories;
using friday.core.domain;
using friday.core.EnumType;

namespace Friday.mvc.Areas.Category.Controllers
{
    public class HomeController : FridayController
    {
        IGlobalGoodsTypeRepository iGlobalGoodsTypeRepository;
        IShopRepository iShopRepository;
        ISchoolService iSchoolService;

        public HomeController(IShopRepository iShopRepository, IUserService iUserService, ISystemUserRepository iSystemUserRepository, IGlobalGoodsTypeRepository iGlobalGoodsTypeRepository, ISchoolService iSchoolService)
            : base(iUserService, iSystemUserRepository)
        {
            this.iGlobalGoodsTypeRepository = iGlobalGoodsTypeRepository;
            this.iShopRepository = iShopRepository;
            this.iSchoolService = iSchoolService;

        } 
        public ActionResult all_cat_asyn()
        {
            CategoryModel categoryModel = new CategoryModel();
            //mainModel.MerchantRentCategories = this.iMerchantCategoryRepository.SearchByMerchantType(MerchantTypeEnum.租房);
            //mainModel.MerchantRestaurantCategories = this.iMerchantCategoryRepository.SearchByMerchantType(MerchantTypeEnum.餐馆);
            categoryModel.GlobalGoodsTypeTlevelZero = this.iGlobalGoodsTypeRepository.GetGlobalGoodsTypeByTlevel(0);
            categoryModel.GlobalGoodsTypeTlevelFirst = this.iGlobalGoodsTypeRepository.GetGlobalGoodsTypeByTlevel(1);
            categoryModel.GlobalGoodsTypeTlevelSecond = this.iGlobalGoodsTypeRepository.GetGlobalGoodsTypeByTlevel(2);

            //单独取出国际名牌
            string  NationalLevelId=this.iGlobalGoodsTypeRepository.GetGlobalGoodsTypeByName("国际品牌").Id;
            IList<GlobalGoodsType> NationalGlobalGoodsTypes=this.iGlobalGoodsTypeRepository.GetChildrenByFamily(NationalLevelId);
            IList<Shop> NationalShops=new List<Shop>();
            for(int i=0;i<NationalGlobalGoodsTypes.Count;i++)
            {
                NationalShops.Add(this.iShopRepository.Get(NationalGlobalGoodsTypes[i].Description));
            }
            categoryModel.NationalShops = NationalShops;
            
            
            return View(categoryModel);
        }
        public ActionResult brand_cat_asyn(string selectIP)
        {
            CategoryModel categoryModel = new CategoryModel();
            SystemUser systemUser = iUserService.GetOrCreateUser(this.HttpContext);

            if (selectIP != null && selectIP != "" && selectIP != "null")
            {
                IList<Shop> shopModesList = iShopRepository.GetShopsByMerchantType(MerchantTypeEnum.百货, selectIP);
                categoryModel.shopModes = shopModesList;

                IList<Shop> foodOrderModesList = iShopRepository.GetShopsByMerchantType(MerchantTypeEnum.餐馆, selectIP);
                categoryModel.orderFoodModes = foodOrderModesList;
            }
            else
            {
                if (systemUser != null)
                {
                    IList<Shop> shopModesList = iShopRepository.GetShopsByMerchantType(MerchantTypeEnum.百货, systemUser.School.Id);
                    categoryModel.shopModes = shopModesList;

                    IList<Shop> foodOrderModesList = iShopRepository.GetShopsByMerchantType(MerchantTypeEnum.餐馆, systemUser.School.Id);
                    categoryModel.orderFoodModes = foodOrderModesList;
                }
                else
                {
                    string[] areaString = friday.core.components.IPAndLocationHelper.GetAddress();
                    School ipLeafSchool = iSchoolService.FilterSchoolByAreaString(areaString[1]).FirstOrDefault();
                    if (ipLeafSchool != null)
                    {
                        IList<Shop> shopModesList = iShopRepository.GetShopsByMerchantType(MerchantTypeEnum.百货, ipLeafSchool.Id);
                        categoryModel.shopModes = shopModesList;

                        IList<Shop> foodOrderModesList = iShopRepository.GetShopsByMerchantType(MerchantTypeEnum.餐馆, ipLeafSchool.Id);
                        categoryModel.orderFoodModes = foodOrderModesList;
                    }
                    else
                    {
                        IList<Shop> shopModesList = iShopRepository.GetShopsByMerchantType(MerchantTypeEnum.百货);
                        categoryModel.shopModes = shopModesList;

                        IList<Shop> foodOrderModesList = iShopRepository.GetShopsByMerchantType(MerchantTypeEnum.餐馆);
                        categoryModel.orderFoodModes = foodOrderModesList;
                    }
                }
            }
            return View(categoryModel);
        }
        public ActionResult cat_nav_asyn(string callback)
        {
            string content="\"<div class=\\\"sn-mcate-ctn-con\\\" id=\\\"J_MallCateCtnCon\\\"><a class=\\\"sn-mcate-logo-link\\\" id=\\\"J_MallCateLogoLink\\\" href=\\\"http://www.tmall.com/\\\" target=\\\"_self\\\">邻居Tmall.com</a><ul class=\\\"sn-mcate-ctn\\\" id=\\\"J_MallCateCtn\\\"><li><h4 class=\\\"sn-mcate-item-hd\\\"><span>服饰内衣</span></h4><p class=\\\"sn-mcate-item-bd\\\"><a href=\\\"\\\" target=\\\"_blank\\\">女装</a><a href=\\\"\\\" target=\\\"_blank\\\">男装</a><a href=\\\"\\\" target=\\\"_blank\\\">内衣</a><a href=\\\"\\\" target=\\\"_blank\\\">家居服</a><a href=\\\"\\\" target=\\\"_blank\\\">配件</a><a href=\\\"\\\" target=\\\"_blank\\\">羽绒</a><a href=\\\"\\\" target=\\\"_blank\\\">呢大衣</a><a href=\\\"\\\" target=\\\"_blank\\\">毛衣</a></p></li></ul></div>\"";
            string script = "window._mallCateCtnHandler("+content+")";
            return JavaScript(script);
        }

    }
}
