using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using friday.core.repositories;
using friday.core.domain;
using friday.core;
using friday.core.components;
using friday.core.services;

namespace Friday.mvc.weblogin.systemUser
{
    public partial class pResetSystemUserPassword : BasePage
    {
        private ISystemUserService iSystemUserService = UnityHelper.UnityToT<ISystemUserService>();
        private ILoginUserService iLoginUserService = UnityHelper.UnityToT<ILoginUserService>();

        private LoginUser loginUser;
        protected void Page_Load(object sender, EventArgs e)
        {
            string uid;
            this.tagName = systemFunctionObjectService.基本信息模块.顾客账号维护.TagName;
            this.PermissionCheck(PermissionTag.Edit);
            if (this.CurrentUser.IsAdmin)
            {
                uid = Request.Params["uid"].ToString();
            }
            else
            {
                uid = this.CurrentUser.LoginUserOfMerchants.SingleOrDefault().Merchant.Id;

            }

            loginUser = iSystemUserService.Load(uid).LoginUser;
            if (Request.Params["__EVENTVALIDATION"] != null)
            {

                SaveSystemUser();
            }

        }

        private void SaveSystemUser()
        {

            BindingHelper.RequestToObject(loginUser);
            iLoginUserService.Update(loginUser);

            AjaxResult result = new AjaxResult();
            result.statusCode = "200";
            result.message = "修改成功";
            result.navTabId = "referer";
            result.callbackType = "closeCurrent";
            FormatJsonResult jsonResult = new FormatJsonResult();
            jsonResult.Data = result;
            Response.Write(jsonResult.FormatResult());
            Response.End();



        }

    }
}