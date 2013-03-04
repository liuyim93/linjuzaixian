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
    public partial class pAddMessage : BasePage
    {
        IMessageService iMessageService = UnityHelper.UnityToT<IMessageService>();
        IMessageContentService iMessageContentService = UnityHelper.UnityToT<IMessageContentService>();
        
        protected void Page_Load(object sender, EventArgs e)
        {
            tagName = systemFunctionObjectService.消息模块.消息维护.TagName;
            if (!this.PermissionValidate(PermissionTag.Enable))
            {
                AjaxResult result = new AjaxResult();
                result.statusCode = "300";
                result.message = "没有Message增加权限";
                FormatJsonResult jsonResult = new FormatJsonResult();
                jsonResult.Data = result;
                Response.Write(jsonResult.FormatResult());
                Response.End();
            }


            if (Request.Params["__EVENTVALIDATION"] != null)
            {

                SaveMessage();
            }
            
        }

        private void SaveMessage()
        {
            MessageContent mssc = new friday.core.MessageContent();
            mssc.Content = this.Content.Value;
            iMessageContentService.Save(mssc);

            Message mss = new Message();
            mss.MessageContent = mssc;
            BindingHelper.RequestToObject(mss);
            iMessageService.Save(mss);

           


            AjaxResult result = new AjaxResult();
            result.statusCode = "200";
            result.message = "添加成功";
            result.navTabId = "referer";
            result.callbackType = "closeCurrent";
            FormatJsonResult jsonResult = new FormatJsonResult();
            jsonResult.Data = result;
            Response.Write(jsonResult.FormatResult());
            Response.End();

        

        }

    }
}