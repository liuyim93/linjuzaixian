﻿using System;
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
    public partial class pAddMessage : System.Web.UI.Page
    {
        IRepository<Message> iMessageRepository = UnityHelper.UnityToT<IRepository<Message>>();
    
        protected void Page_Load(object sender, EventArgs e)
        {
          
            if (Request.Params["__EVENTVALIDATION"] != null)
            {

                SaveMessage();
            }
            
        }

        private void SaveMessage()
        {
            Message act = new Message();

            BindingHelper.RequestToObject(act);

         
            

            iMessageRepository.SaveOrUpdate(act);

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