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

namespace Friday.mvc.weblogin.commodity
{
    public partial class pCommodityList : System.Web.UI.Page
    {
        protected long total;
        protected int pageNum;
        protected int numPerPageValue;


        public string shopId;
        public string name;
        public string startprice;
        public string endprice;
        public string owenType;

        private IRepository<Commodity> iCommodityRepository = UnityHelper.UnityToT<IRepository<Commodity>>();

        protected void Page_Load(object sender, EventArgs e)
        {
            if (Request.Params["flag"] != "alldelete")
            {
                SearchFood();
            }
            else
            {
                DeleteFood();
            }
        }
        private void DeleteFood()
        {

            iCommodityRepository.Delete(Request.Params["uid"]);
            AjaxResult result = new AjaxResult();
            result.statusCode = "200";
            result.message = "操作成功";
            FormatJsonResult jsonResult = new FormatJsonResult();
            jsonResult.Data = result;
            Response.Write(jsonResult.FormatResult());
            Response.End();
        }
        private void SearchFood()
        {

            numPerPageValue = Request.Form["numPerPage"] == null ? 5 : Convert.ToInt32(Request.Form["numPerPage"].ToString());
            pageNum = Request.Form["pageNum"] == null ? 1 : Convert.ToInt32(Request.Form["pageNum"].ToString());
            int start = (pageNum - 1) * numPerPageValue;
            int limit = numPerPageValue;
            IList<Commodity> commodityList = iCommodityRepository.GetPageList(start, limit, out total);
            repeater.DataSource = commodityList;
            repeater.DataBind();


            numPerPage.Value = numPerPageValue.ToString();
        }
    }
}