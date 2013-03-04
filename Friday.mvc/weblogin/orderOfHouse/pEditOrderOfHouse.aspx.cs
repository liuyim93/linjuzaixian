using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using friday.core.repositories;
using friday.core;
using friday.core.components;
using friday.core.domain;
using friday.core.services;

namespace Friday.mvc.weblogin
{
    public partial class pEditOrderOfHouse : BasePage
    {
        protected string MyHouseOrderID;

        private IOrderOfHouseService iOrderOfHouseService = UnityHelper.UnityToT<IOrderOfHouseService>();
        private IMyHouseOrderService iMyHouseOrderService = UnityHelper.UnityToT<IMyHouseOrderService>();
        private IHouseRepository iHouseRepository = UnityHelper.UnityToT<IHouseRepository>();

        private MyHouseOrder myHouseOrder;
        private OrderOfHouse orderOfHouse;
        private House houseObj;

        protected void Page_Load(object sender, EventArgs e)
        {
            string uid;
            this.tagName = systemFunctionObjectService.租房模块.租房订单明细维护.TagName;
            this.PermissionCheck(PermissionTag.Edit);
            uid = Request.Params["uid"].ToString();

            orderOfHouse = iOrderOfHouseService.Load(uid);

            if (Request.Params["__EVENTVALIDATION"] != null)
            {
                SaveOrderOfHouse();
            }
            else
            {
                BindingHelper.ObjectToControl(orderOfHouse, this);
                House.Value = orderOfHouse.House.Name;
                HouseID.Value = orderOfHouse.House.Id;
                OnePrice.Value = orderOfHouse.House.Price.ToString();
                OldPrice.Value = orderOfHouse.Price.ToString();
            }
        }

        private void SaveOrderOfHouse()
        {
            myHouseOrder = iMyHouseOrderService.Load(Request.Params["myHouseOrder_id"]);
            houseObj = iHouseRepository.Get(Request.Params["HouseID"]);

            BindingHelper.RequestToObject(orderOfHouse);
            orderOfHouse.House = houseObj;
            orderOfHouse.MyHouseOrder = myHouseOrder;

            myHouseOrder.Price = myHouseOrder.Price - Convert.ToDouble(OldPrice.Value) + orderOfHouse.Price;

            iOrderOfHouseService.Update(orderOfHouse);
            iMyHouseOrderService.Update(myHouseOrder);

            AjaxResult result = new AjaxResult();
            result.statusCode = "200";
            result.message = "修改成功";
            result.navTabId = "referer"; 
            //2013-02-13 basilwang set rel_hook to panelId
            //if (Request.Params["rel_hook"] != null)
            //{
            //    result.panelId = Request.Params["rel_hook"];
            //}
            result.callbackType = "closeCurrent";
            FormatJsonResult jsonResult = new FormatJsonResult();
            jsonResult.Data = result;
            Response.Write(jsonResult.FormatResult());
            Response.End();

        }
    }
}