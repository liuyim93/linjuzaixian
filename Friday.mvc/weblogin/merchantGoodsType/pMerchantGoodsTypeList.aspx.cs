﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using friday.core.repositories;
using friday.core;
using friday.core.domain;
using friday.core.components;

namespace Friday.mvc.weblogin
{
    public partial class pMerchantGoodsTypeList : System.Web.UI.Page
    {

        protected long total;
        protected int pageNum;
        protected int numPerPageValue;
        string merchantId;
        string merchantType;


        protected string goodsType;

        IMerchantGoodsTypeRepository iRepositoryMerchantGoodsType = UnityHelper.UnityToT<IMerchantGoodsTypeRepository>();

        protected void Page_Load(object sender, EventArgs e)
        {
            merchantType = Request.Params["merchantType"];

            if (Request.Params["flag"] == "alldelete")
            {
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


                    merchantList.Add(new DataFilter()
                    {
                        type ="Merchant"+merchantType, 
                        value = merchantId
                    }
                        );
                    filterList.Add(new DataFilter()
                    {
                        type = merchantType,
                        field = merchantList
                    }
                        );                
               

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

                IList<MerchantGoodsType> merchantGoodsTypeList = iRepositoryMerchantGoodsType.Search(filterList, start, limit, out total);

                repeater.DataSource = merchantGoodsTypeList;
                repeater.DataBind();

                numPerPage.Value = numPerPageValue.ToString();
            }
        }

        private void DeleteMerchantGoodsType()
        {
            iRepositoryMerchantGoodsType.PhysicsDelete(Request.Params["uid"]);
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