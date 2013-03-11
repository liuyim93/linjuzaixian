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
using friday.core.services;

namespace Friday.mvc.weblogin
{
    public partial class pFoodList : BasePage
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
        public string merchantID;

        IFoodService iFoodService = UnityHelper.UnityToT<IFoodService>();
        IRestaurantService iRestaurantService = UnityHelper.UnityToT<IRestaurantService>();
        IMerchantGoodsTypeService iMerchantGoodsTypeService = UnityHelper.UnityToT<IMerchantGoodsTypeService>();

        protected void Page_Load(object sender, EventArgs e)
        {
            tagName = systemFunctionObjectService.餐馆模块.菜品维护.TagName;
            this.PermissionCheck();

        
                if (Request.Params["flag"] != "alldelete")
                {
                    SearchFood();
                }
                else
                {
                    AjaxResult result = new AjaxResult();
                    FormatJsonResult jsonResult = new FormatJsonResult();

                    tagName = systemFunctionObjectService.餐馆模块.菜品维护.TagName;
                    if (!this.PermissionValidate(PermissionTag.Delete))
                    {
                        result.statusCode = "300";
                        result.message = "没有Food删除权限";
                        jsonResult.Data = result;
                        Response.Write(jsonResult.FormatResult());
                        Response.End();
                    }
                    DeleteFood();
                }           
        }
       


        private void DeleteFood()
        {
            string foodid = Request.Params["food_id"];

            iFoodService.Delete(foodid);
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

            if (!this.CurrentUser.IsAdmin)
            {
                restaurantId = this.CurrentUser.LoginUserOfMerchants.SingleOrDefault().Merchant.Id;
            }
            //if (Request.Form["restaurant_id"] != null)
            //{
            //    restaurantId = Request.Form["restaurant_id"];
            //}
            //else
            //{
            //    restaurantId = Request.Params["restaurant_id"];
            //}

            pageNum = Request.Form["pageNum"] == null ? 1 : Convert.ToInt32(Request.Form["pageNum"].ToString());
            int start = (pageNum - 1) * numPerPageValue;
            int limit = numPerPageValue;
            IList<Food> foodList = null;
            List<DataFilter> dfl = new List<DataFilter>();
            List<DataFilter> Restaurantdfl = new List<DataFilter>();

            if (!this.CurrentUser.IsAdmin)
            {
                Restaurantdfl.Add(new DataFilter()
                {
                    type = "Restaurant",
                    value = restaurantId

                });
                dfl.Add(new DataFilter()
                {
                    type = "Restaurant",
                    field = Restaurantdfl
                });
            }
            else 
            {
               
            
            }
            //if (!string.IsNullOrEmpty(restaurantId))
            //{
            //    Restaurantdfl.Add(new DataFilter() 
            //    { 
            //        type = "Restaurant",
            //        value = restaurantId 
            //    });
            //    dfl.Add(new DataFilter() 
            //    { 
            //        type = "Restaurant", 
            //        field = Restaurantdfl 
            //    });
            //}
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
                MerchantGoodsType mectGType = iMerchantGoodsTypeService.GetGoodsTypeByTypeNameAndMerchantID(goodsType, restaurantId);
                string mectGTypeID = mectGType.Id;
                dfl.Add(new DataFilter() { type = "GoodsType", value = mectGTypeID });
                
            }
       

         

            List<DataFilter> dflForOrder = new List<DataFilter>();
            string orderField = string.IsNullOrEmpty(Request.Form["orderField"]) ? "CreateTime" : Request.Form["orderField"];
            string orderDirection = string.IsNullOrEmpty(Request.Form["orderDirection"]) ? "Desc" : Request.Form["orderDirection"];
            dflForOrder.Add(new DataFilter() { type = orderField, comparison = orderDirection });
            dfl.Add(new DataFilter() { type = "Order", field = dflForOrder });

            foodList = iFoodService.Search(dfl, start, limit, out total);
            repeater.DataSource = foodList;
            repeater.DataBind();

            if (Request.Params["__EVENTVALIDATION"] == null)
           {
               Restaurant rst=new Restaurant();
                    IList<MerchantGoodsType> goodsTypes=new List<MerchantGoodsType>();
               if (!this.CurrentUser.IsAdmin)
               {
                   goodsTypes = iMerchantGoodsTypeService.GetGoodsTypeByMerchantID( this.CurrentUser.LoginUserOfMerchants.SingleOrDefault().Merchant.Id);
               }
               else 
               {
                    goodsTypes = iMerchantGoodsTypeService.GetAll();            
               }
              
         
            foreach (var i in goodsTypes)
            {
                this.mGoodsType.Items.Add(i.GoodsType);
            }
         
            }



            numPerPage.Value = numPerPageValue.ToString();
        }
    }
}