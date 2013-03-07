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

namespace Friday.mvc.weblogin.valuingOfMyCommodityOrder
{
    public partial class pValuingOfMyCommodityOrderDetail : BasePage
    {
        IValuingOfMyCommodityOrderService iValuingOfMyCommodityOrderService = UnityHelper.UnityToT<IValuingOfMyCommodityOrderService>();
        IMyCommodityOrderService iMyCommodityOrderService = UnityHelper.UnityToT<IMyCommodityOrderService>();


        private ValuingOfMyCommodityOrder valuingOfMyCommodityOrder;
        private MyCommodityOrder myCommodityOrder = new MyCommodityOrder();

        protected void Page_Load(object sender, EventArgs e)
        {
            string MyCommodityOrderId = Request.Params["MyCommodityOrderId"].ToString();
            myCommodityOrder = iMyCommodityOrderService.Load(MyCommodityOrderId);

            BindingHelper.ObjectToControl(myCommodityOrder, this);
            LoginName.Value = myCommodityOrder.SystemUser.LoginUser.LoginName;
            Name.Value = myCommodityOrder.Shop.Name;
        }
    }
}