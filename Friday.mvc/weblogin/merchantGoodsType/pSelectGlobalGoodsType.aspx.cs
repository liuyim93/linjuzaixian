using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using friday.core.components;
using friday.core.domain;
using friday.core;
using friday.core.repositories;
using friday.core.services;

namespace Friday.mvc.weblogin
{
    public partial class pSelectGlobalGoodsType : BasePage
    {
        IMerchantService iMerchantService = UnityHelper.UnityToT<IMerchantService>();
        IMerchantGoodsTypeService iMerchantGoodsTypeService = UnityHelper.UnityToT<IMerchantGoodsTypeService>();
       // IGlobalGoodsTypeService iGlobalGoodsTypeService = UnityHelper.UnityToT<IGlobalGoodsTypeService>();

        private MerchantGoodsType merchantGoodsType;
        private string mid;
        private string mtype="";
        private Merchant merchant;
        public string mGoodsIdSet;
        public string mGoodsNameSet;

        protected void Page_Load(object sender, EventArgs e)
        {

            tagName = systemFunctionObjectService.基本信息模块.公共商品类型维护.TagName;
            if (!this.PermissionValidate(PermissionTag.Enable))
            {
                AjaxResult result = new AjaxResult();
                result.statusCode = "300";
                result.message = "没有选择GlobalGoodsType的权限";
                FormatJsonResult jsonResult = new FormatJsonResult();
                jsonResult.Data = result;
                Response.Write(jsonResult.FormatResult());
                Response.End();
            }

            mid = Request.Params["merchant_id"].ToString();
            mtype = Request.Params["mType"].ToString();
            if (Request.Params["__EVENTVALIDATION"] != null)
            {

                SaveMerchantGoodsType();
            }
        }

        private void SaveMerchantGoodsType()
        {
            

            mGoodsIdSet = this.IDSet.Value;
            mGoodsNameSet = this.NameSet.Value;
            string[] sIdArray = mGoodsIdSet.Split(',');
            string[] sNameArray = mGoodsNameSet.Split(',');
            foreach (var i in sNameArray)
            {
                if (iMerchantGoodsTypeService.IsHaveTheSameName(i))
                {
                    //result.statusCode = "300";
                    //result.message = "已存在此商品类型";
                }
                else 
                {                  
                    merchantGoodsType = new MerchantGoodsType();
                    merchantGoodsType.Merchant = iMerchantService.Load(mid);
                    merchantGoodsType.GoodsType =i;
                    iMerchantGoodsTypeService.Save(merchantGoodsType);
                }
            }

            AjaxResult result = new AjaxResult();
            result.statusCode = "200";
            result.message = "添加成功";
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