using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using friday.core.domain;
using friday.core.components;
using friday.core.repositories;
using friday.core;

namespace Friday.mvc.weblogin.scoreOfItemInHouseOrder
{
    public partial class pEditScoreOfItemInHouseOrder : BasePage
    {
        IScoreOfItemInHouseOrderRepository iScoreOfItemInHouseOrderRepository = UnityHelper.UnityToT<IScoreOfItemInHouseOrderRepository>();
        IRepository<ValuingItemOfMyHouseOrder> iValuingItemOfMyHouseOrderRepository = UnityHelper.UnityToT<IRepository<ValuingItemOfMyHouseOrder>>();
        IRepository<ValuingOfMyHouseOrder> iValuingOfMyHouseOrderRepository = UnityHelper.UnityToT<IRepository<ValuingOfMyHouseOrder>>();

        private ScoreOfItemInHouseOrder scoreOfItemInHouseOrder;
        private ValuingOfMyHouseOrder valuingOfMyHouseOrder;

        protected void Page_Load(object sender, EventArgs e)
        {
            scoreOfItemInHouseOrder = iScoreOfItemInHouseOrderRepository.Load(Request.Params["uid"].ToString());
            valuingOfMyHouseOrder = iValuingOfMyHouseOrderRepository.Get(Request.Params["valuingOfMyHouseOrder_id"]);

            if (Request.Params["__EVENTVALIDATION"] != null)
            {

                SaveScoreOfItemInHouseOrder();
            }
            else
            {
                Score.Value = scoreOfItemInHouseOrder.Score.ToString();
                ItemName.Value = scoreOfItemInHouseOrder.ValuingItemOfMyHouseOrder.ValuingItemName;
                ItemID.Value = scoreOfItemInHouseOrder.ValuingItemOfMyHouseOrder.Id;
            }
        }

        private void SaveScoreOfItemInHouseOrder()
        {
            BindingHelper.RequestToObject(scoreOfItemInHouseOrder);
            scoreOfItemInHouseOrder.ValuingItemOfMyHouseOrder = iValuingItemOfMyHouseOrderRepository.Get(ItemID.Value);

            iScoreOfItemInHouseOrderRepository.SaveOrUpdate(scoreOfItemInHouseOrder);

            int count = iScoreOfItemInHouseOrderRepository.GetScoreOfItemInHouseOrdersCount(Request.Params["valuingOfMyHouseOrder_id"]);
            double Sum = iScoreOfItemInHouseOrderRepository.GetScoreOfItemInHouseOrdersSum(Request.Params["valuingOfMyHouseOrder_id"]);

            valuingOfMyHouseOrder.AverageScore = Sum / count;
            iValuingOfMyHouseOrderRepository.SaveOrUpdate(valuingOfMyHouseOrder);
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