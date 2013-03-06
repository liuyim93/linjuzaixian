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

namespace Friday.mvc.weblogin.valuingItemOfMyFoodOrder
{
    public partial class pEditValuingItemOfMyFoodOrder : System.Web.UI.Page
    {
        IRepository<ValuingItemOfMyFoodOrder> iValuingItemOfMyFoodOrderRepository = UnityHelper.UnityToT<IRepository<ValuingItemOfMyFoodOrder>>();

        private ValuingItemOfMyFoodOrder valuingItemOfMyFoodOrder;

        protected void Page_Load(object sender, EventArgs e)
        {
            valuingItemOfMyFoodOrder = iValuingItemOfMyFoodOrderRepository.Get(Request.Params["uid"].ToString());
            if (Request.Params["__EVENTVALIDATION"] != null)
            {

                SaveValuingItemOfMyFoodOrder();
            }
            else
            {
                BindingHelper.ObjectToControl(valuingItemOfMyFoodOrder, this);
            }
        }

        private void SaveValuingItemOfMyFoodOrder()
        {

            BindingHelper.RequestToObject(valuingItemOfMyFoodOrder);
            iValuingItemOfMyFoodOrderRepository.SaveOrUpdate(valuingItemOfMyFoodOrder);

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