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

namespace Friday.mvc.weblogin
{
    public partial class pAddMerchantCategory : System.Web.UI.Page
    {
        IRepository<MerchantCategory> iMerchantCategoryRepository = UnityHelper.UnityToT<IRepository<MerchantCategory>>();

        private MerchantCategory merchantCategory;

        protected void Page_Load(object sender, EventArgs e)
        {
            if (Request.Params["__EVENTVALIDATION"] != null)
            {

                SaveMerchantCategory();
            }
        }

        private void SaveMerchantCategory()
        {
            merchantCategory = new MerchantCategory();
            BindingHelper.RequestToObject(merchantCategory);
            iMerchantCategoryRepository.SaveOrUpdate(merchantCategory);

            AjaxResult result = new AjaxResult();
            result.statusCode = "200";
            result.message = "添加成功";
            result.navTabId = "referer";
            result.callbackType = "closeCurrent";
            FormatJsonResult jsonResult = new FormatJsonResult();
            jsonResult.Data = result;
            Response.Write(jsonResult.FormatResult());
            Response.End();



        }

    }
}