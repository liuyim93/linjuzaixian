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
    public partial class pAddSystemUser : BasePage
    {
        private ISystemUserService iSystemUserService = UnityHelper.UnityToT<ISystemUserService>();
        private ILoginUserService iLoginUserService = UnityHelper.UnityToT<ILoginUserService>();

        private LoginUser loginUser;
        private SystemUser systemUser;

        protected void Page_Load(object sender, EventArgs e)
        {
            AjaxResult result = new AjaxResult();
            FormatJsonResult jsonResult = new FormatJsonResult();

            tagName = systemFunctionObjectService.基本信息模块.顾客账号维护.TagName;
            if (!this.PermissionValidate(PermissionTag.Enable))
            {
                result.statusCode = "300";
                result.message = "没有SystemUser增加权限";
                jsonResult.Data = result;
                Response.Write(jsonResult.FormatResult());
                Response.End();
            }

            if (Request.Params["__EVENTVALIDATION"] != null)
            {

                SaveSystemUser();
            }
        }

        private void SaveSystemUser()
        {
            loginUser = iLoginUserService.GetLoginUserByLoginName(Request.Params["LoginName"]);
            AjaxResult result = new AjaxResult();
            FormatJsonResult jsonResult = new FormatJsonResult();

            if (loginUser != null)
            {
                result.statusCode = "300";
                result.message = "您填写的登录名已被使用！";
                jsonResult.Data = result;
                Response.Write(jsonResult.FormatResult());
                Response.End();
                return;
            }
            else
            {
                systemUser = new SystemUser();
                BindingHelper.RequestToObject(systemUser);
                systemUser.IsAnonymous = false;
                iSystemUserService.Save(systemUser);

                loginUser = new LoginUser();
                BindingHelper.RequestToObject(loginUser);
                loginUser.IsAdmin = false;
                //loginUser.UserType = friday.core.EnumType.UserTypeEnum.顾客;
                loginUser.SystemUser = systemUser;
                iLoginUserService.Save(loginUser);


                result.statusCode = "200";
                result.message = "添加成功";
                result.navTabId = "referer";
                result.callbackType = "closeCurrent";
                jsonResult.Data = result;
                Response.Write(jsonResult.FormatResult());
                Response.End();
            }


        }

    }
}