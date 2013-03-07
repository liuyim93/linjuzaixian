using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using friday.core.repositories;
using friday.core;

namespace Friday.mvc.weblogin
{
    public partial class ListValuingItemOfMyHouseOrder : BasePage
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            IRepository<ValuingItemOfMyHouseOrder> repoValuingItemOfMyHouseOrder = UnityHelper.UnityToT<IRepository<ValuingItemOfMyHouseOrder>>();
            IList<ValuingItemOfMyHouseOrder> valuingItemOfMyHouseOrders = new List<ValuingItemOfMyHouseOrder>();
            valuingItemOfMyHouseOrders = repoValuingItemOfMyHouseOrder.GetAll();
            repeater.DataSource = valuingItemOfMyHouseOrders;
            repeater.DataBind();
        }
    }
}