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
using friday.core.services;

namespace Friday.mvc.weblogin
{
    public partial class ListCommodityByShop : BasePage
    {
        protected void Page_Load(object sender, EventArgs e)
        {

            IShopService iShopService = UnityHelper.UnityToT<IShopService>();
            ICommodityService iCommodityService = UnityHelper.UnityToT<ICommodityService>();

            IList<Commodity> commoditys = new List<Commodity>();

            string shop_id;

            if (Request.Form["shop_id"] != null)
            {
                shop_id = Request.Form["shop_id"];
            }
            else
            {
                shop_id = Request.Params["shop_id"];
            }

            List<DataFilter> dfl = new List<DataFilter>();

            if (!string.IsNullOrEmpty(shop_id))
            {
                dfl.Add(new DataFilter() { type = "Shop", value = shop_id });
            }

            dfl.Add(new DataFilter() { type = "IsDelete"});

            commoditys = iCommodityService.Search(dfl);
            repeater.DataSource = commoditys;
            repeater.DataBind();
        }
    }
}