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
using System.IO;
using friday.core.services;

namespace Friday.mvc.weblogin.feedBack
{
    public partial class pEditFeedBack : BasePage
    {
        IFeedBackService iFeedBackService = UnityHelper.UnityToT<IFeedBackService>();
        private FeedBack feedBack;
        protected void Page_Load(object sender, EventArgs e)
        {
            string uid = Request.Params["uid"].ToString();
            this.tagName = systemFunctionObjectService.反馈模块.反馈维护.TagName;
            this.PermissionCheck(PermissionTag.Edit);

            feedBack = iFeedBackService.Load(uid);
            if (Request.Params["__EVENTVALIDATION"] != null)
            {

                SaveFeedBack();
            }
            else
            {

                BindingHelper.ObjectToControl(feedBack, this);
               

            }
        }

        private void SaveFeedBack()
        {
 
         

            BindingHelper.RequestToObject(feedBack);            
            iFeedBackService.Update(feedBack);

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