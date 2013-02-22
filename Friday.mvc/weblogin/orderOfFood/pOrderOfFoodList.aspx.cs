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
    public partial class pOrderOfFoodList : System.Web.UI.Page
    {
        protected long total;
        protected int pageNum;
        protected int numPerPageValue;

        protected string MyFoodOrderID;

        private IOrderOfFoodRepository iOrderOfFoodRepository = UnityHelper.UnityToT<IOrderOfFoodRepository>();

        protected void Page_Load(object sender, EventArgs e)
        {
            if (Request.Params["flag"] != "alldelete")
            {
                SearchOrderOfFood();
            }
            else
            {
                DeleteOrderOfFood();
            }
        }
        private void DeleteOrderOfFood()
        {
            //未处理完
            iOrderOfFoodRepository.Delete(Request.Params["uid"]);
            AjaxResult result = new AjaxResult();
            result.statusCode = "200";
            result.message = "操作成功";
            FormatJsonResult jsonResult = new FormatJsonResult();
            jsonResult.Data = result;
            Response.Write(jsonResult.FormatResult());
            Response.End();
        }
        private void SearchOrderOfFood()
        {
            if (Request.Form["myFoodOrder_id"] != null)
            {
                MyFoodOrderID = Request.Form["myFoodOrder_id"];
            }
            else
            {
                MyFoodOrderID = Request.Params["myFoodOrder_id"];
            }
            numPerPageValue = Request.Form["numPerPage"] == null ? 5 : Convert.ToInt32(Request.Form["numPerPage"].ToString());
            pageNum = Request.Form["pageNum"] == null ? 1 : Convert.ToInt32(Request.Form["pageNum"].ToString());
            int start = (pageNum - 1) * numPerPageValue;
            int limit = numPerPageValue;
            IList<OrderOfFood> orderOfFoodList = null;
            List<DataFilter> dfl = new List<DataFilter>();

            if (!string.IsNullOrEmpty(MyFoodOrderID))
            {
                dfl.Add(new DataFilter() { type = "MyFoodOrder", value = MyFoodOrderID });
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

            orderOfFoodList = iOrderOfFoodRepository.Search(dfl, start, limit, out total);
            repeater.DataSource = orderOfFoodList;
            repeater.DataBind();


            numPerPage.Value = numPerPageValue.ToString();
        }
    }
}