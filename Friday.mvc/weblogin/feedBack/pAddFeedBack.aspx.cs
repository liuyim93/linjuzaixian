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
    public partial class pAddFeedBack : BasePage
    {
        IFeedBackService iFeedBackService = UnityHelper.UnityToT<IFeedBackService>();
        protected void Page_Load(object sender, EventArgs e)
        {
            tagName = systemFunctionObjectService.反馈模块.反馈维护.TagName;
            if (!this.PermissionValidate(PermissionTag.Enable))
            {
                AjaxResult result = new AjaxResult();
                result.statusCode = "300";
                result.message = "没有FeedBack增加权限";
                result.callbackType = "closeCurrent";
                FormatJsonResult jsonResult = new FormatJsonResult();
                jsonResult.Data = result;
                Response.Write(jsonResult.FormatResult());
                Response.End();
            }
            if (Request.Params["__EVENTVALIDATION"] != null)
            {

                SaveFeedBack();
            }
            
        }

        private void SaveFeedBack()
        {
            

            FeedBack mss = new FeedBack();
           
            mss.LoginUser = this.CurrentUser;

            BindingHelper.RequestToObject(mss);
            iFeedBackService.Save(mss);

           


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