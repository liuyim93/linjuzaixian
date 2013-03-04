﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Friday.mvc.Models;

namespace Friday.mvc.Areas.Account.Controllers
{
    public class HomeController : Controller
    {
        //
        // GET: /Account/Home/

        public ActionResult check_cart_login(string callback, string guid)
        {
            string script = callback + "({\"guid\":\"" + guid + "\",\"needLogin\":true,\"loginType\":\"member\"})";

            return JavaScript(script);
        }
        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult login(string from, string style, string redirectURL, bool? full_redirect)
        {
            var is_mini = false;
            if (style == "mini")
                is_mini = true;
            ViewData["PageID"] = is_mini ? "page2" : "page";
            ViewData["IsMini"] = is_mini;
            return View();
        }
        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult login(LoginModel loginModel)
        {
            if (this.ModelState.IsValid)
            {
                //2013-03-04 basilwang TODO we need validate loginModel
                return RedirectToAction("MyCart",new {controller= "Home", area="Cart"});
            }
            else
            {
                return View();
            }
        }

    }
}