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
    public partial class pEditValuingOfMyHouseOrder : BasePage
    {
        IRepository<ValuingOfMyHouseOrder> iValuingOfMyHouseOrderRepository = UnityHelper.UnityToT<IRepository<ValuingOfMyHouseOrder>>();
        IRepository<MyHouseOrder> iMyHouseOrderRepository = UnityHelper.UnityToT<IRepository<MyHouseOrder>>();

        private ValuingOfMyHouseOrder valuingOfMyHouseOrder;
        private MyHouseOrder myHouseOrder;

        protected void Page_Load(object sender, EventArgs e)
        {

            string uid = Request.Params["uid"].ToString();
            valuingOfMyHouseOrder = iValuingOfMyHouseOrderRepository.Load(uid);
            myHouseOrder = valuingOfMyHouseOrder.MyHouseOrder;

            if (Request.Params["__EVENTVALIDATION"] != null)
            {
                SaveValuingOfMyHouseOrder();
            }
            else
            {
                BindingHelper.ObjectToControl(myHouseOrder, this);
                BindingHelper.ObjectToControl(valuingOfMyHouseOrder, this);

                OrderID.Value = myHouseOrder.Id;
                LoginName.Value = valuingOfMyHouseOrder.LoginUser.LoginName;
                MerchantName.Value = valuingOfMyHouseOrder.Merchant.Name;

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