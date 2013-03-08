using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using friday.core.domain;
using friday.core.repositories;
using friday.core;
using friday.core.components;
using friday.core.services;

namespace Friday.mvc.weblogin.scoreOfItemInHouseOrder
{
    public partial class pAddScoreOfItemInHouseOrder : BasePage
    {
        IScoreOfItemInHouseOrderService iScoreOfItemInHouseOrderService = UnityHelper.UnityToT<IScoreOfItemInHouseOrderService>();
        IValuingOfMyHouseOrderService iValuingOfMyHouseOrderService = UnityHelper.UnityToT<IValuingOfMyHouseOrderService>();
        IValuingItemOfMyHouseOrderService iValuingItemOfMyHouseOrderService = UnityHelper.UnityToT<IValuingItemOfMyHouseOrderService>();

        private ScoreOfItemInHouseOrder scoreOfItemInHouseOrder;
        private ValuingOfMyHouseOrder valuingOfMyHouseOrder;

        protected void Page_Load(object sender, EventArgs e)
        {
            if (Request.Params["__EVENTVALIDATION"] != null)
            {
                SaveScoreOfItemInHouseOrder();
            }
        }

        private void SaveScoreOfItemInHouseOrder()
        {
            AjaxResult result = new AjaxResult();
            FormatJsonResult jsonResult = new FormatJsonResult();

            scoreOfItemInHouseOrder = new ScoreOfItemInHouseOrder();
            BindingHelper.RequestToObject(scoreOfItemInHouseOrder);
            scoreOfItemInHouseOrder.ValuingItemOfMyHouseOrder = iValuingItemOfMyHouseOrderService.Load(ItemID.Value);
            scoreOfItemInHouseOrder.ValuingOfMyHouseOrder = iValuingOfMyHouseOrderService.Load(Request.Params["valuingOfMyHouseOrder_id"]);
            scoreOfItemInHouseOrder.ValuingOfMyHouseOrder = valuingOfMyHouseOrder;

            iScoreOfItemInHouseOrderService.Save(scoreOfItemInHouseOrder);


            int count = iScoreOfItemInHouseOrderRepository.GetScoreOfItemInHouseOrdersCount(Request.Params["valuingOfMyHouseOrder_id"]);
            double Sum = iScoreOfItemInHouseOrderRepository.GetScoreOfItemInHouseOrdersSum(Request.Params["valuingOfMyHouseOrder_id"]);

            valuingOfMyHouseOrder.AverageScore = Sum / count;
            iValuingOfMyHouseOrderRepository.SaveOrUpdate(valuingOfMyHouseOrder);

            result.statusCode = "200";
            result.message = "添加成功";
            result.navTabId = "referer";
            result.callbackType = "closeCurrent";
            jsonResult.Data = result;
            Response.Write(jsonResult.FormatResult());
            Response.End();

        }

    }
}