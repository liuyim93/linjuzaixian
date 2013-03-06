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

namespace Friday.mvc.weblogin.shopStatistic
{
    public partial class pShopStatisticDetail : BasePage
    {
        IShopStatisticService iShopStatisticService = UnityHelper.UnityToT<IShopStatisticService>();
        private ShopStatistic shopStatistic;
        protected void Page_Load(object sender, EventArgs e)
        {
           
            string uid = Request.Params["uid"].ToString();
            shopStatistic = iShopStatisticService.Load(uid);
            BindingHelper.ObjectToControl(shopStatistic, this);

            this.Name.Value = shopStatistic.Shop.Name;



        }
    }
}