using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using friday.core.repositories;
using friday.core.domain;
using friday.core;

namespace Friday.mvc.weblogin
{
    public partial class ListMerchant : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            IRepository<Merchant> repoMerchant = UnityHelper.UnityToT<IRepository<Merchant>>();
            IList<Merchant> merchants = new List<Merchant>();
            merchants = repoMerchant.GetAll();
            repeater.DataSource = merchants;
            repeater.DataBind();
        }
    }
}