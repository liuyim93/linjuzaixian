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
    public partial class pMyHouseOrderList : System.Web.UI.Page
    {
        protected long total;
        protected int pageNum;
        protected int numPerPageValue;

        protected string orderNumber;
        protected string rentName;
        protected string loginName;
        protected string startDate;
        protected string endDate;

        IMyHouseOrderRepository iRepositoryMyHouseOrder = UnityHelper.UnityToT<IMyHouseOrderRepository>();

        protected void Page_Load(object sender, EventArgs e)
        {
            if (Request.Params["flag"] == "alldelete")
            {
                DeleteMyHouseOrder();
            }
            else
            {
                numPerPageValue = Request.Form["numPerPage"] == null ? 10 : Convert.ToInt32(Request.Form["numPerPage"].ToString());
                pageNum = Request.Form["pageNum"] == null ? 1 : Convert.ToInt32(Request.Form["pageNum"].ToString());
                int start = (pageNum - 1) * numPerPageValue;
                int limit = numPerPageValue;

                List<DataFilter> filterList = new List<DataFilter>();
                List<DataFilter> loginUserFilter = new List<DataFilter>();
                List<DataFilter> systemUserFilter = new List<DataFilter>();
                List<DataFilter> rentFilter = new List<DataFilter>();

                filterList.Add(new DataFilter()
                {
                    type = "IsDelete"
                });

                //商铺名称
                if (!string.IsNullOrEmpty(Request.Form["RentName"]))
                {
                    rentFilter.Add(new DataFilter()
                    {
                        type = "Name",
                        value = rentName = Request.Form["RentName"]

                    });

                    filterList.Add(new DataFilter()
                    {
                        type = "Rent",
                        field = rentFilter
                    });
                }

                //非匿名用户
                systemUserFilter.Add(new DataFilter()
                {
                    type = "IsAnonymous"
                });

                //用户名----------三层嵌套查询
                if (!string.IsNullOrEmpty(Request.Form["LoginName"]))
                {
                    loginUserFilter.Add(new DataFilter()
                    {
                        type = "LoginName",
                        value = loginName = Request.Form["LoginName"]

                    });

                    systemUserFilter.Add(new DataFilter()
                    {
                        type = "LoginUser",
                        field = loginUserFilter
                    });
                }

                filterList.Add(new DataFilter()
                {
                    type = "SystemUser",
                    field = systemUserFilter
                });


                if (!string.IsNullOrEmpty(Request.Form["OrderNumber"]))
                    filterList.Add(new DataFilter()
                    {
                        type = "OrderNumber",
                        value = orderNumber = Request.Form["OrderNumber"]

                    });

                if (!string.IsNullOrEmpty(Request.Form["OrderStatus"]))
                    filterList.Add(new DataFilter()
                    {
                        type = "OrderStatus",
                        value = Request.Form["OrderStatus"]

                    });

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

                IList<MyHouseOrder> myHouseOrderList = iRepositoryMyHouseOrder.Search(filterList, start, limit, out total);

                repeater.DataSource = myHouseOrderList;
                repeater.DataBind();

                numPerPage.Value = numPerPageValue.ToString();
            }
        }

        private void DeleteMyHouseOrder()
        {
            iRepositoryMyHouseOrder.Delete(Request.Params["uid"]);

            AjaxResult result = new AjaxResult();
            result.statusCode = "200";
            result.message = "修改成功";
            FormatJsonResult jsonResult = new FormatJsonResult();
            jsonResult.Data = result;
            Response.Write(jsonResult.FormatResult());
            Response.End();
        }
    }
}