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
using friday.core.services;

namespace Friday.mvc.weblogin.commodity
{
    public partial class pCommodityList : BasePage
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

        IShopService iShopService = UnityHelper.UnityToT<IShopService>();
        //IMerchantGoodsTypeService iMerchantGoodsTypeService = UnityHelper.UnityToT<IMerchantGoodsTypeService>();
        ICommodityService iCommodityService = UnityHelper.UnityToT<ICommodityService>();

        protected void Page_Load(object sender, EventArgs e)
        {
            tagName = systemFunctionObjectService.商店模块.商品维护.TagName;
            this.PermissionCheck();

            if (Request.Params["flag"] != "alldelete")
            {
                SearchCommodity();
            }
            else
            {
                AjaxResult result = new AjaxResult();
                FormatJsonResult jsonResult = new FormatJsonResult();

                tagName = systemFunctionObjectService.商店模块.商品维护.TagName;
                if (!this.PermissionValidate(PermissionTag.Delete))
                {
                    result.statusCode = "300";
                    result.message = "没有Food删除权限";
                    jsonResult.Data = result;
                    Response.Write(jsonResult.FormatResult());
                    Response.End();
                }

                DeleteCommodity();
            }
        }
        private void DeleteCommodity()
        {

            iCommodityService.Delete(Request.Params["commodity_id"]);
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
            numPerPageValue = Request.Form["numPerPage"] == null ? 10 : Convert.ToInt32(Request.Form["numPerPage"].ToString());
            if (!this.CurrentUser.IsAdmin)
            {
                shopId = this.CurrentUser.LoginUserOfMerchants.SingleOrDefault().Merchant.Id;
            }
            if (!string.IsNullOrEmpty(Request.Form["shop_id"]))
            {
                shopId = Request.Form["shop_id"];
            }
            else if (!string.IsNullOrEmpty(Request.Params["shop_id"]))
            {
                shopId = Request.Params["shop_id"];
            }

            pageNum = Request.Form["pageNum"] == null ? 1 : Convert.ToInt32(Request.Form["pageNum"].ToString());
            int start = (pageNum - 1) * numPerPageValue;
            int limit = numPerPageValue;
            IList<Commodity> commodityList = null;
            List<DataFilter> dfl = new List<DataFilter>();
            List<DataFilter> shopdfl = new List<DataFilter>();

            if (!this.CurrentUser.IsAdmin)
            {
                shopdfl.Add(new DataFilter()
                {
                    type = "Shop",
                    value = shopId

                });
                dfl.Add(new DataFilter()
                {
                    type = "Shop",
                    field = shopdfl
                });
            }
            if (!string.IsNullOrEmpty(Request.Params["shop_id"]))
            {
                shopdfl.Add(new DataFilter()
                {
                    type = "Shop",
                    value = shopId
                });
                dfl.Add(new DataFilter()
                {
                    type = "Shop",
                    field = shopdfl
                });
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

            name = Request.Form["Name"];
            if (!string.IsNullOrEmpty(name))
            {
                dfl.Add(new DataFilter() { type = "Name", value = name });
            }

            dfl.Add(new DataFilter()
            {
                type = "IsDelete"
            });

            //goodsType = Request.Form["mGoodsType"];
            //if (!string.IsNullOrEmpty(goodsType))
            //{
            //    MerchantGoodsType mectGType = iMerchantGoodsTypeService.GetGoodsTypeByTypeNameAndMerchantID(goodsType, shopId);
            //    string mectGTypeID = mectGType.Id;
            //    dfl.Add(new DataFilter() { type = "GoodsType", value = mectGTypeID });
            //}

            List<DataFilter> dflForOrder = new List<DataFilter>();
            string orderField = string.IsNullOrEmpty(Request.Form["orderField"]) ? "CreateTime" : Request.Form["orderField"];
            string orderDirection = string.IsNullOrEmpty(Request.Form["orderDirection"]) ? "Desc" : Request.Form["orderDirection"];
            dflForOrder.Add(new DataFilter() { type = orderField, comparison = orderDirection });
            dfl.Add(new DataFilter() { type = "Order", field = dflForOrder });

            commodityList = iCommodityService.Search(dfl, start, limit, out total);
            repeater.DataSource = commodityList;
            repeater.DataBind();

            if (Request.Params["__EVENTVALIDATION"] == null)
            {
                //Shop rst =new Shop();// iShopService.Load(shopId);
                //IList<MerchantGoodsType> goodsTypes = iMerchantGoodsTypeService.GetGoodsTypeByMerchantID(rst.Id);
                //if (!this.CurrentUser.IsAdmin)
                //{
                //    goodsTypes = iMerchantGoodsTypeService.GetGoodsTypeByMerchantID(this.CurrentUser.LoginUserOfMerchants.SingleOrDefault().Merchant.Id);
                //}
                //else
                //{
                //    goodsTypes = iMerchantGoodsTypeService.GetAll();
                //}
                //foreach (var i in goodsTypes)
                //{
                //    this.mGoodsType.Items.Add(i.GoodsType);
                //}

            }
            numPerPage.Value = numPerPageValue.ToString();
        }
    }
}