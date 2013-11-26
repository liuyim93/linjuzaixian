using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using friday.core.domain;
using friday.core;
using friday.core.components;
using System.IO;
using friday.core.repositories;
using friday.core.services;

namespace Friday.mvc.weblogin
{
    public partial class pAddCommodity : BasePage
    {
        IShopService iShopService = UnityHelper.UnityToT<IShopService>();
        IGlobalGoodsTypeService iGlobalGoodsTypeService = UnityHelper.UnityToT<IGlobalGoodsTypeService>();
        MerchantCategory mCategory = new MerchantCategory();
        string mid;

        protected void Page_Load(object sender, EventArgs e)
        {
            if (!this.CurrentUser.IsAdmin)
            {
                mid = this.CurrentUser.LoginUserOfMerchants.SingleOrDefault().Merchant.Id;
            }
            else
            {
                mid = Request.Params["shop_id"];
            }
            tagName = systemFunctionObjectService.商店模块.商品维护.TagName;
            if (!this.PermissionValidate(PermissionTag.Enable))
            {
                AjaxResult result = new AjaxResult();
                result.statusCode = "300";
                result.message = "没有Commodity增加权限";
                result.callbackType = "closeCurrent";
                FormatJsonResult jsonResult = new FormatJsonResult();
                jsonResult.Data = result;
                Response.Write(jsonResult.FormatResult());
                Response.End();
            }
            if (Request.Params["__EVENTVALIDATION"] != null)
            {

                SaveCommodity();
            }
            else
            {

                Shop rst = iShopService.Load(mid);
                //IList<GlobalGoodsType> goodsTypes = iGlobalGoodsTypeService.GetAll();//.GetGoodsTypeByMerchantID(rst.Id);
                //foreach (var i in goodsTypes)
                //{
                //    this.GoodsType.Items.Add(i.GoodsType);
                //}
            }

        }

        private void SaveCommodity()
        {
            ICommodityService iCommodityService = UnityHelper.UnityToT<ICommodityService>();
            Commodity f = new Commodity();

            BindingHelper.RequestToObject(f);
            if (HttpContext.Current.Request.Files[0] != null && HttpContext.Current.Request.Files[0].ContentLength!=0)
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
            //2013-05-09 basilwang 增加family
            f.GlobalGoodsTypeFamily = f.GlobalGoodsType.Family;
            iCommodityService.Save(f);

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