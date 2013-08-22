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
using friday.core.services;
using System.Text;
using friday.core.EnumType;

namespace Friday.mvc.weblogin.shop
{
    public partial class pAddShop : BasePage
    {
        IShopService iShopService = UnityHelper.UnityToT<IShopService>();
        ISchoolOfMerchantService iSchoolOfMerchantService = UnityHelper.UnityToT<ISchoolOfMerchantService>();
        ISchoolService iSchoolService = UnityHelper.UnityToT<ISchoolService>();


        protected void Page_Load(object sender, EventArgs e)
        {
            tagName = systemFunctionObjectService.商店模块.商店维护.TagName;
            if (!this.PermissionValidate(PermissionTag.Enable))
            {
                AjaxResult result = new AjaxResult();
                result.statusCode = "300";
                result.message = "没有Shop增加权限";
                result.callbackType = "closeCurrent";
                FormatJsonResult jsonResult = new FormatJsonResult();
                jsonResult.Data = result;
                Response.Write(jsonResult.FormatResult());
                Response.End();
            }
            if (Request.Params["__EVENTVALIDATION"] != null)
            {
                string schid = "";
                if (this.IDSet.Value != null && this.IDSet.Value != "")
                {
                    schid = this.IDSet.Value;
                }
                //if (this.SchoolOfMerchantID.Value != null && this.SchoolOfMerchantID.Value != "")
                //{
                //    schid = this.SchoolOfMerchantID.Value;
                //}

                SaveShop(schid);
            }

        }

        private void SaveShop(string schid)
        {
            Shop shop = new Shop();

            BindingHelper.RequestToObject(shop);
            shop.Logo = PictureUpload.UploadImage(HttpContext.Current.Request.Files, "logo");
            StringBuilder sb = new StringBuilder();

            sb.Append(Request.Params["MorningBeginHour"]).Append("--").Append(Request.Params["MorningEndHour"])
                .Append("/").Append(Request.Params["AfternoonBeginHour"]).Append("--").Append(Request.Params["AfternoonEndHour"])
                .Append("/").Append(Request.Params["NightStartHour"]).Append("--").Append(Request.Params["NightEndHour"]);

            shop.ShopHours = sb.ToString();

            shop.ShopStatus = (ShopStatusEnum)Int32.Parse(ShopStatus.Value);

            shop.MerchantType = (MerchantTypeEnum)Int32.Parse(Type.Value);
            iShopService.Save(shop);

            if (schid != "")
            {
                string[] sArray = schid.Split(',');

                foreach (string shcidsz in sArray)
                {
                    friday.core.domain.SchoolOfMerchant schofmt = new friday.core.domain.SchoolOfMerchant();
                    schofmt.Merchant = shop;
                    schofmt.School = iSchoolService.Load(shcidsz);
                    schid = schid + schofmt.School.Family;
                    iSchoolOfMerchantService.Save(schofmt);
                }
            }
            shop.Schools = schid;
            iShopService.Update(shop);
            AjaxResult result = new AjaxResult();
            result.statusCode = "200";
            result.message = "添加成功";
            result.navTabId = "referer";
            result.callbackType = "closeCurrent";
            FormatJsonResult jsonResult = new FormatJsonResult();
            jsonResult.Data = result;
            Response.Write(jsonResult.FormatResult());
            //2013-06-24 basilwang IE has issues with the "application/json" response from the iframe.
            //see http://stackoverflow.com/questions/5340192/ie-wants-to-download-returned-json-from-django
            Response.ContentType = "text/html";
            Response.End();



        }

    }
}