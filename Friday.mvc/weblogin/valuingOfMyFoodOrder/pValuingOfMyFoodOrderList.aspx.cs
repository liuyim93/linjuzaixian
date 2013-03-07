﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using friday.core.domain;
using friday.core.components;
using friday.core;
using friday.core.repositories;

namespace Friday.mvc.weblogin.valuingOfMyFoodOrder
{
    public partial class pValuingOfMyFoodOrderList : BasePage
    {
        protected long total;
        protected int pageNum;
        protected int numPerPageValue;

        protected string orderNumber;
        protected string merchantName;
        protected string loginName;
        protected string startDate;
        protected string endDate;

        IValuingOfMyFoodOrderRepository iValuingOfMyFoodOrderRepository = UnityHelper.UnityToT<IValuingOfMyFoodOrderRepository>();

        protected void Page_Load(object sender, EventArgs e)
        {

            if (Request.Params["flag"] == "alldelete")
            {
                DeleteValuingOfMyFoodOrder();
            }
            else
            {
                numPerPageValue = Request.Form["numPerPage"] == null ? 10 : Convert.ToInt32(Request.Form["numPerPage"].ToString());
                pageNum = Request.Form["pageNum"] == null ? 1 : Convert.ToInt32(Request.Form["pageNum"].ToString());
                int start = (pageNum - 1) * numPerPageValue;
                int limit = numPerPageValue;

                List<DataFilter> filterList = new List<DataFilter>();
                List<DataFilter> loginUserFilter = new List<DataFilter>();
                List<DataFilter> merchantFilter = new List<DataFilter>();
                List<DataFilter> myFoodOrderFilter = new List<DataFilter>();

                filterList.Add(new DataFilter()
                {
                    type = "IsDelete"
                });

                //商铺名称
                if (!string.IsNullOrEmpty(Request.Form["MerchantName"]))
                {
                    merchantFilter.Add(new DataFilter()
                    {
                        type = "Name",
                        value = merchantName = Request.Form["MerchantName"]

                    });
                }

                filterList.Add(new DataFilter()
                {
                    type = "Merchant",
                    field = merchantFilter
                });


                //订单用户
                if (!string.IsNullOrEmpty(Request.Form["LoginName"]))
                {
                    loginUserFilter.Add(new DataFilter()
                    {
                        type = "LoginName",
                        value = loginName = Request.Form["LoginName"]

                    });

                    filterList.Add(new DataFilter()
                    {
                        type = "LoginUser",
                        field = loginUserFilter
                    });

                }

                //订单号
                if (!string.IsNullOrEmpty(Request.Form["OrderNumber"]))
                {
                    myFoodOrderFilter.Add(new DataFilter()
                    {
                        type = "OrderNumber",
                        value = orderNumber = Request.Form["OrderNumber"]

                    });

                    filterList.Add(new DataFilter()
                    {
                        type = "MyFoodOrder",
                        field = myFoodOrderFilter
                    });

                }


                var filter = new DataFilter();
                if (!string.IsNullOrEmpty(Request.Form["StartDate"]))
                {
                    filter.type = "CreateTime";
                    filter.value = startDate = Request.Form["StartDate"];
                    if (!string.IsNullOrEmpty(Request.Form["EndDate"]))
                    {
                        filter.valueForCompare = endDate = Request.Form["EndDate"];
                    }
                    filterList.Add(filter);
                }

                List<DataFilter> dflForOrder = new List<DataFilter>();
                string orderField = string.IsNullOrEmpty(Request.Form["orderField"]) ? "CreateTime" : Request.Form["orderField"];
                string orderDirection = string.IsNullOrEmpty(Request.Form["orderDirection"]) ? "Desc" : Request.Form["orderDirection"];
                dflForOrder.Add(new DataFilter() { type = orderField, comparison = orderDirection });
                filterList.Add(new DataFilter() { type = "Order", field = dflForOrder });

                IList<ValuingOfMyFoodOrder> valuingOfMyFoodOrderList = iValuingOfMyFoodOrderRepository.Search(filterList, start, limit, out total);

                repeater.DataSource = valuingOfMyFoodOrderList;
                repeater.DataBind();

                numPerPage.Value = numPerPageValue.ToString();
            }
        }

        private void DeleteValuingOfMyFoodOrder()
        {
            iValuingOfMyFoodOrderRepository.Delete(Request.Params["uid"]);

            AjaxResult result = new AjaxResult();
            result.statusCode = "200";
            result.message = "删除成功";
            FormatJsonResult jsonResult = new FormatJsonResult();
            jsonResult.Data = result;
            Response.Write(jsonResult.FormatResult());
            Response.End();
        }
    }
}