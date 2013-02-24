using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using friday.core;
using friday.core.repositories;
using friday.core.components;

namespace Friday.mvc.weblogin
{
    public partial class ListHouseByRent : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            IRepository<Rent> repoRent = UnityHelper.UnityToT<IRepository<Rent>>();
            IHouseRepository repoHouse = UnityHelper.UnityToT<IHouseRepository>();

            IList<House> houses = new List<House>();

            string rent_id;

            if (Request.Form["rent_id"] != null)
            {
                rent_id = Request.Form["rent_id"];
            }
            else
            {
                rent_id = Request.Params["rent_id"];
            }

            List<DataFilter> dfl = new List<DataFilter>();

            if (!string.IsNullOrEmpty(rent_id))
            {
                dfl.Add(new DataFilter() { type = "Rent", value = rent_id });
            }

            dfl.Add(new DataFilter() { type = "IsDelete"});

            houses = repoHouse.Search(dfl);
            repeater.DataSource = houses;
            repeater.DataBind();
        }
    }
}
