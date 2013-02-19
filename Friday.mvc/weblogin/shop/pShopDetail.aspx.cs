using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using friday.core.repositories;
using friday.core;
using friday.core.domain;
using friday.core.components;

namespace Friday.mvc.weblogin.shop
{
    public partial class pShopDetail : System.Web.UI.Page
    {
        IRepository<Shop> iShopRepository = UnityHelper.UnityToT<IRepository<Shop>>();
        private Shop shop;
        protected void Page_Load(object sender, EventArgs e)
        {
            string uid = Request.Params["uid"].ToString();
            shop = iShopRepository.Load(uid);

            BindingHelper.ObjectToControl(shop, this);

        }
    }
}