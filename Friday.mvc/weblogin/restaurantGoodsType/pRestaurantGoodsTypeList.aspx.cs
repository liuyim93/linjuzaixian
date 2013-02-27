using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using friday.core.domain;
using friday.core.components;
using friday.core.repositories;
using Microsoft.Practices.Unity;
using friday.core;

namespace Friday.mvc.weblogin
{
    public partial class pRestaurantGoodsTypeList : System.Web.UI.Page
    {
        protected long total;
        protected int pageNum;
        protected int numPerPageValue;


        public string restaurantId;
        public string name;
        public string startprice;
        public string endprice;
        //public string owenType;
        public string goodsType;
        public string mid;

        private IMerchantGoodsTypeRepository iMerchantGoodsTypeRepository = UnityHelper.UnityToT<IMerchantGoodsTypeRepository>();
        IRestaurantRepository restRepository = UnityHelper.UnityToT<IRestaurantRepository>();
        IMerchantGoodsTypeRepository mGoodsTypeRepository = UnityHelper.UnityToT<IMerchantGoodsTypeRepository>();

        protected void Page_Load(object sender, EventArgs e)
        {
              

                if (Request.Params["flag"] != "alldelete")
                {
                    SearchMerchantGoodsType();
                }
                else
                {
                    DeleteMerchantGoodsType();
                }
           
        }
       


        private void DeleteMerchantGoodsType()
        {
            string restaurantGoodsTypeid = Request.Params["restaurantGoodsType_id"];

            iMerchantGoodsTypeRepository.Delete(restaurantGoodsTypeid);
            AjaxResult result = new AjaxResult();
            result.statusCode = "200";
            result.message = "操作成功";
            FormatJsonResult jsonResult = new FormatJsonResult();
            jsonResult.Data = result;
            Response.Write(jsonResult.FormatResult());
            Response.End();
        }
        private void SearchMerchantGoodsType()
        {

            //在这里初始化ShopId
            numPerPageValue = Request.Form["numPerPage"] == null ? 5 : Convert.ToInt32(Request.Form["numPerPage"].ToString());
            if (Request.Form["restaurant_id"] != null)
            {
                restaurantId = Request.Form["restaurant_id"];
            }
            else
            {
                restaurantId = Request.Params["restaurant_id"];
            }

            pageNum = Request.Form["pageNum"] == null ? 1 : Convert.ToInt32(Request.Form["pageNum"].ToString());
            int start = (pageNum - 1) * numPerPageValue;
            int limit = numPerPageValue;
            IList<MerchantGoodsType> restaurantGoodsTypeList = null;
            List<DataFilter> dfl = new List<DataFilter>();
                       
            name = Request.Form["Name"];
            if (!string.IsNullOrEmpty(name))
            {
                dfl.Add(new DataFilter() { type = "Name", value = name });
            }

           

        
            dfl.Add(new DataFilter() { type = "Restaurant", value = restaurantId });
            

            List<DataFilter> dflForOrder = new List<DataFilter>();
            string orderField = string.IsNullOrEmpty(Request.Form["orderField"]) ? "CreateTime" : Request.Form["orderField"];
            string orderDirection = string.IsNullOrEmpty(Request.Form["orderDirection"]) ? "Desc" : Request.Form["orderDirection"];
            dflForOrder.Add(new DataFilter() { type = orderField, comparison = orderDirection });
            dfl.Add(new DataFilter() { type = "Order", field = dflForOrder });

            restaurantGoodsTypeList = iMerchantGoodsTypeRepository.Search(dfl, start, limit, out total);
            repeater.DataSource = restaurantGoodsTypeList;
            repeater.DataBind();

            numPerPage.Value = numPerPageValue.ToString();
        }
    }
}