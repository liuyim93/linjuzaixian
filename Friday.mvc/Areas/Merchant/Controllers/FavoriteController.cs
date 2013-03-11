using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using friday.core.services;
using friday.core.domain;

namespace Friday.mvc.Areas.Merchant.Controllers
{
    public class FavoriteController : Controller
    {  
        private IMerchantService iMerchantService;
        private IUserService iUserService;
        private IMyFavoriteService iMyFavoriteService;

        public FavoriteController(IMerchantService iMerchantService, IUserService iUserService, IMyFavoriteService iMyFavoriteService)
        {
            this.iMerchantService = iMerchantService;
            this.iUserService = iUserService;
            this.iMyFavoriteService = iMyFavoriteService;
        }
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult AddToFav(string brandId,string _tb_token_,string callback)
        {
            MyFavorite myFavorite = new MyFavorite();
            SystemUser systemUser = iUserService.GetOrCreateUser(this.HttpContext);
            friday.core.Merchant merchant = iMerchantService.Load(brandId);
            myFavorite.SystemUser = systemUser;
            myFavorite.Merchant = merchant;
            iMyFavoriteService.Save(myFavorite);

            string isSucceed = "T";
            string script = callback + "({\"is_success\":\"" + isSucceed + "\"})";

            return JavaScript(script);
        }
        public ActionResult Recommend(string callback)
        {
            string json = this.iMerchantService.GetMerchantsJson();
            string script = callback + "("+ json  +")";

            return JavaScript(script);
        }
    }
}
