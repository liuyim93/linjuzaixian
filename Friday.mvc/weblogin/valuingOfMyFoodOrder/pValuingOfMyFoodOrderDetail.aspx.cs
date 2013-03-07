using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using friday.core.repositories;
using friday.core;
using friday.core.components;
using friday.core.services;

namespace Friday.mvc.weblogin.valuingOfMyFoodOrder
{
    public partial class pValuingOfMyFoodOrderDetail : BasePage
    {
        IValuingOfMyFoodOrderService iValuingOfMyFoodOrderService = UnityHelper.UnityToT<IValuingOfMyFoodOrderService>();
        IMyFoodOrderService iMyFoodOrderService = UnityHelper.UnityToT<IMyFoodOrderService>();

        private ValuingOfMyFoodOrder valuingOfMyFoodOrder;
        private MyFoodOrder myFoodOrder = new MyFoodOrder();

        protected void Page_Load(object sender, EventArgs e)
        {
            string MyFoodOrderId = Request.Params["MyFoodOrderId"].ToString();
            myFoodOrder = iMyFoodOrderService.Load(MyFoodOrderId);

            BindingHelper.ObjectToControl(myFoodOrder, this);
            LoginName.Value = myFoodOrder.SystemUser.LoginUser.LoginName;
            Name.Value = myFoodOrder.Restaurant.Name;
        }
    }
}