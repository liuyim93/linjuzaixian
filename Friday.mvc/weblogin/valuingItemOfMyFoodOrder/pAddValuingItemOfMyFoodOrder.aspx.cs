using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using friday.core.components;
using friday.core.domain;
using friday.core.repositories;
using friday.core;
using friday.core.services;

namespace Friday.mvc.weblogin.valuingItemOfMyFoodOrder
{
    public partial class pAddValuingItemOfMyFoodOrder : BasePage
    {
       IValuingItemOfMyFoodOrderService iValuingItemOfMyFoodOrderService = UnityHelper.UnityToT<IValuingItemOfMyFoodOrderService>();

        private ValuingItemOfMyFoodOrder valuingItemOfMyFoodOrder;

        protected void Page_Load(object sender, EventArgs e)
        {
            tagName = systemFunctionObjectService.餐馆模块.食品评价项管理.TagName;
            if (!this.PermissionValidate(PermissionTag.Edit))
            {
                AjaxResult result = new AjaxResult();
                result.statusCode = "300";
                result.message = "没有ValuingItemOfMyFoodOrder增加权限";
                FormatJsonResult jsonResult = new FormatJsonResult();
                jsonResult.Data = result;
                Response.Write(jsonResult.FormatResult());
                Response.End();
            }

            if (Request.Params["__EVENTVALIDATION"] != null)
            {            
                SaveValuingItemOfMyFoodOrder();
            }
        }

        private void SaveValuingItemOfMyFoodOrder()
        {
            AjaxResult result = new AjaxResult();
            FormatJsonResult jsonResult = new FormatJsonResult();

            valuingItemOfMyFoodOrder = new ValuingItemOfMyFoodOrder();
            BindingHelper.RequestToObject(valuingItemOfMyFoodOrder);
            iValuingItemOfMyFoodOrderService.Save(valuingItemOfMyFoodOrder);

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