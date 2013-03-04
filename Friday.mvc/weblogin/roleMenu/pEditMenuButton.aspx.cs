﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using friday.core.repositories;
using friday.core;
using friday.core.components;
using friday.core.domain;
using friday.core.services;

namespace Friday.mvc.weblogin.roleMenu
{
    public partial class pEditMenuButton : BasePage
    {
        private ISystemMenuService iSystemMenuService = UnityHelper.UnityToT<ISystemMenuService>();

        protected void Page_Load(object sender, EventArgs e)
        {
            tagName = systemFunctionObjectService.基本信息模块.菜单管理.TagName;
            this.PermissionCheck(PermissionTag.Edit);

            if (Request.Params["__EVENTVALIDATION"] != null)
            {
                SystemMenu category = iSystemMenuService.Load(Id.Value);
                BindingHelper.RequestToObject(category);
                category.TLevel = Convert.ToInt32(TLevel.Value);
                string UrlPath = MenuRoute.Value.ToLower();
                category.MenuRoute = UrlPath;
                category.ColIndex = Convert.ToInt32(ColIndex.Text);

                if (Leaff.SelectedIndex == 0)
                {
                    category.Leaf = true;
                }
                else
                {
                    category.Leaf = false;
                }

                iSystemMenuService.Update(category);
                AjaxResult result = new AjaxResult();
                result.statusCode = "200";
                result.message = "操作成功";
                result.navTabId = "#";
                FormatJsonResult jsonResult = new FormatJsonResult();
                jsonResult.Data = result;
                Response.Write(jsonResult.FormatResult());
                Response.End();
            }
            else
            {
                string code = Request.Params["code"];
                SystemMenu category = iSystemMenuService.Load(code);

                bool ISC = iSystemMenuService.IsHaveChild(category);

                if (category != null)
                {
                    BindingHelper.ObjectToControl(category, Page);
                    Leaff.Value = Convert.ToString(category.Leaf);
                    TLevel.Value = Convert.ToString(category.TLevel);
                    ColIndex.Text = category.ColIndex.ToString();
                }

            }
            
        }
    }
}
