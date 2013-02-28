using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using friday.core.components;
using friday.core.domain;
using friday.core.repositories;
using friday.core;

namespace Friday.mvc.weblogin
{
    public partial class pEditMyFavorite : BasePage
    {
        IRepository<MyFavorite> iMyFavoriteRepository = UnityHelper.UnityToT<IRepository<MyFavorite>>();
        IRepository<Merchant> iMerchantRepository = UnityHelper.UnityToT<IRepository<Merchant>>();

        private MyFavorite myFavorite;

        protected void Page_Load(object sender, EventArgs e)
        {
            string uid = Request.Params["uid"].ToString();
            myFavorite = iMyFavoriteRepository.Load(uid);

            if (Request.Params["__EVENTVALIDATION"] != null)
            {

                SaveMyFavorite();
            }
            else
            {

                MerchantID.Value = myFavorite.Merchant.Id;
                Merchant.Value = myFavorite.Merchant.Name;
            }
        }

        private void SaveMyFavorite()
        {
            myFavorite.Merchant = iMerchantRepository.Get(MerchantID.Value);

            iMyFavoriteRepository.SaveOrUpdate(myFavorite);

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