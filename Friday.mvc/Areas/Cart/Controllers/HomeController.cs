using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

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

    }
}
