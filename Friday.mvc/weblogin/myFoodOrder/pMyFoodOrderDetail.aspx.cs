using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using friday.core.repositories;
using friday.core;
using friday.core.components;

namespace Friday.mvc.weblogin.myFoodOrder
{
    public partial class pMyFoodOrderDetail : System.Web.UI.Page
    {
        IRepository<MyFoodOrder> iMyFoodOrderRepository = UnityHelper.UnityToT<IRepository<MyFoodOrder>>();

        private MyFoodOrder myFoodOrder;

        protected void Page_Load(object sender, EventArgs e)
        {
            string uid = Request.Params["uid"].ToString();
            myFoodOrder = iMyFoodOrderRepository.Load(uid);

            BindingHelper.ObjectToControl(myFoodOrder, this);
            LoginName.Value = myFoodOrder.SystemUser.LoginUser.LoginName;
            Name.Value = myFoodOrder.Restaurant.Name;
        }
    }
}