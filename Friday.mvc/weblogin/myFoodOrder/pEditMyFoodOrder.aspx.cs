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
    public partial class pEditMyFoodOrder : BasePage
    {
        IMyFoodOrderService iMyFoodOrderService = UnityHelper.UnityToT<IMyFoodOrderService>();
        IRepository<SystemUser> iSystemUserRepository = UnityHelper.UnityToT<IRepository<SystemUser>>();

        private MyFoodOrder myFoodOrder;

        protected void Page_Load(object sender, EventArgs e)
        {
            string uid;
            this.tagName = systemFunctionObjectService.餐馆模块.食品订单维护.TagName;
            this.PermissionCheck(PermissionTag.Edit);
            uid = Request.Params["uid"].ToString();


            myFoodOrder = iMyFoodOrderService.Load(uid);
            if (Request.Params["__EVENTVALIDATION"] != null)
            {

                SaveMyFoodOrder();
            }
            else
            {
                BindingHelper.ObjectToControl(myFoodOrder, this);
                SystemUser.Value = myFoodOrder.SystemUser.LoginUser.LoginName;
                SystemUserID.Value = myFoodOrder.SystemUser.Id;
            }
        }

        private void SaveMyFoodOrder()
        {
            BindingHelper.RequestToObject(myFoodOrder);
            myFoodOrder.SystemUser = iSystemUserRepository.Get(Request.Params["SystemUserID"]);

            iMyFoodOrderService.Update(myFoodOrder);

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