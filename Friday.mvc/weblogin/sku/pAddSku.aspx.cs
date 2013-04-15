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

namespace Friday.mvc.weblogin.sku
{
    public partial class pAddSku : System.Web.UI.Page
    {
        private ISkuService skuService = UnityHelper.UnityToT<ISkuService>();
        private ICommodityService commodityService = UnityHelper.UnityToT<ICommodityService>();

        Commodity commodity = new Commodity();
        private Sku sku;

        protected void Page_Load(object sender, EventArgs e)
        {
            if (Request.Params["__EVENTVALIDATION"] != null)
            {
                SaveSku();
            }
            else
            {
                sku = new Sku();
                //skuService.Save(sku);
                SkuId.Value = sku.skuId.ToString();
            }

        }

        private void SaveSku()
        {

            BindingHelper.RequestToObject(sku);
            commodity = commodityService.Load(Request.Params["commodity_id"]);
            sku.Commodity = commodity;

            skuService.Save(sku);

            AjaxResult result = new AjaxResult();
            result.statusCode = "200";
            result.message = "修改成功";
            result.navTabId = "referer";
            //2013-02-13 basilwang set rel_hook to panelId
            if (Request.Params["rel_hook"] != null)
            {
                result.panelId = Request.Params["rel_hook"];
            }
            result.callbackType = "closeCurrent";
            FormatJsonResult jsonResult = new FormatJsonResult();
            jsonResult.Data = result;
            Response.Write(jsonResult.FormatResult());
            Response.End();

        }
    }
}