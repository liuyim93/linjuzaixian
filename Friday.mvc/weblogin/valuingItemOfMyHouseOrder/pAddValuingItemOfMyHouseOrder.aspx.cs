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

namespace Friday.mvc.weblogin.valuingItemOfMyHouseOrder
{
    public partial class pAddValuingItemOfMyHouseOrder : BasePage
    {
        IRepository<ValuingItemOfMyHouseOrder> iValuingItemOfMyHouseOrderRepository = UnityHelper.UnityToT<IRepository<ValuingItemOfMyHouseOrder>>();

        private ValuingItemOfMyHouseOrder valuingItemOfMyHouseOrder;

        protected void Page_Load(object sender, EventArgs e)
        {
            if (Request.Params["__EVENTVALIDATION"] != null)
            {

                SaveValuingItemOfMyHouseOrder();
            }
        }

        private void SaveValuingItemOfMyHouseOrder()
        {
            AjaxResult result = new AjaxResult();
            FormatJsonResult jsonResult = new FormatJsonResult();

            valuingItemOfMyHouseOrder = new ValuingItemOfMyHouseOrder();
            BindingHelper.RequestToObject(valuingItemOfMyHouseOrder);
            iValuingItemOfMyHouseOrderRepository.SaveOrUpdate(valuingItemOfMyHouseOrder);

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