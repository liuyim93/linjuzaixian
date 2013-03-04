﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using friday.core.repositories;
using friday.core;
using friday.core.components;

namespace Friday.mvc.weblogin
{
    public partial class ListMerchantByMerchantType : BasePage
    {
        protected long total;
        protected int pageNum;
        protected int numPerPageValue;

        protected string name;
        protected string owener;

        protected void Page_Load(object sender, EventArgs e)
        {
            numPerPageValue = Request.Form["numPerPage"] == null ? 10 : Convert.ToInt32(Request.Form["numPerPage"].ToString());
            pageNum = Request.Form["pageNum"] == null ? 1 : Convert.ToInt32(Request.Form["pageNum"].ToString());
            int start = (pageNum - 1) * numPerPageValue;
            int limit = numPerPageValue;

            IMerchantRepository repoMerchant = UnityHelper.UnityToT<IMerchantRepository>();
            IList<Merchant> merchants = new List<Merchant>();
            List<DataFilter> dfl = new List<DataFilter>();
            //List<DataFilter> merchantCategoryFilter = new List<DataFilter>();

            dfl.Add(new DataFilter() { type = "IsDelete" });

            dfl.Add(new DataFilter()
            {
                type = "MerchantType",
                value = Request.Params["MerchantType"]

            });

            if (!string.IsNullOrEmpty(Request.Form["Name"]))
                dfl.Add(new DataFilter()
                {
                    type = "Name",
                    value = name = Request.Form["Name"]

                });

            if (!string.IsNullOrEmpty(Request.Form["Owener"]))
                dfl.Add(new DataFilter()
                {
                    type = "Owener",
                    value = owener = Request.Form["Owener"]

                });

            //dfl.Add(new DataFilter() { type = "MerchantCategory", field = merchantCategoryFilter });

            List<DataFilter> dflForOrder = new List<DataFilter>();
            string orderField = string.IsNullOrEmpty(Request.Form["orderField"]) ? "CreateTime" : Request.Form["orderField"];
            string orderDirection = string.IsNullOrEmpty(Request.Form["orderDirection"]) ? "Desc" : Request.Form["orderDirection"];
            dflForOrder.Add(new DataFilter() { type = orderField, comparison = orderDirection });
            dfl.Add(new DataFilter() { type = "Order", field = dflForOrder });


            merchants = repoMerchant.Search(dfl, start, limit, out total);
            repeater.DataSource = merchants;
            repeater.DataBind();

            numPerPage.Value = numPerPageValue.ToString();
        }
    }
}