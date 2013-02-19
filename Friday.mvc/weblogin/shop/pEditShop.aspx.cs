using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using friday.core.domain;
using friday.core.repositories;
using friday.core;
using friday.core.components;

namespace Friday.mvc.weblogin.shop
{
    public partial class pEditShop : System.Web.UI.Page
    {
        IRepository<Shop> iShopRepository = UnityHelper.UnityToT<IRepository<Shop>>();
        private Shop shop;
        protected void Page_Load(object sender, EventArgs e)
        {
            string uid = Request.Params["uid"].ToString();
            shop = iShopRepository.Load(uid);
            if (Request.Params["__EVENTVALIDATION"] != null)
            {

                SaveShop();
            }
            else
            {

                BindingHelper.ObjectToControl(shop, this);

            }
        }

        private void SaveShop()
        {

            BindingHelper.RequestToObject(shop);

            iShopRepository.SaveOrUpdate(shop);

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