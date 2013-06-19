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

namespace Friday.mvc.weblogin
{
    public partial class pAddLoginUser : BasePage
    {
        ILoginUserOfMerchantService iLoginUserOfMerchantService = UnityHelper.UnityToT<ILoginUserOfMerchantService>();
        ILoginUserService iLoginUserService = UnityHelper.UnityToT<ILoginUserService>();
        IUserInRoleService iUserInRoleService = UnityHelper.UnityToT<IUserInRoleService>();
        IMerchantService iMerchantService = UnityHelper.UnityToT<IMerchantService>();
        ISystemRoleService iSystemRoleService = UnityHelper.UnityToT<ISystemRoleService>();

        private LoginUser loginUser;

        protected void Page_Load(object sender, EventArgs e)
        {
            if (Request.Params["__EVENTVALIDATION"] != null)
            {
                SaveLoginUser();
            }
        }

        private void SaveLoginUser()
        {
            AjaxResult result = new AjaxResult();
            FormatJsonResult jsonResult = new FormatJsonResult();
            LoginUser loginUser = new LoginUser();
            LoginUser loginUserExist = new LoginUser();

            ////商家账号登陆后，不能使用角色选择模块
            //if(this.CurrentUser.IsAdmin!=true)
            //{
            //    this.btnRole.Visible = false;
            //}



            loginUserExist = iLoginUserService.GetLoginUserByLoginName(Request.Params["LoginName"]);

            if (loginUserExist != null)
            {
                result.statusCode = "300";
                result.message = "您填写的登录名已被使用！";
                jsonResult.Data = result;
                Response.Write(jsonResult.FormatResult());
                Response.End();              
            }
            else 
            {
                
            BindingHelper.RequestToObject(loginUser);
            loginUser.IsAdmin = (IsAdminV.Value == "是" ? true : false);
            iLoginUserService.Save(loginUser);


        
            string roleID = "";
            if (this.SystemRoleID.Value != null && this.SystemRoleID.Value != "")
            {
                roleID = this.SystemRoleID.Value;
               UserInRole userinrole = new UserInRole();
               userinrole.SystemRole=iSystemRoleService.Load(roleID);
               userinrole.LoginUser = loginUser;
               iUserInRoleService.Save(userinrole);
               iPermissionManager.RefreshUserInRole();
                //string[] sArray = roleID.Split(',');
                //foreach (string aid in sArray)
                //{
                //    UserInRole userInRole = new UserInRole();
                //    userInRole.SystemRole = iSystemRoleService.Get(aid);
                //    userInRole.LoginUser = loginUser;
                //    iUserInRoleService.SaveOrUpdate(userInRole);
                //}
            }

            string merchantiID = "";
            if (this.IDSet.Value != null && this.IDSet.Value != "") 
            {
                merchantiID = this.IDSet.Value;
                LoginUserOfMerchant loginuserofmerchant = new LoginUserOfMerchant();
                loginuserofmerchant.LoginUser = loginUser;
                loginuserofmerchant.Merchant = iMerchantService.Load(merchantiID);
                iLoginUserOfMerchantService.Save(loginuserofmerchant);              
            }             
         
           
            result.statusCode = "200";
            result.message = "添加成功";
            
           }


            result.navTabId = "referer";
            result.callbackType = "closeCurrent";
          
            jsonResult.Data = result;
            Response.Write(jsonResult.FormatResult());
            Response.End();
        }

    }
}