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

namespace Friday.mvc.weblogin.scoreOfItemInFoodOrder
{
    public partial class pEditScoreOfItemInFoodOrder : BasePage
    {
        IRepository<ScoreOfItemInFoodOrder> iScoreOfItemInFoodOrderRepository = UnityHelper.UnityToT<IRepository<ScoreOfItemInFoodOrder>>();
        IRepository<ValuingItemOfMyFoodOrder> iValuingItemOfMyFoodOrderRepository = UnityHelper.UnityToT<IRepository<ValuingItemOfMyFoodOrder>>();
        IRepository<ValuingOfMyFoodOrder> iValuingOfMyFoodOrderRepository = UnityHelper.UnityToT<IRepository<ValuingOfMyFoodOrder>>();

        private ScoreOfItemInFoodOrder scoreOfItemInFoodOrder;

        protected void Page_Load(object sender, EventArgs e)
        {
            scoreOfItemInFoodOrder = iScoreOfItemInFoodOrderRepository.Load(Request.Params["uid"].ToString());

            if (Request.Params["__EVENTVALIDATION"] != null)
            {

                SaveScoreOfItemInFoodOrder();
            }
            else
            {
                Score.Value = scoreOfItemInFoodOrder.Score.ToString();
                ItemName.Value = scoreOfItemInFoodOrder.ValuingItemOfMyFoodOrder.ValuingItemName;
                ItemID.Value = scoreOfItemInFoodOrder.ValuingItemOfMyFoodOrder.Id;
            }
        }

        private void SaveScoreOfItemInFoodOrder()
        {
            BindingHelper.RequestToObject(scoreOfItemInFoodOrder);
            scoreOfItemInFoodOrder.ValuingItemOfMyFoodOrder = iValuingItemOfMyFoodOrderRepository.Get(ItemID.Value);

            iScoreOfItemInFoodOrderRepository.SaveOrUpdate(scoreOfItemInFoodOrder);

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