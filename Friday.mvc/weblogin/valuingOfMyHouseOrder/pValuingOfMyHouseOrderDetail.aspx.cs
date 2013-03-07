using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using friday.core;
using friday.core.repositories;
using friday.core.components;
using friday.core.services;

namespace Friday.mvc.weblogin.valuingOfMyHouseOrder
{
    public partial class pValuingOfMyHouseOrderDetail : BasePage
    {
        IValuingOfMyHouseOrderService iValuingOfMyHouseOrderService = UnityHelper.UnityToT<IValuingOfMyHouseOrderService>();
        IMyHouseOrderService iMyHouseOrderService = UnityHelper.UnityToT<IMyHouseOrderService>();


        private ValuingOfMyHouseOrder valuingOfMyHouseOrder;
        private MyHouseOrder myHouseOrder = new MyHouseOrder();

        protected void Page_Load(object sender, EventArgs e)
        {
            string MyHouseOrderId = Request.Params["MyHouseOrderId"].ToString();
            myHouseOrder = iMyHouseOrderService.Load(MyHouseOrderId);

            BindingHelper.ObjectToControl(myHouseOrder, this);
            LoginName.Value = myHouseOrder.SystemUser.LoginUser.LoginName;
            Name.Value = myHouseOrder.Rent.Name;
        }
    }
}