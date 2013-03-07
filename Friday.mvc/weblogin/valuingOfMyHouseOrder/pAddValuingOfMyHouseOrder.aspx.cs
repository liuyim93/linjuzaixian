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

namespace Friday.mvc.weblogin.valuingOfMyHouseOrder
{
    public partial class pAddValuingOfMyHouseOrder : BasePage
    {
        IRepository<ValuingOfMyHouseOrder> iValuingOfMyHouseOrderRepository = UnityHelper.UnityToT<IRepository<ValuingOfMyHouseOrder>>();
        IRepository<MyHouseOrder> iMyHouseOrderRepository = UnityHelper.UnityToT<IRepository<MyHouseOrder>>();

        private ValuingOfMyHouseOrder valuingOfMyHouseOrder = new ValuingOfMyHouseOrder();
        private MyHouseOrder myHouseOrder;

        protected void Page_Load(object sender, EventArgs e)
        {
            if (Request.Params["__EVENTVALIDATION"] != null)
            {
                SaveValuingOfMyHouseOrder();
            }
        }

        private void SaveValuingOfMyHouseOrder()
        {
            myHouseOrder = iMyHouseOrderRepository.Get(OrderID.Value);
            valuingOfMyHouseOrder.LoginUser = myHouseOrder.SystemUser.LoginUser;
            valuingOfMyHouseOrder.Merchant = myHouseOrder.Rent;
            valuingOfMyHouseOrder.MyHouseOrder = myHouseOrder;

            BindingHelper.RequestToObject(valuingOfMyHouseOrder);
            iValuingOfMyHouseOrderRepository.SaveOrUpdate(valuingOfMyHouseOrder);

            AjaxResult result = new AjaxResult();
            FormatJsonResult jsonResult = new FormatJsonResult();

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