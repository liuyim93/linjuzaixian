using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using friday.core.domain;
using friday.core.components;
using friday.core.repositories;
using friday.core;

namespace Friday.mvc.weblogin.valuingItemOfMyCommodityOrder
{
    public partial class pAddValuingItemOfMyCommodityOrder : BasePage
    {
        IRepository<ValuingItemOfMyCommodityOrder> iValuingItemOfMyCommodityOrderRepository = UnityHelper.UnityToT<IRepository<ValuingItemOfMyCommodityOrder>>();

        private ValuingItemOfMyCommodityOrder valuingItemOfMyCommodityOrder;

        protected void Page_Load(object sender, EventArgs e)
        {
            if (Request.Params["__EVENTVALIDATION"] != null)
            {

                SaveValuingItemOfMyCommodityOrder();
            }
        }

        private void SaveValuingItemOfMyCommodityOrder()
        {
            AjaxResult result = new AjaxResult();
            FormatJsonResult jsonResult = new FormatJsonResult();

            valuingItemOfMyCommodityOrder = new ValuingItemOfMyCommodityOrder();
            BindingHelper.RequestToObject(valuingItemOfMyCommodityOrder);
            iValuingItemOfMyCommodityOrderRepository.SaveOrUpdate(valuingItemOfMyCommodityOrder);

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