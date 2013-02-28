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
    public partial class pEditMyCommodityOrder : BasePage
    {
        IRepository<MyCommodityOrder> iMyCommodityOrderRepository = UnityHelper.UnityToT<IRepository<MyCommodityOrder>>();
        IRepository<SystemUser> iSystemUserRepository = UnityHelper.UnityToT<IRepository<SystemUser>>();

        private MyCommodityOrder myCommodityOrder;

        protected void Page_Load(object sender, EventArgs e)
        {
            string uid = Request.Params["uid"].ToString();
            myCommodityOrder = iMyCommodityOrderRepository.Load(uid);
            if (Request.Params["__EVENTVALIDATION"] != null)
            {

                SaveMyCommodityOrder();
            }
            else
            {
                BindingHelper.ObjectToControl(myCommodityOrder, this);
                SystemUser.Value = myCommodityOrder.SystemUser.LoginUser.LoginName;
                SystemUserID.Value = myCommodityOrder.SystemUser.Id;
            }
        }

        private void SaveMyCommodityOrder()
        {
            BindingHelper.RequestToObject(myCommodityOrder);
            myCommodityOrder.SystemUser = iSystemUserRepository.Get(Request.Params["SystemUserID"]);

            iMyCommodityOrderRepository.SaveOrUpdate(myCommodityOrder);

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