using System;
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
        public ActionResult user_login_info(string callback, string _ksTS)
        {
            string script = callback + "({\"login\":false,\"nick\":\"\",\"uid\":0})";
            return JavaScript(script);
        }
        public ActionResult query_cookie_info()
        {
            string script = "var userCookie={_nk_:'',uc1:'',mt:'',l:'',version:''};TB && TB.Global && TB.Global.run && TB.Global.run();";
            return JavaScript(script);
        }
        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult login(string from, string style, string redirectURL, bool? full_redirect)
        {
            var is_mini = false;
            if (style == "miniall")
                is_mini = true;
            ViewData["PageID"] = is_mini ? "page2" : "page";
            ViewData["IsMini"] = is_mini;
            return View();
        }
        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult login(LoginModel loginModel,string tpl_redirect_url)
        {
            if (this.ModelState.IsValid)
            {
                //2013-03-04 basilwang TODO we need validate loginModel
                //validate username and password
                if (false /*is full login*/)
                {
                    return RedirectToAction("MyCart", new { controller = "Home", area = "Cart" });
                }

                return Redirect(tpl_redirect_url);
            }
            else
            {
                return View();
            }
        }
        public ActionResult miniLoginProxy()
        {
            return View();
        }


    }
}
