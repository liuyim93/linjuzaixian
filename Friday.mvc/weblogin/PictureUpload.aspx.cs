using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using friday.core.domain;
using friday.core.components;

namespace Friday.mvc.weblogin
{
    public partial class PictureUpload : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            HttpFileCollection files = HttpContext.Current.Request.Files;
            if (files.Count != 0)
            {
                SaveImages();
            }
        }

        private void SaveImages()
        {
            Random R = new Random();//创建产生随机数
            HttpFileCollection files = HttpContext.Current.Request.Files;
            string fileoldName = "";
            string fileExtension;
            string filesnewName = "";
            string paTh = "";
            //string uid = ID.Text;
            //Cluster.Core.Domain.Expert expert = expertRep.Get(uid);
            try
            {
                for (int iFile = 0; iFile < files.Count; iFile++)
                {
                    HttpPostedFile postedFile = files[iFile];
                    fileoldName = System.IO.Path.GetFileName(postedFile.FileName);
                    if (fileoldName != "")
                    {
                        fileExtension = System.IO.Path.GetExtension(fileoldName).ToLower();
                        string fileExtensionName = System.IO.Path.GetFileNameWithoutExtension(fileoldName);
                        string fileExtensionName1 = System.IO.Path.GetFileNameWithoutExtension(postedFile.FileName);
                        int val = 10 + R.Next(999);//产生随机数为99以内任意
                        int val1 = 10 + R.Next(999);//产生随机数为999以内任意
                        filesnewName = DateTime.Now.ToString("yyyyMMddHHmmss") + val.ToString() + val1.ToString() + fileExtension;
                        //if (!string.IsNullOrEmpty(expert.ImagePath))
                        //{
                        //    File.Delete(System.Web.HttpContext.Current.Request.MapPath("~/") + expert.ImagePath);
                        //}
                            paTh = "/UploadImage/";
                            postedFile.SaveAs(System.Web.HttpContext.Current.Request.MapPath("~/" + paTh) + filesnewName);                    
                    }
                }
            }
            catch (System.Exception Ex)
            {
                Exception e = Ex;
            }

         
            string NPU = paTh + filesnewName;

            Response.Write(@"<script> var statusCode='200';
                            var message='操作成功';
                            var navTabId='';
                            var callbackType='closeCurrent';
                            var response = {statusCode:statusCode,
                                            message:message,
                                            path:'" + NPU + @"',
                                            navTabId:navTabId,
                                            callbackType:callbackType
                                            };
                            if(window.parent.donecallback) window.parent.donecallback(response);
                            </script>
                            ");
            Response.End();
        }
    }
}