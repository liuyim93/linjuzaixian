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

namespace Friday.mvc.weblogin.scoreOfItemInCommodityOrder
{
    public partial class pAddScoreOfItemInCommodityOrder : System.Web.UI.Page
    {
        IRepository<ScoreOfItemInCommodityOrder> iScoreOfItemInCommodityOrderRepository = UnityHelper.UnityToT<IRepository<ScoreOfItemInCommodityOrder>>();
        IRepository<ValuingItemOfMyCommodityOrder> iValuingItemOfMyCommodityOrderRepository = UnityHelper.UnityToT<IRepository<ValuingItemOfMyCommodityOrder>>();
        IRepository<ValuingOfMyCommodityOrder> iValuingOfMyCommodityOrderRepository = UnityHelper.UnityToT<IRepository<ValuingOfMyCommodityOrder>>();

        private ScoreOfItemInCommodityOrder scoreOfItemInCommodityOrder;

        protected void Page_Load(object sender, EventArgs e)
        {
            if (Request.Params["__EVENTVALIDATION"] != null)
            {
                SaveScoreOfItemInCommodityOrder();
            }
        }

        private void SaveScoreOfItemInCommodityOrder()
        {
            AjaxResult result = new AjaxResult();
            FormatJsonResult jsonResult = new FormatJsonResult();

            scoreOfItemInCommodityOrder = new ScoreOfItemInCommodityOrder();
            BindingHelper.RequestToObject(scoreOfItemInCommodityOrder);
            scoreOfItemInCommodityOrder.ValuingItemOfMyCommodityOrder = iValuingItemOfMyCommodityOrderRepository.Get(ItemID.Value);
            scoreOfItemInCommodityOrder.ValuingOfMyCommodityOrder = iValuingOfMyCommodityOrderRepository.Get(Request.Params["valuingOfMyCommodityOrder_id"]);
            
            iScoreOfItemInCommodityOrderRepository.SaveOrUpdate(scoreOfItemInCommodityOrder);

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