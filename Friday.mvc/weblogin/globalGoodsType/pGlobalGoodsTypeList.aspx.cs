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

namespace Friday.mvc.weblogin
{
    public partial class pGlobalGoodsTypeList : BasePage
    {

        protected long total;
        protected int pageNum;
        protected int numPerPageValue;

        protected string goodsType;

        IGlobalGoodsTypeService iGlobalGoodsTypeService = UnityHelper.UnityToT<IGlobalGoodsTypeService>();

        protected void Page_Load(object sender, EventArgs e)
        {
            tagName = systemFunctionObjectService.基本信息模块.公共商品类型维护.TagName;
            this.PermissionCheck();
            //2013-02-28 basilwang you can use this to block button
            if (!this.PermissionValidate(PermissionTag.Delete))
            {
                //this.liDelete
                this.liDelete.Visible = false;
            }

            if (!this.PermissionValidate(PermissionTag.Edit))
            {
                this.liEdit.Visible = false;
            }

            if (Request.Params["flag"] == "alldelete")
            {
                DeleteGlobalGoodsType();

            }
            else
            {
                numPerPageValue = Request.Form["numPerPage"] == null ? 10 : Convert.ToInt32(Request.Form["numPerPage"].ToString());
                pageNum = Request.Form["pageNum"] == null ? 1 : Convert.ToInt32(Request.Form["pageNum"].ToString());
                int start = (pageNum - 1) * numPerPageValue;
                int limit = numPerPageValue;
                List<DataFilter> filterList = new List<DataFilter>();

                filterList.Add(new DataFilter()
                {
                    type = "IsDelete"
                });

                if (!string.IsNullOrEmpty(Request.Form["GoodsType"]))
                    filterList.Add(new DataFilter()
                    {
                        type = "GoodsType",
                        value = goodsType = Request.Form["GoodsType"]

                    });

                if (!string.IsNullOrEmpty(Request.Form["MerchantType"]))
                    filterList.Add(new DataFilter()
                    {
                        type = "MerchantType",
                        value = Request.Form["MerchantType"]

                    });
                List<DataFilter> dflForOrder = new List<DataFilter>();
                string orderField = string.IsNullOrEmpty(Request.Form["orderField"]) ? "CreateTime" : Request.Form["orderField"];
                string orderDirection = string.IsNullOrEmpty(Request.Form["orderDirection"]) ? "Desc" : Request.Form["orderDirection"];
                dflForOrder.Add(new DataFilter() { type = orderField, comparison = orderDirection });
                filterList.Add(new DataFilter() { type = "Order", field = dflForOrder });

                IList<GlobalGoodsType> globalGoodsTypeList = iGlobalGoodsTypeService.Search(filterList, start, limit, out total);

                repeater.DataSource = globalGoodsTypeList;
                repeater.DataBind();

                numPerPage.Value = numPerPageValue.ToString();
            }
        }

        private void DeleteGlobalGoodsType()
        {
            iGlobalGoodsTypeService.Delete(Request.Params["uid"]);
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