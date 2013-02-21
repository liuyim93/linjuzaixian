using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using friday.core.repositories;
using friday.core;
using friday.core.domain;
using friday.core.components;

namespace Friday.mvc.weblogin.commodity
{
    public partial class pCommodityList : System.Web.UI.Page
    {
        protected long total;
        protected int pageNum;
        protected int numPerPageValue;


        public string shopId;
        public string name;
        public string startprice;
        public string endprice;
        public string goodsType;
        public string mid;

        private ICommodityRepository iCommodityRepository = UnityHelper.UnityToT<ICommodityRepository>();
        IShopRepository restRepository = UnityHelper.UnityToT<IShopRepository>();
        IMerchantGoodsTypeRepository mGoodsTypeRepository = UnityHelper.UnityToT<IMerchantGoodsTypeRepository>();

         
        protected void Page_Load(object sender, EventArgs e)
        {
            if (Request.Params["flag"] != "alldelete")
            {
                SearchCommodity();
            }
            else
            {
                DeleteCommodity();
            }
        }
        private void DeleteCommodity()
        {

            iCommodityRepository.Delete(Request.Params["commodity_id"]);
            AjaxResult result = new AjaxResult();
            result.statusCode = "200";
            result.message = "操作成功";
            FormatJsonResult jsonResult = new FormatJsonResult();
            jsonResult.Data = result;
            Response.Write(jsonResult.FormatResult());
            Response.End();
        }
        private void SearchCommodity()
        {
            //在这里初始化ShopId
            numPerPageValue = Request.Form["numPerPage"] == null ? 5 : Convert.ToInt32(Request.Form["numPerPage"].ToString());
            if (Request.Form["shop_id"] != null)
            {
                shopId = Request.Form["shop_id"];
            }
            else
            {
                shopId = Request.Params["shop_id"];
            }

            pageNum = Request.Form["pageNum"] == null ? 1 : Convert.ToInt32(Request.Form["pageNum"].ToString());
            int start = (pageNum - 1) * numPerPageValue;
            int limit = numPerPageValue;
            IList<Commodity> commodityList = null;
            List<DataFilter> dfl = new List<DataFilter>();

            startprice = Request.Form["StartPrice"];
            endprice = Request.Form["EndPrice"];
            if (!string.IsNullOrEmpty(startprice))
            {
                if (!string.IsNullOrEmpty(endprice))
                {
                    dfl.Add(new DataFilter() { type = "Price", value = startprice, valueForCompare = endprice });
                }
            }

            name = Request.Form["Name"];
            if (!string.IsNullOrEmpty(name))
            {
                dfl.Add(new DataFilter() { type = "Name", value = name });
            }

            //owenType = Request.Form["owenType"];

            goodsType = Request.Form["mGoodsType"];
            if (!string.IsNullOrEmpty(goodsType))
            {
                MerchantGoodsType mectGType = mGoodsTypeRepository.GetGoodsTypeByTypeNameAndMerchantID(goodsType, shopId);
                string mectGTypeID = mectGType.Id;
                dfl.Add(new DataFilter() { type = "MerchantGoodsType_id", value = mectGTypeID.ToString() });
                // dfl.Add(new DataFilter() { type = "GoodsType", value = goodsType });
            }
            //else
            //{
            //    if (!string.IsNullOrEmpty(owenType))
            //    {
            //        dfl.Add(new DataFilter() { type = "CommodityType", value = owenType });
            //    }
            //}


            if (!string.IsNullOrEmpty(shopId))
            {
                dfl.Add(new DataFilter() { type = "Shop", value = shopId });
            }

            List<DataFilter> dflForOrder = new List<DataFilter>();
            string orderField = string.IsNullOrEmpty(Request.Form["orderField"]) ? "CreateTime" : Request.Form["orderField"];
            string orderDirection = string.IsNullOrEmpty(Request.Form["orderDirection"]) ? "Desc" : Request.Form["orderDirection"];
            dflForOrder.Add(new DataFilter() { type = orderField, comparison = orderDirection });
            //dflForOrder.Add(new DataFilter() { type = "CommodityType", comparison = "Desc" });
            //dflForOrder.Add(new DataFilter() { type = "Price" });
            dfl.Add(new DataFilter() { type = "Order", field = dflForOrder });

            commodityList = iCommodityRepository.Search(dfl, start, limit, out total);
            repeater.DataSource = commodityList;
            repeater.DataBind();

            if (Request.Params["__EVENTVALIDATION"] == null)
            {
                Shop rst = restRepository.Get(shopId);
                IList<MerchantGoodsType> goodsTypes = mGoodsTypeRepository.GetGoodsTypeByMerchantID(rst.Id);
                foreach (var i in goodsTypes)
                {
                    this.mGoodsType.Items.Add(i.GoodsType);
                }

            }



            numPerPage.Value = numPerPageValue.ToString();
        }
    }
}