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
using friday.core.EnumType;

namespace Friday.mvc.weblogin.rent
{
    public partial class pRentDetail : BasePage
    {
        IRepository<Rent> iRentRepository = UnityHelper.UnityToT<IRepository<Rent>>();
        IRepository<LoginUser> iLoginUserRepository = UnityHelper.UnityToT<IRepository<LoginUser>>();
        ILoginUserOfMerchantRepository iLoginUserOfMerchantRepository = UnityHelper.UnityToT<ILoginUserOfMerchantRepository>();

        public LoginUser loginuser;
        private Rent rent;
        protected void Page_Load(object sender, EventArgs e)
        {
            string uid = Request.Params["uid"].ToString();
            rent = iRentRepository.Load(uid);
            UserTypeEnum ust = UserTypeEnum.租房;

            loginuser = iLoginUserOfMerchantRepository.GetMerchantLoginUserBy(rent.Id, ust);
            this.LoginName.Value = loginuser.LoginName;

            BindingHelper.ObjectToControl(rent, this);

        }
    }
}