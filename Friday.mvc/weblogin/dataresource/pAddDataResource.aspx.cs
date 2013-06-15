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

namespace Friday.mvc.weblogin.dataresource
{
    public partial class pAddDataResource : BasePage
    {
     
        IDataResourceService iDataResourceService = UnityHelper.UnityToT<IDataResourceService>();
        protected void Page_Load(object sender, EventArgs e)
        {
            this.tagName = systemFunctionObjectService.基本信息模块.商家活动维护.TagName;
            if (!this.PermissionValidate(PermissionTag.Enable))
            {
                AjaxResult result = new AjaxResult();
                result.statusCode = "300";
                result.message = "没有DataResource增加权限";
                FormatJsonResult jsonResult = new FormatJsonResult();
                jsonResult.Data = result;
                Response.Write(jsonResult.FormatResult());
                Response.End();
            }
          
            if (Request.Params["__EVENTVALIDATION"] != null)
            {

                SaveDataResource();
            }
            
        }

        private void SaveDataResource()
        {
            DataResource act = new DataResource();

        
            BindingHelper.RequestToObject(act);

            string fileoldName = "";
            string fileExtension;
            string filesnewName = "";
            string[] fileInput = { "Image", "SubImage" };
          

            iDataResourceService.Save(act);

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