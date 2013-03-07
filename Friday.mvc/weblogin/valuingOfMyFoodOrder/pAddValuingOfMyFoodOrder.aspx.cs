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

namespace Friday.mvc.weblogin.valuingOfMyFoodOrder
{
    public partial class pAddValuingOfMyFoodOrder : BasePage
    {
        IRepository<ValuingOfMyFoodOrder> iValuingOfMyFoodOrderRepository = UnityHelper.UnityToT<IRepository<ValuingOfMyFoodOrder>>();
        IRepository<MyFoodOrder> iMyFoodOrderRepository = UnityHelper.UnityToT<IRepository<MyFoodOrder>>();

        private ValuingOfMyFoodOrder valuingOfMyFoodOrder = new ValuingOfMyFoodOrder();
        private MyFoodOrder myFoodOrder;

        protected void Page_Load(object sender, EventArgs e)
        {
            if (Request.Params["__EVENTVALIDATION"] != null)
            {
                SaveValuingOfMyFoodOrder();
            }
        }

        private void SaveValuingOfMyFoodOrder()
        {
            myFoodOrder = iMyFoodOrderRepository.Get(OrderID.Value);
            valuingOfMyFoodOrder.LoginUser = myFoodOrder.SystemUser.LoginUser;
            valuingOfMyFoodOrder.Merchant = myFoodOrder.Restaurant;
            valuingOfMyFoodOrder.MyFoodOrder = myFoodOrder;

            BindingHelper.RequestToObject(valuingOfMyFoodOrder);
            iValuingOfMyFoodOrderRepository.SaveOrUpdate(valuingOfMyFoodOrder);

            AjaxResult result = new AjaxResult();
            FormatJsonResult jsonResult = new FormatJsonResult();

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