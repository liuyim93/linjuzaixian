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
using friday.core.EnumType;

namespace Friday.mvc.weblogin.dataresource
{
    public partial class pAddDataResource : BasePage
    {
     
        IDataResourceService iDataResourceService = UnityHelper.UnityToT<IDataResourceService>();
        protected void Page_Load(object sender, EventArgs e)
        {
            this.tagName = systemFunctionObjectService.基本信息模块.网站信息管理.TagName;
            if (!this.PermissionValidate(PermissionTag.Enable))
            {
                AjaxResult result = new AjaxResult();
                result.statusCode = "300";
                result.message = "没有网站信息增加权限";
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
             
            IRepository<DataResource> aer = new Repository<DataResource>();
            DataResource datar = new DataResource();
            //CurrentUser CU = new CurrentUser();
            IRepository<Section> u = new Repository<Section>();

            BindingHelper.RequestToObject(datar);
 


            string SID = Request.Params["SectionID"].ToString();

            datar.LoginUser =this.CurrentUser;//CU.UserInfo.LoginUser;
            datar.TotalViews = 0;
            datar.CheckState = CheckState.no;
            Section Sc = u.Load(SID);
            datar.Section = Sc;

            aer.SaveOrUpdate(datar);

            //string ID = this.AttachmentID.Value.ToString();
            //string[] attachIDS = ID.Split('&');
            //IRepository<DataAttachment> dar = new Repository<DataAttachment>();
            //DataAttachment da = new DataAttachment();
            //foreach (string i in attachIDS)
            //{
            //    if (i != null && i != "")
            //    {
            //        da = dar.Get(i);
            //        da.DataResource = datar;
            //        dar.SaveOrUpdate(da);
            //    }
            //}

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