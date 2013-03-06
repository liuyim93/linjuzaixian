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

namespace Friday.mvc.weblogin.valuingItemOfMyHouseOrder
{
    public partial class pEditValuingItemOfMyHouseOrder : BasePage
    {
        IRepository<ValuingItemOfMyHouseOrder> iValuingItemOfMyHouseOrderRepository = UnityHelper.UnityToT<IRepository<ValuingItemOfMyHouseOrder>>();

        private ValuingItemOfMyHouseOrder valuingItemOfMyHouseOrder;

        protected void Page_Load(object sender, EventArgs e)
        {
            valuingItemOfMyHouseOrder = iValuingItemOfMyHouseOrderRepository.Get(Request.Params["uid"].ToString());
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
            iValuingItemOfMyHouseOrderRepository.SaveOrUpdate(valuingItemOfMyHouseOrder);

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