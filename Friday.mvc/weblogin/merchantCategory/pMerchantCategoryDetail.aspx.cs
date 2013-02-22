using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using friday.core.repositories;
using friday.core;
using friday.core.components;

namespace Friday.mvc.weblogin
{
    public partial class pMerchantCategoryDetail : System.Web.UI.Page
    {
        IRepository<MerchantCategory> iMerchantCategoryRepository = UnityHelper.UnityToT<IRepository<MerchantCategory>>();

        private MerchantCategory merchantCategory;

        protected void Page_Load(object sender, EventArgs e)
        {
            string uid = Request.Params["uid"].ToString();
            merchantCategory = iMerchantCategoryRepository.Load(uid);

            BindingHelper.ObjectToControl(merchantCategory, this);
        }
    }
}