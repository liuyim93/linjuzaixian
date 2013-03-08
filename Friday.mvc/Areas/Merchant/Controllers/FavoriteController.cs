using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using friday.core.services;

namespace Friday.mvc.Areas.Merchant.Controllers
{
    public class FavoriteController : Controller
    {  
        private IMerchantService iMerchantService;
        public FavoriteController(IMerchantService iMerchantService)
        {
            this.iMerchantService = iMerchantService;
        }
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult AddToFav(string brandId,string _tb_token_,string callback)
        {
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
