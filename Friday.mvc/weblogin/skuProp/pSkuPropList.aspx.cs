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

namespace Friday.mvc.weblogin
{
    public partial class pSkuPropList : BasePage
    {
        protected long total;
        protected int pageNum;
        protected int numPerPageValue;

        protected string Sku_ID;
        private ISkuPropRepository iSkuPropRepository = UnityHelper.UnityToT<ISkuPropRepository>();

        protected void Page_Load(object sender, EventArgs e)
        {
            if (Request.Params["flag"] != "alldelete")
            {
                SearchSkuProp();
            }
            else
            {
                DeleteSkuProp();
            }
        }
        private void DeleteSkuProp()
        {
            iSkuPropRepository.Delete(Request.Params["uid"]);
            AjaxResult result = new AjaxResult();
            result.statusCode = "200";
            result.message = "操作成功";
            FormatJsonResult jsonResult = new FormatJsonResult();
            jsonResult.Data = result;
            Response.Write(jsonResult.FormatResult());
            Response.End();
        }
        private void SearchSkuProp()
        {
            if (Request.Form["sku_id"] != null)
            {
                Sku_ID = Request.Form["sku_id"];
            }
            else
            {
                Sku_ID = Request.Params["sku_id"];
            }
            numPerPageValue = Request.Form["numPerPage"] == null ? 5 : Convert.ToInt32(Request.Form["numPerPage"].ToString());
            pageNum = Request.Form["pageNum"] == null ? 1 : Convert.ToInt32(Request.Form["pageNum"].ToString());
            int start = (pageNum - 1) * numPerPageValue;
            int limit = numPerPageValue;
            IList<SkuProp> skuPropList = null;

            if (Sku_ID != null && Sku_ID != "")
            {
                //skuPropList = iSkuPropRepository.GetSkuPropsBySkuID(Sku_ID, start, limit, out total);
            }
            repeater.DataSource = skuPropList;
            repeater.DataBind();

            numPerPage.Value = numPerPageValue.ToString();
        }
    }
}