using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using friday.core.domain;
using friday.core.components;
using friday.core.repositories;
using Microsoft.Practices.Unity;
using friday.core;

namespace Friday.mvc.weblogin
{
    public partial class pFoodList : System.Web.UI.Page
    {
        protected long total;
        protected int pageNum;
        protected int numPerPageValue;


        public string restaurantId;
        public string name;
        public string startprice;
        public string endprice;
        //public string owenType;
        public string goodsType;
        public string mid;

        private IFoodRepository iFoodRepository = UnityHelper.UnityToT<IFoodRepository>();
        IRestaurantRepository restRepository = UnityHelper.UnityToT<IRestaurantRepository>();
        IMerchantGoodsTypeRepository mGoodsTypeRepository = UnityHelper.UnityToT<IMerchantGoodsTypeRepository>();

        protected void Page_Load(object sender, EventArgs e)
        {
              

                if (Request.Params["flag"] != "alldelete")
                {
                    SearchFood();
                }
                else
                {
                    DeleteFood();
                }
           
        }
       


        private void DeleteFood()
        {
            string foodid = Request.Params["food_id"];

            iFoodRepository.Delete(foodid);
            AjaxResult result = new AjaxResult();
            result.statusCode = "200";
            result.message = "操作成功";
            FormatJsonResult jsonResult = new FormatJsonResult();
            jsonResult.Data = result;
            Response.Write(jsonResult.FormatResult());
            Response.End();
        }
        private void SearchFood()
        {

            //在这里初始化ShopId
            numPerPageValue = Request.Form["numPerPage"] == null ? 5 : Convert.ToInt32(Request.Form["numPerPage"].ToString());
            if (Request.Form["restaurant_id"] != null)
            {
                restaurantId = Request.Form["restaurant_id"];
            }
            else
            {
                restaurantId = Request.Params["restaurant_id"];
            }

            pageNum = Request.Form["pageNum"] == null ? 1 : Convert.ToInt32(Request.Form["pageNum"].ToString());
            int start = (pageNum - 1) * numPerPageValue;
            int limit = numPerPageValue;
            IList<Food> foodList = null;
            List<DataFilter> dfl = new List<DataFilter>();

            startprice = Request.Form["StartPrice"];
            endprice = Request.Form["EndPrice"];
            if (!string.IsNullOrEmpty(startprice))
            {
                if (!string.IsNullOrEmpty(endprice))
                {
                    dfl.Add(new DataFilter() { type = "Price", value = startprice, valueForCompare = endprice });
                }
            }

            name = Request.Form["Name"];
            if (!string.IsNullOrEmpty(name))
            {
                dfl.Add(new DataFilter() { type = "Name", value = name });
            }

            //owenType = Request.Form["owenType"];
           
            goodsType = Request.Form["mGoodsType"];
            if (!string.IsNullOrEmpty(goodsType))
            {
                MerchantGoodsType mectGType = mGoodsTypeRepository.GetGoodsTypeByTypeNameAndMerchantID(goodsType, restaurantId);
                string mectGTypeID = mectGType.Id;
                dfl.Add(new DataFilter() { type = "GoodsType", value = mectGTypeID });
                //dfl.Add(new DataFilter() { type = "MerchantGoodsType_id", value = mectGTypeID });
               // dfl.Add(new DataFilter() { type = "GoodsType", value = goodsType });
            }
            //else
            //{
            //    if (!string.IsNullOrEmpty(owenType))
            //    {
            //        dfl.Add(new DataFilter() { type = "FoodType", value = owenType });
            //    }
            //}


            if (!string.IsNullOrEmpty(restaurantId))
            {
                dfl.Add(new DataFilter() { type = "Restaurant", value = restaurantId });
            }

            List<DataFilter> dflForOrder = new List<DataFilter>();
            string orderField = string.IsNullOrEmpty(Request.Form["orderField"]) ? "CreateTime" : Request.Form["orderField"];
            string orderDirection = string.IsNullOrEmpty(Request.Form["orderDirection"]) ? "Desc" : Request.Form["orderDirection"];
            dflForOrder.Add(new DataFilter() { type = orderField, comparison = orderDirection });
            //dflForOrder.Add(new DataFilter() { type = "FoodType", comparison = "Desc" });
            //dflForOrder.Add(new DataFilter() { type = "Price" });
            dfl.Add(new DataFilter() { type = "Order", field = dflForOrder });

            foodList = iFoodRepository.Search(dfl, start, limit, out total);
            repeater.DataSource = foodList;
            repeater.DataBind();

            if (Request.Params["__EVENTVALIDATION"] == null)
          {
            Restaurant rst = restRepository.Get(restaurantId);
            IList<MerchantGoodsType> goodsTypes = mGoodsTypeRepository.GetGoodsTypeByMerchantID(rst.Id);
            foreach (var i in goodsTypes)
            {
                this.mGoodsType.Items.Add(i.GoodsType);
            }
         
            }



            numPerPage.Value = numPerPageValue.ToString();
        }
    }
}