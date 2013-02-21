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

namespace Friday.mvc.weblogin
{
    public partial class pEditFood : System.Web.UI.Page
    {
        private IRepository<Food> repository = UnityHelper.UnityToT<IRepository<Food>>();
        private Food f;
        protected void Page_Load(object sender, EventArgs e)
        {
            string uid = Request.Params["uid"].ToString();
            f = repository.Load(uid);
            if (Request.Params["__EVENTVALIDATION"] != null)
            {

                SaveFood();
            }
            else
            {

                BindingHelper.ObjectToControl(f, this);
                //LogoPreview.Src = f.Image;
                //string foodType = f.FoodType.ToString();
                //Type.Value = foodType;
                //otherType.Value = f.FoodType.FoodType;

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
            //string foodType;
            //ShopFoodTypeRepository shopFoodTypeR = new ShopFoodTypeRepository();
            //if (string.IsNullOrEmpty(Type.Value))
            //{
            //    foodType = Request.Form["otherType"];
            //}
            //else
            //{
            //    foodType = Type.Value;
            //}
            //Shop shop = f.Shop;

            //List<DataFilter> dfl = new List<DataFilter>();
            //dfl.Add(new DataFilter() { type = "FoodType", value = foodType });
            //dfl.Add(new DataFilter() { type = "Shop", value = shop.Id });

            //IList<ShopFoodType> shopFoodTypes = shopFoodTypeR.Search(dfl);
            //if (shopFoodTypes.Count == 0)
            //{
            //    ShopFoodType newshopFoodType = new ShopFoodType();
            //    newshopFoodType.FoodType = foodType;
            //    //双向代理
            //    newshopFoodType.Shop = shop;
            //    shop.ShopFoodTypes.Add(newshopFoodType);
            //    //刷新数据库以免出错
            //    shopFoodTypeR.SaveOrUpdate(newshopFoodType);

            //    f.FoodType = newshopFoodType;



            //}
            //else
            //{
            //    foreach (ShopFoodType type in shopFoodTypes)
            //    {
            //        f.FoodType = type;
            //    }
            //}


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