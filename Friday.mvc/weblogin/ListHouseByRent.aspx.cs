using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using friday.core;
using friday.core.repositories;
using friday.core.components;
using friday.core.services;

namespace Friday.mvc.weblogin
{
    public partial class ListHouseByRent : BasePage
    {
        protected long total;
        protected int pageNum;
        protected int numPerPageValue;

        protected string name;
        protected string startprice;
        protected string endprice;

        protected void Page_Load(object sender, EventArgs e)
        {
            numPerPageValue = Request.Form["numPerPage"] == null ? 10 : Convert.ToInt32(Request.Form["numPerPage"].ToString());
            pageNum = Request.Form["pageNum"] == null ? 1 : Convert.ToInt32(Request.Form["pageNum"].ToString());
            int start = (pageNum - 1) * numPerPageValue;
            int limit = numPerPageValue;

            IRentService iRentService = UnityHelper.UnityToT<IRentService>();
            IHouseService iHouseService = UnityHelper.UnityToT<IHouseService>();

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

            if (!string.IsNullOrEmpty(Request.Form["Name"]))
                dfl.Add(new DataFilter()
                {
                    type = "Name",
                    value = name = Request.Form["Name"]

                });

            startprice = Request.Form["StartPrice"];
            endprice = Request.Form["EndPrice"];
            if (!string.IsNullOrEmpty(startprice))
            {
                if (!string.IsNullOrEmpty(endprice))
                {
                    dfl.Add(new DataFilter() { type = "Price", value = startprice, valueForCompare = endprice });
                }
            }

            dfl.Add(new DataFilter() { type = "IsDelete"});

            List<DataFilter> dflForOrder = new List<DataFilter>();
            string orderField = string.IsNullOrEmpty(Request.Form["orderField"]) ? "CreateTime" : Request.Form["orderField"];
            string orderDirection = string.IsNullOrEmpty(Request.Form["orderDirection"]) ? "Desc" : Request.Form["orderDirection"];
            dflForOrder.Add(new DataFilter() { type = orderField, comparison = orderDirection });
            dfl.Add(new DataFilter() { type = "Order", field = dflForOrder });

            houses = iHouseService.Search(dfl, start, limit, out total);
            repeater.DataSource = houses;
            repeater.DataBind();

            numPerPage.Value = numPerPageValue.ToString();
        }
    }
}
