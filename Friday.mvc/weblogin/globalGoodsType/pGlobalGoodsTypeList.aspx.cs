using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using friday.core.repositories;
using friday.core;
using friday.core.domain;

namespace Friday.mvc.weblogin.globalGoodsType
{
    public partial class pGlobalGoodsTypeList : System.Web.UI.Page
    {

        protected long total;
        protected int pageNum;
        protected int numPerPageValue;


        protected void Page_Load(object sender, EventArgs e)
        {
            numPerPageValue = Request.Form["numPerPage"] == null ? 10 : Convert.ToInt32(Request.Form["numPerPage"].ToString());
            pageNum = Request.Form["pageNum"] == null ? 1 : Convert.ToInt32(Request.Form["pageNum"].ToString());
            int start = (pageNum - 1) * numPerPageValue;
            int limit = numPerPageValue;

            IRepository<GlobalGoodsType> iRepositoryGlobalGoodsType = UnityHelper.UnityToT<IRepository<GlobalGoodsType>>();
            IList<GlobalGoodsType> globalGoodsTypeList = iRepositoryGlobalGoodsType.GetPageList(start, limit, out total);


            repeater.DataSource = globalGoodsTypeList;
            repeater.DataBind();

            numPerPage.Value = numPerPageValue.ToString();

        }
    }
}