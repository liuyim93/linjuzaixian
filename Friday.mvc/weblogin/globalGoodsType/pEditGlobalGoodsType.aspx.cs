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
using friday.core.EnumType;
using friday.core.services;

namespace Friday.mvc.weblogin
{
    public partial class pEditGlobalGoodsType : BasePage
    {
        IGlobalGoodsTypeService iGlobalGoodsTypeService = UnityHelper.UnityToT<IGlobalGoodsTypeService>();

        private GlobalGoodsType globalGoodsType;

        protected void Page_Load(object sender, EventArgs e)
        {
            string uid;
            this.tagName = systemFunctionObjectService.基本信息模块.公共商品类型维护.TagName;
            this.PermissionCheck(PermissionTag.Edit);
            if (this.CurrentUser.IsAdmin)
            {
                uid = Request.Params["uid"].ToString();
            }
            else
            {
                uid = this.CurrentUser.LoginUserOfMerchants.SingleOrDefault().Merchant.Id;

            }
            globalGoodsType = iGlobalGoodsTypeService.Load(uid);

            if (Request.Params["__EVENTVALIDATION"] != null)
            {

                SaveGlobalGoodsType();
            }
            else
            {
                BindingHelper.ObjectToControl(globalGoodsType, this);
            }
        }

        private void SaveGlobalGoodsType()
        {

            BindingHelper.RequestToObject(globalGoodsType);
            iGlobalGoodsTypeService.Update(globalGoodsType);

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