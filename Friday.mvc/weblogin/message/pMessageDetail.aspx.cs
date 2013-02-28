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

namespace Friday.mvc.weblogin.message
{
    public partial class pMessageDetail : BasePage
    {
        IRepository<Message> iMessageRepository = UnityHelper.UnityToT<IRepository<Message>>();
        private Message message;
        protected void Page_Load(object sender, EventArgs e)
        {
            string uid = Request.Params["uid"].ToString();
            message = iMessageRepository.Load(uid);
            BindingHelper.ObjectToControl(message, this);
            this.Content.Value=message.MessageContent.Content;
            this.FromLoginUser.Value = message.FromLoginUser.LoginName;
            this.ToLoginUser.Value = message.ToLoginUser.LoginName;
         



        }
    }
}