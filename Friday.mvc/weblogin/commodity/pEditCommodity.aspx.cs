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

namespace Friday.mvc.weblogin
{
    public partial class pEditCommodity : BasePage
    {
        ICommodityService iCommodityService = UnityHelper.UnityToT<ICommodityService>();
        private Commodity f;

        IShopService iShopService = UnityHelper.UnityToT<IShopService>();
        IGlobalGoodsTypeService iGlobalGoodsTypeService = UnityHelper.UnityToT<IGlobalGoodsTypeService>();
        MerchantCategory mCategory = new MerchantCategory();
        string mid;

        protected void Page_Load(object sender, EventArgs e)
        {
            string uid = Request.Params["uid"].ToString();
            if (!this.CurrentUser.IsAdmin)
            {
                mid = this.CurrentUser.LoginUserOfMerchants.SingleOrDefault().Merchant.Id;
            }
            else
            {
                mid = Request.Params["shop_id"];
            }
            this.tagName = systemFunctionObjectService.商店模块.商品维护.TagName;
            this.PermissionCheck(PermissionTag.Edit);

            f = iCommodityService.Load(uid);
            if (Request.Params["__EVENTVALIDATION"] != null)
            {
                SaveCommodity();
            }
            else
            {
                BindingHelper.ObjectToControl(f, this);
                this.Edit_Commodity_LogoPreview.Src = f.Image;

                this.Edit_Commodity_LogoPreview1.Src = f.Image1;

                this.Edit_Commodity_LogoPreview2.Src = f.Image2;

                this.Edit_Commodity_LogoPreview3.Src = f.Image3;
                //Shop rst = iShopService.Load(mid);
                //IList<GlobalGoodsType> goodsTypes =iGlobalGoodsTypeService.GetAll();
                //foreach (var i in goodsTypes)
                //{
                //    this.GoodsType.Items.Add(i.GoodsType);
                //}
                //GlobalGoodsType golbalGoodsType = iGlobalGoodsTypeService.Load(f.GlobalGoodsType.Id);
                //this.GoodsType.Value = golbalGoodsType.GoodsType;
                GoodsType.Value = f.GlobalGoodsType.Name;
                GoodsTypeID.Value = f.GlobalGoodsType.Id;
                this.Edit_Commodity_LogoPreview.Src = f.Image;
            }
        }

        private void SaveCommodity()
        {

            BindingHelper.RequestToObject(f);
            f.Image = this.Edit_Commodity_LogoPreview.Src;
            f.Image1 = this.Edit_Commodity_LogoPreview1.Src;
            f.Image2 = this.Edit_Commodity_LogoPreview2.Src;
            f.Image3 = this.Edit_Commodity_LogoPreview3.Src;
            if (HttpContext.Current.Request.Files[0] != null &&HttpContext.Current.Request.Files[0].ContentLength!=0)
            {
                HttpPostedFile file = HttpContext.Current.Request.Files[0];
                f.Image = CommodityUploadImage.UploadImage(file, "commodityImage");
            }
            if (HttpContext.Current.Request.Files[1] != null && HttpContext.Current.Request.Files[1].ContentLength != 0)
            {
                HttpPostedFile file = HttpContext.Current.Request.Files[1];
                f.Image1 = CommodityUploadImage.UploadImage(file, "commodityImage");
            }

            if (HttpContext.Current.Request.Files[2] != null && HttpContext.Current.Request.Files[2].ContentLength != 0)
            {
                HttpPostedFile file = HttpContext.Current.Request.Files[2];
                f.Image2 = CommodityUploadImage.UploadImage(file, "commodityImage");
            }

            if (HttpContext.Current.Request.Files[3] != null && HttpContext.Current.Request.Files[3].ContentLength != 0)
            {
                HttpPostedFile file = HttpContext.Current.Request.Files[3];
                f.Image3 = CommodityUploadImage.UploadImage(file, "commodityImage");
            }

            Shop shop = iShopService.Load(mid);
            f.Shop = shop;
            f.GlobalGoodsType = iGlobalGoodsTypeService.Load(GoodsTypeID.Value);

            iCommodityService.Update(f);

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
            Response.ContentType = "text/html";
            Response.End();

        }
    }
}