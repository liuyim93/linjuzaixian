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

namespace Friday.mvc.weblogin.restaurant
{
    public partial class pAddRestaurant : System.Web.UI.Page
    {
        IRepository<Restaurant> iRestaurantRepository = UnityHelper.UnityToT<IRepository<Restaurant>>();
        IRepository<SchoolOfMerchant> iSchoolOfMerchantRepository = UnityHelper.UnityToT<IRepository<SchoolOfMerchant>>();
        IRepository<School> iSchoolRepository = UnityHelper.UnityToT<IRepository<School>>();

        protected void Page_Load(object sender, EventArgs e)
        {
          
            if (Request.Params["__EVENTVALIDATION"] != null)
            {
                string schid = "";
                if (this.IDSet.Value != null && this.IDSet.Value != "")
                {
                    schid = this.IDSet.Value;
                }
                if (this.SchoolOfMerchantID.Value != null && this.SchoolOfMerchantID.Value != "")
                {
                    schid = this.SchoolOfMerchantID.Value;
                }

                SaveRestaurant(schid);
            }
            
        }

        private void SaveRestaurant(string schid)
        {
            Restaurant rnt = new Restaurant();

            BindingHelper.RequestToObject(rnt);
            iRestaurantRepository.SaveOrUpdate(rnt);


            if (schid != "")
            {
                string[] sArray = schid.Split(',');

                foreach (string shcidsz in sArray)
                {
                    friday.core.domain.SchoolOfMerchant schofmt = new friday.core.domain.SchoolOfMerchant();
                    schofmt.Merchant = rnt;
                    schofmt.School = iSchoolRepository.Get(shcidsz);
                    iSchoolOfMerchantRepository.SaveOrUpdate(schofmt);
                }
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