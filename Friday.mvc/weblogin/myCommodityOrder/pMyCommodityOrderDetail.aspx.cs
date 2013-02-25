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
    public partial class pMyCommodityOrderDetail : System.Web.UI.Page
    {
        IRepository<MyCommodityOrder> iMyCommodityOrderRepository = UnityHelper.UnityToT<IRepository<MyCommodityOrder>>();

        private MyCommodityOrder myCommodityOrder;

        protected void Page_Load(object sender, EventArgs e)
        {
            string uid = Request.Params["uid"].ToString();
            myCommodityOrder = iMyCommodityOrderRepository.Load(uid);

            BindingHelper.ObjectToControl(myCommodityOrder, this);
            LoginName.Value = myCommodityOrder.SystemUser.LoginUser.LoginName;
            Name.Value = myCommodityOrder.Shop.Name;
        }
    }
}