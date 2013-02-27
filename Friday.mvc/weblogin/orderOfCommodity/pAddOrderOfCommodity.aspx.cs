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

namespace Friday.mvc.weblogin.orderOfCommodity
{
    public partial class pAddOrderOfCommodity : System.Web.UI.Page
    {
        protected string MyCommodityOrderID;

        private IOrderOfCommodityRepository iOrderOfCommodityRepository = UnityHelper.UnityToT<IOrderOfCommodityRepository>();
        private IMyCommodityOrderRepository iMyCommodityOrderRepository = UnityHelper.UnityToT<IMyCommodityOrderRepository>();
        private ICommodityRepository iCommodityRepository = UnityHelper.UnityToT<ICommodityRepository>();

        private MyCommodityOrder myCommodityOrder;
        private OrderOfCommodity orderOfCommodity = new OrderOfCommodity();
        private Commodity commodityObj;

        protected void Page_Load(object sender, EventArgs e)
        {
            if (Request.Params["__EVENTVALIDATION"] != null)
            {
                SaveOrderOfCommodity();
            }
        }

        private void SaveOrderOfCommodity()
        {
            myCommodityOrder = iMyCommodityOrderRepository.Get(Request.Params["myCommodityOrder_id"]);
            commodityObj = iCommodityRepository.Get(Request.Params["CommodityID"]);

            BindingHelper.RequestToObject(orderOfCommodity);
            orderOfCommodity.Commodity = commodityObj;
            orderOfCommodity.MyCommodityOrder = myCommodityOrder;

            myCommodityOrder.Price = myCommodityOrder.Price + orderOfCommodity.Price;

            iOrderOfCommodityRepository.SaveOrUpdate(orderOfCommodity);
            iMyCommodityOrderRepository.SaveOrUpdate(myCommodityOrder);

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