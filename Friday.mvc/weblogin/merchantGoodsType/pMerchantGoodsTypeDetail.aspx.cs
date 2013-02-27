using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using friday.core.repositories;
using friday.core;
using friday.core.components;
using friday.core.domain;

namespace Friday.mvc.weblogin
{
    public partial class pMerchantGoodsTypeDetail : System.Web.UI.Page
    {
        MerchantGoodsTypeRepository iMerchantGoodsTypeRepository =new  MerchantGoodsTypeRepository();

        private MerchantGoodsType merchantGoodsType;

        protected void Page_Load(object sender, EventArgs e)
        {
            string uid = Request.Params["uid"].ToString();
            merchantGoodsType = iMerchantGoodsTypeRepository.Get(uid);

            BindingHelper.ObjectToControl(merchantGoodsType, this);
        }
    }
}