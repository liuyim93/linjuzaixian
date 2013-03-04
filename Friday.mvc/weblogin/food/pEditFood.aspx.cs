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
using friday.core.EnumType;
using System.IO;
using friday.core.services;

namespace Friday.mvc.weblogin
{
    public partial class pEditFood : BasePage
    {
       
        IFoodService iFoodService = UnityHelper.UnityToT<IFoodService>();
        IRestaurantService iRestaurantService = UnityHelper.UnityToT<IRestaurantService>();
        IMerchantGoodsTypeService iMerchantGoodsTypeService = UnityHelper.UnityToT<IMerchantGoodsTypeService>();
        private Food f;
        MerchantCategory mCategory = new MerchantCategory();
        string mid;

        protected void Page_Load(object sender, EventArgs e)
        {
            string uid = Request.Params["uid"].ToString();
            mid = Request.Params["merchant_id"].ToString();

            this.tagName = systemFunctionObjectService.餐馆模块.菜品维护.TagName;
            this.PermissionCheck(PermissionTag.Edit);
           

            f = iFoodService.Load(uid);
            if (Request.Params["__EVENTVALIDATION"] != null)
            {

                SaveFood();
            }
            else
            {

                BindingHelper.ObjectToControl(f, this);
                this.ImagePreview.Src = f.Image;            
                Restaurant rst = iRestaurantService.Load(mid);
                IList<MerchantGoodsType> goodsTypes = iMerchantGoodsTypeService.GetGoodsTypeByMerchantID(rst.Id);
                foreach (var i in goodsTypes)
                {
                    this.GoodsType.Items.Add(i.GoodsType);
                }
                MerchantGoodsType  merchantGoodsType= iMerchantGoodsTypeService.Load(f.MerchantGoodsType.Id);
                this.GoodsType.Value = merchantGoodsType.GoodsType;

            }
        }

        private void SaveFood()
        {

            BindingHelper.RequestToObject(f);

            string filesnewName = PictureUpload.UploadImage(HttpContext.Current.Request.Files,"foodImage/");
            if (!string.IsNullOrEmpty(filesnewName))
            {
                f.Image = "/uploadimage/foodImage/" + filesnewName;
            }



            Restaurant restaurant = iRestaurantService.Load(mid);
            f.Restaurant = restaurant;
            f.MerchantGoodsType = iMerchantGoodsTypeService.GetGoodsTypeByTypeNameAndMerchantID(this.GoodsType.Value, restaurant.Id);


            iFoodService.Update(f);

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