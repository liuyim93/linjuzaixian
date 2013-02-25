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

namespace Friday.mvc.weblogin
{
    public partial class pEditFood : System.Web.UI.Page
    {
        private IRepository<Food> repository = UnityHelper.UnityToT<IRepository<Food>>();
        private Food f;

        IRestaurantRepository restRepository = UnityHelper.UnityToT<IRestaurantRepository>();
        IMerchantGoodsTypeRepository mGoodsTypeRepository = UnityHelper.UnityToT<IMerchantGoodsTypeRepository>();
        MerchantCategory mCategory = new MerchantCategory();
        string mid;

        protected void Page_Load(object sender, EventArgs e)
        {
            string uid = Request.Params["uid"].ToString();
            mid = Request.Params["merchant_id"].ToString();

            f = repository.Load(uid);
            if (Request.Params["__EVENTVALIDATION"] != null)
            {

                SaveFood();
            }
            else
            {

                BindingHelper.ObjectToControl(f, this);
                this.ImagePreview.Src = f.Image;            
                Restaurant rst = restRepository.Get(mid);
                IList<MerchantGoodsType> goodsTypes = mGoodsTypeRepository.GetGoodsTypeByMerchantID(rst.Id);
                foreach (var i in goodsTypes)
                {
                    this.GoodsType.Items.Add(i.GoodsType);
                }
                MerchantGoodsType  merchantGoodsType= mGoodsTypeRepository.Get(f.MerchantGoodsType.Id);
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



            Restaurant restaurant = restRepository.Get(mid);
            f.Restaurant = restaurant;
            f.MerchantGoodsType = mGoodsTypeRepository.GetGoodsTypeByTypeNameAndMerchantID(this.GoodsType.Value, restaurant.Id);
            

            repository.SaveOrUpdate(f);

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