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
        IRepository<SchoolOfMerchant> iSchoolOfMerchantRepository = UnityHelper.UnityToT<IRepository<SchoolOfMerchant>>();
        IRepository<School> iSchoolRepository = UnityHelper.UnityToT<IRepository<School>>();
   

        protected void Page_Load(object sender, EventArgs e)
        {
    
            if (Request.Params["__EVENTVALIDATION"] != null)
            {
                string schid;
                schid = this.IDSet.Value;

                SaveShop(schid);
            }
         
        }

        private void SaveShop(string schid)
        {    
            Shop  shop=new Shop();

            BindingHelper.RequestToObject(shop);
            iShopRepository.SaveOrUpdate(shop);

    
            string[] sArray = schid.Split(',');
           
            
            foreach (string shcidsz in sArray)
            {
                friday.core.domain.SchoolOfMerchant schofmt = new friday.core.domain.SchoolOfMerchant();
                schofmt.Merchant = shop;
                schofmt.School = iSchoolRepository.Get(shcidsz);
                iSchoolOfMerchantRepository.SaveOrUpdate(schofmt);
            }            

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