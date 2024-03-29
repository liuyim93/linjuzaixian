﻿using System;
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
    public partial class pEditDataResource : BasePage
    {
        IDataResourceService iDataResourceService = UnityHelper.UnityToT<IDataResourceService>();
        private DataResource dataresource;
        protected void Page_Load(object sender, EventArgs e)
        {
            string uid = Request.Params["uid"].ToString();
            this.tagName = systemFunctionObjectService.基本信息模块.网站信息管理.TagName;
            this.PermissionCheck(PermissionTag.Edit);

            dataresource = iDataResourceService.Load(uid);
            if (Request.Params["__EVENTVALIDATION"] != null)
            {

                SaveDataResource();
            }
            else
            {

                BindingHelper.ObjectToControl(dataresource, this);
                this.SectionName.Value = dataresource.Section.Name;
            }
        }

        private void SaveDataResource()
        {
            BindingHelper.RequestToObject(dataresource);

            string fileoldName = "";
            string fileExtension;
            string filesnewName = "";
            string[] fileInput = { "Image", "SubImage" };
            Random R = new Random();//创建产生随机数
            HttpFileCollection files = HttpContext.Current.Request.Files;
            try
            {
                for (int num = 0; num < fileInput.Length; num++)
                {
                    HttpPostedFile postedFile = files[fileInput[num]];
                    if (postedFile != null)
                    {
                        fileoldName = System.IO.Path.GetFileName(postedFile.FileName);
                        if (!string.IsNullOrEmpty(fileoldName))
                        {
                            fileExtension = System.IO.Path.GetExtension(fileoldName).ToLower();

                            int val = 10 + R.Next(999);//产生随机数为99以内任意
                            int val1 = 10 + R.Next(999);//产生随机数为999以内任意
                            filesnewName = DateTime.Now.ToString("yyyyMMddHHmmss") + val.ToString() + val1.ToString() + fileExtension;
                            if (!string.IsNullOrEmpty(filesnewName))
                            {
                                File.Delete(System.Web.HttpContext.Current.Request.MapPath("~/uploadimage/") + filesnewName);
                            }
                            postedFile.SaveAs(System.Web.HttpContext.Current.Request.MapPath("~/uploadimage/") + filesnewName);
                        }
                     
                    }
                }
            }
            catch (System.Exception Ex)
            {
            }

            iDataResourceService.Update(dataresource);

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