using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using friday.core.components;
using friday.core.domain;
using friday.core;
using friday.core.repositories;
using friday.core.services;

namespace Friday.mvc.weblogin
{
    public partial class pAddGlobalGoodsType : BasePage
    {
        IGlobalGoodsTypeService iGlobalGoodsTypeService = UnityHelper.UnityToT<IGlobalGoodsTypeService>();

        private GlobalGoodsType globalGoodsType;

        protected void Page_Load(object sender, EventArgs e)
        {
            if (Request.Params["__EVENTVALIDATION"] != null)
            {

                SaveGlobalGoodsType();
            }
        }

        private void SaveGlobalGoodsType()
        {
            AjaxResult result = new AjaxResult();
            FormatJsonResult jsonResult = new FormatJsonResult();

            if (!this.PermissionValidate(PermissionTag.Enable))
            {
                result.statusCode = "300";
                result.message = "没有GlobalGoodsType增加权限";
                jsonResult.Data = result;
                Response.Write(jsonResult.FormatResult());
                Response.End();
            }

            globalGoodsType = new GlobalGoodsType();
            BindingHelper.RequestToObject(globalGoodsType);
            iGlobalGoodsTypeService.Save(globalGoodsType);

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