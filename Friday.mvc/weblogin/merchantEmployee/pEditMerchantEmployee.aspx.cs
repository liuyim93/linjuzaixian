﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using friday.core.repositories;
using friday.core;
using friday.core.domain;
using friday.core.components;
using friday.core.EnumType;
using System.IO;
using friday.core.services;

namespace Friday.mvc.weblogin
{
    public partial class pEditMerchantEmployee : BasePage
    {
       
        private LoginUser lu;
        ILoginUserService iLoginUserService = UnityHelper.UnityToT<ILoginUserService>();
      

        protected void Page_Load(object sender, EventArgs e)
        {
            string uid = Request.Params["merchantEmployeeid"].ToString();

            tagName = systemFunctionObjectService.基本信息模块.员工维护.TagName;
            this.PermissionCheck();

            lu = iLoginUserService.Load(uid);
            if (Request.Params["__EVENTVALIDATION"] != null)
            {

                SaveLoginUser();
            }
            else
            {

                BindingHelper.ObjectToControl(lu, this);
             
            }
        }

        private void SaveLoginUser()
        {

            BindingHelper.RequestToObject(lu);

            iLoginUserService.Update(lu);

            AjaxResult result = new AjaxResult();
            result.statusCode = "200";
            result.message = "修改成功";
            result.navTabId = "referer";
            if (Request.Params["rel_hook"] != null)
            {
                result.panelId = Request.Params["rel_hook"];
            }
            result.callbackType = "closeCurrent";
            FormatJsonResult jsonResult = new FormatJsonResult();
            jsonResult.Data = result;
            Response.Write(jsonResult.FormatResult());
            Response.End();



        }


    }
}