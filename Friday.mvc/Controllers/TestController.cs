using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using friday.core.services;

namespace Friday.mvc.Controllers
{
    public class TestController : Controller
    {
        IUserService userService;
        public TestController(IUserService userService)
        {
            this.userService = userService;
        }
        public ActionResult Index()
        {
            return View();
        }

    }
}
