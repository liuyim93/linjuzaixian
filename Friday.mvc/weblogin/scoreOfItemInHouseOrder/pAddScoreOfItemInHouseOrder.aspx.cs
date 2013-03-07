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

namespace Friday.mvc.weblogin.scoreOfItemInHouseOrder
{
    public partial class pAddScoreOfItemInHouseOrder : BasePage
    {
        IRepository<ScoreOfItemInHouseOrder> iScoreOfItemInHouseOrderRepository = UnityHelper.UnityToT<IRepository<ScoreOfItemInHouseOrder>>();
        IRepository<ValuingItemOfMyHouseOrder> iValuingItemOfMyHouseOrderRepository = UnityHelper.UnityToT<IRepository<ValuingItemOfMyHouseOrder>>();
        IRepository<ValuingOfMyHouseOrder> iValuingOfMyHouseOrderRepository = UnityHelper.UnityToT<IRepository<ValuingOfMyHouseOrder>>();

        private ScoreOfItemInHouseOrder scoreOfItemInHouseOrder;

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
            scoreOfItemInHouseOrder.ValuingItemOfMyHouseOrder = iValuingItemOfMyHouseOrderRepository.Get(ItemID.Value);
            scoreOfItemInHouseOrder.ValuingOfMyHouseOrder = iValuingOfMyHouseOrderRepository.Get(Request.Params["valuingOfMyHouseOrder_id"]);

            iScoreOfItemInHouseOrderRepository.SaveOrUpdate(scoreOfItemInHouseOrder);

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