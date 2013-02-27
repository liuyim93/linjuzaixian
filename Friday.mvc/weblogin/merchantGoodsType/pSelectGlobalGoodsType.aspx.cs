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
    public partial class pSelectGlobalGoodsType : System.Web.UI.Page
    {
        IRepository<MerchantGoodsType> iMerchantGoodsTypeRepository = UnityHelper.UnityToT<IRepository<MerchantGoodsType>>();
        IMerchantRepository merchantRepository = UnityHelper.UnityToT<IMerchantRepository>();
        IGlobalGoodsTypeRepository globalGoodsTypeRepository = UnityHelper.UnityToT<IGlobalGoodsTypeRepository>();

        private MerchantGoodsType merchantGoodsType;
        private string mid;
        private string mtype="";
        private Merchant merchant;
        public string mGoodsIdSet;

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

            mGoodsIdSet = this.IDSet.Value;
            string[] sArray = mGoodsIdSet.Split(',');
            foreach (var i in sArray)
            {
                if (merchantRepository.Get(i) ==null)
                {
                    merchantGoodsType = new MerchantGoodsType();
                    merchantGoodsType.Merchant = merchantRepository.Get(mid);
                    merchantGoodsType.GoodsType = globalGoodsTypeRepository.Get(i).GoodsType;
                    iMerchantGoodsTypeRepository.SaveOrUpdate(merchantGoodsType);
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