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

namespace Friday.mvc.weblogin.foodStatistic
{
    public partial class pFoodStatisticDetail : BasePage
    {
        IFoodStatisticService iFoodStatisticService = UnityHelper.UnityToT<IFoodStatisticService>();
        private FoodStatistic foodStatistic;
        protected void Page_Load(object sender, EventArgs e)
        {
           
            string uid = Request.Params["uid"].ToString();
            foodStatistic = iFoodStatisticService.Load(uid);
            BindingHelper.ObjectToControl(foodStatistic, this);

            this.FoodName.Value = foodStatistic.Food.Name;
            this.RestaurantName.Value = foodStatistic.Food.Restaurant.Name;



        }
    }
}