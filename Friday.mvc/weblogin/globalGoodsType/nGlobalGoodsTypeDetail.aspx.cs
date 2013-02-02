using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using friday.core.repositories;
using friday.core;
using friday.core.components;

namespace Friday.mvc.weblogin.globalGoodsType
{
    public partial class nGlobalGoodsTypeDetail : System.Web.UI.Page
    {
        IRepository<GlobalGoodsType> iGlobalGoodsTypeRepository = UnityHelper.UnityToT<IRepository<GlobalGoodsType>>();
        private GlobalGoodsType globalGoodsType;
        protected void Page_Load(object sender, EventArgs e)
        {
            string uid = Request.Params["uid"].ToString();
            globalGoodsType = iGlobalGoodsTypeRepository.Load(uid);

            BindingHelper.ObjectToControl(globalGoodsType, this);
        }
    }
}