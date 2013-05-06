using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using friday.core.services;
using friday.core;
using friday.core.domain;
using friday.core.components;

namespace Friday.mvc.weblogin.sku
{
    public partial class pCommodityDetail : BasePage
    {
        private ICommodityService iCommodityService = UnityHelper.UnityToT<ICommodityService>();

        private Commodity commodity;

        protected void Page_Load(object sender, EventArgs e)
        {
            tagName = systemFunctionObjectService.基本信息模块.顾客账号维护.TagName;
            if (!this.PermissionValidate(PermissionTag.Enable))
            {
                AjaxResult result = new AjaxResult();
                result.statusCode = "300";
                result.message = "没有Commodity浏览权限";
                FormatJsonResult jsonResult = new FormatJsonResult();
                jsonResult.Data = result;
                Response.Write(jsonResult.FormatResult());
                Response.End();
            }

            string uid = Request.Params["uid"].ToString();
            commodity = iCommodityService.Load(uid);

            BindingHelper.ObjectToControl(commodity, this);
        }
    }
}