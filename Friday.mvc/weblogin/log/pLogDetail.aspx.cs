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

namespace Friday.mvc.weblogin.log
{
    public partial class pLogDetail : BasePage
    {
        ILogRepository iLogRepository = UnityHelper.UnityToT<ILogRepository>();
    
        private Log  log;

        //private LogDetail  merchlogDetail;
        protected void Page_Load(object sender, EventArgs e)
        {
            string uid = Request.Params["uid"].ToString();

            List<DataFilter> filterList = new List<DataFilter>();

            filterList.Add(new DataFilter()
            {
                type = "Log",
                value = uid
            });
            log = iLogRepository.GerLogByLogID(uid);
            BindingHelper.ObjectToControl(log, this);
          

            
            

        }
    }
}