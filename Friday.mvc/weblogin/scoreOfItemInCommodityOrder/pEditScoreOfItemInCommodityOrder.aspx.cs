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

namespace Friday.mvc.weblogin.scoreOfItemInCommodityOrder
{
    public partial class pEditScoreOfItemInCommodityOrder : BasePage
    {
        IScoreOfItemInCommodityOrderRepository iScoreOfItemInCommodityOrderRepository = UnityHelper.UnityToT<IScoreOfItemInCommodityOrderRepository>();
        IRepository<ValuingItemOfMyCommodityOrder> iValuingItemOfMyCommodityOrderRepository = UnityHelper.UnityToT<IRepository<ValuingItemOfMyCommodityOrder>>();
        IRepository<ValuingOfMyCommodityOrder> iValuingOfMyCommodityOrderRepository = UnityHelper.UnityToT<IRepository<ValuingOfMyCommodityOrder>>();

        private ScoreOfItemInCommodityOrder scoreOfItemInCommodityOrder;
        private ValuingOfMyCommodityOrder valuingOfMyCommodityOrder;

        protected void Page_Load(object sender, EventArgs e)
        {
            scoreOfItemInCommodityOrder = iScoreOfItemInCommodityOrderRepository.Load(Request.Params["uid"].ToString());
            valuingOfMyCommodityOrder = iValuingOfMyCommodityOrderRepository.Get(Request.Params["valuingOfMyCommodityOrder_id"]);

            if (Request.Params["__EVENTVALIDATION"] != null)
            {

                SaveScoreOfItemInCommodityOrder();
            }
            else
            {
                Score.Value = scoreOfItemInCommodityOrder.Score.ToString();
                ItemName.Value = scoreOfItemInCommodityOrder.ValuingItemOfMyCommodityOrder.ValuingItemName;
                ItemID.Value = scoreOfItemInCommodityOrder.ValuingItemOfMyCommodityOrder.Id;
            }
        }

        private void SaveScoreOfItemInCommodityOrder()
        {
            BindingHelper.RequestToObject(scoreOfItemInCommodityOrder);
            scoreOfItemInCommodityOrder.ValuingItemOfMyCommodityOrder = iValuingItemOfMyCommodityOrderRepository.Get(ItemID.Value);

            iScoreOfItemInCommodityOrderRepository.SaveOrUpdate(scoreOfItemInCommodityOrder);

            int count = iScoreOfItemInCommodityOrderRepository.GetScoreOfItemInCommodityOrdersCount(Request.Params["valuingOfMyCommodityOrder_id"]);
            double Sum = iScoreOfItemInCommodityOrderRepository.GetScoreOfItemInCommodityOrdersSum(Request.Params["valuingOfMyCommodityOrder_id"]);

            valuingOfMyCommodityOrder.AverageScore = Sum / count;
            iValuingOfMyCommodityOrderRepository.SaveOrUpdate(valuingOfMyCommodityOrder);

            AjaxResult result = new AjaxResult();
            result.statusCode = "200";
            result.message = "修改成功";
            result.navTabId = "referer";
            result.callbackType = "closeCurrent";
            FormatJsonResult jsonResult = new FormatJsonResult();
            jsonResult.Data = result;
            Response.Write(jsonResult.FormatResult());
            Response.End();

        }

    }
}