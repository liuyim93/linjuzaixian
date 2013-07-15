using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using friday.core;
using friday.core.repositories;
using friday.core.components;
using friday.core.domain;
using friday.core.services;

namespace Friday.mvc.weblogin.feedBack
{
    public partial class pFeedBackDetail : BasePage
    {
        IFeedBackService iFeedBackService = UnityHelper.UnityToT<IFeedBackService>();
    
        private FeedBack  sysfeedBack;
        //private FeedBack  merchfeedBack;
        protected void Page_Load(object sender, EventArgs e)
        {
            string uid = Request.Params["uid"].ToString();
            tagName = systemFunctionObjectService.反馈模块.反馈维护.TagName;
            if (!this.PermissionValidate(PermissionTag.Enable))
            {
                AjaxResult result = new AjaxResult();
                result.statusCode = "300";
                result.message = "没有浏览FeedBack权限";
                result.callbackType = "closeCurrent";
                FormatJsonResult jsonResult = new FormatJsonResult();
                jsonResult.Data = result;
                Response.Write(jsonResult.FormatResult());
                Response.End();
            }

            string sysParentId = null;

            sysfeedBack = iFeedBackService.Load(uid);
            BindingHelper.ObjectToControl(sysfeedBack, this);
            this.LoginName.Value = sysfeedBack.LoginUser.LoginName;

            sysParentId=sysfeedBack.Id;


            List<DataFilter> filterList = new List<DataFilter>();
            List<DataFilter> fltList = new List<DataFilter>(); //第一层

                filterList.Add(new DataFilter()
                {
                    type = "ParentFeedBackId",
                    value = sysParentId

                });
                fltList.Add(new DataFilter()
                {
                    type = "ParentFeedBackForTwo",
                    field = filterList

                });


                IList<FeedBack> merchfeedBackList = iFeedBackService.Search(fltList);
            
       
            if ( merchfeedBackList.Count!=0)
              {

                  this.merchantUser.Value = merchfeedBackList[0].LoginUser.LoginName;
                  this.mContents.Value = merchfeedBackList[0].Contents;
                  
              }
            else
              {
                
               this.merchantUser.Visible= false;
               this.mContents.Visible = false;
              }
            

        }
    }
}