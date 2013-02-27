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
            iMerchantGoodsTypeRepository.SaveOrUpdate(merchantGoodsType);

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