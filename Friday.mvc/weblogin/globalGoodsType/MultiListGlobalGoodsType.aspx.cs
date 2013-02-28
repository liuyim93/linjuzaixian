using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using friday.core.domain;
using friday.core.repositories;
using friday.core;
using friday.core.components;

namespace Friday.mvc.weblogin
{
    public partial class MultiListGlobalGoodsType : BasePage
    {
        protected long total;
        protected int pageNum;
        protected int numPerPageValue;

        protected string goodsType;
        
        IGlobalGoodsTypeRepository iGlobalGoodsTypeRepository = UnityHelper.UnityToT<IGlobalGoodsTypeRepository>();
        protected void Page_Load(object sender, EventArgs e)
        {
            numPerPageValue = Request.Form["numPerPage"] == null ? 5 : Convert.ToInt32(Request.Form["numPerPage"].ToString());
            pageNum = Request.Form["pageNum"] == null ? 1 : Convert.ToInt32(Request.Form["pageNum"].ToString());
            int start = (pageNum - 1) * numPerPageValue;
            int limit = numPerPageValue;

            List<DataFilter> filterList = new List<DataFilter>();
            if (!string.IsNullOrEmpty(Request.Form["GoodsType"]))
                filterList.Add(new DataFilter()
                {
                    type = "GoodsType",
                    value = goodsType = Request.Form["GoodsType"]

                });
           
            
            IList<GlobalGoodsType> globalGoodsTypeList = iGlobalGoodsTypeRepository.Search(filterList, start, limit, out total);

            repeater.DataSource = globalGoodsTypeList;
            repeater.DataBind();

            numPerPage.Value = numPerPageValue.ToString();
        }
    }
}