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
using friday.core.services;

namespace Friday.mvc.weblogin
{
    public partial class pOrderOfFoodList : BasePage
    {
        protected long total;
        protected int pageNum;
        protected int numPerPageValue;

        protected string MyFoodOrderID;
        protected string restaurant_id;

        private IOrderOfFoodService iOrderOfFoodService = UnityHelper.UnityToT<IOrderOfFoodService>();
        private IMyFoodOrderService iMyFoodOrderService = UnityHelper.UnityToT<IMyFoodOrderService>();

        private MyFoodOrder myFoodOrder;
        private OrderOfFood orderOfFood;

        protected void Page_Load(object sender, EventArgs e)
        {
            tagName = systemFunctionObjectService.餐馆模块.食品订单明细维护.TagName;
            this.PermissionCheck();
            //2013-02-28 basilwang you can use this to block button
            if (!this.PermissionValidate(PermissionTag.Delete))
            {
                //this.liDelete
                this.liDelete.Visible = false;
            }

            if (!this.PermissionValidate(PermissionTag.Edit))
            {
                this.liEdit.Visible = false;
                this.liAdd.Visible = false;
            }

            if (Request.Form["myFoodOrder_id"] != null)
            {
                MyFoodOrderID = Request.Form["myFoodOrder_id"];
            }
            else
            {
                MyFoodOrderID = Request.Params["myFoodOrder_id"];
            }
            myFoodOrder = iMyFoodOrderService.Load(MyFoodOrderID);
            restaurant_id = myFoodOrder.Restaurant.Id;

            if (Request.Params["flag"] != "alldelete")
            {
                SearchOrderOfFood();
            }
            else
            {
                AjaxResult result = new AjaxResult();
                FormatJsonResult jsonResult = new FormatJsonResult();

                tagName = systemFunctionObjectService.餐馆模块.食品订单明细维护.TagName;
                if (!this.PermissionValidate(PermissionTag.Delete))
                {
                    result.statusCode = "300";
                    result.message = "没有OrderOfFood删除权限";
                    jsonResult.Data = result;
                    Response.Write(jsonResult.FormatResult());
                    Response.End();
                }

                DeleteOrderOfFood();
            }
        }
        private void DeleteOrderOfFood()
        {

            orderOfFood = iOrderOfFoodService.Load(Request.Params["uid"]);

            myFoodOrder.Price = myFoodOrder.Price - orderOfFood.Price;

            iMyFoodOrderService.Update(myFoodOrder);
            iOrderOfFoodService.Delete(Request.Params["uid"]);

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

            orderOfFoodList = iOrderOfFoodService.Search(dfl, start, limit, out total);
            repeater.DataSource = orderOfFoodList;
            repeater.DataBind();


            numPerPage.Value = numPerPageValue.ToString();
        }
    }
}