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

namespace Friday.mvc.weblogin
{
    public partial class MultiListMerchant : BasePage
    {
        protected long total;
        protected int pageNum;
        protected int numPerPageValue;

        protected string name;
        protected string merchantType;
        protected string address;
        IMerchantRepository iMerchantRepository = UnityHelper.UnityToT<IMerchantRepository>();
        protected void Page_Load(object sender, EventArgs e)
        {
            numPerPageValue = Request.Form["numPerPage"] == null ? 5 : Convert.ToInt32(Request.Form["numPerPage"].ToString());
            pageNum = Request.Form["pageNum"] == null ? 1 : Convert.ToInt32(Request.Form["pageNum"].ToString());
            int start = (pageNum - 1) * numPerPageValue;
            int limit = numPerPageValue;

            List<DataFilter> filterList = new List<DataFilter>();
            if (!string.IsNullOrEmpty(Request.Form["Name"]))
                filterList.Add(new DataFilter()
                {
                    type = "Name",
                    value = name = Request.Form["Name"]

                });
            if (!string.IsNullOrEmpty(Request.Form["sMerchantType"]))
                filterList.Add(new DataFilter()
                {
                    type = "MerchantType",
                    value = merchantType = Request.Form["sMerchantType"]

                });
            //if (!string.IsNullOrEmpty(Request.Form["Address"]))
            //    filterList.Add(new DataFilter()
            //    {
            //        type = "Address",
            //        value = address = Request.Form["Address"]

            //    });
            
            IList<Merchant> merchantList = iMerchantRepository.Search(filterList, start, limit, out total);

            repeater.DataSource = merchantList;
            repeater.DataBind();

            numPerPage.Value = numPerPageValue.ToString();
        }
    }
}