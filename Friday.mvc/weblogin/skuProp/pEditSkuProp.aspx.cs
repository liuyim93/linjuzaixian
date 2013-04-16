using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using friday.core.domain;
using friday.core.components;
using friday.core.repositories;
using friday.core;
using friday.core.services;

namespace Friday.mvc.weblogin
{
    public partial class pEditSkuPropProp : BasePage
    {
        private ISkuPropService iSkuPropService = UnityHelper.UnityToT<ISkuPropService>();
        private SkuProp skuProp;

        protected void Page_Load(object sender, EventArgs e)
        {
            string uid = Request.Params["uid"].ToString();
            skuProp = iSkuPropService.Load(uid);
            if (Request.Params["__EVENTVALIDATION"] != null)
            {
                SaveSkuProp();
            }
            else
            {
                BindingHelper.ObjectToControl(skuProp, this);
            }
        }

        private void SaveSkuProp()
        {

            BindingHelper.RequestToObject(skuProp);
            iSkuPropService.Save(skuProp);

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