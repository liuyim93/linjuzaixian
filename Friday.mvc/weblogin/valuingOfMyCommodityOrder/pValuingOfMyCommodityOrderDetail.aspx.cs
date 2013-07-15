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

namespace Friday.mvc.weblogin.valuingOfMyCommodityOrder
{
    public partial class pValuingOfMyCommodityOrderDetail : BasePage
    {
        IValuingOfMyCommodityOrderService iValuingOfMyCommodityOrderService = UnityHelper.UnityToT<IValuingOfMyCommodityOrderService>();
        IMyCommodityOrderService iMyCommodityOrderService = UnityHelper.UnityToT<IMyCommodityOrderService>();


        private ValuingOfMyCommodityOrder valuingOfMyCommodityOrder;
        private MyCommodityOrder myCommodityOrder = new MyCommodityOrder();

        protected void Page_Load(object sender, EventArgs e)
        {
            tagName = systemFunctionObjectService.商店模块.商店订单评价管理.TagName;
            if (!this.PermissionValidate(PermissionTag.Enable))
            {
                AjaxResult result = new AjaxResult();
                result.statusCode = "300";
                result.message = "没有ValuingOfMyCommodityOrder浏览权限";
                result.callbackType = "closeCurrent";
                FormatJsonResult jsonResult = new FormatJsonResult();
                jsonResult.Data = result;
                Response.Write(jsonResult.FormatResult());
                Response.End();
            }

            string MyCommodityOrderId = Request.Params["MyCommodityOrderId"].ToString();
            myCommodityOrder = iMyCommodityOrderService.Load(MyCommodityOrderId);

            BindingHelper.ObjectToControl(myCommodityOrder, this);
            LoginName.Value = myCommodityOrder.SystemUser.LoginUser.LoginName;
            Name.Value = myCommodityOrder.Shop.Name;
        }
    }
}