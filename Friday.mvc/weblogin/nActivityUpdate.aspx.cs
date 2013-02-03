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
    public partial class nActivityUpdate : System.Web.UI.Page
    {
        IRepository<Activity> iActivityRepository = UnityHelper.UnityToT<IRepository<Activity>>();
        private Activity activity;
        protected void Page_Load(object sender, EventArgs e)
        {
            string uid = Request.Params["uid"].ToString();
            activity = iActivityRepository.Load(uid);
            if (Request.Params["__EVENTVALIDATION"] != null)
            {

                SaveActivity();
            }
            else
            {

                BindingHelper.ObjectToControl(activity, this);

            }
        }

        private void SaveActivity()
        {

            BindingHelper.RequestToObject(activity);

            iActivityRepository.SaveOrUpdate(activity);

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