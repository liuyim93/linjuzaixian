using System;
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

namespace Friday.mvc.weblogin.loginUser
{
    public partial class pLoginUserDetail : BasePage
    {
        IRepository<LoginUser> iLoginUserRepository = UnityHelper.UnityToT<IRepository<LoginUser>>();
        ILoginUserOfMerchantRepository iLoginUserOfMerchantRepository = UnityHelper.UnityToT<ILoginUserOfMerchantRepository>();
        public LoginUser loginuser;
        private Merchant merchant;

        protected void Page_Load(object sender, EventArgs e)
        {
            string uid = Request.Params["uid"].ToString();
            loginuser = iLoginUserRepository.Load(uid);

            BindingHelper.ObjectToControl(loginuser, this);

            this.BelongMerchant.Value = loginuser.LoginUserOfMerchants.FirstOrDefault().Merchant.Name;
            this.BelongSystemRole.Value = loginuser.UserInRoles.First().SystemRole.Name;


        }
    }
}