using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using friday.core.repositories;
using friday.core;
using friday.core.components;
using friday.core.services;
using friday.core.domain;

namespace Friday.mvc.weblogin
{
    public partial class pMyFoodOrderDetail : BasePage
    {
        IMyFoodOrderService iMyFoodOrderService = UnityHelper.UnityToT<IMyFoodOrderService>();

        private MyFoodOrder myFoodOrder;

        protected void Page_Load(object sender, EventArgs e)
        {
            tagName = systemFunctionObjectService.餐馆模块.食品订单维护.TagName;
            if (!this.PermissionValidate(PermissionTag.Enable))
            {
                AjaxResult result = new AjaxResult();
                result.statusCode = "300";
                result.message = "没有MyFoodOrder浏览权限";
                FormatJsonResult jsonResult = new FormatJsonResult();
                jsonResult.Data = result;
                Response.Write(jsonResult.FormatResult());
                Response.End();
            }

            string uid = Request.Params["uid"].ToString();
            myFoodOrder = iMyFoodOrderService.Load(uid);

            BindingHelper.ObjectToControl(myFoodOrder, this);
            LoginName.Value = myFoodOrder.SystemUser.LoginUser.LoginName;
            Name.Value = myFoodOrder.Restaurant.Name;
        }
    }
}