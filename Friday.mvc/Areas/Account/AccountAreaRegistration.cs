﻿using System.Web.Mvc;

namespace Friday.mvc.Areas.Account
{
    public class AccountAreaRegistration : AreaRegistration
    {
        public override string AreaName
        {
            get
            {
                return "Account";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {
            context.MapRoute(
           name: "check_cart_login",
           url: "{action}.htm",
           defaults: new { area = "Account", controller = "Home", action = "check_cart_login", id = UrlParameter.Optional }
          );
            context.MapRoute(
              name: "member_login",
              url: "member/login.jhtml",
              defaults: new { area = "Account", controller = "Home", action = "login", id = UrlParameter.Optional }
            );
            context.MapRoute(
                "Account_default",
                "Account/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}