using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using friday.core;
using friday.core.domain;
using friday.core.components;
using friday.core.repositories;

namespace Friday.mvc.weblogin
{
    public partial class pOrderOfCommodityList : BasePage
    {
        protected long total;
        protected int pageNum;
        protected int numPerPageValue;

        protected string MyCommodityOrderID;
        protected string shop_id;

        private IOrderOfCommodityRepository iOrderOfCommodityRepository = UnityHelper.UnityToT<IOrderOfCommodityRepository>();
        private IMyCommodityOrderRepository iMyCommodityOrderRepository = UnityHelper.UnityToT<IMyCommodityOrderRepository>();

        private MyCommodityOrder myCommodityOrder;
        private OrderOfCommodity orderOfCommodity;

        protected void Page_Load(object sender, EventArgs e)
        {
            if (Request.Form["myCommodityOrder_id"] != null)
            {
                MyCommodityOrderID = Request.Form["myCommodityOrder_id"];
            }
            else
            {
                MyCommodityOrderID = Request.Params["myCommodityOrder_id"];
            }
            myCommodityOrder = iMyCommodityOrderRepository.Get(MyCommodityOrderID);
            shop_id = myCommodityOrder.Shop.Id;

            if (Request.Params["flag"] != "alldelete")
            {
                SearchOrderOfCommodity();
            }
            else
            {
                DeleteOrderOfCommodity();
            }
        }
        private void DeleteOrderOfCommodity()
        {

            orderOfCommodity = iOrderOfCommodityRepository.Get(Request.Params["uid"]);

            myCommodityOrder.Price = myCommodityOrder.Price - orderOfCommodity.Price;

            iMyCommodityOrderRepository.SaveOrUpdate(myCommodityOrder);
            iOrderOfCommodityRepository.PhysicsDelete(Request.Params["uid"]);

            AjaxResult result = new AjaxResult();
            result.statusCode = "200";
            result.message = "操作成功";
            FormatJsonResult jsonResult = new FormatJsonResult();
            jsonResult.Data = result;
            Response.Write(jsonResult.FormatResult());
            Response.End();
        }
        private void SearchOrderOfCommodity()
        {
            numPerPageValue = Request.Form["numPerPage"] == null ? 5 : Convert.ToInt32(Request.Form["numPerPage"].ToString());
            pageNum = Request.Form["pageNum"] == null ? 1 : Convert.ToInt32(Request.Form["pageNum"].ToString());
            int start = (pageNum - 1) * numPerPageValue;
            int limit = numPerPageValue;
            IList<OrderOfCommodity> orderOfCommodityList = null;
            List<DataFilter> dfl = new List<DataFilter>();

            if (!string.IsNullOrEmpty(MyCommodityOrderID))
            {
                dfl.Add(new DataFilter() { type = "MyCommodityOrder", value = MyCommodityOrderID });
            }

            dfl.Add(new DataFilter()
            {
                type = "IsDelete"
            });

            List<DataFilter> dflForOrder = new List<DataFilter>();
            string orderField = string.IsNullOrEmpty(Request.Form["orderField"]) ? "CreateTime" : Request.Form["orderField"];
            string orderDirection = string.IsNullOrEmpty(Request.Form["orderDirection"]) ? "Desc" : Request.Form["orderDirection"];
            dflForOrder.Add(new DataFilter() { type = orderField, comparison = orderDirection });

            dfl.Add(new DataFilter() { type = "Order", field = dflForOrder });

            orderOfCommodityList = iOrderOfCommodityRepository.Search(dfl, start, limit, out total);
            repeater.DataSource = orderOfCommodityList;
            repeater.DataBind();


            numPerPage.Value = numPerPageValue.ToString();
        }
    }
}