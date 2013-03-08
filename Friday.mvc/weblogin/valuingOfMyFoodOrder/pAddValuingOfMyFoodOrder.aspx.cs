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
    public partial class pAddValuingOfMyFoodOrder : BasePage
    {
        IValuingOfMyFoodOrderService iValuingOfMyFoodOrderService = UnityHelper.UnityToT<IValuingOfMyFoodOrderService>();
        IMyFoodOrderService iMyFoodOrderService = UnityHelper.UnityToT<IMyFoodOrderService>();

        private ValuingOfMyFoodOrder valuingOfMyFoodOrder = new ValuingOfMyFoodOrder();
        private MyFoodOrder myFoodOrder;

        protected void Page_Load(object sender, EventArgs e)
        {
            if (Request.Params["__EVENTVALIDATION"] != null)
            {
                tagName = systemFunctionObjectService.餐馆模块.餐馆订单评价管理.TagName;
                if (!this.PermissionValidate(PermissionTag.Enable))
                {
                    AjaxResult result = new AjaxResult();
                    result.statusCode = "300";
                    result.message = "没有ValuingOfMyFoodOrder添加权限";
                    FormatJsonResult jsonResult = new FormatJsonResult();
                    jsonResult.Data = result;
                    Response.Write(jsonResult.FormatResult());
                    Response.End();
                }

                SaveValuingOfMyFoodOrder();
            }
        }

        private void SaveValuingOfMyFoodOrder()
        {
            myFoodOrder = iMyFoodOrderService.Load(OrderID.Value);
            valuingOfMyFoodOrder.LoginUser = myFoodOrder.SystemUser.LoginUser;
            valuingOfMyFoodOrder.Merchant = myFoodOrder.Restaurant;
            valuingOfMyFoodOrder.MyFoodOrder = myFoodOrder;

            BindingHelper.RequestToObject(valuingOfMyFoodOrder);
            iValuingOfMyFoodOrderService.Save(valuingOfMyFoodOrder);

            AjaxResult result = new AjaxResult();
            FormatJsonResult jsonResult = new FormatJsonResult();

            result.statusCode = "200";
            result.message = "添加成功";
            result.navTabId = "referer";
            result.callbackType = "closeCurrent";
            jsonResult.Data = result;
            Response.Write(jsonResult.FormatResult());
            Response.End();
        }
    }
}