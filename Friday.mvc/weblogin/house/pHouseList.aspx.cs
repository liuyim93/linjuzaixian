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
using friday.core.services;

namespace Friday.mvc.weblogin
{
    public partial class pHouseList : BasePage
    {
        protected long total;
        protected int pageNum;
        protected int numPerPageValue;


        public string rentId;
        public string name;
        public string startprice;
        public string endprice;
        //public string owenType;
        public string goodsType;
        public string mid;

        IHouseService iHouseService = UnityHelper.UnityToT<IHouseService>();
        IRentService iRentService = UnityHelper.UnityToT<IRentService>();
        IMerchantGoodsTypeService iMerchantGoodsTypeService = UnityHelper.UnityToT<IMerchantGoodsTypeService>();

        protected void Page_Load(object sender, EventArgs e)
        {
            tagName = systemFunctionObjectService.租房模块.房屋维护.TagName;
            this.PermissionCheck();

            if (Request.Params["flag"] != "alldelete")
            {
                SearchHouse();
            }
            else
            {
                AjaxResult result = new AjaxResult();
                FormatJsonResult jsonResult = new FormatJsonResult();

                tagName = systemFunctionObjectService.租房模块.房屋维护.TagName;
                if (!this.PermissionValidate(PermissionTag.Delete))
                {
                    result.statusCode = "300";
                    result.message = "没有House删除权限";
                    jsonResult.Data = result;
                    Response.Write(jsonResult.FormatResult());
                    Response.End();
                }

                DeleteHouse();
            }

        }



        private void DeleteHouse()
        {
            string houseid = Request.Params["house_id"];

            iHouseService.Delete(houseid);
            AjaxResult result = new AjaxResult();
            result.statusCode = "200";
            result.message = "操作成功";
            FormatJsonResult jsonResult = new FormatJsonResult();
            jsonResult.Data = result;
            Response.Write(jsonResult.FormatResult());
            Response.End();
        }
        private void SearchHouse()
        {

            //在这里初始化ShopId
            numPerPageValue = Request.Form["numPerPage"] == null ? 5 : Convert.ToInt32(Request.Form["numPerPage"].ToString());
            if (!this.CurrentUser.IsAdmin)
            {
                rentId = this.CurrentUser.LoginUserOfMerchants.SingleOrDefault().Merchant.Id;
            }
            if (Request.Form["rent_id"] != null)
            {
                rentId = Request.Form["rent_id"];
            }
            if (Request.Params["rent_id"] != null)
            {
                rentId = Request.Params["rent_id"];
            }

            pageNum = Request.Form["pageNum"] == null ? 1 : Convert.ToInt32(Request.Form["pageNum"].ToString());
            int start = (pageNum - 1) * numPerPageValue;
            int limit = numPerPageValue;
            IList<House> houseList = null;
            List<DataFilter> dfl = new List<DataFilter>();
            List<DataFilter> Rentdfl = new List<DataFilter>();

            startprice = Request.Form["StartPrice"];
            endprice = Request.Form["EndPrice"];

            if (!this.CurrentUser.IsAdmin)
            {
                Rentdfl.Add(new DataFilter()
                {
                    type = "Rent",
                    value = rentId

                });
                dfl.Add(new DataFilter()
                {
                    type = "Rent",
                    field = Rentdfl
                });
            }
            if (!string.IsNullOrEmpty(Request.Params["rent_id"]))
            {
                Rentdfl.Add(new DataFilter()
                {
                    type = "Rent",
                    value = rentId
                });
                dfl.Add(new DataFilter()
                {
                    type = "Rent",
                    field = Rentdfl
                });
            }

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
                MerchantGoodsType mectGType = iMerchantGoodsTypeService.GetGoodsTypeByTypeNameAndMerchantID(goodsType, rentId);
                string mectGTypeID = mectGType.Id;
                dfl.Add(new DataFilter() { type = "GoodsType", value = mectGTypeID });
                // dfl.Add(new DataFilter() { type = "GoodsType", value = goodsType });
            }
            //else
            //{
            //    if (!string.IsNullOrEmpty(owenType))
            //    {
            //        dfl.Add(new DataFilter() { type = "HouseType", value = owenType });
            //    }
            //}


            //if (!string.IsNullOrEmpty(rentId))
            //{
            //    dfl.Add(new DataFilter() { type = "Rent", value = rentId });
            //}

            List<DataFilter> dflForOrder = new List<DataFilter>();
            string orderField = string.IsNullOrEmpty(Request.Form["orderField"]) ? "CreateTime" : Request.Form["orderField"];
            string orderDirection = string.IsNullOrEmpty(Request.Form["orderDirection"]) ? "Desc" : Request.Form["orderDirection"];
            dflForOrder.Add(new DataFilter() { type = orderField, comparison = orderDirection });
            //dflForOrder.Add(new DataFilter() { type = "HouseType", comparison = "Desc" });
            //dflForOrder.Add(new DataFilter() { type = "Price" });
            dfl.Add(new DataFilter() { type = "Order", field = dflForOrder });

            houseList = iHouseService.Search(dfl, start, limit, out total);
            repeater.DataSource = houseList;
            repeater.DataBind();

            if (Request.Params["__EVENTVALIDATION"] == null)
            {
                Rent rst = iRentService.Load(rentId);
                IList<MerchantGoodsType> goodsTypes = iMerchantGoodsTypeService.GetGoodsTypeByMerchantID(rst.Id);
                foreach (var i in goodsTypes)
                {
                    this.mGoodsType.Items.Add(i.GoodsType);
                }

            }



            numPerPage.Value = numPerPageValue.ToString();
        }
    }
}