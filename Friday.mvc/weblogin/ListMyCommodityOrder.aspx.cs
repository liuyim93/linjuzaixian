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
    public partial class ListMyCommodityOrder : BasePage
    {
        protected long total;
        protected int pageNum;
        protected int numPerPageValue;

        protected string loginName;
        protected string orderNumber;
        protected string shopName;

        IMyCommodityOrderRepository iMyCommodityOrderRepository = UnityHelper.UnityToT<IMyCommodityOrderRepository>();

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

            //权限限定，当时管理员浏览时，可以看到所有的订单，当商家登录时，只能看到自己的订单列表

            if (this.CurrentUser.IsAdmin == false)
            {
                shopFilter.Add(new DataFilter()
                {
                    type = "Shop",
                    value =this.CurrentUser.LoginUserOfMerchants.FirstOrDefault().Merchant.Id

                });
                filterList.Add(new DataFilter()
                {
                    type = "Shop",
                    field = shopFilter
                });

            }      



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

            IList<MyCommodityOrder> myCommodityOrderList = iMyCommodityOrderRepository.Search(filterList, start, limit, out total);

            repeater.DataSource = myCommodityOrderList;
            repeater.DataBind();

            numPerPage.Value = numPerPageValue.ToString();
        }
    }
}