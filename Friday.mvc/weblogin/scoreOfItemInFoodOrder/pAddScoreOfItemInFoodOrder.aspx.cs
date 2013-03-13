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
using friday.core.services;

namespace Friday.mvc.weblogin.scoreOfItemInFoodOrder
{
    public partial class pAddScoreOfItemInFoodOrder : BasePage
    {
        IScoreOfItemInFoodOrderService iScoreOfItemInFoodOrderService = UnityHelper.UnityToT<IScoreOfItemInFoodOrderService>();
        IValuingOfMyFoodOrderService iValuingOfMyFoodOrderService = UnityHelper.UnityToT<IValuingOfMyFoodOrderService>();
        IValuingItemOfMyFoodOrderService iValuingItemOfMyFoodOrderService = UnityHelper.UnityToT<IValuingItemOfMyFoodOrderService>();

        private ScoreOfItemInFoodOrder scoreOfItemInFoodOrder;
        private ValuingOfMyFoodOrder valuingOfMyFoodOrder;


        protected void Page_Load(object sender, EventArgs e)
        {
            tagName = systemFunctionObjectService.餐馆模块.食品评价项评分管理.TagName;
            if (!this.PermissionValidate(PermissionTag.Edit))
            {
                AjaxResult result = new AjaxResult();
                result.statusCode = "300";
                result.message = "没有ScoreOfItemInFoodOrder增加权限";
                FormatJsonResult jsonResult = new FormatJsonResult();
                jsonResult.Data = result;
                Response.Write(jsonResult.FormatResult());
                Response.End();
            }
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
            scoreOfItemInFoodOrder.ValuingItemOfMyFoodOrder = iValuingItemOfMyFoodOrderService.Load(ItemID.Value);


            valuingOfMyFoodOrder = iValuingOfMyFoodOrderService.Load(Request.Params["valuingOfMyFoodOrder_id"]);
            scoreOfItemInFoodOrder.ValuingOfMyFoodOrder = valuingOfMyFoodOrder;
            iScoreOfItemInFoodOrderService.Save(scoreOfItemInFoodOrder);

            int count = iScoreOfItemInFoodOrderService.GetScoreOfItemInFoodOrdersCount(Request.Params["valuingOfMyFoodOrder_id"]);
            double Sum = iScoreOfItemInFoodOrderService.GetScoreOfItemInFoodOrdersSum(Request.Params["valuingOfMyFoodOrder_id"]);

            valuingOfMyFoodOrder.AverageScore = Sum / count;
            iValuingOfMyFoodOrderService.Update(valuingOfMyFoodOrder);

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