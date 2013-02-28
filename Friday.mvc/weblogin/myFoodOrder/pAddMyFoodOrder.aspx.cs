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
    public partial class pAddMyFoodOrder : BasePage
    {
        IRepository<MyFoodOrder> iMyFoodOrderRepository = UnityHelper.UnityToT<IRepository<MyFoodOrder>>();
        IRepository<SystemUser> iSystemUserRepository = UnityHelper.UnityToT<IRepository<SystemUser>>();
        IRepository<Restaurant> iRestaurantRepository = UnityHelper.UnityToT<IRepository<Restaurant>>();

        private SystemUser systemUserObj;
        private Restaurant restaurantObj;
        private MyFoodOrder myFoodOrder = new MyFoodOrder();

        protected void Page_Load(object sender, EventArgs e)
        {
            if (Request.Params["__EVENTVALIDATION"] != null)
            {

                SaveMyFoodOrder();
            }
        }

        private void SaveMyFoodOrder()
        {
            restaurantObj = iRestaurantRepository.Get(Request.Params["MerchantID"]);
            systemUserObj = iSystemUserRepository.Get(Request.Params["SystemUserID"]);

            myFoodOrder.SystemUser = systemUserObj;
            myFoodOrder.Restaurant = restaurantObj;

            BindingHelper.RequestToObject(myFoodOrder);
            iMyFoodOrderRepository.SaveOrUpdate(myFoodOrder);

            AjaxResult result = new AjaxResult();
            FormatJsonResult jsonResult = new FormatJsonResult();

            result.statusCode = "200";
            result.message = "添加成功";
            result.navTabId = "referer";
            result.callbackType = "closeCurrent";
            jsonResult.Data = result;
            Response.Write(jsonResult.FormatResult());
            Response.End();
        }
    }
}