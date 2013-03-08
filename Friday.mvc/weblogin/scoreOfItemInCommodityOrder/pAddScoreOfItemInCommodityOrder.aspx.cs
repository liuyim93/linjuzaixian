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

        protected void Page_Load(object sender, EventArgs e)
        {
            if (Request.Params["__EVENTVALIDATION"] != null)
            {
                tagName = systemFunctionObjectService.商店模块.商品评价项评分管理.TagName;
                if (!this.PermissionValidate(PermissionTag.Enable))
                {
                    AjaxResult result = new AjaxResult();
                    result.statusCode = "300";
                    result.message = "没有ScoreOfItemInCommodityOrder增加权限";
                    FormatJsonResult jsonResult = new FormatJsonResult();
                    jsonResult.Data = result;
                    Response.Write(jsonResult.FormatResult());
                    Response.End();
                }
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
            scoreOfItemInCommodityOrder.ValuingOfMyCommodityOrder = iValuingOfMyCommodityOrderService.Load(Request.Params["valuingOfMyCommodityOrder_id"]);
            
            iScoreOfItemInCommodityOrderService.Save(scoreOfItemInCommodityOrder);

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