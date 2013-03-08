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

namespace Friday.mvc.weblogin.valuingItemOfMyHouseOrder
{
    public partial class pEditValuingItemOfMyHouseOrder : BasePage
    {
        IValuingItemOfMyHouseOrderService iValuingItemOfMyHouseOrderService = UnityHelper.UnityToT<IValuingItemOfMyHouseOrderService>();

        private ValuingItemOfMyHouseOrder valuingItemOfMyHouseOrder;

        protected void Page_Load(object sender, EventArgs e)
        {
            valuingItemOfMyHouseOrder = iValuingItemOfMyHouseOrderService.Load(Request.Params["uid"].ToString());
            if (Request.Params["__EVENTVALIDATION"] != null)
            {

                SaveValuingItemOfMyHouseOrder();
            }
            else
            {
                BindingHelper.ObjectToControl(valuingItemOfMyHouseOrder, this);
            }
        }

        private void SaveValuingItemOfMyHouseOrder()
        {

            BindingHelper.RequestToObject(valuingItemOfMyHouseOrder);
            iValuingItemOfMyHouseOrderService.Update(valuingItemOfMyHouseOrder);

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