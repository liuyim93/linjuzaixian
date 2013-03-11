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
            tagName = systemFunctionObjectService.日志模块.日志管理.TagName;
            if (!this.PermissionValidate(PermissionTag.Enable))
            {
                AjaxResult result = new AjaxResult();
                result.statusCode = "300";
                result.message = "没有Log浏览权限";
                FormatJsonResult jsonResult = new FormatJsonResult();
                jsonResult.Data = result;
                Response.Write(jsonResult.FormatResult());
                Response.End();
            }

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