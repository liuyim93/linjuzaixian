﻿using System;
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

namespace Friday.mvc.weblogin
{
    public partial class pEditMerchantGoodsType : System.Web.UI.Page
    {
        IRepository<MerchantGoodsType> iMerchantGoodsTypeRepository = UnityHelper.UnityToT<IRepository<MerchantGoodsType>>();

        private MerchantGoodsType merchantGoodsType;

        protected void Page_Load(object sender, EventArgs e)
        {
            string uid = Request.Params["uid"].ToString();
            merchantGoodsType = iMerchantGoodsTypeRepository.Load(uid);
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
            iMerchantGoodsTypeRepository.SaveOrUpdate(merchantGoodsType);

            AjaxResult result = new AjaxResult();
            result.statusCode = "200";
            result.message = "修改成功";
            result.navTabId = "referer";
            result.callbackType = "closeCurrent";
            FormatJsonResult jsonResult = new FormatJsonResult();
            jsonResult.Data = result;
            Response.Write(jsonResult.FormatResult());
            Response.End();



        }

    }
}