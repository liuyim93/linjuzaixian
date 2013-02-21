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
using System.IO;

namespace Friday.mvc.weblogin
{
    public partial class pAddFood : System.Web.UI.Page
    {
    
        protected void Page_Load(object sender, EventArgs e)
        {

            if (Request.Params["__EVENTVALIDATION"] != null)
            {

                SaveFood();
            }
            else 
            {
                IRestaurantRepository restRepository = UnityHelper.UnityToT<IRestaurantRepository>();
                string shtname = "leermei9";
                Restaurant restaurant = restRepository.SearchByShortName(shtname);
                MerchantCategory mCategory = new MerchantCategory();
                 IMerchantGoodsTypeRepository merchantGoodsTypeRepository = UnityHelper.UnityToT<IMerchantGoodsTypeRepository>();
                restaurant.MerchantGoodsTypes
                this.GoodsType.Attributes.Add();
     
            
            }

        }

        private void SaveFood()
        {    
             IRepository<Food> repository = UnityHelper.UnityToT<IRepository<Food>>();
             Food f=new Food();

            BindingHelper.RequestToObject(f);

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
                            File.Delete(System.Web.HttpContext.Current.Request.MapPath("~/uploadimage/foodImage/") + filesnewName);
                        }
                        postedFile.SaveAs(System.Web.HttpContext.Current.Request.MapPath("~/uploadimage/foodImage/") + filesnewName);
                    }
                }
            }
            catch (System.Exception Ex)
            {
            }
            if (!string.IsNullOrEmpty(filesnewName))
            {
                f.Image = "/uploadimage/foodImage/" + filesnewName;
            }
            string foodType;
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

            IRestaurantRepository restRepository = UnityHelper.UnityToT<IRestaurantRepository>();
            string shtname = "leermei9";
            Restaurant restaurant = restRepository.SearchByShortName(shtname);
            f.Restaurant = restaurant;

            
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