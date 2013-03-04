using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using friday.core;
using friday.core.repositories;
using friday.core.components;
using friday.core.domain;
using friday.core.services;

namespace Friday.mvc.weblogin.roleMenu
{
    public partial class pAddMenuButton : BasePage
    {
        private ISystemMenuService iSystemMenuService = UnityHelper.UnityToT<ISystemMenuService>();

        protected void Page_Load(object sender, EventArgs e)
        {
            if (!this.PermissionValidate(PermissionTag.Enable))
            {
                AjaxResult result = new AjaxResult();
                result.statusCode = "300";
                result.message = "没有SystemMenu增加权限";
                FormatJsonResult jsonResult = new FormatJsonResult();
                jsonResult.Data = result;
                Response.Write(jsonResult.FormatResult());
                Response.End();
            }

            if (Request.Params["__EVENTVALIDATION"] != null)
            {
                SystemMenu dic = new SystemMenu();
                BindingHelper.RequestToObject(dic);
                dic.ParentID = (Request.Params["code"] == "" || Request.Params["code"] == null) ? null : Request.Params["code"];
                dic.TLevel = Convert.ToInt32(TLevel.Value);
                string UrlPath = MenuRoute.Value.ToLower();
                dic.MenuRoute = UrlPath;
                dic.ColIndex = Convert.ToInt32(ColIndex.Text);

                if (Leaff.SelectedIndex == 0)
                {
                    dic.Leaf = true;
                }
                else
                {
                    dic.Leaf = false;
                }
                iSystemMenuService.Save(dic);

                AjaxResult result1 = new AjaxResult();
                result1.statusCode = "200";
                result1.message = "操作成功";
                result1.navTabId = "referer";
                result1.callbackType = "closeCurrent";
                FormatJsonResult jsonResult1 = new FormatJsonResult();
                jsonResult1.Data = result1;
                Response.Write(jsonResult1.FormatResult());
                Response.End();

            }
            else 
            {
                if (Request.Params["code"] == "" || Request.Params["code"] == null)
                {
                    TLevel.Value = Convert.ToString(0);
                }

                else
                {
                    string code = Request.Params["code"];
                    SystemMenu category = iSystemMenuService.Load(code);

                    if (category.Leaf == false)
                    {
                        TLevel.Value = Convert.ToString(category.TLevel + 1);
                    }
                    else
                    {
                        AjaxResult result = new AjaxResult();
                        result.statusCode = "300";
                        result.errorCloseType = "dialog";
                        result.message = "您选择的父节点不能为叶节点！";
                        result.callbackType = "closeCurrent";
                        FormatJsonResult jsonResult = new FormatJsonResult();
                        jsonResult.Data = result;
                        Response.Write(jsonResult.FormatResult());
                        Response.End();
                    }
                }
            }

        }
    }
}
