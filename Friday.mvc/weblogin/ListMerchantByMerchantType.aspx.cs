using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using friday.core.repositories;
using friday.core;
using friday.core.components;
using friday.core.services;

namespace Friday.mvc.weblogin
{
    public partial class ListMerchantByMerchantType : BasePage
    {
        protected long total;
        protected int pageNum;
        protected int numPerPageValue;

        protected string name;
        protected string owener;
        protected string merchantType;

        protected void Page_Load(object sender, EventArgs e)
        {
            numPerPageValue = Request.Form["numPerPage"] == null ? 10 : Convert.ToInt32(Request.Form["numPerPage"].ToString());
            pageNum = Request.Form["pageNum"] == null ? 1 : Convert.ToInt32(Request.Form["pageNum"].ToString());
            int start = (pageNum - 1) * numPerPageValue;
            int limit = numPerPageValue;

            IMerchantService iMerchantService = UnityHelper.UnityToT<IMerchantService>();
            IList<Merchant> merchants = new List<Merchant>();

            List<DataFilter> dfl = new List<DataFilter>();

            dfl.Add(new DataFilter() { type = "IsDelete" });

            if (Request.Form["MerchantType"] != null)
            {
                merchantType = Request.Form["MerchantType"];
            }
            else
            {
                merchantType = Request.Params["MerchantType"];
            }

                dfl.Add(new DataFilter()
                 {
                     type = "MerchantType",
                     value = merchantType
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

            List<DataFilter> dflForOrder = new List<DataFilter>();
            string orderField = string.IsNullOrEmpty(Request.Form["orderField"]) ? "CreateTime" : Request.Form["orderField"];
            string orderDirection = string.IsNullOrEmpty(Request.Form["orderDirection"]) ? "Desc" : Request.Form["orderDirection"];
            dflForOrder.Add(new DataFilter() { type = orderField, comparison = orderDirection });
            dfl.Add(new DataFilter() { type = "Order", field = dflForOrder });


            merchants = iMerchantService.Search(dfl, start, limit, out total);
            repeater.DataSource = merchants;
            repeater.DataBind();

            numPerPage.Value = numPerPageValue.ToString();
        }
    }
}