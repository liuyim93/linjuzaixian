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
using friday.core.services;

namespace Friday.mvc.weblogin
{
    public partial class pMerchantCategoryList : BasePage
    {
        protected long total;
        protected int pageNum;
        protected int numPerPageValue;
        
        protected string merchantCategoryName;

        IMerchantCategoryService iMerchantCategoryService = UnityHelper.UnityToT<IMerchantCategoryService>();

        protected void Page_Load(object sender, EventArgs e)
        {
            tagName = systemFunctionObjectService.基本信息模块.商铺经营类型维护.TagName;
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
                DeleteMerchantCategory();

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

                if (!string.IsNullOrEmpty(Request.Form["MerchantCategoryName"]))
                    filterList.Add(new DataFilter()
                    {
                        type = "MerchantCategoryName",
                        value = merchantCategoryName = Request.Form["MerchantCategoryName"]

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

                IList<MerchantCategory> merchantCategoryList = iMerchantCategoryService.Search(filterList, start, limit, out total);

                repeater.DataSource = merchantCategoryList;
                repeater.DataBind();

                numPerPage.Value = numPerPageValue.ToString();
            }
        }

        private void DeleteMerchantCategory()
        {
            iMerchantCategoryService.Delete(Request.Params["uid"]);
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