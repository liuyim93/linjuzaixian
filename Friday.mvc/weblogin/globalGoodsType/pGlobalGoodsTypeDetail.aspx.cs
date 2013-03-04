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
    public partial class pGlobalGoodsTypeDetail : BasePage
    {
        IGlobalGoodsTypeService iGlobalGoodsTypeService = UnityHelper.UnityToT<IGlobalGoodsTypeService>();

        private GlobalGoodsType globalGoodsType;

        protected void Page_Load(object sender, EventArgs e)
        {
            if (!this.PermissionValidate(PermissionTag.Enable))
            {
                AjaxResult result = new AjaxResult();
                result.statusCode = "300";
                result.message = "没有GlobalGoodsType浏览权限";
                FormatJsonResult jsonResult = new FormatJsonResult();
                jsonResult.Data = result;
                Response.Write(jsonResult.FormatResult());
                Response.End();
            }
            string uid = Request.Params["uid"].ToString();
            globalGoodsType = iGlobalGoodsTypeService.Load(uid);

            BindingHelper.ObjectToControl(globalGoodsType, this);
        }
    }
}