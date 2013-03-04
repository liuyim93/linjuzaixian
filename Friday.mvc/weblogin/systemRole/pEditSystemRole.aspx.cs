using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using friday.core.domain;
using friday.core.repositories;
using friday.core;
using friday.core.components;
using friday.core.services;

namespace Friday.mvc.weblogin
{
    public partial class pEditSystemRole : BasePage
    {
        private ISystemRoleService iSystemRoleService = UnityHelper.UnityToT<ISystemRoleService>();
        SystemRole sys = new SystemRole();

        protected void Page_Load(object sender, EventArgs e)
        {
            string uid;
            this.tagName = systemFunctionObjectService.基本信息模块.角色权限维护.TagName;
            this.PermissionCheck(PermissionTag.Edit);
            if (this.CurrentUser.IsAdmin)
            {
                uid = Request.Params["uid"].ToString();
            }
            else
            {
                uid = this.CurrentUser.LoginUserOfMerchants.SingleOrDefault().Merchant.Id;

            }
            sys = iSystemRoleService.Load(uid);
            if (Request.Params["__EVENTVALIDATION"] != null)
            {

                SaveSystemRole();
            }
            else
            {

                BindingHelper.ObjectToControl(sys, this);

            }
        }
        private void SaveSystemRole()
        {

            BindingHelper.RequestToObject(sys);

            iSystemRoleService.Update(sys);

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