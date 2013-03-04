using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using friday.core.repositories;
using friday.core;
using friday.core.domain;
using friday.core.components;
using System.IO;
using friday.core.services;

namespace Friday.mvc.weblogin
{
    public partial class pAddFood : BasePage
    {

        IRestaurantService iRestaurantService = UnityHelper.UnityToT<IRestaurantService>();
        IMerchantGoodsTypeService iMerchantGoodsTypeService = UnityHelper.UnityToT<IMerchantGoodsTypeService>();
        MerchantCategory mCategory = new MerchantCategory();
        string mid;

        protected void Page_Load(object sender, EventArgs e)
        {
             mid = Request.Params["merchant_id"].ToString();
             if (!this.PermissionValidate(PermissionTag.Enable))
             {
                 AjaxResult result = new AjaxResult();
                 result.statusCode = "300";
                 result.message = "没有Food增加权限";
                 FormatJsonResult jsonResult = new FormatJsonResult();
                 jsonResult.Data = result;
                 Response.Write(jsonResult.FormatResult());
                 Response.End();
             }

            if (Request.Params["__EVENTVALIDATION"] != null)
            {

                SaveFood();
            }
            else 
            {

                Restaurant rst = iRestaurantService.Load(mid);
                IList<MerchantGoodsType> goodsTypes = iMerchantGoodsTypeService.GetGoodsTypeByMerchantID(rst.Id);
                 foreach (var i in goodsTypes) 
                 {
                     this.GoodsType.Items.Add(i.GoodsType);                
                 }

              
     
            
            }

        }

        private void SaveFood()
        {
            IFoodService iFoodService = UnityHelper.UnityToT<IFoodService>();
             Food f=new Food();

            BindingHelper.RequestToObject(f);

            string fileoldName = "";
            string fileExtension;
            string filesnewName = "";
            Random R = new Random();//创建产生随机数
            HttpFileCollection files = HttpContext.Current.Request.Files;
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
                            File.Delete(System.Web.HttpContext.Current.Request.MapPath("~/uploadimage/foodImage/") + filesnewName);
                        }
                        postedFile.SaveAs(System.Web.HttpContext.Current.Request.MapPath("~/uploadimage/foodImage/") + filesnewName);
                    }
                }
            }
            catch (System.Exception Ex)
            {
            }
            if (!string.IsNullOrEmpty(filesnewName))
            {
                f.Image = "/uploadimage/foodImage/" + filesnewName;
            }


            Restaurant restaurant = iRestaurantService.Load(mid);
            f.Restaurant = restaurant;
            f.MerchantGoodsType = iMerchantGoodsTypeService.GetGoodsTypeByTypeNameAndMerchantID(this.GoodsType.Value, restaurant.Id);

            iFoodService.Save(f);

            AjaxResult result = new AjaxResult();
            result.statusCode = "200";
            result.message = "修改成功";
            result.navTabId = "referer";
            //2013-02-13 basilwang set rel_hook to panelId
            if (Request.Params["rel_hook"] != null)
            {
                result.panelId = Request.Params["rel_hook"];
            }
            result.callbackType = "closeCurrent";
            FormatJsonResult jsonResult = new FormatJsonResult();
            jsonResult.Data = result;
            Response.Write(jsonResult.FormatResult());
            Response.End();



        }
    }
}