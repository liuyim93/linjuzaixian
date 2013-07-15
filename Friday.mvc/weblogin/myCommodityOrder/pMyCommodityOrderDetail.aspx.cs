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
    public partial class pMyCommodityOrderDetail : BasePage
    {
        IRepository<MyCommodityOrder> iMyCommodityOrderRepository = UnityHelper.UnityToT<IRepository<MyCommodityOrder>>();

        private MyCommodityOrder myCommodityOrder;

        protected void Page_Load(object sender, EventArgs e)
        {
            tagName = systemFunctionObjectService.商店模块.商品订单维护.TagName;
            if (!this.PermissionValidate(PermissionTag.Enable))
            {
                AjaxResult result = new AjaxResult();
                result.statusCode = "300";
                result.message = "没有MyCommodityOrder浏览权限";
                result.callbackType = "closeCurrent";
                FormatJsonResult jsonResult = new FormatJsonResult();
                jsonResult.Data = result;
                Response.Write(jsonResult.FormatResult());
                Response.End();
            }
            string uid = Request.Params["uid"].ToString();
            myCommodityOrder = iMyCommodityOrderRepository.Load(uid);

            BindingHelper.ObjectToControl(myCommodityOrder, this);
            LoginName.Value = myCommodityOrder.SystemUser.LoginUser.LoginName;
            Name.Value = myCommodityOrder.Shop.Name;
        }
    }
}