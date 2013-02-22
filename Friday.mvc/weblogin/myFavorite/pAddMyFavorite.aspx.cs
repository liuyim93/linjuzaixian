using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using friday.core.repositories;
using friday.core;
using friday.core.domain;
using friday.core.components;

namespace Friday.mvc.weblogin
{
    public partial class pAddMyFavorite : System.Web.UI.Page
    {
        private IRepository<MyFavorite> myFavoriteRepository = UnityHelper.UnityToT<IRepository<MyFavorite>>();
        private IRepository<Merchant> merchantRepository = UnityHelper.UnityToT<IRepository<Merchant>>();
        private IRepository<SystemUser> systemUserRepository = UnityHelper.UnityToT<IRepository<SystemUser>>();

        private SystemUser systemUser = new SystemUser();
        private MyFavorite myFavorite = new MyFavorite();
        private Merchant merchantObj = new Merchant();

        protected void Page_Load(object sender, EventArgs e)
        {
            if (Request.Params["__EVENTVALIDATION"] != null)
            {
                SaveFood();
            }
        }

        private void SaveFood()
        {

            systemUser = systemUserRepository.Get(Request.Params["systemUser_id"]);
            myFavorite.SystemUser = systemUser;

            merchantObj = merchantRepository.Get(MerchantID.Value);
            myFavorite.Merchant = merchantObj;
            myFavoriteRepository.SaveOrUpdate(myFavorite);

            AjaxResult result = new AjaxResult();
            result.statusCode = "200";
            result.message = "修改成功";
            result.navTabId = "referer";
            //2013-02-13 basilwang set rel_hook to panelId
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