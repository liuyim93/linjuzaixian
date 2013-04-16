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
    public partial class pEditSkuProp : BasePage
    {
        private ISkuPropService iSkuPropService = UnityHelper.UnityToT<ISkuPropService>();
        private IPropIDService iPropIDService = UnityHelper.UnityToT<IPropIDService>();
        private IPropValueService iPropValueService = UnityHelper.UnityToT<IPropValueService>();
        private ISkuService iSkuService = UnityHelper.UnityToT<ISkuService>();

        private SkuProp skuProp;
        IList<PropValue> propValues;

        protected void Page_Load(object sender, EventArgs e)
        {
            string uid = Request.Params["uid"].ToString();
            skuProp = iSkuPropService.getSkuPropbyIntID(uid);
            if (Request.Params["__EVENTVALIDATION"] != null)
            {
                SaveSkuProp();
            }
            else
            {
                PropIDName.Value = skuProp.PropID.PropIDName;
                PropID.Value = skuProp.PropID.Id.ToString();
                propValues = iPropValueService.GetPropValueListByPropID(skuProp.PropID.Id);
                foreach (PropValue p in propValues)
                {
                    PropValue.Items.Add(new ListItem(p.PropValueName, p.Id.ToString()));
                }
                PropValue.Value = skuProp.PropValue.Id.ToString();
            }
        }

        private void SaveSkuProp()
        {
            int intpropID = Convert.ToInt32(PropID.Value);
            int intpropValueID = Convert.ToInt32(Request.Params["PropValue"]);

            skuProp.PropID = iPropIDService.Load(intpropID);
            skuProp.PropValue = iPropValueService.Load(intpropValueID);

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