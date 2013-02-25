using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using friday.core.repositories;
using friday.core;
using friday.core.components;

namespace Friday.mvc.weblogin
{
    public partial class pMyHouseOrderDetail : System.Web.UI.Page
    {
        IRepository<MyHouseOrder> iMyHouseOrderRepository = UnityHelper.UnityToT<IRepository<MyHouseOrder>>();

        private MyHouseOrder myHouseOrder;

        protected void Page_Load(object sender, EventArgs e)
        {
            string uid = Request.Params["uid"].ToString();
            myHouseOrder = iMyHouseOrderRepository.Load(uid);

            BindingHelper.ObjectToControl(myHouseOrder, this);
            LoginName.Value = myHouseOrder.SystemUser.LoginUser.LoginName;
            Name.Value = myHouseOrder.Rent.Name;
        }
    }
}