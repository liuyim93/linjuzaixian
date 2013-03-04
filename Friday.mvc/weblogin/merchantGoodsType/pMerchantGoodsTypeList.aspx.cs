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
    public partial class pMerchantGoodsTypeList : BasePage
    {

        protected long total;
        protected int pageNum;
        protected int numPerPageValue;
        string merchantId;
        string merchantType;


        protected string goodsType;

        IMerchantGoodsTypeService iMerchantGoodsTypeService = UnityHelper.UnityToT<IMerchantGoodsTypeService>();

        protected void Page_Load(object sender, EventArgs e)
        {
            merchantType = Request.Params["merchantType"];

            tagName = systemFunctionObjectService.基本信息模块.自定义商品类型维护.TagName;
            this.PermissionCheck();

            if (Request.Params["flag"] == "alldelete")
            {
                AjaxResult result = new AjaxResult();
                FormatJsonResult jsonResult = new FormatJsonResult();

                tagName = systemFunctionObjectService.基本信息模块.自定义商品类型维护.TagName;
                if (!this.PermissionValidate(PermissionTag.Delete))
                {
                    result.statusCode = "300";
                    result.message = "没有MerchantGoodsType删除权限";
                    jsonResult.Data = result;
                    Response.Write(jsonResult.FormatResult());
                    Response.End();
                }

                DeleteMerchantGoodsType();

            }
            else
            {
                if (Request.Form["merchant_id"] != null)
                {
                    merchantId = Request.Form["merchant_id"];
                }
                else
                {
                    merchantId = Request.Params["merchant_id"];
                }              

                numPerPageValue = Request.Form["numPerPage"] == null ? 5 : Convert.ToInt32(Request.Form["numPerPage"].ToString());
                pageNum = Request.Form["pageNum"] == null ? 1 : Convert.ToInt32(Request.Form["pageNum"].ToString());
                int start = (pageNum - 1) * numPerPageValue;
                int limit = numPerPageValue;
                List<DataFilter> filterList = new List<DataFilter>();
                List<DataFilter> merchantList = new List<DataFilter>();


                    //merchantList.Add(new DataFilter()
                    //{
                    //    type ="Merchant"+merchantType, 
                    //    value = merchantId
                    //});

                    merchantList.Add(new DataFilter()
                    {
                        type = "Merchant",
                        value = merchantId
                    });

                    filterList.Add(new DataFilter()
                    {
                        type = "Merchant",
                        field = merchantList
                    });                
               

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

                List<DataFilter> dflForOrder = new List<DataFilter>();
                string orderField = string.IsNullOrEmpty(Request.Form["orderField"]) ? "CreateTime" : Request.Form["orderField"];
                string orderDirection = string.IsNullOrEmpty(Request.Form["orderDirection"]) ? "Desc" : Request.Form["orderDirection"];
                dflForOrder.Add(new DataFilter() { type = orderField, comparison = orderDirection });
                filterList.Add(new DataFilter() { type = "Order", field = dflForOrder });

                IList<MerchantGoodsType> merchantGoodsTypeList = iMerchantGoodsTypeService.Search(filterList, start, limit, out total);

                repeater.DataSource = merchantGoodsTypeList;
                repeater.DataBind();

                numPerPage.Value = numPerPageValue.ToString();
            }
        }

        private void DeleteMerchantGoodsType()
        {
            iMerchantGoodsTypeService.Delete(Request.Params["uid"]);
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