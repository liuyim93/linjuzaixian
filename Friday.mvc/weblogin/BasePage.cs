using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using friday.core.services;
using friday.core.utils;
using friday.core;
using friday.core.components;
using friday.core.domain;

namespace Friday.mvc
{
    public class BasePage:System.Web.UI.Page
    {
        protected SystemFunctionObjectService systemFunctionObjectService = (SystemFunctionObjectService)UnityHelper.UnityToT<ISystemFunctionObjectService>();
        protected IPermissionManager iPermissionManager = UnityHelper.UnityToT<IPermissionManager>();
        protected ILogger iLogger = UnityHelper.UnityToT<ILogger>();
        protected IUserService iUserServie = UnityHelper.UnityToT<IUserService>();
        protected string tagName;
        protected void  PermissionCheck(PermissionTag tag=PermissionTag.Enable)
        {
            if (string.IsNullOrEmpty(tagName))
            {
                iLogger.LogMessage("没有设置tagName", this.GetType().FullName, EventDataTypeCategory.异常日志);
                throw new WeatException("没有设置tagName");
            }
            if(!iPermissionManager.HasRight(tagName,iUserServie.GetLoginUser(new HttpContextWrapper(HttpContext.Current)).Id,tag))
            {
                 AjaxResult result = new AjaxResult();
                result.statusCode = "300";
                result.message = "没有"+tagName+"权限";
                FormatJsonResult jsonResult = new FormatJsonResult();
                jsonResult.Data = result;
                Response.Write(jsonResult.FormatResult());
                Response.End();
           }
        }
        protected bool PermissionValidate(PermissionTag tag=PermissionTag.Enable)
        {
            if (string.IsNullOrEmpty(tagName))
            {
                iLogger.LogMessage("没有设置tagName", this.GetType().FullName, EventDataTypeCategory.异常日志);
                throw new WeatException("没有设置tagName");
            }
            if (iPermissionManager.HasRight(tagName, iUserServie.GetLoginUser(new HttpContextWrapper(HttpContext.Current)).Id,tag))
                return true;
            else
                return false;
        }
    }
}