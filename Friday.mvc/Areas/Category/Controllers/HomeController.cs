using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Friday.mvc.Areas.Category.Models;
using Friday.mvc.Controllers;
using friday.core.services;
using friday.core.repositories;

namespace Friday.mvc.Areas.Category.Controllers
{
    public class HomeController : FridayController
    {
        IGlobalGoodsTypeRepository iGlobalGoodsTypeRepository;
        public HomeController(IUserService iUserService, ISystemUserRepository iSystemUserRepository, IGlobalGoodsTypeRepository iGlobalGoodsTypeRepository)
            : base(iUserService, iSystemUserRepository)
        {
            this.iGlobalGoodsTypeRepository = iGlobalGoodsTypeRepository;

        } 
        public ActionResult all_cat_asyn()
        {
            CategoryModel categoryModel = new CategoryModel();
            //mainModel.MerchantRentCategories = this.iMerchantCategoryRepository.SearchByMerchantType(MerchantTypeEnum.租房);
            //mainModel.MerchantRestaurantCategories = this.iMerchantCategoryRepository.SearchByMerchantType(MerchantTypeEnum.餐馆);
            categoryModel.GlobalGoodsTypeTlevelZero = this.iGlobalGoodsTypeRepository.GetGlobalGoodsTypeByTlevel(0);
            categoryModel.GlobalGoodsTypeTlevelFirst = this.iGlobalGoodsTypeRepository.GetGlobalGoodsTypeByTlevel(1);
            categoryModel.GlobalGoodsTypeTlevelSecond = this.iGlobalGoodsTypeRepository.GetGlobalGoodsTypeByTlevel(2);
            
            return View(categoryModel);
        }
        public ActionResult cat_nav_asyn(string callback)
        {
            string content="\"<div class=\\\"sn-mcate-ctn-con\\\" id=\\\"J_MallCateCtnCon\\\"><a class=\\\"sn-mcate-logo-link\\\" id=\\\"J_MallCateLogoLink\\\" href=\\\"http://www.tmall.com/\\\" target=\\\"_self\\\">天猫Tmall.com</a><ul class=\\\"sn-mcate-ctn\\\" id=\\\"J_MallCateCtn\\\"><li><h4 class=\\\"sn-mcate-item-hd\\\"><span>服饰内衣</span></h4><p class=\\\"sn-mcate-item-bd\\\"><a href=\\\"\\\" target=\\\"_blank\\\">女装</a><a href=\\\"\\\" target=\\\"_blank\\\">男装</a><a href=\\\"\\\" target=\\\"_blank\\\">内衣</a><a href=\\\"\\\" target=\\\"_blank\\\">家居服</a><a href=\\\"\\\" target=\\\"_blank\\\">配件</a><a href=\\\"\\\" target=\\\"_blank\\\">羽绒</a><a href=\\\"\\\" target=\\\"_blank\\\">呢大衣</a><a href=\\\"\\\" target=\\\"_blank\\\">毛衣</a></p></li></ul></div>\"";
            string script = "window._mallCateCtnHandler("+content+")";
            return JavaScript(script);
        }

    }
}
