using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using friday.core.domain;
using friday.core.components;
using friday.core;
using friday.core.repositories;

namespace Friday.mvc.weblogin.scoreOfItemInFoodOrder
{
    public partial class pAddScoreOfItemInFoodOrder : BasePage
    {
        IScoreOfItemInFoodOrderRepository iScoreOfItemInFoodOrderRepository = UnityHelper.UnityToT<IScoreOfItemInFoodOrderRepository>();
        IRepository<ValuingItemOfMyFoodOrder> iValuingItemOfMyFoodOrderRepository = UnityHelper.UnityToT<IRepository<ValuingItemOfMyFoodOrder>>();
        IRepository<ValuingOfMyFoodOrder> iValuingOfMyFoodOrderRepository = UnityHelper.UnityToT<IRepository<ValuingOfMyFoodOrder>>();

        private ScoreOfItemInFoodOrder scoreOfItemInFoodOrder;
        private ValuingOfMyFoodOrder valuingOfMyFoodOrder;

        protected void Page_Load(object sender, EventArgs e)
        {
            if (Request.Params["__EVENTVALIDATION"] != null)
            {
                SaveScoreOfItemInFoodOrder();
            }
        }

        private void SaveScoreOfItemInFoodOrder()
        {
            AjaxResult result = new AjaxResult();
            FormatJsonResult jsonResult = new FormatJsonResult();

            scoreOfItemInFoodOrder = new ScoreOfItemInFoodOrder();
            BindingHelper.RequestToObject(scoreOfItemInFoodOrder);
            scoreOfItemInFoodOrder.ValuingItemOfMyFoodOrder = iValuingItemOfMyFoodOrderRepository.Get(ItemID.Value);
            valuingOfMyFoodOrder = iValuingOfMyFoodOrderRepository.Get(Request.Params["valuingOfMyFoodOrder_id"]);
            scoreOfItemInFoodOrder.ValuingOfMyFoodOrder = valuingOfMyFoodOrder;
            iScoreOfItemInFoodOrderRepository.SaveOrUpdate(scoreOfItemInFoodOrder);


            int count = iScoreOfItemInFoodOrderRepository.GetScoreOfItemInFoodOrdersCount(Request.Params["valuingOfMyFoodOrder_id"]);
            double Sum = iScoreOfItemInFoodOrderRepository.GetScoreOfItemInFoodOrdersSum(Request.Params["valuingOfMyFoodOrder_id"]);

            valuingOfMyFoodOrder.AverageScore = Sum / count;
            iValuingOfMyFoodOrderRepository.SaveOrUpdate(valuingOfMyFoodOrder);

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