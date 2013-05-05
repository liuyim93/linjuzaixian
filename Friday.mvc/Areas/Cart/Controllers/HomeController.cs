using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using friday.core.components;

namespace Friday.mvc.Areas.Cart.Controllers
{
    public class HomeController : Controller
    {
        //
        // GET: /Cart/Home/

        public ActionResult MyCart()
        {
            return View();
        }
        public ActionResult addCartItems(string callback)
        {
            int quantity = 1;
            string token = Guid.NewGuid().ToString();
            string cartNum = Guid.NewGuid().ToString();
            var results = new 
            {
                success=true,
                cartNum=cartNum,
                sss=new {
                  token=token,
                  quantity=quantity
                }
            };
            FormatJsonResult jsonResult = new FormatJsonResult();
            jsonResult.Data = results;
            string json = jsonResult.FormatResult();
            string script = callback+"(" + json + ")";

            return JavaScript(script);
        }

    }
}
