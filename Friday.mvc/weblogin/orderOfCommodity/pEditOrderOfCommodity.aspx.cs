using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using friday.core.repositories;
using friday.core;
using friday.core.domain;
using friday.core.components;

namespace Friday.mvc.weblogin
{
    public partial class pEditOrderOfCommodity : BasePage
    {
        protected string MyCommodityOrderID;

        private IOrderOfCommodityRepository iOrderOfCommodityRepository = UnityHelper.UnityToT<IOrderOfCommodityRepository>();
        private IMyCommodityOrderRepository iMyCommodityOrderRepository = UnityHelper.UnityToT<IMyCommodityOrderRepository>();
        private ICommodityRepository iCommodityRepository = UnityHelper.UnityToT<ICommodityRepository>();

        private MyCommodityOrder myCommodityOrder;
        private OrderOfCommodity orderOfCommodity;
        private Commodity commodityObj;

        protected void Page_Load(object sender, EventArgs e)
        {
            string uid = Request.Params["uid"].ToString();
            orderOfCommodity = iOrderOfCommodityRepository.Load(uid);

            if (Request.Params["__EVENTVALIDATION"] != null)
            {
                SaveOrderOfCommodity();
            }
            else
            {
                BindingHelper.ObjectToControl(orderOfCommodity, this);
                Commodity.Value = orderOfCommodity.Commodity.Name;
                CommodityID.Value = orderOfCommodity.Commodity.Id;
                OnePrice.Value = orderOfCommodity.Commodity.Price.ToString();
                OldPrice.Value = orderOfCommodity.Price.ToString();
            }
        }

        private void SaveOrderOfCommodity()
        {
            myCommodityOrder = iMyCommodityOrderRepository.Get(Request.Params["myCommodityOrder_id"]);
            commodityObj = iCommodityRepository.Get(Request.Params["CommodityID"]);

            BindingHelper.RequestToObject(orderOfCommodity);
            orderOfCommodity.Commodity = commodityObj;
            orderOfCommodity.MyCommodityOrder = myCommodityOrder;

            myCommodityOrder.Price = myCommodityOrder.Price - Convert.ToDouble(OldPrice.Value) + orderOfCommodity.Price;

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