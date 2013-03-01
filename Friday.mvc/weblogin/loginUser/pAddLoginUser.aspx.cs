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

namespace Friday.mvc.weblogin
{
    public partial class pAddLoginUser : BasePage
    {
        ILoginUserRepository iLoginUserRepository = UnityHelper.UnityToT<ILoginUserRepository>();
        IRepository<UserInRole> iUserInRoleRepository = UnityHelper.UnityToT<IRepository<UserInRole>>();
        IRepository<SystemRole> iSystemRoleRepository = UnityHelper.UnityToT<IRepository<SystemRole>>();
        IRepository<Merchant> iMerchantRepository = UnityHelper.UnityToT<IRepository<Merchant>>();
        IRepository<LoginUserOfMerchant> iLoginUserOfMerchantRepository = UnityHelper.UnityToT<IRepository<LoginUserOfMerchant>>();

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
            loginUser = new LoginUser();

            loginUser = iLoginUserRepository.GetLoginUserByLoginName(Request.Params["LoginName"]);

            if (loginUser != null)
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
            iLoginUserRepository.SaveOrUpdate(loginUser);


        
            string roleID = "";
            if (this.SystemRoleID.Value != null && this.SystemRoleID.Value != "")
            {
                roleID = this.SystemRoleID.Value;
               UserInRole userinrole = new UserInRole();
               userinrole.SystemRole=iSystemRoleRepository.Get(roleID);
               userinrole.LoginUser = loginUser;
               iUserInRoleRepository.SaveOrUpdate(userinrole);
                //string[] sArray = roleID.Split(',');
                //foreach (string aid in sArray)
                //{
                //    UserInRole userInRole = new UserInRole();
                //    userInRole.SystemRole = iSystemRoleRepository.Get(aid);
                //    userInRole.LoginUser = loginUser;
                //    iUserInRoleRepository.SaveOrUpdate(userInRole);
                //}
            }

            string merchantiID = "";
            if (this.IDSet.Value != null && this.IDSet.Value != "") 
            {
                merchantiID = this.IDSet.Value;
                LoginUserOfMerchant loginuserofmerchant = new LoginUserOfMerchant();
                loginuserofmerchant.LoginUser = loginUser;
                loginuserofmerchant.Merchant = iMerchantRepository.Get(merchantiID);
                iLoginUserOfMerchantRepository.SaveOrUpdate(loginuserofmerchant);              
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