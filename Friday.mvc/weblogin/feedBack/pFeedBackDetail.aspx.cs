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
        //private FeedBack  merchfeedBack;
        protected void Page_Load(object sender, EventArgs e)
        {
            string uid = Request.Params["uid"].ToString();
            string sysParentId = null;

            sysfeedBack = iFeedBackRepository.Load(uid);
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
           

                IList<FeedBack> merchfeedBackList = iFeedBackRepository.Search(fltList);
            
       
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