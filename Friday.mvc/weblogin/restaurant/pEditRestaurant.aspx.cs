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
using friday.core.EnumType;
using friday.core.services;

namespace Friday.mvc.weblogin.restaurant
{
    public partial class pEditRestaurant : BasePage
    {
        IRestaurantService iRestaurantService = UnityHelper.UnityToT<IRestaurantService>();
        ISchoolOfMerchantService iSchoolOfMerchantService = UnityHelper.UnityToT<ISchoolOfMerchantService>();
        ISchoolService iSchoolService = UnityHelper.UnityToT<ISchoolService>();
        //ILoginUserOfMerchantService iLoginUserOfMerchantService = UnityHelper.UnityToT<ILoginUserOfMerchantService>();

        private Restaurant restaurant;
        //public LoginUser loginuser;
         
        protected void Page_Load(object sender, EventArgs e)
        {
            string uid ;
            this.tagName = systemFunctionObjectService.餐馆模块.餐馆维护.TagName;
            this.PermissionCheck(PermissionTag.Edit);
            if (this.CurrentUser.IsAdmin)
            {
                uid = Request.Params["uid"].ToString();
            }
            else
            {
                uid = this.CurrentUser.LoginUserOfMerchants.SingleOrDefault().Merchant.Id;
    
            }
            restaurant = iRestaurantService.Load(uid);

               
            if (Request.Params["__EVENTVALIDATION"] != null)
            {
                string schid = "";
                if (this.IDSet.Value != null && this.IDSet.Value != "")
                {
                    schid = this.IDSet.Value;
                }
                if (this.SchoolOfMerchantID.Value != null && this.SchoolOfMerchantID.Value != "")
                {
                    schid = this.SchoolOfMerchantID.Value;
                }

                SaveRestaurant(uid, schid);
                
            }
            else
            {

                BindingHelper.ObjectToControl(restaurant, this);
                this.ImagePreview.Src = restaurant.Logo;

                string schofmntname = iSchoolOfMerchantService.GetSchoolNamesByMerchantID(uid);
                string[] arrname = schofmntname.Split('，');
                if (arrname.Length > 1)
                {
                    this.NameSet.Value = schofmntname;
                }
                else
                {
                    this.SchoolOfMerchant.Value = schofmntname;
                }
                
            }
        }

        private void SaveRestaurant(string uid, string schid)
        {

            BindingHelper.RequestToObject(restaurant);

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
                            File.Delete(System.Web.HttpContext.Current.Request.MapPath("~/uploadimage/") + filesnewName);
                        }
                        postedFile.SaveAs(System.Web.HttpContext.Current.Request.MapPath("~/uploadimage/") + filesnewName);
                    }
                }
            }
            catch (System.Exception Ex)
            {
            }
            if (!string.IsNullOrEmpty(filesnewName))
            {

                restaurant.Logo = "/uploadimage/" + filesnewName;
                this.ImagePreview.Src = restaurant.Logo;
            }

            iRestaurantService.Update(restaurant);


            iSchoolOfMerchantService.DeleteSchoolOfMerchantByMerchantID(uid);

            
            if (schid != "")
            {

                string[] sArray = schid.Split(',');
                foreach (string shcidsz in sArray)
                {
                    friday.core.domain.SchoolOfMerchant schofmt = new friday.core.domain.SchoolOfMerchant();
                    schofmt.Merchant = restaurant;
                    schofmt.School = iSchoolService.Load(shcidsz);
                    iSchoolOfMerchantService.Update(schofmt);
                }
            }


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