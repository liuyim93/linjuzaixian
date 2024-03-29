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
using friday.core.services;

namespace Friday.mvc.weblogin.valuingOfMyHouseOrder
{
    public partial class pValuingOfMyHouseOrderList : BasePage
    {
        protected long total;
        protected int pageNum;
        protected int numPerPageValue;

        protected string orderNumber;
        protected string merchantName;
        protected string loginName;
        protected string startDate;
        protected string endDate;

        IValuingOfMyHouseOrderService iValuingOfMyHouseOrderService = UnityHelper.UnityToT<IValuingOfMyHouseOrderService>();

        protected void Page_Load(object sender, EventArgs e)
        {
            tagName = systemFunctionObjectService.租房模块.租房订单评价管理.TagName;
            this.PermissionCheck();

            if (Request.Params["flag"] == "alldelete")
            {
                AjaxResult result = new AjaxResult();
                FormatJsonResult jsonResult = new FormatJsonResult();

                tagName = systemFunctionObjectService.租房模块.租房订单评价管理.TagName;
                if (!this.PermissionValidate(PermissionTag.Delete))
                {
                    result.statusCode = "300";
                    result.message = "没有ValuingOfMyHouseOrder删除权限";
                    jsonResult.Data = result;
                    Response.Write(jsonResult.FormatResult());
                    Response.End();
                }

                DeleteValuingOfMyHouseOrder();
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
                List<DataFilter> myHouseOrderFilter = new List<DataFilter>();

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

                if (CurrentUser.IsAdmin != true)
                {
                    merchantFilter.Add(new DataFilter()
                    {
                        type = "Merchant",
                        value = CurrentUser.LoginUserOfMerchants.FirstOrDefault().Merchant.Id

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
                    myHouseOrderFilter.Add(new DataFilter()
                    {
                        type = "OrderNumber",
                        value = orderNumber = Request.Form["OrderNumber"]

                    });

                    filterList.Add(new DataFilter()
                    {
                        type = "MyHouseOrder",
                        field = myHouseOrderFilter
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

                IList<ValuingOfMyHouseOrder> valuingOfMyHouseOrderList = iValuingOfMyHouseOrderService.Search(filterList, start, limit, out total);

                repeater.DataSource = valuingOfMyHouseOrderList;
                repeater.DataBind();

                numPerPage.Value = numPerPageValue.ToString();
            }
        }

        private void DeleteValuingOfMyHouseOrder()
        {
            iValuingOfMyHouseOrderService.Delete(Request.Params["uid"]);

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