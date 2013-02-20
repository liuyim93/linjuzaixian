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

namespace Friday.mvc.weblogin
{
    public partial class pEditSystemUser : System.Web.UI.Page
    {
        IRepository<SystemUser> iSystemUserRepository = UnityHelper.UnityToT<IRepository<SystemUser>>();
        IRepository<LoginUser> iLoginUserRepository = UnityHelper.UnityToT<IRepository<LoginUser>>();

        private SystemUser systemUser;
        protected void Page_Load(object sender, EventArgs e)
        {
            string uid = Request.Params["uid"].ToString();
            systemUser = iSystemUserRepository.Load(uid);
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
            iSystemUserRepository.SaveOrUpdate(systemUser);

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