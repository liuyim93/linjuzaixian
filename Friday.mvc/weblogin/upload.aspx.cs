using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.UI;
using System.IO;
using System.Web.UI.WebControls;

namespace Friday.mvc.weblogin
{
    public partial class upload : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            savefile();
        }

        private void savefile()
        {
            Response.ClearHeaders();
            Response.Clear();
            Response.Expires = 0;
            Response.ClearContent();
            Data d = new Data();

            try
            {
                if (Request.Files.Count > 0)
                {
                    if (!Directory.Exists(System.Web.HttpContext.Current.Request.MapPath("~/weblogin/UploadImage/Image/News/")))//判断文件夹是否已经存在
                    {
                        Directory.CreateDirectory(System.Web.HttpContext.Current.Request.MapPath("~/weblogin/UploadImage/Image/News/"));//创建文件夹
                    }

                    Random R = new Random();
                    var file = Request.Files[0];
                    string fileoldname = System.IO.Path.GetFileName(file.FileName);
                    string fileExtension = System.IO.Path.GetExtension(fileoldname).ToLower();
                    string fileRealName = System.IO.Path.GetFileNameWithoutExtension(fileoldname);
                    int val = 1 + R.Next(98);//产生随机数为99以内任意
                    string filesnewName = fileRealName + "_" + val.ToString() + fileExtension;
                    file.SaveAs(System.Web.HttpContext.Current.Request.MapPath("~/weblogin/UploadImage/Image/News/") + filesnewName);

                    //string path = Server.MapPath("images\\" + filename);
                    d.msg = "/weblogin/UploadImage/Image/News/" + filesnewName;
                    //file.SaveAs(path);
                }
            }
            catch (Exception e)
            {
                d.err = e.Message;
            }

            JavaScriptSerializer serializer = new JavaScriptSerializer();
            Response.Write(serializer.Serialize(d));
            Response.Flush();
            Response.End();
        }
    }
    public class Data
    {
        private string _err;
        private string _msg;
        public string err
        {
            get
            {
                if (_err == null)
                    return string.Empty;
                return _err;
            }
            set
            {
                _err = value;
            }
        }
        public string msg
        {
            get
            {
                if (_msg == null)
                    return string.Empty;
                return _msg;
            }
            set
            {
                _msg = value;
            }
        }
    }
}
