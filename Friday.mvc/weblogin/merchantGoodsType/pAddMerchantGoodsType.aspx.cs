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

namespace Friday.mvc.weblogin
{
    public partial class pAddMerchantGoodsType : System.Web.UI.Page
    {
        IRepository<MerchantGoodsType> iMerchantGoodsTypeRepository = UnityHelper.UnityToT<IRepository<MerchantGoodsType>>();

        private MerchantGoodsType merchantGoodsType;

        protected void Page_Load(object sender, EventArgs e)
        {
            if (Request.Params["__EVENTVALIDATION"] != null)
            {

                SaveMerchantGoodsType();
            }
        }

        private void SaveMerchantGoodsType()
        {
            merchantGoodsType = new MerchantGoodsType();
            BindingHelper.RequestToObject(merchantGoodsType);
            iMerchantGoodsTypeRepository.SaveOrUpdate(merchantGoodsType);

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