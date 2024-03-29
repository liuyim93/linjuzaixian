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
    public partial class pAddMerchantEmployee : BasePage
    {  
        ISystemRoleService iSystemRoleService = UnityHelper.UnityToT<ISystemRoleService>();
        ILoginUserOfMerchantService iLoginUserOfMerchantService = UnityHelper.UnityToT<ILoginUserOfMerchantService>();
        IMerchantService iMerchantService = UnityHelper.UnityToT<IMerchantService>();

        string mid;
        //string mtype;
        Merchant merchant;

        protected void Page_Load(object sender, EventArgs e)
        {
             if (!this.CurrentUser.IsAdmin)
             {
                 mid = this.CurrentUser.LoginUserOfMerchants.SingleOrDefault().Merchant.Id;
             }
             else
             {
                 if (Request.Form["merchant_id"] != null)
                 {
                     mid = Request.Form["merchant_id"];
                 }
                 else
                 {
                     mid = Request.Params["merchant_id"];
                 }
             }
             merchant = iMerchantService.Load(mid);
             //mtype = Request.Params["mType"].ToString();
             tagName = systemFunctionObjectService.基本信息模块.员工维护.TagName;
             if (!this.PermissionValidate(PermissionTag.Enable))
             {
                 AjaxResult result = new AjaxResult();
                 result.statusCode = "300";
                 result.message = "没有MerchantEmployee增加权限";
                 result.callbackType = "closeCurrent";
                 FormatJsonResult jsonResult = new FormatJsonResult();
                 jsonResult.Data = result;
                 Response.Write(jsonResult.FormatResult());
                 Response.End();
             }

            if (Request.Params["__EVENTVALIDATION"] != null)
            {

                SaveLoginUser();
            }           

        }

        private void SaveLoginUser()
        {    
             ILoginUserService iLoginUserService = UnityHelper.UnityToT<ILoginUserService>();
             IUserInRoleService iUserInRoleService = UnityHelper.UnityToT<IUserInRoleService>();
           
             LoginUser f=new LoginUser();
             BindingHelper.RequestToObject(f);             
             iLoginUserService.Save(f);
             UserInRole ur = new UserInRole();
             if (merchant.MerchantType == MerchantTypeEnum.餐馆)
             {
                 ur.SystemRole = iSystemRoleService.GetRoleByName("餐馆店小二");
             }
             if (merchant.MerchantType == MerchantTypeEnum.租房)
             {
                 ur.SystemRole = iSystemRoleService.GetRoleByName("租房店小二");
             }
             if (merchant.MerchantType == MerchantTypeEnum.百货)
             {
                 ur.SystemRole = iSystemRoleService.GetRoleByName("商店店小二");
             }
             ur.LoginUser = f;
             iUserInRoleService.Save(ur);
             iPermissionManager.RefreshUserInRole();

             LoginUserOfMerchant lum = new LoginUserOfMerchant();
             lum.LoginUser = f;
             lum.Merchant = merchant;
             iLoginUserOfMerchantService.Save(lum);

            AjaxResult result = new AjaxResult();
            result.statusCode = "200";
            result.message = "修改成功";
            result.navTabId = "referer";
            //2013-02-13 basilwang set rel_hook to panelId
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