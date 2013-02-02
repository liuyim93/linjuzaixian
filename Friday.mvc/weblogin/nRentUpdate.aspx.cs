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
    public partial class nRentUpdate : System.Web.UI.Page
    {
        IRepository<Rent> iRentRepository = UnityHelper.UnityToT<IRepository<Rent>>();
        private Rent Rent;
        protected void Page_Load(object sender, EventArgs e)
        {
            string uid = Request.Params["uid"].ToString();
            Rent = iRentRepository.Load(uid);
            if (Request.Params["__EVENTVALIDATION"] != null)
            {

                SaveRent();
            }
            else
            {

                BindingHelper.ObjectToControl(Rent, this);

            }
        }

        private void SaveRent()
        {

            BindingHelper.RequestToObject(Rent);

            iRentRepository.SaveOrUpdate(Rent);

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