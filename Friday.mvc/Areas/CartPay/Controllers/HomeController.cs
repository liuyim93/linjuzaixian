using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Friday.mvc.Areas.CartPay.Controllers
{
    public class HomeController : Controller
    {
        //
        // GET: /CartPay/Home/

        public ActionResult MyCartPay()
        {
            return View();
        }

    }
}
