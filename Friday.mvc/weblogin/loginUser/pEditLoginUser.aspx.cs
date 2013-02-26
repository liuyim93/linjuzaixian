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
    public partial class pEditLoginUser : System.Web.UI.Page
    {
        IRepository<LoginUser> iLoginUserRepository = UnityHelper.UnityToT<IRepository<LoginUser>>();
        IUserInRoleRepository iUserInRoleRepository = UnityHelper.UnityToT<IUserInRoleRepository>();
        IRepository<SystemRole> iSystemRoleRepository = UnityHelper.UnityToT<IRepository<SystemRole>>();

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
                this.NameSet.Value = info[0];
                this.IDSet.Value = info[1];
            }
        }

        private void SaveLoginUser()
        {

            BindingHelper.RequestToObject(loginUser);
            loginUser.IsAdmin = (IsAdminV.Value == "是" ? true : false);
            iLoginUserRepository.SaveOrUpdate(loginUser);

            iUserInRoleRepository.DeleteUserInRoleByLoginUserID(uid);
            string roleID = "";
            if (this.IDSet.Value != null && this.IDSet.Value != "")
            {
                roleID = this.IDSet.Value;
                string[] sArray = roleID.Split(',');

                foreach (string aid in sArray)
                {
                    UserInRole userInRole = new UserInRole();
                    userInRole.Role = iSystemRoleRepository.Get(aid);
                    userInRole.LoginUser = loginUser;
                    iUserInRoleRepository.SaveOrUpdate(userInRole);
                }
            }

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