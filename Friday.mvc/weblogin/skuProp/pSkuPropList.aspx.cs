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
    public partial class pSkuPropList : BasePage
    {
        protected long total;
        protected int pageNum;
        protected int numPerPageValue;

        protected string SKU_ID;
        private ISKUPropRepository iSKUPropRepository = UnityHelper.UnityToT<ISKUPropRepository>();

        protected void Page_Load(object sender, EventArgs e)
        {
            if (Request.Params["flag"] != "alldelete")
            {
                SearchSKUProp();
            }
            else
            {
                DeleteSKUProp();
            }
        }
        private void DeleteSKUProp()
        {
            iSKUPropRepository.Delete(Request.Params["uid"]);
            AjaxResult result = new AjaxResult();
            result.statusCode = "200";
            result.message = "操作成功";
            FormatJsonResult jsonResult = new FormatJsonResult();
            jsonResult.Data = result;
            Response.Write(jsonResult.FormatResult());
            Response.End();
        }
        private void SearchSKUProp()
        {
            if (Request.Form["sku_id"] != null)
            {
                SKU_ID = Request.Form["sku_id"];
            }
            else
            {
                SKU_ID = Request.Params["sku_id"];
            }
            numPerPageValue = Request.Form["numPerPage"] == null ? 5 : Convert.ToInt32(Request.Form["numPerPage"].ToString());
            pageNum = Request.Form["pageNum"] == null ? 1 : Convert.ToInt32(Request.Form["pageNum"].ToString());
            int start = (pageNum - 1) * numPerPageValue;
            int limit = numPerPageValue;
            IList<SKUProp> skuPropList = null;

            if (SKU_ID != null && SKU_ID != "")
            {
                //skuPropList = iSKUPropRepository.GetSKUPropsBySkuID(SKU_ID, start, limit, out total);
            }
            repeater.DataSource = skuPropList;
            repeater.DataBind();

            numPerPage.Value = numPerPageValue.ToString();
        }
    }
}