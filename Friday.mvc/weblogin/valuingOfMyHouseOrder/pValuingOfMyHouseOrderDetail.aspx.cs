using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using friday.core;
using friday.core.repositories;
using friday.core.components;

namespace Friday.mvc.weblogin.valuingOfMyHouseOrder
{
    public partial class pValuingOfMyHouseOrderDetail : BasePage
    {
        IRepository<ValuingOfMyHouseOrder> iValuingOfMyHouseOrderRepository = UnityHelper.UnityToT<IRepository<ValuingOfMyHouseOrder>>();
        IRepository<MyHouseOrder> iMyHouseOrderRepository = UnityHelper.UnityToT<IRepository<MyHouseOrder>>();

        private ValuingOfMyHouseOrder valuingOfMyHouseOrder;
        private MyHouseOrder myHouseOrder = new MyHouseOrder();

        protected void Page_Load(object sender, EventArgs e)
        {
            string MyHouseOrderId = Request.Params["MyHouseOrderId"].ToString();
            myHouseOrder = iMyHouseOrderRepository.Load(MyHouseOrderId);

            BindingHelper.ObjectToControl(myHouseOrder, this);
            LoginName.Value = myHouseOrder.SystemUser.LoginUser.LoginName;
            Name.Value = myHouseOrder.Rent.Name;
        }
    }
}