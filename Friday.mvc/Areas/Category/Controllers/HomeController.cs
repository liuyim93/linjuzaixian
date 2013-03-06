using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Friday.mvc.Areas.Category.Controllers
{
    public class HomeController : Controller
    {
        //
        // GET: /Category/Home/

        public ActionResult all_cat_asyn()
        {
            return View();
        }

    }
}
