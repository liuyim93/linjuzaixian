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

namespace Friday.mvc.weblogin.rentStatistic
{
    public partial class pRentStatisticDetail : BasePage
    {
        IRentStatisticService iRentStatisticService = UnityHelper.UnityToT<IRentStatisticService>();
        private RentStatistic rentStatistic;
        protected void Page_Load(object sender, EventArgs e)
        {
           
            string uid = Request.Params["uid"].ToString();
            rentStatistic = iRentStatisticService.Load(uid);
            BindingHelper.ObjectToControl(rentStatistic, this);

            this.Name.Value = rentStatistic.Rent.Name;



        }
    }
}