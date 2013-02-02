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
    public partial class nRestaurantUpdate : System.Web.UI.Page
    {
        IRepository<Restaurant> iRestaurantRepository = UnityHelper.UnityToT<IRepository<Restaurant>>();
        private Restaurant Restaurant;
        protected void Page_Load(object sender, EventArgs e)
        {
            string uid = Request.Params["uid"].ToString();
            Restaurant = iRestaurantRepository.Load(uid);
            if (Request.Params["__EVENTVALIDATION"] != null)
            {

                SaveRestaurant();
            }
            else
            {

                BindingHelper.ObjectToControl(Restaurant, this);

            }
        }

        private void SaveRestaurant()
        {

            BindingHelper.RequestToObject(Restaurant);

            iRestaurantRepository.SaveOrUpdate(Restaurant);

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