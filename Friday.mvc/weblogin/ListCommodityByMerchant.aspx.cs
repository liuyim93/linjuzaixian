using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using friday.core.repositories;
using friday.core;
using friday.core.components;
using friday.core.domain;

namespace Friday.mvc.weblogin
{
    public partial class ListCommodityByMerchant : BasePage
    {
        protected long total;
        protected int pageNum;
        protected int numPerPageValue;
        protected string merchantType;
        protected string merchtId;

        protected string name;
        protected string startprice;
        protected string endprice;

        protected void Page_Load(object sender, EventArgs e)
        {
            numPerPageValue = Request.Form["numPerPage"] == null ? 10 : Convert.ToInt32(Request.Form["numPerPage"].ToString());
            pageNum = Request.Form["pageNum"] == null ? 1 : Convert.ToInt32(Request.Form["pageNum"].ToString());
            int start = (pageNum - 1) * numPerPageValue;
            int limit = numPerPageValue;

            IRepository<Restaurant> repoRestaurant = UnityHelper.UnityToT<IRepository<Restaurant>>();

            IRepository<Merchant> repoMerchant = UnityHelper.UnityToT<IRepository<Merchant>>();
            IFoodRepository repoFood = UnityHelper.UnityToT<IFoodRepository>();

            IList<Food> foods = new List<Food>();

            List<DataFilter> dfl = new List<DataFilter>();
            List<DataFilter> merchantDfl = new List<DataFilter>();

            if (!string.IsNullOrEmpty(Request.Form["Name"]))
            { 
                dfl.Add(new DataFilter()
                {
                    type = "Name",
                    value = name = Request.Form["Name"]

                });
             }

            if (!string.IsNullOrEmpty(this.MerchantID.Value))
            {
                merchtId = this.MerchantID.Value;
                merchantType = Convert.ToString((int)repoMerchant.Load(merchtId).MerchantType);
              if(merchantType=="0")
               {              
                merchantDfl.Add(new DataFilter()
                {
                    type = "Restaurant",
                    value = merchtId
                });
                dfl.Add(new DataFilter()
                {
                    type = "Restaurant",
                    field = merchantDfl
                });
              }
            } 

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

            foods = repoFood.Search(dfl, start, limit, out total);
            repeater.DataSource = foods;
            repeater.DataBind();
        }
    }
}