using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using friday.core.repositories;
using friday.core;
using friday.core.domain;
using friday.core.components;
using friday.core.services;

namespace Friday.mvc.weblogin
{
    public partial class pEditMyHouseOrder : BasePage
    {
        IMyHouseOrderService iMyHouseOrderService = UnityHelper.UnityToT<IMyHouseOrderService>();
        IRepository<SystemUser> iSystemUserRepository = UnityHelper.UnityToT<IRepository<SystemUser>>();

        private MyHouseOrder myHouseOrder;

        protected void Page_Load(object sender, EventArgs e)
        {
            string uid;
            this.tagName = systemFunctionObjectService.租房模块.租房订单维护.TagName;
            this.PermissionCheck(PermissionTag.Edit);
            uid = Request.Params["uid"].ToString();

            myHouseOrder = iMyHouseOrderService.Load(uid);
            if (Request.Params["__EVENTVALIDATION"] != null)
            {

                SaveMyHouseOrder();
            }
            else
            {
                BindingHelper.ObjectToControl(myHouseOrder, this);
                SystemUser.Value = myHouseOrder.SystemUser.LoginUser.LoginName;
                SystemUserID.Value = myHouseOrder.SystemUser.Id;
            }
        }

        private void SaveMyHouseOrder()
        {
            BindingHelper.RequestToObject(myHouseOrder);
            myHouseOrder.SystemUser = iSystemUserRepository.Get(Request.Params["SystemUserID"]);

            iMyHouseOrderService.Update(myHouseOrder);

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