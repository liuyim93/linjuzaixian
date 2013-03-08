using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using friday.core.repositories;
using friday.core;
using friday.core.components;
using friday.core.domain;
using friday.core.services;

namespace Friday.mvc.weblogin.valuingOfMyCommodityOrder
{
    public partial class pEditValuingOfMyCommodityOrder : BasePage
    {
        IValuingOfMyCommodityOrderService iValuingOfMyCommodityOrderService = UnityHelper.UnityToT<IValuingOfMyCommodityOrderService>();
        IMyCommodityOrderService iMyCommodityOrderService = UnityHelper.UnityToT<IMyCommodityOrderService>();

        private ValuingOfMyCommodityOrder valuingOfMyCommodityOrder;
        private MyCommodityOrder myCommodityOrder;

        protected void Page_Load(object sender, EventArgs e)
        {
            this.tagName = systemFunctionObjectService.商店模块.商店订单评价管理.TagName;
            this.PermissionCheck(PermissionTag.Edit);

            string uid = Request.Params["uid"].ToString();
            valuingOfMyCommodityOrder = iValuingOfMyCommodityOrderService.Load(uid);
            myCommodityOrder = valuingOfMyCommodityOrder.MyCommodityOrder;

            if (Request.Params["__EVENTVALIDATION"] != null)
            {
                SaveValuingOfMyCommodityOrder();
            }
            else
            {
                BindingHelper.ObjectToControl(myCommodityOrder, this);
                BindingHelper.ObjectToControl(valuingOfMyCommodityOrder, this);

                OrderID.Value = myCommodityOrder.Id;
                LoginName.Value = valuingOfMyCommodityOrder.LoginUser.LoginName;
                MerchantName.Value = valuingOfMyCommodityOrder.Merchant.Name;

            }
        }

        private void SaveValuingOfMyCommodityOrder()
        {
            myCommodityOrder = iMyCommodityOrderService.Load(OrderID.Value);
            valuingOfMyCommodityOrder.LoginUser = myCommodityOrder.SystemUser.LoginUser;
            valuingOfMyCommodityOrder.Merchant = myCommodityOrder.Shop;
            valuingOfMyCommodityOrder.MyCommodityOrder = myCommodityOrder;

            BindingHelper.RequestToObject(valuingOfMyCommodityOrder);
            iValuingOfMyCommodityOrderService.Update(valuingOfMyCommodityOrder);

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