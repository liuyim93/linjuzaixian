using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using friday.core;
using friday.core.repositories;

namespace Friday.mvc.weblogin
{
    public partial class ListValuingItemOfMyCommodityOrder : BasePage
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            IRepository<ValuingItemOfMyCommodityOrder> repoValuingItemOfMyCommodityOrder = UnityHelper.UnityToT<IRepository<ValuingItemOfMyCommodityOrder>>();
            IList<ValuingItemOfMyCommodityOrder> valuingItemOfMyCommodityOrders = new List<ValuingItemOfMyCommodityOrder>();
            valuingItemOfMyCommodityOrders = repoValuingItemOfMyCommodityOrder.GetAll();
            repeater.DataSource = valuingItemOfMyCommodityOrders;
            repeater.DataBind();
        }
    }
}