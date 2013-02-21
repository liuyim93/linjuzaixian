using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.IO;

namespace friday.core.components
{
    public static class  PictureUpload
    {
        public static string UploadImage(HttpFileCollection files,string ParentPath)
        {
            string fileoldName = "";
            string fileExtension;
            string filesnewName = "";
            Random R = new Random();//创建产生随机数
            try
            {
                for (int iFile = 0; iFile < files.Count; iFile++)
                {
                    HttpPostedFile postedFile = files[iFile];
                    fileoldName = System.IO.Path.GetFileName(postedFile.FileName);
                    if (!string.IsNullOrEmpty(fileoldName))
                    {
                        fileExtension = System.IO.Path.GetExtension(fileoldName).ToLower();

                        int val = 10 + R.Next(999);//产生随机数为99以内任意
                        int val1 = 10 + R.Next(999);//产生随机数为999以内任意
                        filesnewName = DateTime.Now.ToString("yyyyMMddHHmmss") + val.ToString() + val1.ToString() + fileExtension;
                        if (!string.IsNullOrEmpty(filesnewName))
                        {
                            File.Delete(System.Web.HttpContext.Current.Request.MapPath("~/weblogin/uploadimage/" + ParentPath) + filesnewName);
                        }
                        postedFile.SaveAs(System.Web.HttpContext.Current.Request.MapPath("~/weblogin/uploadimage/" + ParentPath) + filesnewName);
                    }
                }
            }
            catch (System.Exception Ex)
            {
            }
            
            return filesnewName;
        }
    }
}
