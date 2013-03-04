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

namespace Friday.mvc.weblogin.orderOfCommodity
{
    public partial class pAddOrderOfCommodity : BasePage
    {
        protected string MyCommodityOrderID;

        IOrderOfCommodityService iOrderOfCommodityService = UnityHelper.UnityToT<IOrderOfCommodityService>();
        IMyCommodityOrderService iMyCommodityOrderService = UnityHelper.UnityToT<IMyCommodityOrderService>();
        ICommodityService iCommodityService = UnityHelper.UnityToT<ICommodityService>();

        private MyCommodityOrder myCommodityOrder;
        private OrderOfCommodity orderOfCommodity = new OrderOfCommodity();
        private Commodity commodityObj;

        protected void Page_Load(object sender, EventArgs e)
        {
            AjaxResult result = new AjaxResult();
            FormatJsonResult jsonResult = new FormatJsonResult();

            tagName = systemFunctionObjectService.商店模块.商品订单明细维护.TagName;
            if (!this.PermissionValidate(PermissionTag.Edit))
            {
                result.statusCode = "300";
                result.message = "没有OrderOfCommodity增加权限";
                jsonResult.Data = result;
                Response.Write(jsonResult.FormatResult());
                Response.End();
            }

            if (Request.Params["__EVENTVALIDATION"] != null)
            {
                SaveOrderOfCommodity();
            }
        }

        private void SaveOrderOfCommodity()
        {
            myCommodityOrder = iMyCommodityOrderService.Load(Request.Params["myCommodityOrder_id"]);
            commodityObj = iCommodityService.Load(Request.Params["CommodityID"]);

            BindingHelper.RequestToObject(orderOfCommodity);
            orderOfCommodity.Commodity = commodityObj;
            orderOfCommodity.MyCommodityOrder = myCommodityOrder;

            myCommodityOrder.Price = myCommodityOrder.Price + orderOfCommodity.Price;

            iOrderOfCommodityService.Save(orderOfCommodity);
            iMyCommodityOrderService.Save(myCommodityOrder);

            AjaxResult result = new AjaxResult();
            result.statusCode = "200";
            result.message = "修改成功";
            result.navTabId = "referer";
            //2013-02-13 basilwang set rel_hook to panelId
            if (Request.Params["rel_hook"] != null)
            {
                result.panelId = Request.Params["rel_hook"];
            }
            result.callbackType = "closeCurrent";
            FormatJsonResult jsonResult = new FormatJsonResult();
            jsonResult.Data = result;
            Response.Write(jsonResult.FormatResult());
            Response.End();

        }
    }
}