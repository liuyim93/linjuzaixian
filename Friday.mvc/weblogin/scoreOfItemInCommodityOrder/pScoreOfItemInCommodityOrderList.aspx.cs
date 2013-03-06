﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using friday.core.domain;
using friday.core.components;
using friday.core;
using friday.core.repositories;

namespace Friday.mvc.weblogin.scoreOfItemInCommodityOrder
{
    public partial class pScoreOfItemInCommodityOrderList : System.Web.UI.Page
    {
        protected long total;
        protected int pageNum;
        protected int numPerPageValue;

        protected string valuingOfMyCommodityOrderID;

        IScoreOfItemInCommodityOrderRepository iScoreOfItemInCommodityOrderRepository = UnityHelper.UnityToT<IScoreOfItemInCommodityOrderRepository>();
        IRepository<ValuingOfMyCommodityOrder> iValuingOfMyCommodityOrderRepository = UnityHelper.UnityToT<IRepository<ValuingOfMyCommodityOrder>>();

        private ValuingOfMyCommodityOrder valuingOfMyCommodityOrder;
        private ScoreOfItemInCommodityOrder scoreOfItemInCommodityOrder;

        protected void Page_Load(object sender, EventArgs e)
        {

            if (Request.Form["valuingOfMyCommodityOrder_id"] != null)
            {
                valuingOfMyCommodityOrderID = Request.Form["valuingOfMyCommodityOrder_id"];
            }
            else
            {
                valuingOfMyCommodityOrderID = Request.Params["valuingOfMyCommodityOrder_id"];
            }
            valuingOfMyCommodityOrder = iValuingOfMyCommodityOrderRepository.Load(valuingOfMyCommodityOrderID);

            if (Request.Params["flag"] != "alldelete")
            {
                SearchScoreOfItemInCommodityOrder();
            }
            else
            {
                DeleteScoreOfItemInCommodityOrder();
            }
        }
        private void DeleteScoreOfItemInCommodityOrder()
        {

            scoreOfItemInCommodityOrder = iScoreOfItemInCommodityOrderRepository.Load(Request.Params["uid"]);

            //myCommodityOrder.Price = myCommodityOrder.Price - scoreOfItemInCommodityOrder.Price;

            iValuingOfMyCommodityOrderRepository.SaveOrUpdate(valuingOfMyCommodityOrder);
            iScoreOfItemInCommodityOrderRepository.Delete(Request.Params["uid"]);

            AjaxResult result = new AjaxResult();
            result.statusCode = "200";
            result.message = "操作成功";
            FormatJsonResult jsonResult = new FormatJsonResult();
            jsonResult.Data = result;
            Response.Write(jsonResult.FormatResult());
            Response.End();
        }
        private void SearchScoreOfItemInCommodityOrder()
        {
            numPerPageValue = Request.Form["numPerPage"] == null ? 5 : Convert.ToInt32(Request.Form["numPerPage"].ToString());
            pageNum = Request.Form["pageNum"] == null ? 1 : Convert.ToInt32(Request.Form["pageNum"].ToString());
            int start = (pageNum - 1) * numPerPageValue;
            int limit = numPerPageValue;
            IList<ScoreOfItemInCommodityOrder> scoreOfItemInCommodityOrderList = null;
            List<DataFilter> dfl = new List<DataFilter>();
            List<DataFilter> ValuingOfMyCommodityOrderFilter = new List<DataFilter>();

            ValuingOfMyCommodityOrderFilter.Add(new DataFilter() { type = "ValuingOfMyCommodityOrder", value = valuingOfMyCommodityOrderID });
            dfl.Add(new DataFilter() { type = "ValuingOfMyCommodityOrder", field = ValuingOfMyCommodityOrderFilter });

            dfl.Add(new DataFilter()
            {
                type = "IsDelete"
            });

            List<DataFilter> dflForOrder = new List<DataFilter>();
            string orderField = string.IsNullOrEmpty(Request.Form["orderField"]) ? "CreateTime" : Request.Form["orderField"];
            string orderDirection = string.IsNullOrEmpty(Request.Form["orderDirection"]) ? "Desc" : Request.Form["orderDirection"];
            dflForOrder.Add(new DataFilter() { type = orderField, comparison = orderDirection });

            dfl.Add(new DataFilter() { type = "Order", field = dflForOrder });

            scoreOfItemInCommodityOrderList = iScoreOfItemInCommodityOrderRepository.Search(dfl, start, limit, out total);
            repeater.DataSource = scoreOfItemInCommodityOrderList;
            repeater.DataBind();


            numPerPage.Value = numPerPageValue.ToString();
        }
    }
}