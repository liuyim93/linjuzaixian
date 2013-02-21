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

namespace Friday.mvc.weblogin.loginUser
{
    public partial class pEditLoginUser : System.Web.UI.Page
    {
        IRepository<LoginUser> iLoginUserRepository = UnityHelper.UnityToT<IRepository<LoginUser>>();
        private LoginUser loginUser;
        protected void Page_Load(object sender, EventArgs e)
        {
            string uid = Request.Params["uid"].ToString();
            loginUser = iLoginUserRepository.Load(uid);
            if (Request.Params["__EVENTVALIDATION"] != null)
            {

                SaveLoginUser();
            }
            else
            {
                BindingHelper.ObjectToControl(loginUser, this);
                IsAdminV.Value = (loginUser.IsAdmin == true ? "是" : "否");
            }
        }

        private void SaveLoginUser()
        {

            BindingHelper.RequestToObject(loginUser);
            if (IsAdminV.Value != "")
            loginUser.IsAdmin = (IsAdminV.Value == "是" ? true : false);
            iLoginUserRepository.SaveOrUpdate(loginUser);

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