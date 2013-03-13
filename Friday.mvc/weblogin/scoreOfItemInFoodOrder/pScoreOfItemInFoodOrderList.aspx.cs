using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using friday.core.repositories;
using friday.core;
using friday.core.domain;
using friday.core.components;
using friday.core.services;

namespace Friday.mvc.weblogin.scoreOfItemInFoodOrder
{
    public partial class pScoreOfItemInFoodOrderList : BasePage
    {
        protected long total;
        protected int pageNum;
        protected int numPerPageValue;

        protected string valuingOfMyFoodOrderID;

        IScoreOfItemInFoodOrderService iScoreOfItemInFoodOrderService = UnityHelper.UnityToT<IScoreOfItemInFoodOrderService>();
        IValuingOfMyFoodOrderService iValuingOfMyFoodOrderService = UnityHelper.UnityToT<IValuingOfMyFoodOrderService>();
 

        private ValuingOfMyFoodOrder valuingOfMyFoodOrder;
        private ScoreOfItemInFoodOrder scoreOfItemInFoodOrder;

        protected void Page_Load(object sender, EventArgs e)
        {
            tagName = systemFunctionObjectService.餐馆模块.食品评价项评分管理.TagName;
            this.PermissionCheck();
            if (!this.PermissionValidate(PermissionTag.Delete) && !this.PermissionValidate(PermissionTag.Edit))
            {
                this.toolbar.Visible = false;
            }


            if (Request.Form["valuingOfMyFoodOrder_id"] != null)
            {
                valuingOfMyFoodOrderID = Request.Form["valuingOfMyFoodOrder_id"];
            }
            else
            {
                valuingOfMyFoodOrderID = Request.Params["valuingOfMyFoodOrder_id"];
            }
            valuingOfMyFoodOrder = iValuingOfMyFoodOrderService.Load(valuingOfMyFoodOrderID);

            if (Request.Params["flag"] != "alldelete")
            {
                SearchScoreOfItemInFoodOrder();
            }
            else
            {
                AjaxResult result = new AjaxResult();
                FormatJsonResult jsonResult = new FormatJsonResult();

                tagName = systemFunctionObjectService.餐馆模块.食品评价项评分管理.TagName;
                if (!this.PermissionValidate(PermissionTag.Delete))
                {
                    result.statusCode = "300";
                    result.message = "没有ScoreOfItemInFoodOrder删除权限";
                    jsonResult.Data = result;
                    Response.Write(jsonResult.FormatResult());
                    Response.End();
                }
                DeleteScoreOfItemInFoodOrder();
            }
        }
        private void DeleteScoreOfItemInFoodOrder()
        {

            scoreOfItemInFoodOrder = iScoreOfItemInFoodOrderService.Load(Request.Params["uid"]);

            iScoreOfItemInFoodOrderService.Delete(Request.Params["uid"]);

            int count = iScoreOfItemInFoodOrderService.GetScoreOfItemInFoodOrdersCount(Request.Params["valuingOfMyFoodOrder_id"]);
            double Sum = iScoreOfItemInFoodOrderService.GetScoreOfItemInFoodOrdersSum(Request.Params["valuingOfMyFoodOrder_id"]);

            valuingOfMyFoodOrder.AverageScore = Sum / count;
            iValuingOfMyFoodOrderService.Update(valuingOfMyFoodOrder);

            AjaxResult result = new AjaxResult();
            result.statusCode = "200";
            result.message = "操作成功";
            FormatJsonResult jsonResult = new FormatJsonResult();
            jsonResult.Data = result;
            Response.Write(jsonResult.FormatResult());
            Response.End();
        }
        private void SearchScoreOfItemInFoodOrder()
        {
            numPerPageValue = Request.Form["numPerPage"] == null ? 5 : Convert.ToInt32(Request.Form["numPerPage"].ToString());
            pageNum = Request.Form["pageNum"] == null ? 1 : Convert.ToInt32(Request.Form["pageNum"].ToString());
            int start = (pageNum - 1) * numPerPageValue;
            int limit = numPerPageValue;
            IList<ScoreOfItemInFoodOrder> scoreOfItemInFoodOrderList = null;
            List<DataFilter> dfl = new List<DataFilter>();
            List<DataFilter> ValuingOfMyFoodOrderFilter = new List<DataFilter>();

            ValuingOfMyFoodOrderFilter.Add(new DataFilter() { type = "ValuingOfMyFoodOrder", value = valuingOfMyFoodOrderID });
            dfl.Add(new DataFilter() { type = "ValuingOfMyFoodOrder", field = ValuingOfMyFoodOrderFilter });

            dfl.Add(new DataFilter()
            {
                type = "IsDelete"
            });

            List<DataFilter> dflForOrder = new List<DataFilter>();
            string orderField = string.IsNullOrEmpty(Request.Form["orderField"]) ? "CreateTime" : Request.Form["orderField"];
            string orderDirection = string.IsNullOrEmpty(Request.Form["orderDirection"]) ? "Desc" : Request.Form["orderDirection"];
            dflForOrder.Add(new DataFilter() { type = orderField, comparison = orderDirection });

            dfl.Add(new DataFilter() { type = "Order", field = dflForOrder });

            scoreOfItemInFoodOrderList = iScoreOfItemInFoodOrderService.Search(dfl, start, limit, out total);
            repeater.DataSource = scoreOfItemInFoodOrderList;
            repeater.DataBind();


            numPerPage.Value = numPerPageValue.ToString();
        }
    }
}