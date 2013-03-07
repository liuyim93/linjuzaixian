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
        IActivityRepository iActivityRepository;

        public HomeController(IMerchantCategoryRepository iMerchantCategoryRepository, IActivityRepository iActivityRepository)
        {
            this.iMerchantCategoryRepository = iMerchantCategoryRepository;
            this.iActivityRepository = iActivityRepository;
        }
        public ActionResult Index()
        {
            MainModel mainModel = new MainModel();
            mainModel.MerchantRentCategories = this.iMerchantCategoryRepository.SearchByMerchantType(MerchantTypeEnum.租房);
            mainModel.MerchantRestaurantCategories = this.iMerchantCategoryRepository.SearchByMerchantType(MerchantTypeEnum.餐馆);
            mainModel.MerchantShopCategories = this.iMerchantCategoryRepository.SearchByMerchantType(MerchantTypeEnum.百货);

            mainModel.Activities = this.iActivityRepository.GetAll();
            return View(mainModel);
        }

    }
}
