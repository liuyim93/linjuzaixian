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

namespace Friday.mvc.weblogin.feedBack
{
    public partial class pFeedBackDetail : System.Web.UI.Page
    {
        IFeedBackRepository iFeedBackRepository = UnityHelper.UnityToT<IFeedBackRepository>();
    
        private FeedBack  sysfeedBack;
        private FeedBack  merchfeedBack;
        protected void Page_Load(object sender, EventArgs e)
        {
            string uid = Request.Params["uid"].ToString();
            string sysParentId = null;

            sysfeedBack = iFeedBackRepository.Load(uid);
            BindingHelper.ObjectToControl(sysfeedBack, this);

            sysParentId=sysfeedBack.Id;


            List<DataFilter> filterList = new List<DataFilter>();
   
                filterList.Add(new DataFilter()
                {
                    type = "ParentFeedBack",
                    value = sysParentId

                });

                FeedBack merchfeedBack = iFeedBackRepository.GetFeedBackByParentFeedBack(sysParentId);
              
            if (IsNullOrEmpty(merchfeedBack))
              {           
            
                this.merchantUser.Value = merchfeedBack.SystemUser.Name;
                this.mContents.Value = merchfeedBack.Contents;
                  
              }
            else
              {
               this.merchantUser.Value = "";
                this.mContents.Value = "";
              }
            

        }
    }
}