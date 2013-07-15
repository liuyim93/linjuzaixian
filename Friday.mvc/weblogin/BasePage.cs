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
        protected LoginUser CurrentUser
        {
            get;
            set;
        }
        protected override void OnInit(EventArgs e)
        {
            base.OnInit(e);
            try
            {
                CurrentUser = iUserServie.GetLoginUser(new HttpContextWrapper(HttpContext.Current));
            }
            catch (Exception ex)
            {
                CurrentUser = null;
                Response.Redirect("/weblogin/login.aspx?message=超时登录，请重新登录！");
            }
        }
        protected void  PermissionCheck(PermissionTag tag=PermissionTag.Enable)
        {
            if (CurrentUser == null)
            {
                Response.Redirect("/weblogin/login.aspx?message=TimeOut");
            }
            if (string.IsNullOrEmpty(tagName))
            {
                iLogger.LogMessage("没有设置tagName", this.GetType().FullName, EventDataTypeCategory.异常日志);
                throw new WeatException("没有设置tagName");
            }
            if (!iPermissionManager.HasRight(tagName, CurrentUser.Id, tag))
            {
                 AjaxResult result = new AjaxResult();
                result.statusCode = "300";
                result.message = "没有"+tagName+"权限";
                result.callbackType = "closeCurrent";   
                FormatJsonResult jsonResult = new FormatJsonResult();
                jsonResult.Data = result;
                Response.Write(jsonResult.FormatResult());
                Response.End();
           }
        }
        protected bool PermissionValidate(PermissionTag tag=PermissionTag.Enable)
        {
            if (CurrentUser == null)
            {
                Response.Redirect("/weblogin/login.aspx?message=TimeOut");
            }
            if (string.IsNullOrEmpty(tagName))
            {
                iLogger.LogMessage("没有设置tagName", this.GetType().FullName, EventDataTypeCategory.异常日志);
                throw new WeatException("没有设置tagName");
            }
            if (iPermissionManager.HasRight(tagName, CurrentUser.Id, tag))
                return true;
            else
                return false;
        }
    }
}