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

namespace Friday.mvc.weblogin
{
    public partial class pAddOrderOfHouse : System.Web.UI.Page
    {
        protected string MyHouseOrderID;

        private IOrderOfHouseRepository iOrderOfHouseRepository = UnityHelper.UnityToT<IOrderOfHouseRepository>();
        private IMyHouseOrderRepository iMyHouseOrderRepository = UnityHelper.UnityToT<IMyHouseOrderRepository>();
        private IHouseRepository iHouseRepository = UnityHelper.UnityToT<IHouseRepository>();

        private MyHouseOrder myHouseOrder;
        private OrderOfHouse orderOfHouse = new OrderOfHouse();
        private House houseObj;

        protected void Page_Load(object sender, EventArgs e)
        {
            if (Request.Params["__EVENTVALIDATION"] != null)
            {
                SaveOrderOfHouse();
            }
        }

        private void SaveOrderOfHouse()
        {
            myHouseOrder = iMyHouseOrderRepository.Get(Request.Params["myHouseOrder_id"]);
            houseObj = iHouseRepository.Get(Request.Params["HouseID"]);

            BindingHelper.RequestToObject(orderOfHouse);
            orderOfHouse.House = houseObj;
            orderOfHouse.MyHouseOrder = myHouseOrder;

            myHouseOrder.Price = myHouseOrder.Price + orderOfHouse.Price;

            iOrderOfHouseRepository.SaveOrUpdate(orderOfHouse);
            iMyHouseOrderRepository.SaveOrUpdate(myHouseOrder);

            AjaxResult result = new AjaxResult();
            result.statusCode = "200";
            result.message = "修改成功";
            result.navTabId = "referer";
            //2013-02-13 basilwang set rel_hook to panelId
            if (Request.Params["rel_hook"] != null)
            {
                result.panelId = Request.Params["rel_hook"];
            }
            result.callbackType = "closeCurrent";
            FormatJsonResult jsonResult = new FormatJsonResult();
            jsonResult.Data = result;
            Response.Write(jsonResult.FormatResult());
            Response.End();

        }
    }
}