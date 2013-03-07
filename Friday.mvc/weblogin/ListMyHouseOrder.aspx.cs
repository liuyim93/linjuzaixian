using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using friday.core.components;
using friday.core.EnumType;
using friday.core.repositories;
using friday.core;

namespace Friday.mvc.weblogin
{
    public partial class ListMyHouseOrder : System.Web.UI.Page
    {
        protected long total;
        protected int pageNum;
        protected int numPerPageValue;

        protected string loginName;
        protected string orderNumber;
        protected string rentName;

        IMyHouseOrderRepository iMyHouseOrderRepository = UnityHelper.UnityToT<IMyHouseOrderRepository>();

        protected void Page_Load(object sender, EventArgs e)
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

            filterList.Add(new DataFilter()
            {
                type = "OrderStatus",
                value = MyOrderStatusEnum.成功.ToString()
            });

            //商铺名称
            if (!string.IsNullOrEmpty(Request.Form["RentName"]))
            {
                shopFilter.Add(new DataFilter()
                {
                    type = "Name",
                    value = rentName = Request.Form["RentName"]

                });

                filterList.Add(new DataFilter()
                {
                    type = "Rent",
                    field = shopFilter
                });

            }

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

                filterList.Add(new DataFilter()
                {
                    type = "SystemUser",
                    field = systemUserFilter
                });
            }

            if (!string.IsNullOrEmpty(Request.Form["OrderNumber"]))
                filterList.Add(new DataFilter()
                {
                    type = "OrderNumber",
                    value = orderNumber = Request.Form["OrderNumber"]

                });


            List<DataFilter> dflForOrder = new List<DataFilter>();
            string orderField = string.IsNullOrEmpty(Request.Form["orderField"]) ? "CreateTime" : Request.Form["orderField"];
            string orderDirection = string.IsNullOrEmpty(Request.Form["orderDirection"]) ? "Desc" : Request.Form["orderDirection"];
            dflForOrder.Add(new DataFilter() { type = orderField, comparison = orderDirection });
            filterList.Add(new DataFilter() { type = "Order", field = dflForOrder });

            IList<MyHouseOrder> myHouseOrderList = iMyHouseOrderRepository.Search(filterList, start, limit, out total);

            repeater.DataSource = myHouseOrderList;
            repeater.DataBind();

            numPerPage.Value = numPerPageValue.ToString();
        }
    }
}