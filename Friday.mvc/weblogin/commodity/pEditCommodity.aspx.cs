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
        //  IMerchantGoodsTypeService iMerchantGoodsTypeService = UnityHelper.UnityToT<IMerchantGoodsTypeService>();
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
                Shop rst = iShopService.Load(mid);
                //IList<MerchantGoodsType> goodsTypes = iMerchantGoodsTypeService.GetGoodsTypeByMerchantID(rst.Id);
                //foreach (var i in goodsTypes)
                //{
                //    this.GoodsType.Items.Add(i.GoodsType);
                //}
                //MerchantGoodsType merchantGoodsType = iMerchantGoodsTypeService.Load(f.MerchantGoodsType.Id);
                //this.GoodsType.Value = merchantGoodsType.GoodsType;

            }
        }

        private void SaveCommodity()
        {

            BindingHelper.RequestToObject(f);
             
            string imageStr = CommodityUploadImage.UploadImage(HttpContext.Current.Request.Files, "commodityImage");
            if (imageStr != null)
            { f.Image = imageStr; }

            Shop shop = iShopService.Load(mid);
            f.Shop = shop;
            //f.MerchantGoodsType = iMerchantGoodsTypeService.GetGoodsTypeByTypeNameAndMerchantID(this.GoodsType.Value, shop.Id);

            iCommodityService.Update(f);

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