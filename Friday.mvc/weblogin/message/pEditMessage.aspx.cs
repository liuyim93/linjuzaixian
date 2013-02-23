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

namespace Friday.mvc.weblogin.message
{
    public partial class pEditMessage : System.Web.UI.Page
    {
        IRepository<Message> iMessageRepository = UnityHelper.UnityToT<IRepository<Message>>();
        IRepository<MessageContent> iMessageContentRepository = UnityHelper.UnityToT<IRepository<MessageContent>>();
        private Message message;
        protected void Page_Load(object sender, EventArgs e)
        {
            string uid = Request.Params["uid"].ToString();
            message = iMessageRepository.Load(uid);
            if (Request.Params["__EVENTVALIDATION"] != null)
            {

                SaveMessage();
            }
            else
            {

                BindingHelper.ObjectToControl(message, this);
                this.Content.Value = message.MessageContent.Content;

            }
        }

        private void SaveMessage()
        {
            MessageContent mssc = iMessageContentRepository.Get(message.MessageContent.Id);
            mssc.Content = this.Content.Value;
            iMessageContentRepository.SaveOrUpdate(mssc);

            BindingHelper.RequestToObject(message);            
            iMessageRepository.SaveOrUpdate(message);

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