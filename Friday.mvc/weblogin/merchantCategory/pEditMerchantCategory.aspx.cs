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

namespace Friday.mvc.weblogin
{
    public partial class pEditMerchantCategory : System.Web.UI.Page
    {
        IRepository<MerchantCategory> iMerchantCategoryRepository = UnityHelper.UnityToT<IRepository<MerchantCategory>>();

        private MerchantCategory merchantCategory;

        protected void Page_Load(object sender, EventArgs e)
        {
            string uid = Request.Params["uid"].ToString();
            merchantCategory = iMerchantCategoryRepository.Load(uid);
            if (Request.Params["__EVENTVALIDATION"] != null)
            {

                SaveGlobalGoodsType();
            }
            else
            {
                BindingHelper.ObjectToControl(merchantCategory, this);
            }
        }

        private void SaveGlobalGoodsType()
        {

            BindingHelper.RequestToObject(merchantCategory);
            iMerchantCategoryRepository.SaveOrUpdate(merchantCategory);

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