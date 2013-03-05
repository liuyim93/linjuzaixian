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
            if (Request.Form["MerchantType"] != null)
            {
                merchantType = Request.Form["MerchantType"];
            }
            else
            {
                merchantType = Request.Params["MerchantType"];
            }

            numPerPageValue = Request.Form["numPerPage"] == null ? 10 : Convert.ToInt32(Request.Form["numPerPage"].ToString());
            pageNum = Request.Form["pageNum"] == null ? 1 : Convert.ToInt32(Request.Form["pageNum"].ToString());
            int start = (pageNum - 1) * numPerPageValue;
            int limit = numPerPageValue;

            IRepository<Restaurant> repoRestaurant = UnityHelper.UnityToT<IRepository<Restaurant>>();     
            IFoodRepository repoFood = UnityHelper.UnityToT<IFoodRepository>();
            IList<Food> foods = new List<Food>();

            IRepository<Rent> repoRent = UnityHelper.UnityToT<IRepository<Rent>>();
            IHouseRepository repoHouse = UnityHelper.UnityToT<IHouseRepository>();
            IList<House> houses = new List<House>();

            IRepository<Shop> repoShop = UnityHelper.UnityToT<IRepository<Shop>>();
            ICommodityRepository repoCommodity = UnityHelper.UnityToT<ICommodityRepository>();
            IList<Commodity> commoditys = new List<Commodity>();

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
              else if (merchantType == "1")
              {
                  merchantDfl.Add(new DataFilter()
                  {
                      type = "Rent",
                      value = merchtId
                  });
                  dfl.Add(new DataFilter()
                  {
                      type = "Rent",
                      field = merchantDfl
                  });

              }
              else 
              {
                  merchantDfl.Add(new DataFilter()
                  {
                      type = "Shop",
                      value = merchtId
                  });
                  dfl.Add(new DataFilter()
                  {
                      type = "Shop",
                      field = merchantDfl
                  });            
              }
            }         

            dfl.Add(new DataFilter() { type = "IsDelete"});

            List<DataFilter> dflForOrder = new List<DataFilter>();
            string orderField = string.IsNullOrEmpty(Request.Form["orderField"]) ? "CreateTime" : Request.Form["orderField"];
            string orderDirection = string.IsNullOrEmpty(Request.Form["orderDirection"]) ? "Desc" : Request.Form["orderDirection"];
            dflForOrder.Add(new DataFilter() { type = orderField, comparison = orderDirection });
            dfl.Add(new DataFilter() { type = "Order", field = dflForOrder });

            if (merchantType == "0")
            {
                foods = repoFood.Search(dfl, start, limit, out total);
                repeater.DataSource = foods;
            }
            if (merchantType == "1")
            {
                houses = repoHouse.Search(dfl, start, limit, out total);
                repeater.DataSource = houses;
            }
            if (merchantType == "2")
            {
                commoditys = repoCommodity.Search(dfl, start, limit, out total);
                repeater.DataSource = commoditys;
            }        
            
            repeater.DataBind();
        }
    }
}