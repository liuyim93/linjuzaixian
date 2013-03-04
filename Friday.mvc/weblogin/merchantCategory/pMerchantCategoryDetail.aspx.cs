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
    public partial class pMerchantCategoryDetail : BasePage
    {
        IMerchantCategoryService iMerchantCategoryService = UnityHelper.UnityToT<IMerchantCategoryService>();

        private MerchantCategory merchantCategory;

        protected void Page_Load(object sender, EventArgs e)
        {
            tagName = systemFunctionObjectService.基本信息模块.商铺经营类型维护.TagName;
            if (!this.PermissionValidate(PermissionTag.Enable))
            {
                AjaxResult result = new AjaxResult();
                result.statusCode = "300";
                result.message = "没有MerchantCategory浏览权限";
                FormatJsonResult jsonResult = new FormatJsonResult();
                jsonResult.Data = result;
                Response.Write(jsonResult.FormatResult());
                Response.End();
            }
            string uid = Request.Params["uid"].ToString();
            merchantCategory = iMerchantCategoryService.Load(uid);

            BindingHelper.ObjectToControl(merchantCategory, this);
        }
    }
}