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

namespace Friday.mvc.weblogin.commodityStatistic
{
    public partial class pCommodityStatisticDetail : BasePage
    {
        ICommodityStatisticService iCommodityStatisticService = UnityHelper.UnityToT<ICommodityStatisticService>();
        private CommodityStatistic commodityStatistic;
        protected void Page_Load(object sender, EventArgs e)
        {
           
            string uid = Request.Params["uid"].ToString();
            commodityStatistic = iCommodityStatisticService.Load(uid);
            BindingHelper.ObjectToControl(commodityStatistic, this);

            this.CommodityName.Value = commodityStatistic.Commodity.Name;
            this.ShopName.Value = commodityStatistic.Commodity.Shop.Name;



        }
    }
}