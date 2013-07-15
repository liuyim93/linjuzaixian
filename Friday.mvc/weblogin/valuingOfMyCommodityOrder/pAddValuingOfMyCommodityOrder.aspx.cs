using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using friday.core.components;
using friday.core.domain;
using friday.core.repositories;
using friday.core;
using friday.core.services;

namespace Friday.mvc.weblogin.valuingOfMyCommodityOrder
{
    public partial class pAddValuingOfMyCommodityOrder : BasePage
    {
        IValuingOfMyCommodityOrderService iValuingOfMyCommodityOrderService = UnityHelper.UnityToT<IValuingOfMyCommodityOrderService>();
        IMyCommodityOrderService iMyCommodityOrderService = UnityHelper.UnityToT<IMyCommodityOrderService>();

        private ValuingOfMyCommodityOrder valuingOfMyCommodityOrder = new ValuingOfMyCommodityOrder();
        private MyCommodityOrder myCommodityOrder;

        protected void Page_Load(object sender, EventArgs e)
        {
            if (Request.Params["__EVENTVALIDATION"] != null)
            {
                tagName = systemFunctionObjectService.商店模块.商店订单评价管理.TagName;
                if (!this.PermissionValidate(PermissionTag.Enable))
                {
                    AjaxResult result = new AjaxResult();
                    result.statusCode = "300";
                    result.message = "没有ValuingOfMyCommodityOrder添加权限";
                    result.callbackType = "closeCurrent";
                    FormatJsonResult jsonResult = new FormatJsonResult();
                    jsonResult.Data = result;
                    Response.Write(jsonResult.FormatResult());
                    Response.End();
                }

                SaveValuingOfMyCommodityOrder();
            }
        }

        private void SaveValuingOfMyCommodityOrder()
        {
            myCommodityOrder = iMyCommodityOrderService.Load(OrderID.Value);
            valuingOfMyCommodityOrder.LoginUser = myCommodityOrder.SystemUser.LoginUser;
            valuingOfMyCommodityOrder.Merchant = myCommodityOrder.Shop;
            valuingOfMyCommodityOrder.MyCommodityOrder = myCommodityOrder;

            BindingHelper.RequestToObject(valuingOfMyCommodityOrder);
            iValuingOfMyCommodityOrderService.Save(valuingOfMyCommodityOrder);

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