﻿using System;
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
using friday.core.components;
using friday.core.services;
using friday.core;

namespace friday.mvc
{
    public partial class index : System.Web.UI.Page
    {
        public string UserName = string.Empty;
        //private static ISystemMenuRepository menuRepo = new SystemMenuRepository();
        //private static IMenuService menuService = new MenuService(menuRepo);
        private IUserService iUserService = UnityHelper.UnityToT<IUserService>();
        private IMenuService iMenuService = UnityHelper.UnityToT<IMenuService>();
        protected void Page_Load(object sender, EventArgs e)
        {
            if (Request.QueryString["flag"] != "logout")
            {
                InitMenu();
            }
            else
            {
                Logout();
            }
        }

        private void Logout()
        {
            FormsAuthentication.SignOut();
            var cache = new WebCache();
            cache.RemoveSessionCache("currentuser");//清空当前用户信息缓存
            Response.Redirect("login.aspx");
        }
        protected void InitMenu()
        {
            var currentuser = iUserService.GetLoginUser(new HttpContextWrapper(HttpContext.Current));
            if (currentuser != null)
            {
                UserName = currentuser.LoginName;
            }
            else
            {
                Response.Redirect("login.aspx");
            }

            divMenu.InnerHtml = iMenuService.MenuList(currentuser.Id);
            labLogin.InnerText = UserName + "用户，欢迎您！";
            labLoginDate.InnerText = "登录时间：" + DateTime.Now.ToString();

        }
    }
}
