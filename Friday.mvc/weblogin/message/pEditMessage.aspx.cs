using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using friday.core.domain;
using friday.core.repositories;
using friday.core;
using friday.core.components;
using System.IO;
using friday.core.services;

namespace Friday.mvc.weblogin.message
{
    public partial class pEditMessage : BasePage
    {
        IMessageService iMessageService = UnityHelper.UnityToT<IMessageService>();
        IMessageContentService iMessageContentService = UnityHelper.UnityToT<IMessageContentService>();
        private Message message;
        protected void Page_Load(object sender, EventArgs e)
        {
            string uid = Request.Params["uid"].ToString();

            this.tagName = systemFunctionObjectService.消息模块.消息维护.TagName;
            this.PermissionCheck(PermissionTag.Edit);

            message = iMessageService.Load(uid);
            if (Request.Params["__EVENTVALIDATION"] != null)
            {

                SaveMessage();
            }
            else
            {

                BindingHelper.ObjectToControl(message, this);
                this.Content.Value = message.MessageContent.Content;
                this.FromLoginUser.Value = message.FromLoginUser.LoginName;
                this.ToLoginUser.Value = message.ToLoginUser.LoginName;

            }
        }

        private void SaveMessage()
        {
            MessageContent mssc = iMessageContentService.Load(message.MessageContent.Id);
            mssc.Content = this.Content.Value;
            iMessageContentService.Update(mssc);

            BindingHelper.RequestToObject(message);
            iMessageService.Update(message);

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