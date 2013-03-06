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

namespace Friday.mvc.weblogin.valuingItemOfMyCommodityOrder
{
    public partial class pEditValuingItemOfMyCommodityOrder : BasePage
    {
        IRepository<ValuingItemOfMyCommodityOrder> iValuingItemOfMyCommodityOrderRepository = UnityHelper.UnityToT<IRepository<ValuingItemOfMyCommodityOrder>>();

        private ValuingItemOfMyCommodityOrder valuingItemOfMyCommodityOrder;

        protected void Page_Load(object sender, EventArgs e)
        {
            valuingItemOfMyCommodityOrder = iValuingItemOfMyCommodityOrderRepository.Get(Request.Params["uid"].ToString());
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
            iValuingItemOfMyCommodityOrderRepository.SaveOrUpdate(valuingItemOfMyCommodityOrder);

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