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
using friday.core.services;

namespace Friday.mvc.weblogin.scoreOfItemInCommodityOrder
{
    public partial class pAddScoreOfItemInCommodityOrder : BasePage
    {
        IScoreOfItemInCommodityOrderService iScoreOfItemInCommodityOrderService = UnityHelper.UnityToT<IScoreOfItemInCommodityOrderService>();
        IValuingOfMyCommodityOrderService iValuingOfMyCommodityOrderService = UnityHelper.UnityToT<IValuingOfMyCommodityOrderService>();
        IValuingItemOfMyCommodityOrderService iValuingItemOfMyCommodityOrderService = UnityHelper.UnityToT<IValuingItemOfMyCommodityOrderService>();


        private ScoreOfItemInCommodityOrder scoreOfItemInCommodityOrder;
        private ValuingOfMyCommodityOrder valuingOfMyCommodityOrder;

        protected void Page_Load(object sender, EventArgs e)
        {
            tagName = systemFunctionObjectService.商店模块.商品评价项评分管理.TagName;
            if (!this.PermissionValidate(PermissionTag.Edit))
            {
                AjaxResult result = new AjaxResult();
                result.statusCode = "300";
                result.message = "没有ScoreOfItemInCommodityOrder增加权限";
                result.callbackType = "closeCurrent";
                FormatJsonResult jsonResult = new FormatJsonResult();
                jsonResult.Data = result;
                Response.Write(jsonResult.FormatResult());
                Response.End();
            }
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
            scoreOfItemInCommodityOrder.ValuingItemOfMyCommodityOrder = iValuingItemOfMyCommodityOrderService.Load(ItemID.Value);
            

            valuingOfMyCommodityOrder = iValuingOfMyCommodityOrderService.Load(Request.Params["valuingOfMyCommodityOrder_id"]);
            scoreOfItemInCommodityOrder.ValuingOfMyCommodityOrder = valuingOfMyCommodityOrder;
            iScoreOfItemInCommodityOrderService.Save(scoreOfItemInCommodityOrder);

            int count = iScoreOfItemInCommodityOrderService.GetScoreOfItemInCommodityOrdersCount(Request.Params["valuingOfMyCommodityOrder_id"]);
            double Sum = iScoreOfItemInCommodityOrderService.GetScoreOfItemInCommodityOrdersSum(Request.Params["valuingOfMyCommodityOrder_id"]);

            valuingOfMyCommodityOrder.AverageScore = Sum / count;
            iValuingOfMyCommodityOrderService.Update(valuingOfMyCommodityOrder);

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