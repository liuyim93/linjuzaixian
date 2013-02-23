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
            IRepository<Restaurant> repoRestaurant = UnityHelper.UnityToT<IRepository<Restaurant>>();
            IFoodRepository repoFood = UnityHelper.UnityToT<IFoodRepository>();

            IList<Food> foods = new List<Food>();

            string restaurant_id;

            if (Request.Form["restaurant_id"] != null)
            {
                restaurant_id = Request.Form["restaurant_id"];
            }
            else
            {
                restaurant_id = Request.Params["restaurant_id"];
            }

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