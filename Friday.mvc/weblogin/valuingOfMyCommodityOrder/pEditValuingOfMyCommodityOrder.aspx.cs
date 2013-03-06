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

namespace Friday.mvc.weblogin.valuingOfMyCommodityOrder
{
    public partial class pEditValuingOfMyCommodityOrder : BasePage
    {
        IRepository<ValuingOfMyCommodityOrder> iValuingOfMyCommodityOrderRepository = UnityHelper.UnityToT<IRepository<ValuingOfMyCommodityOrder>>();
        IRepository<MyCommodityOrder> iMyCommodityOrderRepository = UnityHelper.UnityToT<IRepository<MyCommodityOrder>>();

        private ValuingOfMyCommodityOrder valuingOfMyCommodityOrder;
        private MyCommodityOrder myCommodityOrder;

        protected void Page_Load(object sender, EventArgs e)
        {

            string uid = Request.Params["uid"].ToString();
            valuingOfMyCommodityOrder = iValuingOfMyCommodityOrderRepository.Load(uid);
            myCommodityOrder = valuingOfMyCommodityOrder.MyCommodityOrder;

            if (Request.Params["__EVENTVALIDATION"] != null)
            {
                SaveValuingOfMyCommodityOrder();
            }
            else
            {
                BindingHelper.ObjectToControl(myCommodityOrder, this);
                BindingHelper.ObjectToControl(valuingOfMyCommodityOrder, this);

                OrderID.Value = myCommodityOrder.Id;
                LoginName.Value = valuingOfMyCommodityOrder.LoginUser.LoginName;
                MerchantName.Value = valuingOfMyCommodityOrder.Merchant.Name;

            }
        }

        private void SaveValuingOfMyCommodityOrder()
        {
            myCommodityOrder = iMyCommodityOrderRepository.Get(OrderID.Value);
            valuingOfMyCommodityOrder.LoginUser = myCommodityOrder.SystemUser.LoginUser;
            valuingOfMyCommodityOrder.Merchant = myCommodityOrder.Shop;
            valuingOfMyCommodityOrder.MyCommodityOrder = myCommodityOrder;

            BindingHelper.RequestToObject(valuingOfMyCommodityOrder);
            iValuingOfMyCommodityOrderRepository.SaveOrUpdate(valuingOfMyCommodityOrder);

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