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

namespace Friday.mvc.weblogin.message
{
    public partial class pMessageDetail : BasePage
    {
        IMessageService iMessageService = UnityHelper.UnityToT<IMessageService>();
        private Message message;
        protected void Page_Load(object sender, EventArgs e)
        {
            tagName = systemFunctionObjectService.消息模块.消息维护.TagName;
            if (!this.PermissionValidate(PermissionTag.Enable))
            {
                AjaxResult result = new AjaxResult();
                result.statusCode = "300";
                result.message = "没有浏览Message权限";
                FormatJsonResult jsonResult = new FormatJsonResult();
                jsonResult.Data = result;
                Response.Write(jsonResult.FormatResult());
                Response.End();
            }
            string uid = Request.Params["uid"].ToString();
            message = iMessageService.Load(uid);
            BindingHelper.ObjectToControl(message, this);
            this.Content.Value=message.MessageContent.Content;
            this.LoginUserName.Value = message.LoginUser.LoginName;
            this.MerchantName.Value = message.Merchant.Name;
         



        }
    }
}