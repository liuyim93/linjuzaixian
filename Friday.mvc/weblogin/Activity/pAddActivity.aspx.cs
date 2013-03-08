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

namespace Friday.mvc.weblogin.activity
{
    public partial class pAddActivity : BasePage
    {
     
        IActivityService iActivityService = UnityHelper.UnityToT<IActivityService>();
        protected void Page_Load(object sender, EventArgs e)
        {
            this.tagName = systemFunctionObjectService.基本信息模块.商家活动维护.TagName;
            if (!this.PermissionValidate(PermissionTag.Enable))
            {
                AjaxResult result = new AjaxResult();
                result.statusCode = "300";
                result.message = "没有Activity增加权限";
                FormatJsonResult jsonResult = new FormatJsonResult();
                jsonResult.Data = result;
                Response.Write(jsonResult.FormatResult());
                Response.End();
            }
          
            if (Request.Params["__EVENTVALIDATION"] != null)
            {

                SaveActivity();
            }
            
        }

        private void SaveActivity()
        {
            Activity act = new Activity();

            BindingHelper.RequestToObject(act);

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

                        if (fileInput[num] == "Image")
                        {
                            act.Image = "/uploadimage/" + filesnewName;
                            this.ImagePreview.Src = act.Image;
                        }

                        if (fileInput[num] == "SubImage")
                        {
                            act.SubImage = "/uploadimage/" + filesnewName;
                            this.SubImagePreview.Src = act.SubImage;
                        }
                    }
                }
            }
            catch (System.Exception Ex)
            {
            }
            

            iActivityService.Save(act);

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