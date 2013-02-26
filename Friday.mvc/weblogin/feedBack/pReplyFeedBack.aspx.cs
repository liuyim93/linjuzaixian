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

namespace Friday.mvc.weblogin.feedBack
{
    public partial class pReplyFeedBack : System.Web.UI.Page
    {
        IRepository<FeedBack> iFeedBackRepository = UnityHelper.UnityToT<IRepository<FeedBack>>();
      
        private FeedBack feedBack;
        protected void Page_Load(object sender, EventArgs e)
        {
            string uid = Request.Params["uid"].ToString();
          
            if (Request.Params["__EVENTVALIDATION"] != null)
            {

                SaveReplyFeedBack(uid);
            }

        }

        private void SaveReplyFeedBack( string uid)
        {
            IRepository<SystemUser> iSystemUserRepository = UnityHelper.UnityToT<IRepository<SystemUser>>();
            SystemUser su = new SystemUser()
            {
                 Name="测试",
                  Email="ceshi@126.com"
            };

            iSystemUserRepository.SaveOrUpdate(su);

            FeedBack ParentFeedBack = iFeedBackRepository.Get(uid);
           


            FeedBack feedBack = new FeedBack();
            feedBack.SystemUser = su;
            feedBack.ParentFeedBack = ParentFeedBack;

            BindingHelper.RequestToObject(feedBack);            
            iFeedBackRepository.SaveOrUpdate(feedBack);

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