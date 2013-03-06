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

namespace Friday.mvc.weblogin.valuingItemOfMyCommodityOrder
{
    public partial class pValuingItemOfMyCommodityOrderList : BasePage
    {
        protected long total;
        protected int pageNum;
        protected int numPerPageValue;

        IRepository<ValuingItemOfMyCommodityOrder> iValuingItemOfMyCommodityOrderRepository = UnityHelper.UnityToT<IRepository<ValuingItemOfMyCommodityOrder>>();

        protected void Page_Load(object sender, EventArgs e)
        {
            if (Request.Params["flag"] == "alldelete")
            {

                DeleteValuingItemOfMyCommodityOrder();

            }
            else
            {
                numPerPageValue = Request.Form["numPerPage"] == null ? 10 : Convert.ToInt32(Request.Form["numPerPage"].ToString());
                pageNum = Request.Form["pageNum"] == null ? 1 : Convert.ToInt32(Request.Form["pageNum"].ToString());
                int start = (pageNum - 1) * numPerPageValue;
                int limit = numPerPageValue;

                IList<ValuingItemOfMyCommodityOrder> merchantCategoryList = iValuingItemOfMyCommodityOrderRepository.GetAll();

                repeater.DataSource = merchantCategoryList;
                repeater.DataBind();

                numPerPage.Value = numPerPageValue.ToString();
            }
        }

        private void DeleteValuingItemOfMyCommodityOrder()
        {
            iValuingItemOfMyCommodityOrderRepository.Delete(Request.Params["uid"]);
            AjaxResult result = new AjaxResult();
            result.statusCode = "200";
            result.message = "修改成功";
            FormatJsonResult jsonResult = new FormatJsonResult();
            jsonResult.Data = result;
            Response.Write(jsonResult.FormatResult());
            Response.End();
        }
    }
}