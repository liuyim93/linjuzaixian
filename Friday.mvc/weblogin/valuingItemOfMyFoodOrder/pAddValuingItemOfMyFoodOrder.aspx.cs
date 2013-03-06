using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using friday.core.components;
using friday.core.domain;
using friday.core.repositories;
using friday.core;

namespace Friday.mvc.weblogin.valuingItemOfMyFoodOrder
{
    public partial class pAddValuingItemOfMyFoodOrder : System.Web.UI.Page
    {
        IRepository<ValuingItemOfMyFoodOrder> iValuingItemOfMyFoodOrderRepository = UnityHelper.UnityToT<IRepository<ValuingItemOfMyFoodOrder>>();

        private ValuingItemOfMyFoodOrder valuingItemOfMyFoodOrder;

        protected void Page_Load(object sender, EventArgs e)
        {
            if (Request.Params["__EVENTVALIDATION"] != null)
            {

                SaveValuingItemOfMyFoodOrder();
            }
        }

        private void SaveValuingItemOfMyFoodOrder()
        {
            AjaxResult result = new AjaxResult();
            FormatJsonResult jsonResult = new FormatJsonResult();

            valuingItemOfMyFoodOrder = new ValuingItemOfMyFoodOrder();
            BindingHelper.RequestToObject(valuingItemOfMyFoodOrder);
            iValuingItemOfMyFoodOrderRepository.SaveOrUpdate(valuingItemOfMyFoodOrder);

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