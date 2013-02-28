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

namespace Friday.mvc.weblogin
{
    public partial class pEditSystemRole : BasePage
    {
        IRepository<SystemRole> sysRepository = UnityHelper.UnityToT<IRepository<SystemRole>>();
        SystemRole sys = new SystemRole();

        protected void Page_Load(object sender, EventArgs e)
        {

            sys = sysRepository.Get(Request.Params["uid"]);
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

            sysRepository.SaveOrUpdate(sys);

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