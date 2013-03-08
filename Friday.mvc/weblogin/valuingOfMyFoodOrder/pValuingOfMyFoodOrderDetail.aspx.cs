using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using friday.core.repositories;
using friday.core;
using friday.core.components;
using friday.core.services;
using friday.core.domain;

namespace Friday.mvc.weblogin.valuingOfMyFoodOrder
{
    public partial class pValuingOfMyFoodOrderDetail : BasePage
    {
        IValuingOfMyFoodOrderService iValuingOfMyFoodOrderService = UnityHelper.UnityToT<IValuingOfMyFoodOrderService>();
        IMyFoodOrderService iMyFoodOrderService = UnityHelper.UnityToT<IMyFoodOrderService>();

        private ValuingOfMyFoodOrder valuingOfMyFoodOrder;
        private MyFoodOrder myFoodOrder = new MyFoodOrder();

        protected void Page_Load(object sender, EventArgs e)
        {
            tagName = systemFunctionObjectService.餐馆模块.餐馆订单评价管理.TagName;
            if (!this.PermissionValidate(PermissionTag.Enable))
            {
                AjaxResult result = new AjaxResult();
                result.statusCode = "300";
                result.message = "没有ValuingOfMyFoodOrder浏览权限";
                FormatJsonResult jsonResult = new FormatJsonResult();
                jsonResult.Data = result;
                Response.Write(jsonResult.FormatResult());
                Response.End();
            }
            string MyFoodOrderId = Request.Params["MyFoodOrderId"].ToString();
            myFoodOrder = iMyFoodOrderService.Load(MyFoodOrderId);

            BindingHelper.ObjectToControl(myFoodOrder, this);
            LoginName.Value = myFoodOrder.SystemUser.LoginUser.LoginName;
            Name.Value = myFoodOrder.Restaurant.Name;
        }
    }
}