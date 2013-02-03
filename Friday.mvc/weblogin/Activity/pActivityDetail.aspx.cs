using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using friday.core;
using friday.core.repositories;
using friday.core.components;

namespace Friday.mvc.weblogin.rent
{
    public partial class pRentDetail : System.Web.UI.Page
    {
        IRepository<Rent> iRentRepository = UnityHelper.UnityToT<IRepository<Rent>>();
        private Rent Rent;
        protected void Page_Load(object sender, EventArgs e)
        {
            string uid = Request.Params["uid"].ToString();
            Rent = iRentRepository.Load(uid);

            BindingHelper.ObjectToControl(Rent, this);

        }
    }
}