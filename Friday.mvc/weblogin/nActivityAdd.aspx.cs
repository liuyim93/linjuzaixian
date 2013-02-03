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

namespace Friday.mvc.weblogin.activity
{
    public partial class nActivityAdd : System.Web.UI.Page
    {
        IRepository<Activity> iActivityRepository = UnityHelper.UnityToT<IRepository<Activity>>();
    
        protected void Page_Load(object sender, EventArgs e)
        {
          
            if (Request.Params["__EVENTVALIDATION"] != null)
            {

                SaveActivity();
            }
            
        }

        private void SaveActivity()
        {
            Activity act = new Activity();

            BindingHelper.RequestToObject(act);
            iActivityRepository.SaveOrUpdate(act);

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