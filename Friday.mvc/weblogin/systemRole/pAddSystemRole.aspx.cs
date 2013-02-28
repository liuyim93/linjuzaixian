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
    public partial class pAddSystemRole : BasePage
    {
        IRepository<SystemRole> sysRepository = UnityHelper.UnityToT<IRepository<SystemRole>>();

        protected void Page_Load(object sender, EventArgs e)
        {
            if (Request.Params["__EVENTVALIDATION"] != null)
            {

                SaveSystemRole();
            }     
        }
        private void SaveSystemRole()
        {
            SystemRole sys = new SystemRole();
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