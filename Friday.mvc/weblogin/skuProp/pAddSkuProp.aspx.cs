using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Services;
using friday.core.domain;
using friday.core.repositories;
using friday.core;
using friday.core.components;
using friday.core.services;

namespace Friday.mvc.weblogin.skuProp
{
    public partial class pAddSkuProp : System.Web.UI.Page
    {
        private ISkuPropService skuPropService = UnityHelper.UnityToT<ISkuPropService>();
        private IPropIDService propIDService = UnityHelper.UnityToT<IPropIDService>();
        private IPropValueService propValueService = UnityHelper.UnityToT<IPropValueService>();
        private ISkuService skuService = UnityHelper.UnityToT<ISkuService>();

        Sku sku = new Sku();
        private SkuProp skuProp = new SkuProp();

        protected void Page_Load(object sender, EventArgs e)
        {
            if (Request.Params["__EVENTVALIDATION"] != null)
            {
                SaveSkuProp();
            }
        }

        private void SaveSkuProp()
        {
            sku = skuService.getSkubyIntID(Request.Params["sku_id"]);
            skuProp.SKU = sku;
            skuProp.PropID = propIDService.getPropIDbyIntID(PropID.Value);
            skuProp.PropValue = propValueService.getPropValuebyIntID(Request.Params["PropValue"]);

            skuPropService.Save(skuProp);

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

        [WebMethod]
        public static string GetPropValue(IList<nvl> nvls)
        {
            IPropValueService iPropValueService = UnityHelper.UnityToT<IPropValueService>();
            string propID = (from c in nvls where c.name == "propID" select c.value).FirstOrDefault();

            IList<Object> resultObjs = new List<Object>();
            IList<PropValue> items = new List<PropValue>();

            items = iPropValueService.getPropValuebyPropID(propID);
            foreach (PropValue p in items)
            {
                resultObjs.Add(new {
                    Id=p.Id,
                    PropValueName = p.PropValueName
                });
            }
            
            FormatJsonResult jsonResult = new FormatJsonResult();
            jsonResult.Data = resultObjs;
            return jsonResult.FormatResult();
        }
    }
}