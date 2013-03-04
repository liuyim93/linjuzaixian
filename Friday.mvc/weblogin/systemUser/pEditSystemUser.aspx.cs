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
    public partial class pEditSystemUser : BasePage
    {
        private ISystemUserService iSystemUserService = UnityHelper.UnityToT<ISystemUserService>();

        private SystemUser systemUser;

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
            systemUser = iSystemUserService.Load(uid);
            if (Request.Params["__EVENTVALIDATION"] != null)
            {

                SaveSystemUser();
            }
            else
            {
                BindingHelper.ObjectToControl(systemUser, this);
                BindingHelper.ObjectToControl(systemUser.LoginUser, this);
            }
        }

        private void SaveSystemUser()
        {

            BindingHelper.RequestToObject(systemUser);
            BindingHelper.RequestToObject(systemUser.LoginUser);
            iSystemUserService.Update(systemUser);

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