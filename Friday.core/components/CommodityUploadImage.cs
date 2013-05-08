using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.IO;
using System.Drawing;

namespace friday.core.components
{
    public static class  CommodityUploadImage
    {
        public static string UploadImage(HttpFileCollection files,string ParentPath)
        {
            string fileoldName = "";
            string fileExtension;
            string filesnewName = "";
            string filesNewNameWithoutExt = "";
            string result = "";
            string genaratePicPath = "";
            int[][] imageSize = new int[][] { new int[] { 460, 460 }, new int[] { 120, 120 }, new int[] { 60, 60 }, new int[] { 30, 30 }, new int[] { 160, 160 } };

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
                        filesNewNameWithoutExt = DateTime.Now.ToString("yyyyMMddHHmmss") + val.ToString() + val1.ToString();
                        filesnewName = filesNewNameWithoutExt + fileExtension;

                        if (!Directory.Exists(System.Web.HttpContext.Current.Request.MapPath("~/weblogin/uploadimage/" + ParentPath + "/")))//判断文件夹是否已经存在
                        {
                            Directory.CreateDirectory(System.Web.HttpContext.Current.Request.MapPath("~/weblogin/uploadimage/" + ParentPath + "/"));//创建文件夹
                        }

                        if (!string.IsNullOrEmpty(filesnewName))
                        {
                            File.Delete(System.Web.HttpContext.Current.Request.MapPath("~/weblogin/uploadimage/" + ParentPath + "/") + filesnewName);
                        }
                        postedFile.SaveAs(System.Web.HttpContext.Current.Request.MapPath("~/weblogin/uploadimage/" + ParentPath + "/") + filesnewName);


                        System.Drawing.Image originalImage = System.Drawing.Image.FromFile(System.Web.HttpContext.Current.Request.MapPath("~/weblogin/uploadimage/" + ParentPath + "/") + filesnewName);
                        foreach (int[] size in imageSize)
                        {
                            int towidth = size[0];
                            int toheight = size[1];

                            int x = 0;
                            int y = 0;
                            int ow = originalImage.Width;
                            int oh = originalImage.Height;

                            //新建一个bmp图片
                            System.Drawing.Image bitmap = new System.Drawing.Bitmap(towidth, toheight);

                            //新建一个画板
                            Graphics g = System.Drawing.Graphics.FromImage(bitmap);

                            //设置高质量插值法
                            g.InterpolationMode = System.Drawing.Drawing2D.InterpolationMode.High;

                            //设置高质量,低速度呈现平滑程度
                            g.SmoothingMode = System.Drawing.Drawing2D.SmoothingMode.HighQuality;

                            //清空画布并以透明背景色填充
                            g.Clear(Color.Transparent);

                            //在指定位置并且按指定大小绘制原图片的指定部分
                            g.DrawImage(originalImage, new Rectangle(0, 0, towidth, toheight),
                             new Rectangle(x, y, ow, oh),
                             GraphicsUnit.Pixel);

                            try
                            {
                                //以jpg格式保存缩略图
                                genaratePicPath = System.Web.HttpContext.Current.Request.MapPath("~/weblogin/uploadimage/" + ParentPath + "/") + filesnewName + "_" + size + "x" + size + fileExtension;
                                switch (fileExtension)
                                {
                                    case ".gif": bitmap.Save(genaratePicPath, System.Drawing.Imaging.ImageFormat.Gif); break;
                                    case ".jpg": bitmap.Save(genaratePicPath, System.Drawing.Imaging.ImageFormat.Jpeg); break;
                                    case ".bmp": bitmap.Save(genaratePicPath, System.Drawing.Imaging.ImageFormat.Bmp); break;
                                    case ".png": bitmap.Save(genaratePicPath, System.Drawing.Imaging.ImageFormat.Png); break;
                                }
                                //result = ((result == "") ? "" : result + ";") + "/uploadimage/" + ParentPath + "/" + filesnewName + "_" + size + "x" + size + fileExtension;

                            }
                            catch (System.Exception e)
                            {
                                throw e;
                            }
                            finally
                            {
                                bitmap.Dispose();
                                g.Dispose();
                            }
                        }
                        originalImage.Dispose();
                    }
                }
            }
            catch (System.Exception Ex)
            {
            }
            if (filesnewName == "")
                return null;
            else
                return "/uploadimage/" + ParentPath + "/" + filesnewName;
        }
    }
}
