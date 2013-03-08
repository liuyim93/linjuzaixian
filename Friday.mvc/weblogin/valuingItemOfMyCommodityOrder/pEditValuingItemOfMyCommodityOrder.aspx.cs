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

namespace Friday.mvc.weblogin.valuingItemOfMyCommodityOrder
{
    public partial class pEditValuingItemOfMyCommodityOrder : BasePage
    {
       IValuingItemOfMyCommodityOrderService iValuingItemOfMyCommodityOrderService = UnityHelper.UnityToT<IValuingItemOfMyCommodityOrderService>();

        private ValuingItemOfMyCommodityOrder valuingItemOfMyCommodityOrder;

        protected void Page_Load(object sender, EventArgs e)
        {
            valuingItemOfMyCommodityOrder = iValuingItemOfMyCommodityOrderService.Load(Request.Params["uid"].ToString());
            if (Request.Params["__EVENTVALIDATION"] != null)
            {

                SaveValuingItemOfMyCommodityOrder();
            }
            else
            {
                BindingHelper.ObjectToControl(valuingItemOfMyCommodityOrder, this);
            }
        }

        private void SaveValuingItemOfMyCommodityOrder()
        {

            BindingHelper.RequestToObject(valuingItemOfMyCommodityOrder);
            iValuingItemOfMyCommodityOrderService.Update(valuingItemOfMyCommodityOrder);

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