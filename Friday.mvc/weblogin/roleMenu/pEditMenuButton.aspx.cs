using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using friday.core.repositories;
using friday.core;
using friday.core.components;
using friday.core.domain;

namespace Friday.mvc.weblogin.roleMenu
{
    public partial class pEditMenuButton : System.Web.UI.Page
    {
        private ISystemMenuRepository categoryRepo = new SystemMenuRepository();
        private ISystemUrlRepository urlRepo = new SystemUrlRepository();

        protected void Page_Load(object sender, EventArgs e)
        {
            if (Request["code"] != "" && Request["code"] != null)
            {
                string code = Request["code"];
                SystemMenu category = categoryRepo.GetSystemMenuByMenuID(code);

                bool ISC = categoryRepo.IsHaveChild(category);
                if (ISC == true)
                {
                    choose.Visible = false;
                }

                if (category != null)
                {
                    BindingHelper.ObjectToControl(category, Page);
                    Leaff.Value = Convert.ToString(category.Leaf);
                    TLevel.Value = Convert.ToString(category.TLevel);
                    if (category.SystemUrl != null)
                    { UrlID.Value = category.SystemUrl.Id; }
                    ColIndex.Text = category.ColIndex.ToString();
                }

            }

            if (this.Request.Headers["X-Requested-With"] == "XMLHttpRequest")
            {
                if (Request.QueryString["flag"] == "save")
                {
                    SystemMenu category = categoryRepo.Load(Id.Value);
                    BindingHelper.RequestToObject(category);
                    category.TLevel = Convert.ToInt32(TLevel.Value);
                    string UrlPath = MenuRoute.Value.ToLower();
                    category.MenuRoute = UrlPath;
                    category.ColIndex = Convert.ToInt32(ColIndex.Text);
                    if (UrlID.Value != "")
                    {
                        SystemUrl url = urlRepo.Load(UrlID.Value);
                        category.SystemUrl = url;
                    }
                    if (UrlPath == "")
                    {
                        category.Leaf = false;
                    }
                    else
                    {
                        category.Leaf = true;
                    }

                    categoryRepo.SaveOrUpdate(category);
                    AjaxResult result = new AjaxResult();
                    result.statusCode = "200";
                    result.message = "操作成功";
                    result.navTabId = "menubuttonmanage";
                    result.callbackType = "forward";
                    result.forwardUrl = "RolePowerManage/MenuButtonManage.aspx";
                    FormatJsonResult jsonResult = new FormatJsonResult();
                    jsonResult.Data = result;
                    Response.Write(jsonResult.FormatResult());
                    Response.End();
                }
            }
        }
    }
}
