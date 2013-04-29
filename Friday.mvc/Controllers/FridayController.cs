using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using friday.core.services;
using System.Web.Security;
using friday.core;
using friday.core.domain;
using friday.core.repositories;
using System.IO;

namespace Friday.mvc.Controllers
{
    public class FridayController : Controller
    {
        protected IUserService iUserService;
        protected ISystemUserRepository iSystemUserRepository;
        public FridayController(IUserService iUserService, ISystemUserRepository iSystemUserRepository)
        {
            this.iUserService = iUserService;
            this.iSystemUserRepository = iSystemUserRepository;

        }
        protected bool isAuthenticated()
        {
            //2013-03-09 basilwang if have logged to backward admin, and then view index.html, the IsAuthenticated is true, but we
            //need to exclude this situation
            System.Security.Principal.IIdentity identity=this.HttpContext.User.Identity;
            SystemUser user;
            try
            {

                user = iSystemUserRepository.Get(identity.Name);
            }
            catch(Exception ex)
            {
                return false;
            }
            return (user!=null)&&identity.IsAuthenticated;
        }
        protected string getUserID()
        {
            if (isAuthenticated())
            {
                HttpCookie authCookie = this.HttpContext.Request.Cookies[".friday"];
                FormsAuthenticationTicket authTicket = FormsAuthentication.Decrypt(authCookie.Value);
                return authTicket.Name;
            }
            else
            {
                HttpCookie cookie = this.HttpContext.Request.Cookies["friday_anonymous"];
                return cookie.Values["userID"];
            }

        }
        protected string getGracefulName(SystemUser systemUser)
        {
            string userName = string.Empty;
            if (string.IsNullOrEmpty(systemUser.Name))
            {
                //2013-01-29 REFACTOR　basilwang
                //userName = systemUser.LoginName;
                userName = systemUser.LoginUser.LoginName;

            }

            else
            {
                userName = systemUser.Name;
            }
            return userName;
        }
        protected void populateFormAuthCookie(bool isPersistent, string userID, string userType)
        {
            DateTime expiredTime;
            if (isPersistent)
            {
                expiredTime = DateTime.Now.AddMonths(10);
            }
            else
            {
                expiredTime = DateTime.Now.AddMinutes(10);
            }
            FormsAuthenticationTicket ticket = new FormsAuthenticationTicket(1,
                               userID,
                               DateTime.Now,
                               expiredTime,
                               isPersistent,
                               userType, 
                               FormsAuthentication.FormsCookiePath);
            // Encrypt the ticket.
            string encTicket = FormsAuthentication.Encrypt(ticket);//加密序列化验证票为字符串
            //生成Cookie
            if (isPersistent)
            {
                HttpCookie cookie = new HttpCookie(FormsAuthentication.FormsCookieName, encTicket)
                {
                    HttpOnly = true,
                    Path = ticket.CookiePath,

                    Expires = expiredTime,
                    Domain = FormsAuthentication.CookieDomain,
                };
                this.HttpContext.Response.Cookies.Add(cookie); //输出Cookie
            }
            else
            {
                //2012-12-30 basilwang FormsAuthentication.RedirectFromLoginPage will call SetAuthCookie,so we put SetAuthCookie here.
                //and we don't use FormsAuthentication.RedirectFromLoginPage anymore
                FormsAuthentication.SetAuthCookie(userID, false);
            }

        }
        protected ValidateResult validateUser(string loginName, string pwd, out LoginUser loginUser)
        {
            ValidateResult vr = new ValidateResult();
            if (!string.IsNullOrEmpty(loginName) && !string.IsNullOrEmpty(pwd))
            {
                
                loginUser = iUserService.getLoginUserByLoginName(loginName);
                if (loginUser == null)
                {
                    loginUser = iUserService.getLoginUserByEmail(loginName);
                    if (loginUser == null)
                    {
                        vr.message = "￣へ￣未找到相关用户";
                        vr.isSucceed = false;
                    }
                    else
                    {
                        if (loginUser.Password.Equals(pwd))
                        {
                            vr.isSucceed = true;
                        }
                        else
                        {
                            vr.message = "￣へ￣验证用户失败";
                            vr.isSucceed = false;
                        }
                    }
                }
                else
                {
                    if (loginUser.Password.Equals(pwd))
                    {
                        vr.isSucceed = true;
                    }
                    else
                    {
                        vr.message = "￣へ￣验证用户失败";
                        vr.isSucceed = false;
                    }
                }
            }
            else
            {
                loginUser = null;
                vr.message = "用户名与密码不能为空";
                vr.isSucceed = false;
            }
            return vr;

        }
        public class ValidateResult
        {
            public bool isSucceed;
            public string message;
        }
        public string RenderRazorViewToString(string viewName, object model)
        {
            ViewData.Model = model;
            using (var sw = new StringWriter())
            {
                var viewResult = ViewEngines.Engines.FindPartialView(ControllerContext, viewName);
                var viewContext = new ViewContext(ControllerContext, viewResult.View, ViewData, TempData, sw);
                viewResult.View.Render(viewContext, sw);
                viewResult.ViewEngine.ReleaseView(ControllerContext, viewResult.View);
                return sw.GetStringBuilder().ToString();
            }
        }
    }
}
