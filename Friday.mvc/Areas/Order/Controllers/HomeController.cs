using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Friday.mvc.Areas.Order.Controllers
{
    public class HomeController : Controller
    {
        //
        // GET: /Order/Home/

        public ActionResult ConfirmOrder()
        {
            return View();
        }

    }
}
