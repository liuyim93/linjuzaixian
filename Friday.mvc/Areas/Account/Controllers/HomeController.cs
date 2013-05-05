using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Friday.mvc.Models;
using Friday.mvc.Controllers;
using friday.core;
using friday.core.services;
using friday.core.domain;
using friday.core.repositories;

namespace Friday.mvc.Areas.Account.Controllers
{
    public class HomeController : FridayController
    {
        public HomeController(IUserService iUserService, ISystemUserRepository iSystemUserRepository)
            : base(iUserService, iSystemUserRepository)
        {

        }
        public ActionResult check_cart_login(string callback, string guid)
        {
            string script = callback + "({\"guid\":\"" + guid + "\",\"needLogin\":true,\"loginType\":\"member\"})";

            return JavaScript(script);
        }
        public ActionResult user_login_info(string callback, string _ksTS)
        {
            bool loginStatus=false;
            if (isAuthenticated())
                loginStatus = true;
            string script = callback + "({\"login\":" + loginStatus + ",\"nick\":\"\",\"uid\":0})";
            return JavaScript(script);
        }
        public ActionResult query_cookie_info()
        {
            bool loginStatus = false;
            string _nk_ = string.Empty;
            string t = string.Empty;
            if (isAuthenticated())
            {
                loginStatus = true;
                SystemUser systemUser = this.iUserService.GetOrCreateUser(this.HttpContext);
                _nk_  = getGracefulName(systemUser);
                t = systemUser.LoginUser.Id;
            }
            string script = "var userCookie={_nk_:'" +  _nk_ + "',_l_g_:'" + (loginStatus?"1":"") +"',uc1:'',mt:'',l:'',version:'',t:'"+ t +"'};TB && TB.Global && TB.Global.run && TB.Global.run();";
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
        public ActionResult login(LoginModel loginModel,string tpl_redirect_url,string style)
        {
            bool remember=false;
            string userID = string.Empty;
            //if (this.ModelState.IsValid)
            //{
               

            //    return Redirect(tpl_redirect_url);
            //}
            //else
            //{
            //    return View();
            //}


            LoginUser loginUser;
            FridayController.ValidateResult vr = validateUser(loginModel.TPL_username, loginModel.TPL_password, out loginUser);//pwd已经过处理
            string msg = vr.message;
            if (vr.isSucceed)
            {
                
                userID = loginUser.SystemUser.Id;

                populateFormAuthCookie(remember, userID, "");

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
                var is_mini = false;
                if (style == "miniall")
                    is_mini = true;
                ViewData["PageID"] = is_mini ? "page2" : "page";
                ViewData["IsMini"] = is_mini;
                //2013-03-09 basilwang need show error message, shall we use this.ModelState.IsValid?
                return View();

            }
        }
        public ActionResult miniLoginProxy()
        {
            return View();
        }
        public ActionResult token()
        {
            string t = Guid.NewGuid().ToString();
            return View();
        }


    }
}
