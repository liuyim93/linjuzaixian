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

namespace Friday.mvc.weblogin
{
    public partial class pEditLoginUser : BasePage
    {
        ILoginUserService iLoginUserService = UnityHelper.UnityToT<ILoginUserService>();
        IUserInRoleService iUserInRoleService = UnityHelper.UnityToT<IUserInRoleService>();
        IMerchantService iMerchantService = UnityHelper.UnityToT<IMerchantService>();
        ISystemRoleService iSystemRoleService = UnityHelper.UnityToT<ISystemRoleService>();

        private LoginUser loginUser;
        private string uid;

        protected void Page_Load(object sender, EventArgs e)
        {
            tagName = systemFunctionObjectService.基本信息模块.商家账号维护.TagName;
            if (!this.PermissionValidate(PermissionTag.Edit))
            {
                AjaxResult result = new AjaxResult();
                result.statusCode = "300";
                result.message = "没有LoginUser修改权限";
                FormatJsonResult jsonResult = new FormatJsonResult();
                jsonResult.Data = result;
                Response.Write(jsonResult.FormatResult());
                Response.End();
            }
            if (!this.CurrentUser.IsAdmin)
            {
                uid = this.CurrentUser.Id;
                this.IsAdminP.Visible = false;
                this.btnRole.Visible = false;
            }
            if (!string.IsNullOrEmpty(Request.Params["uid"]))
            {
                uid = Request.Params["uid"].ToString();
            }

            loginUser = iLoginUserService.Load(uid);
            if (Request.Params["__EVENTVALIDATION"] != null)
            {

                SaveLoginUser();
            }
            else
            {
                BindingHelper.ObjectToControl(loginUser, this);
                IsAdminV.Value = (loginUser.IsAdmin == true ? "是" : "否");

                string[] info = iUserInRoleService.GetRoleNamesAndIDByLoginUserID(uid);
                if (info.Length!= 0)
                {
                    this.SystemRole.Value = info[0];
                    this.SystemRoleID.Value = info[1];
                }

                if (loginUser.LoginUserOfMerchants.Count!= 0)
                {
                    this.NameSet.Value = loginUser.LoginUserOfMerchants.FirstOrDefault().Merchant.Name;
                    this.IDSet.Value = loginUser.LoginUserOfMerchants.FirstOrDefault().Merchant.Id;
                }
            }
        }

        private void SaveLoginUser()
        {

            BindingHelper.RequestToObject(loginUser);
            loginUser.IsAdmin = (IsAdminV.Value == "是" ? true : false);
            iLoginUserService.Update(loginUser);

            iUserInRoleService.DeleteUserInRoleByLoginUserID(uid);
            string roleID = "";
            if (this.SystemRoleID.Value != null && this.SystemRoleID.Value != "")
            {
                roleID = this.SystemRoleID.Value;
                string[] sArray = roleID.Split(',');

                foreach (string aid in sArray)
                {
                    UserInRole userInRole = new UserInRole();
                    userInRole.SystemRole = iSystemRoleService.Load(aid);
                    userInRole.LoginUser = loginUser;
                    iUserInRoleService.Update(userInRole);
                }
            }
            iPermissionManager.RefreshUserInRole();
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