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

namespace Friday.mvc.weblogin.valuingItemOfMyCommodityOrder
{
    public partial class pValuingItemOfMyCommodityOrderList : BasePage
    {
        protected long total;
        protected int pageNum;
        protected int numPerPageValue;

        IValuingItemOfMyCommodityOrderService iValuingItemOfMyCommodityOrderService = UnityHelper.UnityToT<IValuingItemOfMyCommodityOrderService>();

        protected void Page_Load(object sender, EventArgs e)
        {
            tagName = systemFunctionObjectService.商店模块.商品评价项管理.TagName;
            this.PermissionCheck();

            if (Request.Params["flag"] == "alldelete")
            {
                AjaxResult result = new AjaxResult();
                FormatJsonResult jsonResult = new FormatJsonResult();

                tagName = systemFunctionObjectService.商店模块.商品评价项管理.TagName;
                if (!this.PermissionValidate(PermissionTag.Delete))
                {
                    result.statusCode = "300";
                    result.message = "没有ValuingItemOfMyCommodityOrder删除权限";
                    jsonResult.Data = result;
                    Response.Write(jsonResult.FormatResult());
                    Response.End();
                }

                DeleteValuingItemOfMyCommodityOrder();

            }
            else
            {
                numPerPageValue = Request.Form["numPerPage"] == null ? 10 : Convert.ToInt32(Request.Form["numPerPage"].ToString());
                pageNum = Request.Form["pageNum"] == null ? 1 : Convert.ToInt32(Request.Form["pageNum"].ToString());
                int start = (pageNum - 1) * numPerPageValue;
                int limit = numPerPageValue;

                IList<ValuingItemOfMyCommodityOrder> merchantCategoryList = iValuingItemOfMyCommodityOrderService.GetAll();

                repeater.DataSource = merchantCategoryList;
                repeater.DataBind();

                numPerPage.Value = numPerPageValue.ToString();
            }
        }

        private void DeleteValuingItemOfMyCommodityOrder()
        {
            iValuingItemOfMyCommodityOrderService.Delete(Request.Params["uid"]);
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