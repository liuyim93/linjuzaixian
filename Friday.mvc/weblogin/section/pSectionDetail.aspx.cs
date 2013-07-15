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
    public partial class pSectionDetail : BasePage
    {
        ISectionService iSectionService = UnityHelper.UnityToT<ISectionService>();

        private Section globalGoodsType;

        protected void Page_Load(object sender, EventArgs e)
        {
            tagName = systemFunctionObjectService.基本信息模块.系统栏目管理.TagName;
            if (!this.PermissionValidate(PermissionTag.Enable))
            {
                AjaxResult result = new AjaxResult();
                result.statusCode = "300";
                result.message = "没有Section浏览权限";
                result.callbackType = "closeCurrent";
                FormatJsonResult jsonResult = new FormatJsonResult();
                jsonResult.Data = result;
                Response.Write(jsonResult.FormatResult());
                Response.End();
            }
            string uid = Request.Params["uid"].ToString();
            globalGoodsType = iSectionService.Load(uid);

            BindingHelper.ObjectToControl(globalGoodsType, this);
        }
    }
}