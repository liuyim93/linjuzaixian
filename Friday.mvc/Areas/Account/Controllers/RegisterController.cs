using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Friday.mvc.Areas.Account.Controllers
{
    public class RegisterController : Controller
    {
        //
        // GET: /Account/Register/

        public ActionResult Index(string J_Nick, string J_Tel, string J_Mail, string J_Address, string J_Pwd)
        {
            return View();
        }

    }
}
