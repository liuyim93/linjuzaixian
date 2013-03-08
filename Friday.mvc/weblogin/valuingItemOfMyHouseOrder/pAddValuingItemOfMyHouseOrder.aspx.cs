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

namespace Friday.mvc.weblogin.valuingItemOfMyHouseOrder
{
    public partial class pAddValuingItemOfMyHouseOrder : BasePage
    {
        IValuingItemOfMyHouseOrderService iValuingItemOfMyHouseOrderService = UnityHelper.UnityToT<IValuingItemOfMyHouseOrderService>();


        private ValuingItemOfMyHouseOrder valuingItemOfMyHouseOrder;

        protected void Page_Load(object sender, EventArgs e)
        {
            if (Request.Params["__EVENTVALIDATION"] != null)
            {
                tagName = systemFunctionObjectService.租房模块.房屋评价项管理.TagName;
                if (!this.PermissionValidate(PermissionTag.Enable))
                {
                    AjaxResult result = new AjaxResult();
                    result.statusCode = "300";
                    result.message = "没有ValuingItemOfMyHouseOrder增加权限";
                    FormatJsonResult jsonResult = new FormatJsonResult();
                    jsonResult.Data = result;
                    Response.Write(jsonResult.FormatResult());
                    Response.End();
                }

                SaveValuingItemOfMyHouseOrder();
            }
        }

        private void SaveValuingItemOfMyHouseOrder()
        {
            AjaxResult result = new AjaxResult();
            FormatJsonResult jsonResult = new FormatJsonResult();

            valuingItemOfMyHouseOrder = new ValuingItemOfMyHouseOrder();
            BindingHelper.RequestToObject(valuingItemOfMyHouseOrder);
            iValuingItemOfMyHouseOrderService.Save(valuingItemOfMyHouseOrder);

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