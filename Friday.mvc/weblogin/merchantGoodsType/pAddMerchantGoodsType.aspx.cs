﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using friday.core.components;
using friday.core.domain;
using friday.core;
using friday.core.repositories;

namespace Friday.mvc.weblogin
{
    public partial class pAddMerchantGoodsType : BasePage
    {
        IMerchantGoodsTypeRepository iMerchantGoodsTypeRepository = UnityHelper.UnityToT<IMerchantGoodsTypeRepository>();
        IMerchantRepository merchantRepository = UnityHelper.UnityToT<IMerchantRepository>();

        private MerchantGoodsType merchantGoodsType;
        private string mid;
        private string mtype="";
        private Merchant merchant;

        protected void Page_Load(object sender, EventArgs e)
        {
            mid = Request.Params["merchant_id"].ToString();
            mtype = Request.Params["mType"].ToString();
            if (Request.Params["__EVENTVALIDATION"] != null)
            {

                SaveMerchantGoodsType();
            }
        }

        private void SaveMerchantGoodsType()
        {       
            merchantGoodsType = new MerchantGoodsType();
         
            merchantGoodsType.Merchant = merchantRepository.Get(mid);                
            BindingHelper.RequestToObject(merchantGoodsType);
            string GoodTypeName = this.GoodsType.Value;

            bool flag=iMerchantGoodsTypeRepository.IsHaveTheSameName(GoodTypeName);
            AjaxResult result = new AjaxResult();
            if (flag == true)
            {
                result.statusCode = "300";
                result.message = "已存在此商品类型";
                result.navTabId = "referer";
            
            }
            else 
            {

                iMerchantGoodsTypeRepository.SaveOrUpdate(merchantGoodsType);
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