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

namespace Friday.mvc.weblogin.houseStatistic
{
    public partial class pHouseStatisticDetail : BasePage
    {
        IHouseStatisticService iHouseStatisticService = UnityHelper.UnityToT<IHouseStatisticService>();
        private HouseStatistic houseStatistic;
        protected void Page_Load(object sender, EventArgs e)
        {
           
            string uid = Request.Params["uid"].ToString();
            houseStatistic = iHouseStatisticService.Load(uid);
            BindingHelper.ObjectToControl(houseStatistic, this);

            this.HouseName.Value = houseStatistic.House.Name;
            this.RentName.Value = houseStatistic.House.Rent.Name;



        }
    }
}