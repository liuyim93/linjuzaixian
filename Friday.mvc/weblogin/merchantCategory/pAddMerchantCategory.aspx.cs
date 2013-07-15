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
    public partial class pAddMerchantCategory : BasePage
    {
        IMerchantCategoryService iMerchantCategoryService = UnityHelper.UnityToT<IMerchantCategoryService>();

        private MerchantCategory merchantCategory;

        protected void Page_Load(object sender, EventArgs e)
        {
            AjaxResult result = new AjaxResult();
            FormatJsonResult jsonResult = new FormatJsonResult();

            tagName = systemFunctionObjectService.基本信息模块.商铺经营类型维护.TagName;
            if (!this.PermissionValidate(PermissionTag.Enable))
            {
                result.statusCode = "300";
                result.message = "没有MerchantCategory增加权限";
                result.callbackType = "closeCurrent";
                jsonResult.Data = result;
                Response.Write(jsonResult.FormatResult());
                Response.End();
            }
            if (Request.Params["__EVENTVALIDATION"] != null)
            {

                SaveMerchantCategory();
            }
        }

        private void SaveMerchantCategory()
        {
            AjaxResult result = new AjaxResult();
            FormatJsonResult jsonResult = new FormatJsonResult();

            merchantCategory = new MerchantCategory();
            BindingHelper.RequestToObject(merchantCategory);
            iMerchantCategoryService.Save(merchantCategory);

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