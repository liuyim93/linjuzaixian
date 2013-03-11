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
        IList<LoginUserOfMerchant> loginUserOfMerchants = new List<LoginUserOfMerchant>();
        public LoginUser loginuser;
        private Merchant merchant;
        private string belgMerchant;
        private string belgSystemRole;

        protected void Page_Load(object sender, EventArgs e)
        {
            string uid = Request.Params["uid"].ToString();
            loginuser = iLoginUserRepository.Load(uid);

            BindingHelper.ObjectToControl(loginuser, this);


            if (loginuser.LoginUserOfMerchants.Count!=0)
            {
                this.BelongMerchant.Value = loginuser.LoginUserOfMerchants.FirstOrDefault().Merchant.Name;
            }
            if (loginuser.UserInRoles.Count!=0)
            {
                this.BelongSystemRole.Value = loginuser.UserInRoles.First().SystemRole.Name;
            }
            


        }
    }
}