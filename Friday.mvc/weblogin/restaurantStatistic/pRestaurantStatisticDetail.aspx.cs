using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using friday.core;
using friday.core.repositories;
using friday.core.components;
using friday.core.domain;
using friday.core.services;

namespace Friday.mvc.weblogin.restaurantStatistic
{
    public partial class pRestaurantStatisticDetail : BasePage
    {
        IRestaurantStatisticService iRestaurantStatisticService = UnityHelper.UnityToT<IRestaurantStatisticService>();
        private RestaurantStatistic restaurantStatistic;
        protected void Page_Load(object sender, EventArgs e)
        {
           
            string uid = Request.Params["uid"].ToString();
            restaurantStatistic = iRestaurantStatisticService.Load(uid);
            BindingHelper.ObjectToControl(restaurantStatistic, this);

            this.RestaurantName.Value = restaurantStatistic.Restaurant.Name;
            this.RestaurantName.Value = restaurantStatistic.Restaurant.Restaurant.Name;



        }
    }
}