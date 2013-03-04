using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using friday.core.repositories;
using friday.core;
using friday.core.components;
using friday.core.domain;
using friday.core.EnumType;
using friday.core.services;

namespace Friday.mvc.weblogin
{
    public partial class pEditMerchantGoodsType : BasePage
    {
        IMerchantGoodsTypeService iMerchantGoodsTypeService = UnityHelper.UnityToT<IMerchantGoodsTypeService>();
        private MerchantGoodsType merchantGoodsType;

        protected void Page_Load(object sender, EventArgs e)
        {
            string uid = Request.Params["uid"].ToString();

            tagName = systemFunctionObjectService.基本信息模块.自定义商品类型维护.TagName;
            this.PermissionCheck();

            merchantGoodsType = iMerchantGoodsTypeService.Load(uid);
            if (Request.Params["__EVENTVALIDATION"] != null)
            {

                SaveMerchantGoodsType();
            }
            else
            {
                BindingHelper.ObjectToControl(merchantGoodsType, this);
            }
        }

        private void SaveMerchantGoodsType()
        {

            BindingHelper.RequestToObject(merchantGoodsType);
            iMerchantGoodsTypeService.Update(merchantGoodsType);

            AjaxResult result = new AjaxResult();
            result.statusCode = "200";
            result.message = "修改成功";
            result.navTabId = "referer";
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