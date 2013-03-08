using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using friday.core;
using friday.core.repositories;
using friday.core.components;
using friday.core.services;
using friday.core.domain;

namespace Friday.mvc.weblogin.valuingOfMyHouseOrder
{
    public partial class pValuingOfMyHouseOrderDetail : BasePage
    {
        IValuingOfMyHouseOrderService iValuingOfMyHouseOrderService = UnityHelper.UnityToT<IValuingOfMyHouseOrderService>();
        IMyHouseOrderService iMyHouseOrderService = UnityHelper.UnityToT<IMyHouseOrderService>();


        private ValuingOfMyHouseOrder valuingOfMyHouseOrder;
        private MyHouseOrder myHouseOrder = new MyHouseOrder();

        protected void Page_Load(object sender, EventArgs e)
        {
            tagName = systemFunctionObjectService.租房模块.租房订单评价管理.TagName;
            if (!this.PermissionValidate(PermissionTag.Enable))
            {
                AjaxResult result = new AjaxResult();
                result.statusCode = "300";
                result.message = "没有ValuingOfMyHouseOrder浏览权限";
                FormatJsonResult jsonResult = new FormatJsonResult();
                jsonResult.Data = result;
                Response.Write(jsonResult.FormatResult());
                Response.End();
            }

            string MyHouseOrderId = Request.Params["MyHouseOrderId"].ToString();
            myHouseOrder = iMyHouseOrderService.Load(MyHouseOrderId);

            BindingHelper.ObjectToControl(myHouseOrder, this);
            LoginName.Value = myHouseOrder.SystemUser.LoginUser.LoginName;
            Name.Value = myHouseOrder.Rent.Name;
        }
    }
}