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

namespace Friday.mvc.weblogin.sku
{
    public partial class pSkuList : BasePage
    {
        protected long total;
        protected int pageNum;
        protected int numPerPageValue;

        protected string CommodityID;
        private ISKURepository iSKURepository = UnityHelper.UnityToT<ISKURepository>();

        protected void Page_Load(object sender, EventArgs e)
        {
            if (Request.Params["flag"] != "alldelete")
            {
                SearchSKU();
            }
            else
            {
                DeleteSKU();
            }
        }
        private void DeleteSKU()
        {
            iSKURepository.Delete(Request.Params["uid"]);
            AjaxResult result = new AjaxResult();
            result.statusCode = "200";
            result.message = "操作成功";
            FormatJsonResult jsonResult = new FormatJsonResult();
            jsonResult.Data = result;
            Response.Write(jsonResult.FormatResult());
            Response.End();
        }
        private void SearchSKU()
        {
            if (Request.Form["commodity_id"] != null)
            {
                CommodityID = Request.Form["commodity_id"];
            }
            else
            {
                CommodityID = Request.Params["commodity_id"];
            }
            numPerPageValue = Request.Form["numPerPage"] == null ? 5 : Convert.ToInt32(Request.Form["numPerPage"].ToString());
            pageNum = Request.Form["pageNum"] == null ? 1 : Convert.ToInt32(Request.Form["pageNum"].ToString());
            int start = (pageNum - 1) * numPerPageValue;
            int limit = numPerPageValue;

            IList<SKU> addressList = null;

            addressList = iSKURepository.GetSKUsByCommodityID(CommodityID, start, limit, out total);
            repeater.DataSource = addressList;
            repeater.DataBind();


            numPerPage.Value = numPerPageValue.ToString();
        }
    }
}