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
    public partial class pAddShop : System.Web.UI.Page
    {
        IRepository<Shop> iShopRepository = UnityHelper.UnityToT<IRepository<Shop>>();
    
        protected void Page_Load(object sender, EventArgs e)
        {
          
            if (Request.Params["__EVENTVALIDATION"] != null)
            {

                SaveShop();
            }
            
        }

        private void SaveShop()
        {
            Shop rnt = new Shop();

            BindingHelper.RequestToObject(rnt);
            iShopRepository.SaveOrUpdate(rnt);

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