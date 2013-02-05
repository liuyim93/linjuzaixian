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

namespace Friday.mvc.weblogin.rent
{
    public partial class nRentAdd : System.Web.UI.Page
    {
        IRepository<Rent> iRentRepository = UnityHelper.UnityToT<IRepository<Rent>>();
        IRepository<SchoolOfMerchant> iSchoolOfMerchantRepository = UnityHelper.UnityToT<IRepository<SchoolOfMerchant>>();
        IRepository<School> iSchoolRepository = UnityHelper.UnityToT<IRepository<School>>();
        protected void Page_Load(object sender, EventArgs e)
        {
          
            if (Request.Params["__EVENTVALIDATION"] != null)
            {

                SaveRent();
            }
            
        }

        private void SaveRent()
        {
            Rent rnt = new Rent();
            BindingHelper.RequestToObject(rnt);
            iRentRepository.SaveOrUpdate(rnt);
            
            string schid;            
            schid = this.SchoolOfMerchantID.Value;
            string[] sArray = schid.Split(',');
            foreach (string shcidsz in sArray)
            {
                friday.core.domain.SchoolOfMerchant schofmt = new friday.core.domain.SchoolOfMerchant();
                schofmt.Merchant = rnt;
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