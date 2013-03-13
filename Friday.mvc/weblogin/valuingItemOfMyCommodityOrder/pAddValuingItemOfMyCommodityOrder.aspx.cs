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
using friday.core.services;

namespace Friday.mvc.weblogin.valuingItemOfMyCommodityOrder
{
    public partial class pAddValuingItemOfMyCommodityOrder : BasePage
    {
        IValuingItemOfMyCommodityOrderService iValuingItemOfMyCommodityOrderService = UnityHelper.UnityToT<IValuingItemOfMyCommodityOrderService>();

        private ValuingItemOfMyCommodityOrder valuingItemOfMyCommodityOrder;

        protected void Page_Load(object sender, EventArgs e)
        {
            tagName = systemFunctionObjectService.商店模块.商品评价项管理.TagName;
            if (!this.PermissionValidate(PermissionTag.Edit))
            {
                AjaxResult result = new AjaxResult();
                result.statusCode = "300";
                result.message = "没有ValuingItemOfMyCommodityOrder增加权限";
                FormatJsonResult jsonResult = new FormatJsonResult();
                jsonResult.Data = result;
                Response.Write(jsonResult.FormatResult());
                Response.End();
            }
            if (Request.Params["__EVENTVALIDATION"] != null)
            {           

                SaveValuingItemOfMyCommodityOrder();
            }
        }

        private void SaveValuingItemOfMyCommodityOrder()
        {
            AjaxResult result = new AjaxResult();
            FormatJsonResult jsonResult = new FormatJsonResult();

            valuingItemOfMyCommodityOrder = new ValuingItemOfMyCommodityOrder();
            BindingHelper.RequestToObject(valuingItemOfMyCommodityOrder);
            iValuingItemOfMyCommodityOrderService.Save(valuingItemOfMyCommodityOrder);

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