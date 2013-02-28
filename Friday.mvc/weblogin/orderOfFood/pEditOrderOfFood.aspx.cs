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

namespace Friday.mvc.weblogin
{
    public partial class pEditOrderOfFood : BasePage
    {
        protected string MyFoodOrderID;

        private IOrderOfFoodRepository iOrderOfFoodRepository = UnityHelper.UnityToT<IOrderOfFoodRepository>();
        private IMyFoodOrderRepository iMyFoodOrderRepository = UnityHelper.UnityToT<IMyFoodOrderRepository>();
        private IFoodRepository iFoodRepository = UnityHelper.UnityToT<IFoodRepository>();

        private MyFoodOrder myFoodOrder;
        private OrderOfFood orderOfFood;
        private Food foodObj;

        protected void Page_Load(object sender, EventArgs e)
        {
            string uid = Request.Params["uid"].ToString();
            orderOfFood = iOrderOfFoodRepository.Load(uid);

            if (Request.Params["__EVENTVALIDATION"] != null)
            {
                SaveOrderOfFood();
            }
            else
            {
                BindingHelper.ObjectToControl(orderOfFood, this);
                Food.Value = orderOfFood.Food.Name;
                FoodID.Value = orderOfFood.Food.Id;
                OnePrice.Value = orderOfFood.Food.Price.ToString();
                OldPrice.Value = orderOfFood.Price.ToString();
            }
        }

        private void SaveOrderOfFood()
        {
            myFoodOrder = iMyFoodOrderRepository.Get(Request.Params["myFoodOrder_id"]);
            foodObj = iFoodRepository.Get(Request.Params["FoodID"]);

            BindingHelper.RequestToObject(orderOfFood);
            orderOfFood.Food = foodObj;
            orderOfFood.MyFoodOrder = myFoodOrder;

            myFoodOrder.Price = myFoodOrder.Price - Convert.ToDouble(OldPrice.Value) + orderOfFood.Price;

            iOrderOfFoodRepository.SaveOrUpdate(orderOfFood);
            iMyFoodOrderRepository.SaveOrUpdate(myFoodOrder);

            AjaxResult result = new AjaxResult();
            result.statusCode = "200";
            result.message = "修改成功";
            result.navTabId = "referer";
            //2013-02-13 basilwang set rel_hook to panelId
            //if (Request.Params["rel_hook"] != null)
            //{
            //    result.panelId = Request.Params["rel_hook"];
            //}
            result.callbackType = "closeCurrent";
            FormatJsonResult jsonResult = new FormatJsonResult();
            jsonResult.Data = result;
            Response.Write(jsonResult.FormatResult());
            Response.End();

        }
    }
}