using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Security;

namespace friday.core.utils
{
    public class CookieUtil
    {
        public static CookieBag getUserCookie(HttpContextBase HttpContextBase, bool isPublicSite = true)
        {
            HttpContextBase context = HttpContextBase;
            string id = string.Empty;
            bool isTicket = false;
            HttpCookie cookie = null;
            if (context.User.Identity.IsAuthenticated)
            {
                cookie = context.Request.Cookies[".friday"];
                FormsAuthenticationTicket authTicket = FormsAuthentication.Decrypt(cookie.Value);
                id=authTicket.Name;
                isTicket = true;
            }
            else if (isPublicSite)
            {
                //20130512 wanghaichuan
                //cookie = context.Request.Cookies["friday_anonymous"];
                //id = cookie.Values["userID"];
                //isTicket = false;
                cookie = context.Request.Cookies["friday_anonymous"];
                if (cookie != null)
                {
                    id = cookie.Values["userID"];
                }
                else
                {
                    id = null;
                }
                isTicket = false;
            }
            return new CookieBag(id, cookie, isTicket, context);

        }
    }
    public class CookieBag
    {
        public string id
        {
            get;
            private set;
        }
        private bool isTicket;
        private HttpCookie cookie;
        private HttpContextBase httpContextBase;
        public CookieBag(string id, HttpCookie cookie, bool isTicket, HttpContextBase context)
        {
            this.id = id;
            this.cookie = cookie;
            this.isTicket = isTicket;
            this.httpContextBase = context;
        }
        public void remove()
        {
            if (isTicket)
            {
                FormsAuthentication.SignOut();
            }
            else
            {
                //2013-04-08 basilwang judge if cookie is null 
                if (cookie != null)
                {
                    cookie.Values["userID"] = null;
                    httpContextBase.Response.Cookies.Add(cookie);
                }
            }
        }
    }
}
