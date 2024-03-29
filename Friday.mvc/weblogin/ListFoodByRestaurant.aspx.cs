﻿using System;
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
    public partial class ListFoodByRestaurant : BasePage
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

            IRestaurantService iRestaurantService = UnityHelper.UnityToT<IRestaurantService>();
            IFoodService iFoodService = UnityHelper.UnityToT<IFoodService>();

            IList<Food> foods = new List<Food>();

            string restaurant_id;

            if (Request.Form["restaurant_id"] != null)
            {
                restaurant_id = Request.Form["restaurant_id"];
            }
            else
            {
                restaurant_id = Request.Params["restaurant_id"];
            }

            List<DataFilter> dfl = new List<DataFilter>();
            List<DataFilter> RestaurantFilter = new List<DataFilter>();

            if (!string.IsNullOrEmpty(restaurant_id))
            {
                RestaurantFilter.Add(new DataFilter() { type = "Restaurant", value = restaurant_id });
                dfl.Add(new DataFilter() { type = "Restaurant", field = RestaurantFilter });
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

            foods = iFoodService.Search(dfl, start, limit, out total);
            repeater.DataSource = foods;
            repeater.DataBind();
        }
    }
}