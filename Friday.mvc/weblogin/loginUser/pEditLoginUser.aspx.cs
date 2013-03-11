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

namespace Friday.mvc.weblogin
{
    public partial class pEditLoginUser : BasePage
    {
        IRepository<LoginUser> iLoginUserRepository = UnityHelper.UnityToT<IRepository<LoginUser>>();
        IUserInRoleRepository iUserInRoleRepository = UnityHelper.UnityToT<IUserInRoleRepository>();
        IRepository<SystemRole> iSystemRoleRepository = UnityHelper.UnityToT<IRepository<SystemRole>>();
        IRepository<Merchant> iMerchantRepository = UnityHelper.UnityToT<IRepository<Merchant>>();

        private LoginUser loginUser;
        private string uid;

        protected void Page_Load(object sender, EventArgs e)
        {
            uid = Request.Params["uid"].ToString();
            loginUser = iLoginUserRepository.Load(uid);
            if (Request.Params["__EVENTVALIDATION"] != null)
            {

                SaveLoginUser();
            }
            else
            {
                BindingHelper.ObjectToControl(loginUser, this);
                IsAdminV.Value = (loginUser.IsAdmin == true ? "是" : "否");

                string[] info = iUserInRoleRepository.GetRoleNamesAndIDByLoginUserID(uid);
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
            iLoginUserRepository.SaveOrUpdate(loginUser);

            iUserInRoleRepository.DeleteUserInRoleByLoginUserID(uid);
            string roleID = "";
            if (this.SystemRoleID.Value != null && this.SystemRoleID.Value != "")
            {
                roleID = this.SystemRoleID.Value;
                string[] sArray = roleID.Split(',');

                foreach (string aid in sArray)
                {
                    UserInRole userInRole = new UserInRole();
                    userInRole.SystemRole = iSystemRoleRepository.Get(aid);
                    userInRole.LoginUser = loginUser;
                    iUserInRoleRepository.SaveOrUpdate(userInRole);
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