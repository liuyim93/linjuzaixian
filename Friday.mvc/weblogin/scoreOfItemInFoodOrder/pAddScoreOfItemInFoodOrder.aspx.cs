﻿using System;
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
            scoreOfItemInFoodOrder.ValuingItemOfMyFoodOrder = iValuingItemOfMyFoodOrderService.Load(ItemID.Value);
            scoreOfItemInFoodOrder.ValuingOfMyFoodOrder = iValuingOfMyFoodOrderService.Load(Request.Params["valuingOfMyFoodOrder_id"]);

            iScoreOfItemInFoodOrderService.Save(scoreOfItemInFoodOrder);

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