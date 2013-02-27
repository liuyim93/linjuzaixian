using System;
using System.Collections;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Xml.Linq;
using System.Collections.Generic;
using friday.core.repositories;
using friday.core;


namespace friday.mvc
{
    public partial class login : System.Web.UI.Page
    {
        protected string message;
        private string userid;
        private ILoginUserRepository iLoginUserRepository = UnityHelper.UnityToT<ILoginUserRepository>();
        protected void Page_Load(object sender, EventArgs e)
        {
            if (Request.Params["flag"] == "login")
            {
                string adminLoginName = Request.Form["account"];

                string psw = Request.Form["password"];

                string code = Request.Form["userauthcode"];

                string cookieCode = getCookieCode().Trim().ToLower();

                if (!string.IsNullOrEmpty(code))
                {
                    code = code.ToLower().Trim();
                }
                ValidateResult vr = validateLogin(adminLoginName, psw, code, cookieCode);
                if (vr.isSucceed)
                {
                    //2013-02-27 basilwang we need add checkbox for isPersistent
                    populateFormAuthCookie(true, userid, "");
                    Response.Redirect("index.aspx");
                }
                else
                {
                    Response.Write("<Script>alert('"+vr.message+"')</Script>");
                }
            }
        }
        private string getCookieCode()
        {
            HttpCookie cookie = Request.Cookies["weat_anonymous"];
            string code = cookie.Values["cookieCode"];
            if (string.IsNullOrEmpty(code))
            {
                return "1111";
            }
            return code;
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
                               userType, //CompanyID
                               FormsAuthentication.FormsCookiePath);
            // Encrypt the ticket.
            string encTicket = FormsAuthentication.Encrypt(ticket);//加密序列化验证票为字符串
            //生成Cookie
            if (isPersistent)
            {
                //2011-04-24  统一bpm和dwz验证，重新处理了跳票超时问题的bug
                HttpCookie cookie = new HttpCookie(FormsAuthentication.FormsCookieName, encTicket)
                {
                    HttpOnly = true,
                    Path = ticket.CookiePath,

                    Expires = expiredTime,
                    Domain = FormsAuthentication.CookieDomain,
                };
                //2012-12-31 basilwang can't user HttpContextBase for cookie , weird!! solved now
                Response.Cookies.Add(cookie); //输出Cookie
            }
            else
            {
                //2012-12-30 basilwang FormsAuthentication.RedirectFromLoginPage will call SetAuthCookie,so we put SetAuthCookie here.
                //and we don't use FormsAuthentication.RedirectFromLoginPage anymore
                FormsAuthentication.SetAuthCookie(userID, false);
            }
 
        }
        public class ValidateResult
        {
            public bool isSucceed;
            public string message;
        }
        private ValidateResult validateLogin(string account, string psw, string code, string cookiecode)
        {

            ValidateResult vr = new ValidateResult();
            if (!string.IsNullOrEmpty(account) && !string.IsNullOrEmpty(psw))
            {
                //2013-02-28 basilwang temporialiy block verify code
                //if (!code.Equals(cookiecode))
                //{
                //    message = "验证码错误";
                //    return false;
                //}
                //else
                var loginUser = iLoginUserRepository.GetLoginUserByLoginName(account);
                userid = loginUser.Id;
                {
                    if (psw==loginUser.Password)
                    {
                        vr.isSucceed = true;
                    }
                    else
                    {
                        vr.message = "验证失败";
                        vr.isSucceed = false;
                    }
                }
            }
            else
            {
                vr.message = "用户名与密码不能为空";
                vr.isSucceed = false;
            }
            return vr;
        }
    }
}
