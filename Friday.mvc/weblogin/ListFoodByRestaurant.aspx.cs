using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using friday.core.repositories;
using friday.core;
using friday.core.components;
using friday.core.domain;

namespace Friday.mvc.weblogin
{
    public partial class ListFoodByRestaurant : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            IRepository<MyFoodOrder> repoMyFoodOrder = UnityHelper.UnityToT<IRepository<MyFoodOrder>>();
            IFoodRepository repoFood = UnityHelper.UnityToT<IFoodRepository>();

            IList<Food> foods = new List<Food>();

            string myFoodOrder_id;
            string restaurant_id;

            if (Request.Form["myFoodOrder_id"] != null)
            {
                myFoodOrder_id = Request.Form["myFoodOrder_id"];
            }
            else
            {
                myFoodOrder_id = Request.Params["myFoodOrder_id"];
            }

            restaurant_id = repoMyFoodOrder.Get(myFoodOrder_id).Restaurant.Id;

            List<DataFilter> dfl = new List<DataFilter>();

            if (!string.IsNullOrEmpty(restaurant_id))
            {
                dfl.Add(new DataFilter() { type = "Restaurant", value = restaurant_id });
            }

            dfl.Add(new DataFilter() { type = "IsDelete"});

            foods = repoFood.Search(dfl);
            repeater.DataSource = foods;
            repeater.DataBind();
        }
    }
}