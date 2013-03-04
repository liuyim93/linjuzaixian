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
    public partial class pReplyFeedBack : BasePage
    {
        IFeedBackService iFeedBackService = UnityHelper.UnityToT<IFeedBackService>();
      
        private FeedBack feedBack;
        protected void Page_Load(object sender, EventArgs e)
        {
            string uid = Request.Params["uid"].ToString();

            tagName = systemFunctionObjectService.反馈模块.反馈回复.TagName;
            this.PermissionCheck();


            if (Request.Params["__EVENTVALIDATION"] != null)
            {

                SaveReplyFeedBack(uid);
            }

        }

        private void SaveReplyFeedBack( string uid)
        {
            ILoginUserService iLoginUserService = UnityHelper.UnityToT<ILoginUserService>();
            //现获取当前登陆商的LoginName
            LoginUser su = new LoginUser();
            su = iLoginUserService.GetLoginUserByLoginName(this.CurrentUser.LoginName);                      

            FeedBack ParentFeedBack = iFeedBackService.Load(uid);
           


            FeedBack feedBack = new FeedBack();
            feedBack.LoginUser = su;
            feedBack.ParentFeedBack = ParentFeedBack;

            BindingHelper.RequestToObject(feedBack);
            iFeedBackService.Save(feedBack);

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