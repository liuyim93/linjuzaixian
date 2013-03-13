using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using friday.core.components;
using friday.core.domain;
using friday.core.repositories;
using friday.core;
using friday.core.services;

namespace Friday.mvc.weblogin.scoreOfItemInHouseOrder
{
    public partial class pScoreOfItemInHouseOrderList : BasePage
    {
        protected long total;
        protected int pageNum;
        protected int numPerPageValue;

        protected string valuingOfMyHouseOrderID;

        IScoreOfItemInHouseOrderService iScoreOfItemInHouseOrderService = UnityHelper.UnityToT<IScoreOfItemInHouseOrderService>();
        IValuingOfMyHouseOrderService iValuingOfMyHouseOrderService = UnityHelper.UnityToT<IValuingOfMyHouseOrderService>();
       
        private ValuingOfMyHouseOrder valuingOfMyHouseOrder;
        private ScoreOfItemInHouseOrder scoreOfItemInHouseOrder;

        protected void Page_Load(object sender, EventArgs e)
        {
            tagName = systemFunctionObjectService.租房模块.房屋评价项评分管理.TagName;
            this.PermissionCheck();
            //add、edit页面共用PermissionTag.Edit
            if (!this.PermissionValidate(PermissionTag.Delete) && !this.PermissionValidate(PermissionTag.Edit))
            {
                this.toolbar.Visible = false;
            }

            if (Request.Form["valuingOfMyHouseOrder_id"] != null)
            {
                valuingOfMyHouseOrderID = Request.Form["valuingOfMyHouseOrder_id"];
            }
            else
            {
                valuingOfMyHouseOrderID = Request.Params["valuingOfMyHouseOrder_id"];
            }
            valuingOfMyHouseOrder = iValuingOfMyHouseOrderService.Load(valuingOfMyHouseOrderID);

            if (Request.Params["flag"] != "alldelete")
            {
                SearchScoreOfItemInHouseOrder();
            }
            else
            {
                AjaxResult result = new AjaxResult();
                FormatJsonResult jsonResult = new FormatJsonResult();

                tagName = systemFunctionObjectService.租房模块.房屋评价项评分管理.TagName;
                if (!this.PermissionValidate(PermissionTag.Delete))
                {
                    result.statusCode = "300";
                    result.message = "没有ScoreOfItemInHouseOrder删除权限";
                    jsonResult.Data = result;
                    Response.Write(jsonResult.FormatResult());
                    Response.End();
                }
                DeleteScoreOfItemInHouseOrder();
            }
        }
        private void DeleteScoreOfItemInHouseOrder()
        {

            scoreOfItemInHouseOrder = iScoreOfItemInHouseOrderService.Load(Request.Params["uid"]);

            iScoreOfItemInHouseOrderService.Delete(Request.Params["uid"]);

            int count = iScoreOfItemInHouseOrderService.GetScoreOfItemInHouseOrdersCount(Request.Params["valuingOfMyHouseOrder_id"]);
            double Sum = iScoreOfItemInHouseOrderService.GetScoreOfItemInHouseOrdersSum(Request.Params["valuingOfMyHouseOrder_id"]);

            valuingOfMyHouseOrder.AverageScore = Sum / count;
            iValuingOfMyHouseOrderService.Update(valuingOfMyHouseOrder);

            AjaxResult result = new AjaxResult();
            result.statusCode = "200";
            result.message = "操作成功";
            FormatJsonResult jsonResult = new FormatJsonResult();
            jsonResult.Data = result;
            Response.Write(jsonResult.FormatResult());
            Response.End();
        }
        private void SearchScoreOfItemInHouseOrder()
        {
            numPerPageValue = Request.Form["numPerPage"] == null ? 5 : Convert.ToInt32(Request.Form["numPerPage"].ToString());
            pageNum = Request.Form["pageNum"] == null ? 1 : Convert.ToInt32(Request.Form["pageNum"].ToString());
            int start = (pageNum - 1) * numPerPageValue;
            int limit = numPerPageValue;
            IList<ScoreOfItemInHouseOrder> scoreOfItemInHouseOrderList = null;
            List<DataFilter> dfl = new List<DataFilter>();
            List<DataFilter> ValuingOfMyHouseOrderFilter = new List<DataFilter>();

            ValuingOfMyHouseOrderFilter.Add(new DataFilter() { type = "ValuingOfMyHouseOrder", value = valuingOfMyHouseOrderID });
            dfl.Add(new DataFilter() { type = "ValuingOfMyHouseOrder", field = ValuingOfMyHouseOrderFilter });

            dfl.Add(new DataFilter()
            {
                type = "IsDelete"
            });

            List<DataFilter> dflForOrder = new List<DataFilter>();
            string orderField = string.IsNullOrEmpty(Request.Form["orderField"]) ? "CreateTime" : Request.Form["orderField"];
            string orderDirection = string.IsNullOrEmpty(Request.Form["orderDirection"]) ? "Desc" : Request.Form["orderDirection"];
            dflForOrder.Add(new DataFilter() { type = orderField, comparison = orderDirection });

            dfl.Add(new DataFilter() { type = "Order", field = dflForOrder });

            scoreOfItemInHouseOrderList = iScoreOfItemInHouseOrderService.Search(dfl, start, limit, out total);
            repeater.DataSource = scoreOfItemInHouseOrderList;
            repeater.DataBind();


            numPerPage.Value = numPerPageValue.ToString();
        }
    }
}