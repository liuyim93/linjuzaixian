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

namespace Friday.mvc.weblogin.scoreOfItemInCommodityOrder
{
    public partial class pEditScoreOfItemInCommodityOrder : BasePage
    {
        IScoreOfItemInCommodityOrderService iScoreOfItemInCommodityOrderService = UnityHelper.UnityToT<IScoreOfItemInCommodityOrderService>();
        IValuingOfMyCommodityOrderService iValuingOfMyCommodityOrderService = UnityHelper.UnityToT<IValuingOfMyCommodityOrderService>();
        IValuingItemOfMyCommodityOrderService iValuingItemOfMyCommodityOrderService = UnityHelper.UnityToT<IValuingItemOfMyCommodityOrderService>();

        private ScoreOfItemInCommodityOrder scoreOfItemInCommodityOrder;

        protected void Page_Load(object sender, EventArgs e)
        {
            scoreOfItemInCommodityOrder = iScoreOfItemInCommodityOrderService.Load(Request.Params["uid"].ToString());

            if (Request.Params["__EVENTVALIDATION"] != null)
            {
                this.tagName = systemFunctionObjectService.商店模块.商品评价项评分管理.TagName;
                this.PermissionCheck(PermissionTag.Edit);

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
            scoreOfItemInCommodityOrder.ValuingItemOfMyCommodityOrder = iValuingItemOfMyCommodityOrderService.Load(ItemID.Value);

            iScoreOfItemInCommodityOrderService.Update(scoreOfItemInCommodityOrder);

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