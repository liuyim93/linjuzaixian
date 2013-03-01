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

namespace Friday.mvc.weblogin.shop
{
    public partial class pShopDetail : BasePage
    {
        IRepository<Shop> iShopRepository = UnityHelper.UnityToT<IRepository<Shop>>();
        IRepository<LoginUser> iLoginUserRepository = UnityHelper.UnityToT<IRepository<LoginUser>>();
        ILoginUserOfMerchantRepository iLoginUserOfMerchantRepository = UnityHelper.UnityToT<ILoginUserOfMerchantRepository>();
        public LoginUser loginuser;
        private Shop shop;
        protected void Page_Load(object sender, EventArgs e)
        {
            string uid = Request.Params["uid"].ToString();
            shop = iShopRepository.Load(uid);

            BindingHelper.ObjectToControl(shop, this);
            //this.ImagePreview.Src = shop.Logo;

            //UserTypeEnum ust = UserTypeEnum.商店;
            //loginuser = iLoginUserOfMerchantRepository.GetMerchantLoginUserBy(shop.Id, ust);
            //this.LoginName.Value = loginuser.LoginName;

            ISchoolOfMerchantRepository repoSchoolOfMerchant = new SchoolOfMerchantRepository();
            string schofmntname = repoSchoolOfMerchant.GetSchoolNamesByMerchantID(uid);
            string[] arrname = schofmntname.Split('，');
            if (arrname.Length > 1)
            {
                this.NameSet.Value = schofmntname;
            }
            else
            {
                this.SchoolOfMerchant.Value = schofmntname;
            }




        }
    }
}