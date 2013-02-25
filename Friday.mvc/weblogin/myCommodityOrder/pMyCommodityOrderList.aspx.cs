using System;
using System.Collections.Generic;
using System.Text;
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
    public partial class pMyCommodityOrderList : System.Web.UI.Page
    {
        protected long total;
        protected int pageNum;
        protected int numPerPageValue;

        protected string orderNumber;
        protected string shopName;
        protected string loginName;
        protected string startDate;
        protected string endDate;
        protected string linkman;

        IMyCommodityOrderRepository iRepositoryMyCommodityOrder = UnityHelper.UnityToT<IMyCommodityOrderRepository>();

        protected void Page_Load(object sender, EventArgs e)
        {
            if (Request.Params["flag"] == "alldelete")
            {
                DeleteMyCommodityOrder();
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
                List<DataFilter> shopFilter = new List<DataFilter>();

                filterList.Add(new DataFilter()
                {
                    type = "IsDelete"
                });

                //商铺名称
                if (!string.IsNullOrEmpty(Request.Form["ShopName"]))
                {
                    shopFilter.Add(new DataFilter()
                    {
                        type = "Name",
                        value = shopName = Request.Form["ShopName"]

                    });

                    filterList.Add(new DataFilter()
                    {
                        type = "Shop",
                        field = shopFilter
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

                if (!string.IsNullOrEmpty(Request.Form["Linkman"]))
                    filterList.Add(new DataFilter()
                    {
                        type = "Linkman",
                        value = linkman = Request.Form["Linkman"]

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

                IList<MyCommodityOrder> myCommodityOrderList = iRepositoryMyCommodityOrder.Search(filterList,start, limit, out total);

                repeater.DataSource = myCommodityOrderList;
                repeater.DataBind();

                numPerPage.Value = numPerPageValue.ToString();
            }
        }

        private void DeleteMyCommodityOrder()
        {
            iRepositoryMyCommodityOrder.Delete(Request.Params["uid"]);

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