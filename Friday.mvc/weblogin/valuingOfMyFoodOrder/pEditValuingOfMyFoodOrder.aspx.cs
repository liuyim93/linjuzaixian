using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using friday.core.domain;
using friday.core.components;
using friday.core.repositories;
using friday.core;
using friday.core.services;

namespace Friday.mvc.weblogin.valuingOfMyFoodOrder
{
    public partial class pEditValuingOfMyFoodOrder : BasePage
    {
        IValuingOfMyFoodOrderService iValuingOfMyFoodOrderService = UnityHelper.UnityToT<IValuingOfMyFoodOrderService>();
        IMyFoodOrderService iMyFoodOrderService = UnityHelper.UnityToT<IMyFoodOrderService>();

        private ValuingOfMyFoodOrder valuingOfMyFoodOrder;
        private MyFoodOrder myFoodOrder;

        protected void Page_Load(object sender, EventArgs e)
        {
            string uid = Request.Params["uid"].ToString();

            this.tagName = systemFunctionObjectService.餐馆模块.餐馆订单评价管理.TagName;
            this.PermissionCheck(PermissionTag.Edit);


            valuingOfMyFoodOrder = iValuingOfMyFoodOrderService.Load(uid);
            myFoodOrder = valuingOfMyFoodOrder.MyFoodOrder;

            if (Request.Params["__EVENTVALIDATION"] != null)
            {
                SaveValuingOfMyFoodOrder();
            }
            else
            {
                BindingHelper.ObjectToControl(myFoodOrder, this);
                BindingHelper.ObjectToControl(valuingOfMyFoodOrder, this);

                OrderID.Value = myFoodOrder.Id;
                LoginName.Value = valuingOfMyFoodOrder.LoginUser.LoginName;
                MerchantName.Value = valuingOfMyFoodOrder.Merchant.Name;

            }
        }

        private void SaveValuingOfMyFoodOrder()
        {
            myFoodOrder = iMyFoodOrderService.Load(OrderID.Value);
            valuingOfMyFoodOrder.LoginUser = myFoodOrder.SystemUser.LoginUser;
            valuingOfMyFoodOrder.Merchant = myFoodOrder.Restaurant;
            valuingOfMyFoodOrder.MyFoodOrder = myFoodOrder;

            BindingHelper.RequestToObject(valuingOfMyFoodOrder);
            iValuingOfMyFoodOrderService.Update(valuingOfMyFoodOrder);

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