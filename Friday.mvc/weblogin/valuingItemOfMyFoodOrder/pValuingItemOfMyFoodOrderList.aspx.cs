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
using friday.core.services;

namespace Friday.mvc.weblogin.valuingItemOfMyFoodOrder
{
    public partial class pValuingItemOfMyFoodOrderList : BasePage
    {
        protected long total;
        protected int pageNum;
        protected int numPerPageValue;

        IValuingItemOfMyFoodOrderService iValuingItemOfMyFoodOrderService = UnityHelper.UnityToT<IValuingItemOfMyFoodOrderService>();


        protected void Page_Load(object sender, EventArgs e)
        {
            if (Request.Params["flag"] == "alldelete")
            {

                DeleteValuingItemOfMyFoodOrder();

            }
            else
            {
                numPerPageValue = Request.Form["numPerPage"] == null ? 10 : Convert.ToInt32(Request.Form["numPerPage"].ToString());
                pageNum = Request.Form["pageNum"] == null ? 1 : Convert.ToInt32(Request.Form["pageNum"].ToString());
                int start = (pageNum - 1) * numPerPageValue;
                int limit = numPerPageValue;

                IList<ValuingItemOfMyFoodOrder> merchantCategoryList = iValuingItemOfMyFoodOrderService.GetAll();

                repeater.DataSource = merchantCategoryList;
                repeater.DataBind();

                numPerPage.Value = numPerPageValue.ToString();
            }
        }

        private void DeleteValuingItemOfMyFoodOrder()
        {
            iValuingItemOfMyFoodOrderService.Delete(Request.Params["uid"]);
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