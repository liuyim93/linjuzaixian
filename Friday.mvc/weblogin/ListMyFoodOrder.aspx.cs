using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using friday.core.repositories;
using friday.core;
using friday.core.components;
using friday.core.EnumType;

namespace Friday.mvc.weblogin
{
    public partial class ListMyFoodOrder : System.Web.UI.Page
    {
        protected long total;
        protected int pageNum;
        protected int numPerPageValue;

        protected string loginName;
        protected string orderNumber;
        protected string restaurantName;

        IMyFoodOrderRepository iMyFoodOrderRepository = UnityHelper.UnityToT<IMyFoodOrderRepository>();

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
            if (!string.IsNullOrEmpty(Request.Form["RestaurantName"]))
            {
                shopFilter.Add(new DataFilter()
                {
                    type = "Name",
                    value = restaurantName = Request.Form["RestaurantName"]

                });

                filterList.Add(new DataFilter()
                {
                    type = "Restaurant",
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

            IList<MyFoodOrder> myFoodOrderList = iMyFoodOrderRepository.Search(filterList, start, limit, out total);

            repeater.DataSource = myFoodOrderList;
            repeater.DataBind();

            numPerPage.Value = numPerPageValue.ToString();
        }
    }
}