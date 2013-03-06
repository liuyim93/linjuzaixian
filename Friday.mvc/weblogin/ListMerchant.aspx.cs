using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using friday.core.repositories;
using friday.core.domain;
using friday.core;
using friday.core.services;

namespace Friday.mvc.weblogin
{
    public partial class ListMerchant : BasePage
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            IMerchantService iMerchantService = UnityHelper.UnityToT<IMerchantService>();
            IList<Merchant> merchants = new List<Merchant>();
            merchants = iMerchantService.GetAll();
            repeater.DataSource = merchants;
            repeater.DataBind();
        }
    }
}