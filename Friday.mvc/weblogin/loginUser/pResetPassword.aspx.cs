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
    public partial class pResetPassword : BasePage
    {
        ILoginUserService iLoginUserService = UnityHelper.UnityToT<ILoginUserService>();
        private LoginUser loginUser;
        protected void Page_Load(object sender, EventArgs e)
        {
            string uid = Request.Params["uid"].ToString();
            loginUser = iLoginUserService.Load(uid);
            if (Request.Params["__EVENTVALIDATION"] != null)
            {

                SaveLoginUser();
            }

        }

        private void SaveLoginUser()
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