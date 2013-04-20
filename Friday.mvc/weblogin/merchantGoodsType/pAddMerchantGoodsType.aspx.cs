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
    public partial class pAddMerchantGoodsType : BasePage
    {
    
        IMerchantGoodsTypeService iMerchantGoodsTypeService = UnityHelper.UnityToT<IMerchantGoodsTypeService>();
        IMerchantService iMerchantService = UnityHelper.UnityToT<IMerchantService>();

        private MerchantGoodsType merchantGoodsType;
        private string mid;
        //private string mtype="";
        private Merchant merchant;

        protected void Page_Load(object sender, EventArgs e)
        {
            tagName = systemFunctionObjectService.基本信息模块.自定义商品类型维护.TagName;
            if (!this.PermissionValidate(PermissionTag.Enable))
            {
                AjaxResult result = new AjaxResult();
                result.statusCode = "300";
                result.message = "没有MerchantGoodsType增加权限";
                FormatJsonResult jsonResult = new FormatJsonResult();
                jsonResult.Data = result;
                Response.Write(jsonResult.FormatResult());
                Response.End();
            }

            if (!this.CurrentUser.IsAdmin)
            {
                mid = this.CurrentUser.LoginUserOfMerchants.SingleOrDefault().Merchant.Id;
            }
            else
            {
                if (Request.Form["merchant_id"] != null)
                {
                    mid = Request.Form["merchant_id"];
                }
                else
                {
                    mid = Request.Params["merchant_id"];
                }
            }
            //mtype = Request.Params["mType"].ToString();
            if (Request.Params["__EVENTVALIDATION"] != null)
            {

                SaveMerchantGoodsType();
            }
        }

        private void SaveMerchantGoodsType()
        {       
            merchantGoodsType = new MerchantGoodsType();
         
            merchantGoodsType.Merchant = iMerchantService.Load(mid);                
            BindingHelper.RequestToObject(merchantGoodsType);
            string GoodTypeName = this.GoodsType.Value;

            bool flag=iMerchantGoodsTypeService.IsHaveTheSameName(GoodTypeName);
            AjaxResult result = new AjaxResult();
            if (flag == true)
            {
                result.statusCode = "300";
                result.message = "已存在此商品类型";
                result.navTabId = "referer";
            
            }
            else 
            {

                iMerchantGoodsTypeService.Save(merchantGoodsType);
                result.statusCode = "200";
                result.message = "添加成功";
                result.navTabId = "referer";
            }      

          
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