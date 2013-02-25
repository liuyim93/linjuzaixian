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

namespace Friday.mvc.weblogin.systemUser
{
    public partial class pResetSystemUserPassword : System.Web.UI.Page
    {
        IRepository<SystemUser> iSystemUserRepository = UnityHelper.UnityToT<IRepository<SystemUser>>();
        IRepository<LoginUser> iLoginUserRepository = UnityHelper.UnityToT<IRepository<LoginUser>>();

        private LoginUser loginUser;
        protected void Page_Load(object sender, EventArgs e)
        {
            string uid = Request.Params["uid"].ToString();
            loginUser = iSystemUserRepository.Load(uid).LoginUser;
            if (Request.Params["__EVENTVALIDATION"] != null)
            {

                SaveSystemUser();
            }

        }

        private void SaveSystemUser()
        {

            BindingHelper.RequestToObject(loginUser);
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