using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using friday.core;
using friday.core.repositories;
using friday.core.components;
using friday.core.domain;
using friday.core.services;

namespace Friday.mvc.weblogin.activity
{
    public partial class pActivityDetail : BasePage
    {
        IActivityService iActivityService = UnityHelper.UnityToT<IActivityService>();
        private Activity activity;
        protected void Page_Load(object sender, EventArgs e)
        {
            this.tagName = systemFunctionObjectService.基本信息模块.商家活动维护.TagName;
            if (!this.PermissionValidate(PermissionTag.Enable))
            {
                AjaxResult result = new AjaxResult();
                result.statusCode = "300";
                result.message = "没有浏览Activity权限";
                FormatJsonResult jsonResult = new FormatJsonResult();
                jsonResult.Data = result;
                Response.Write(jsonResult.FormatResult());
                Response.End();
            }
            string uid = Request.Params["uid"].ToString();
            activity = iActivityService.Load(uid);

            BindingHelper.ObjectToControl(activity, this);
            ImagePreview.Src = activity.Image;

        }
    }
}