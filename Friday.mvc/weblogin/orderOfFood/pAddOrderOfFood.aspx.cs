using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using friday.core.repositories;
using friday.core.domain;
using friday.core;
using friday.core.components;
using friday.core.services;

namespace Friday.mvc.weblogin
{
    public partial class pAddOrderOfFood : BasePage
    {
        protected string MyFoodOrderID;

        private IOrderOfFoodService iOrderOfFoodService = UnityHelper.UnityToT<IOrderOfFoodService>();
        private IMyFoodOrderService iMyFoodOrderService = UnityHelper.UnityToT<IMyFoodOrderService>();
        private IFoodRepository iFoodRepository = UnityHelper.UnityToT<IFoodRepository>();

        private MyFoodOrder myFoodOrder;
        private OrderOfFood orderOfFood = new OrderOfFood();
        private Food foodObj;

        protected void Page_Load(object sender, EventArgs e)
        {
            AjaxResult result = new AjaxResult();
            FormatJsonResult jsonResult = new FormatJsonResult();

            if (!this.PermissionValidate(PermissionTag.Enable))
            {
                result.statusCode = "300";
                result.message = "没有OrderOfFood增加权限";
                jsonResult.Data = result;
                Response.Write(jsonResult.FormatResult());
                Response.End();
            }
            if (Request.Params["__EVENTVALIDATION"] != null)
            {
                SaveOrderOfFood();
            }
        }

        private void SaveOrderOfFood()
        {
            AjaxResult result = new AjaxResult();
            FormatJsonResult jsonResult = new FormatJsonResult();

            myFoodOrder = iMyFoodOrderService.Load(Request.Params["myFoodOrder_id"]);
            foodObj = iFoodRepository.Get(Request.Params["FoodID"]);

            BindingHelper.RequestToObject(orderOfFood);
            orderOfFood.Food = foodObj;
            orderOfFood.MyFoodOrder = myFoodOrder;

            myFoodOrder.Price = myFoodOrder.Price + orderOfFood.Price;

            iOrderOfFoodService.Save(orderOfFood);
            iMyFoodOrderService.Update(myFoodOrder);

            result.statusCode = "200";
            result.message = "修改成功";
            result.navTabId = "referer";
            //2013-02-13 basilwang set rel_hook to panelId
            //if (Request.Params["rel_hook"] != null)
            //{
            //    result.panelId = Request.Params["rel_hook"];
            //}
            result.callbackType = "closeCurrent";
            jsonResult.Data = result;
            Response.Write(jsonResult.FormatResult());
            Response.End();

        }
    }
}