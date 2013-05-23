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
using friday.core.services;

namespace Friday.mvc.weblogin
{
    public partial class pSystemUserDetail : BasePage
    {
        private ISystemUserService iSystemUserService = UnityHelper.UnityToT<ISystemUserService>();

        private SystemUser systemUser;

        protected void Page_Load(object sender, EventArgs e)
        {
            tagName = systemFunctionObjectService.基本信息模块.顾客账号维护.TagName;
            if (!this.PermissionValidate(PermissionTag.Enable))
            {
                AjaxResult result = new AjaxResult();
                result.statusCode = "300";
                result.message = "没有SystemUser浏览权限";
                FormatJsonResult jsonResult = new FormatJsonResult();
                jsonResult.Data = result;
                Response.Write(jsonResult.FormatResult());
                Response.End();
            }

            string uid = Request.Params["uid"].ToString();
            systemUser = iSystemUserService.Load(uid);

            SchoolName.Value = systemUser.School.Name;
            BindingHelper.ObjectToControl(systemUser, this);
            BindingHelper.ObjectToControl(systemUser.LoginUser, this);
        }
    }
}