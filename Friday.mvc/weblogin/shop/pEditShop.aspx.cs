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
using friday.core.EnumType;
using friday.core.services;
using System.Text;

namespace Friday.mvc.weblogin.shop
{
    public partial class pEditShop : BasePage
    {
        IShopService iShopService = UnityHelper.UnityToT<IShopService>();
        ISchoolOfMerchantService iSchoolOfMerchantService = UnityHelper.UnityToT<ISchoolOfMerchantService>();
        ISchoolService iSchoolService = UnityHelper.UnityToT<ISchoolService>();
       
        private Shop shop;
        protected void Page_Load(object sender, EventArgs e)
        {
            string uid;

            this.tagName = systemFunctionObjectService.商店模块.商店维护.TagName;
            this.PermissionCheck(PermissionTag.Edit);
            if (this.CurrentUser.IsAdmin)
            {
                uid = Request.Params["uid"].ToString();
            }
            else
            {
                uid = this.CurrentUser.LoginUserOfMerchants.SingleOrDefault().Merchant.Id;

            }        
            shop = iShopService.Load(uid);

            if (Request.Params["__EVENTVALIDATION"] != null)
            {
                string schid = "";
                if (this.IDSet.Value != null && this.IDSet.Value != "")
                {
                    schid = this.IDSet.Value;
                }
                SaveShop(uid, schid);
            }
            else
            {

                BindingHelper.ObjectToControl(shop, this);

                this.Edit_Shop_ImagePreview.Src = shop.Logo;
                string[] namesAndIds = iSchoolOfMerchantService.GetSchoolNamesAndIdsByMerchantID(uid);
                this.NameSet.Value = namesAndIds[0];
                this.IDSet.Value = namesAndIds[1];

                Type.Value = ((int)shop.MerchantType).ToString();

                ShopStatus.Value =((int)shop.ShopStatus).ToString();
            }
        }

        private void SaveShop(string uid, string schid)
        {

            BindingHelper.RequestToObject(shop);
            StringBuilder sb = new StringBuilder();
            shop.MerchantType = (MerchantTypeEnum)Int32.Parse(Type.Value);
            sb.Append(Request.Params["MorningBeginHour"]).Append("--").Append(Request.Params["MorningEndHour"])
                .Append("/").Append(Request.Params["AfternoonBeginHour"]).Append("--").Append(Request.Params["AfternoonEndHour"])
                .Append("/").Append(Request.Params["NightStartHour"]).Append("--").Append(Request.Params["NightEndHour"]);

            shop.ShopHours = sb.ToString();
            shop.Schools = schid;
            string imageStr = PictureUpload.UploadImage(HttpContext.Current.Request.Files, "logo");
            if (imageStr != null)
            { shop.Logo = imageStr; }


            iSchoolOfMerchantService.DeleteSchoolOfMerchantByMerchantID(uid);


            if (schid != "")
            {

                string[] sArray = schid.Split(',');
                foreach (string shcidsz in sArray)
                {
                    friday.core.domain.SchoolOfMerchant schofmt = new friday.core.domain.SchoolOfMerchant();
                    schofmt.Merchant = shop;
                    schofmt.School = iSchoolService.Load(shcidsz);
                    schid = schid + schofmt.School.Family;
                    iSchoolOfMerchantService.Update(schofmt);
                }
            }

            shop.Schools = schid;
            iShopService.Update(shop);

            AjaxResult result = new AjaxResult();
            result.statusCode = "200";
            result.message = "修改成功";
            result.navTabId = "referer";
            result.callbackType = "closeCurrent";
            FormatJsonResult jsonResult = new FormatJsonResult();
            jsonResult.Data = result;
            Response.Write(jsonResult.FormatResult());
            //2013-06-24 basilwang IE has issues with the "application/json" response from the iframe.
            //see http://stackoverflow.com/questions/5340192/ie-wants-to-download-returned-json-from-django
        
            Response.End();

        }
    }
}