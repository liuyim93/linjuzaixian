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
    public partial class pAddOrderOfHouse : BasePage
    {
        protected string MyHouseOrderID;

        private IOrderOfHouseService iOrderOfHouseService = UnityHelper.UnityToT<IOrderOfHouseService>();
        private IMyHouseOrderService iMyHouseOrderService = UnityHelper.UnityToT<IMyHouseOrderService>();
        private IHouseRepository iHouseRepository = UnityHelper.UnityToT<IHouseRepository>();

        private MyHouseOrder myHouseOrder;
        private OrderOfHouse orderOfHouse = new OrderOfHouse();
        private House houseObj;

        protected void Page_Load(object sender, EventArgs e)
        {
            AjaxResult result = new AjaxResult();
            FormatJsonResult jsonResult = new FormatJsonResult();

            if (!this.PermissionValidate(PermissionTag.Edit))
            {
                result.statusCode = "300";
                result.message = "没有OrderOfHouse增加权限";
                jsonResult.Data = result;
                Response.Write(jsonResult.FormatResult());
                Response.End();
            }
            if (Request.Params["__EVENTVALIDATION"] != null)
            {
                SaveOrderOfHouse();
            }
        }

        private void SaveOrderOfHouse()
        {
            AjaxResult result = new AjaxResult();
            FormatJsonResult jsonResult = new FormatJsonResult();

            myHouseOrder = iMyHouseOrderService.Load(Request.Params["myHouseOrder_id"]);
            houseObj = iHouseRepository.Get(Request.Params["HouseID"]);

            BindingHelper.RequestToObject(orderOfHouse);
            orderOfHouse.House = houseObj;
            orderOfHouse.MyHouseOrder = myHouseOrder;

            myHouseOrder.Price = myHouseOrder.Price + orderOfHouse.Price;

            iOrderOfHouseService.Save(orderOfHouse);
            iMyHouseOrderService.Update(myHouseOrder);

            result.statusCode = "200";
            result.message = "修改成功";
            result.navTabId = "referer";
            //2013-02-13 basilwang set rel_hook to panelId
            //if (Request.Params["rel_hook"] != null)
            //{
            //    result.panelId = Request.Params["rel_hook"];
            //}
            result.callbackType = "closeCurrent";
            jsonResult.Data = result;
            Response.Write(jsonResult.FormatResult());
            Response.End();

        }
    }
}