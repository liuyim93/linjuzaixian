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
    public partial class ListValuingItemOfMyFoodOrder : BasePage
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            IRepository<ValuingItemOfMyFoodOrder> repoValuingItemOfMyFoodOrder = UnityHelper.UnityToT<IRepository<ValuingItemOfMyFoodOrder>>();
            IList<ValuingItemOfMyFoodOrder> valuingItemOfMyFoodOrders = new List<ValuingItemOfMyFoodOrder>();
            valuingItemOfMyFoodOrders = repoValuingItemOfMyFoodOrder.GetAll();
            repeater.DataSource = valuingItemOfMyFoodOrders;
            repeater.DataBind();
        }
    }
}