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
        public static CookieBag getUserCookie()
        {
            HttpContext context = HttpContext.Current;
            string id;
            bool isTicket;
            HttpCookie cookie;
            if (HttpContext.Current.User.Identity.IsAuthenticated)
            {
                cookie = context.Request.Cookies[".friday"];
                FormsAuthenticationTicket authTicket = FormsAuthentication.Decrypt(cookie.Value);
                id=authTicket.Name;
                isTicket = true;
            }
            else
            {
                cookie = context.Request.Cookies["friday_anonymous"];
                id=cookie.Values["userID"];
                isTicket = false;
            }
            return new CookieBag(id,cookie,isTicket);

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
        public CookieBag(string id, HttpCookie cookie, bool isTicket)
        {
            this.id = id;
            this.cookie = cookie;
            this.isTicket = isTicket;
        }
        public void remove()
        {
            HttpContext context = HttpContext.Current;
            if (isTicket)
            {
                FormsAuthentication.SignOut();
            }
            else
            {
                cookie.Values["userID"] =null;
                context.Response.Cookies.Add(cookie); 
            }
        }
    }
}
