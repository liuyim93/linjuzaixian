using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using friday.core.domain;
using friday.core.repositories;
using friday.core;
using friday.core.components;
using friday.core.services;

namespace Friday.mvc.weblogin
{
    public partial class ListPropID : BasePage
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            string merchantID = "";
            IPropIDService iPropIDService = UnityHelper.UnityToT<IPropIDService>();
            IList<PropID> propIDs = new List<PropID>();
            if (!this.CurrentUser.IsAdmin)
            {
                merchantID = this.CurrentUser.LoginUserOfMerchants.SingleOrDefault().Merchant.Id;
                propIDs = iPropIDService.GetPropIDByMerchantID(merchantID);
            }
            else
            {
                propIDs = iPropIDService.GetAll();
            }

            repeater.DataSource = propIDs;
            repeater.DataBind();
        }
    }
}