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
using System.Web.Security;

namespace Friday.mvc.Areas.Account.Controllers
{
    public class HomeController : FridayController
    {
        private ICartOfCommodityService iCartOfCommodityService;
        private IShoppingCartService iShoppingCartService;
        public HomeController(IUserService iUserService, ISystemUserRepository iSystemUserRepository, ICartOfCommodityService iCartOfCommodityService, IShoppingCartService iShoppingCartService)
            : base(iUserService, iSystemUserRepository)
        {
            this.iCartOfCommodityService = iCartOfCommodityService;
            this.iShoppingCartService = iShoppingCartService;
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
        public ActionResult login(LoginModel loginModel, string tpl_redirect_url, string style, string redirect_url)
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

                if (redirect_url != "" && redirect_url != null)
                {
                    if (redirect_url.Contains("http://120.192.31.164:7525/index.html"))
                    {
                        redirect_url = "http://120.192.31.164:7525/index.html";
                    }
                    return Redirect(redirect_url);
                }
                else
                {
                    if (tpl_redirect_url.Contains("http://120.192.31.164:7525/index.html"))
                    {
                        tpl_redirect_url = "http://120.192.31.164:7525/index.html";
                    }
                    return Redirect(tpl_redirect_url);
                }
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
       
        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult register()
        {
      
            return View();
        }
        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult register(LoginModel loginModel, string tpl_redirect_url, string style)
        {
            return View();
        }
        public ActionResult buy_do()
        {
            SystemUser systemUser = iUserService.GetOrCreateUser(this.HttpContext);
            string script;
            if (systemUser == null)
            {
                script = "login_indicator={\"hasLoggedIn\":false,\"token\":[],\"success\":true,\"fastBuy\":false}";
            }
            else
            {
                script = "login_indicator={\"hasLoggedIn\":true,\"token\":[],\"success\":true,\"fastBuy\":false}";
            }
            return JavaScript(script);
        }

        public ActionResult loginOut(string redirectURL)
        {
            redirectURL = HttpUtility.UrlDecode(redirectURL);
            SystemUser systemUser = iUserService.GetOrCreateUser(this.HttpContext);

            if (systemUser == null)
            {
                if (redirectURL.Contains("http://120.192.31.164:7525/index.html"))
                {
                    redirectURL = "http://120.192.31.164:7525/index.html";
                }
                return Redirect(redirectURL);
            }
            else
            {
                FormsAuthentication.SignOut();
                if (redirectURL.Contains("http://120.192.31.164:7525/index.html"))
                {
                    redirectURL = "http://120.192.31.164:7525/index.html";
                }
                return Redirect(redirectURL);
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
        public ActionResult XCrossIframe()
        {
            return View();
        }

        public ActionResult counter(string keys, string callback)
        {
            SystemUser systemUser = iUserService.GetOrCreateUser(this.HttpContext);
            int num = 0;
            if (systemUser != null)
            {
                List<ShoppingCart> shoppingCarts = iShoppingCartService.getShoppingCartBySystemUser(systemUser.Id);
                if (shoppingCarts != null)
                {
                    List<friday.core.CartOfCommodity> cartOfCommoditys = new List<friday.core.CartOfCommodity>();
                    foreach (ShoppingCart shoppingCart in shoppingCarts)
                    {
                        cartOfCommoditys.AddRange(iCartOfCommodityService.getCommoditiesByShoppingCart(shoppingCart.Id));
                    }
                    num = cartOfCommoditys.Count;                    
                }
            }
            //string script = callback + "({\"globalData\":{\"totalSize\":" + num + "}})";
            string script = callback + "({\"" + keys + "\":" + num + "});";
            return JavaScript(script);
        }
        public ActionResult query_member_top(string callback)
        {
            SystemUser systemUser = iUserService.GetOrCreateUser(this.HttpContext);

            if (systemUser == null)
            {
                return JavaScript("_initMemberInfoCallback({\"activeStatus\":1,\"availablePoints\":49,\"cookies\":{\"unb\":{\"value\":\"123072695\"},\"t\":{\"value\":\"b51c4d9982326f833d5f06da00ecf6fd\"},\"uc1\":{\"value\":\"lltime=1368367577&cookie14=UoLa9HWrdaKEMQ%3D%3D&existShop=true&cookie16=Vq8l%2BKCLySLZMFWHxqs8fwqnEw%3D%3D&cookie21=URm48syIYn73&tag=1&cookie15=URm48syIIVrSKA%3D%3D\"}},\"expiredPoints\":0,\"lastMessage\":\"\",\"lastMessageId\":0,\"lastMessageType\":1,\"lastMessageUrl\":\"http://vip.tmall.com/vip/message_box.htm?from=messagebox&msg_id=0\",\"login\":false,\"mallSeller\":false,\"messagePopup\":true,\"newMessage\":0,\"newMsgList\":null,\"taskId\":\"\"});");
            }
            else
            {
                return JavaScript("_initMemberInfoCallback({\"activeStatus\":1,\"availablePoints\":49,\"cookies\":{\"unb\":{\"value\":\"123072695\"},\"t\":{\"value\":\"b51c4d9982326f833d5f06da00ecf6fd\"},\"uc1\":{\"value\":\"lltime=1368367577&cookie14=UoLa9HWrdaKEMQ%3D%3D&existShop=true&cookie16=Vq8l%2BKCLySLZMFWHxqs8fwqnEw%3D%3D&cookie21=URm48syIYn73&tag=1&cookie15=URm48syIIVrSKA%3D%3D\"}},\"expiredPoints\":0,\"lastMessage\":\"\",\"lastMessageId\":0,\"lastMessageType\":1,\"lastMessageUrl\":\"http://vip.tmall.com/vip/message_box.htm?from=messagebox&msg_id=0\",\"login\":true,\"mallSeller\":false,\"messagePopup\":true,\"newMessage\":0,\"newMsgList\":null,\"taskId\":\"\"});");

            }
        } 
    }
}
