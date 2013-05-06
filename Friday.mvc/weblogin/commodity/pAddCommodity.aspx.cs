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
       // IMerchantGoodsTypeService iMerchantGoodsTypeService = UnityHelper.UnityToT<IMerchantGoodsTypeService>();
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
              //  IList<MerchantGoodsType> goodsTypes = iMerchantGoodsTypeService.GetGoodsTypeByMerchantID(rst.Id);
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
            f.Image = CommodityUploadImage.UploadImage(HttpContext.Current.Request.Files, "commodityImage");

            Shop shop = iShopService.Load(mid);
            f.Shop = shop;
         ///   f.MerchantGoodsType = iMerchantGoodsTypeService.GetGoodsTypeByTypeNameAndMerchantID(this.GoodsType.Value, shop.Id);

            iCommodityService.Save(f);

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