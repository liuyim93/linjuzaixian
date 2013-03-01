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
    public partial class pAddLoginUser : BasePage
    {
        IRepository<LoginUser> iLoginUserRepository = UnityHelper.UnityToT<IRepository<LoginUser>>();
        IRepository<UserInRole> iUserInRoleRepository = UnityHelper.UnityToT<IRepository<UserInRole>>();
        IRepository<SystemRole> iSystemRoleRepository = UnityHelper.UnityToT<IRepository<SystemRole>>();
        IRepository<Merchant> iMerchantRepository = UnityHelper.UnityToT<IRepository<Merchant>>();

        private LoginUser loginUser;

        protected void Page_Load(object sender, EventArgs e)
        {
            if (Request.Params["__EVENTVALIDATION"] != null)
            {
                SaveLoginUser();
            }
        }

        private void SaveLoginUser()
        {
              loginUser = new LoginUser();
            BindingHelper.RequestToObject(loginUser);
            loginUser.IsAdmin = (IsAdminV.Value == "是" ? true : false);
            iLoginUserRepository.SaveOrUpdate(loginUser);

            string roleID = "";
            if (this.IDSet.Value != null && this.IDSet.Value != "")
            {
                roleID = this.IDSet.Value;
                string[] sArray = roleID.Split(',');

                foreach (string aid in sArray)
                {
                    UserInRole userInRole = new UserInRole();
                    userInRole.SystemRole = iSystemRoleRepository.Get(aid);
                    userInRole.LoginUser = loginUser;
                    iUserInRoleRepository.SaveOrUpdate(userInRole);
                }
            }
               
         
            AjaxResult result = new AjaxResult();
            result.statusCode = "200";
            result.message = "添加成功";
            result.navTabId = "referer";
            result.callbackType = "closeCurrent";
            FormatJsonResult jsonResult = new FormatJsonResult();
            jsonResult.Data = result;
            Response.Write(jsonResult.FormatResult());
            Response.End();



        }

    }
}