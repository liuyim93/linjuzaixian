using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Friday.mvc.Areas.Merchant.Controllers
{
    public class FavoriteController : Controller
    {
        //
        // GET: /Merchant/Favorite/

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
    }
}
