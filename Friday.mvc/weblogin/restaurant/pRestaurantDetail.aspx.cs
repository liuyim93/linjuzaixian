using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using friday.core;
using friday.core.repositories;
using friday.core.components;

namespace Friday.mvc.weblogin.restaurant
{
    public partial class pRestaurantDetail : System.Web.UI.Page
    {
        IRepository<Restaurant> iRestaurantRepository = UnityHelper.UnityToT<IRepository<Restaurant>>();
        private Restaurant Restaurant;
        protected void Page_Load(object sender, EventArgs e)
        {
            string uid = Request.Params["uid"].ToString();
            Restaurant = iRestaurantRepository.Load(uid);

            BindingHelper.ObjectToControl(Restaurant, this);

        }
    }
}