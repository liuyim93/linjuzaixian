using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using friday.core;
using friday.core.repositories;
using friday.core.components;
using friday.core.EnumType;
using friday.core.domain;
using friday.core.services;

namespace Friday.mvc.weblogin.restaurant
{
    public partial class pRestaurantDetail : BasePage
    {
        IRestaurantService iRestaurantService = UnityHelper.UnityToT<IRestaurantService>();    

        private Restaurant restaurant;
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!this.PermissionValidate(PermissionTag.Enable))
            {
                AjaxResult result = new AjaxResult();
                result.statusCode = "300";
                result.message = "没有Restaurant浏览权限";
                FormatJsonResult jsonResult = new FormatJsonResult();
                jsonResult.Data = result;
                Response.Write(jsonResult.FormatResult());
                Response.End();
            }
            string uid = Request.Params["uid"].ToString();
            restaurant = iRestaurantService.Load(uid);
          
            BindingHelper.ObjectToControl(restaurant, this);
            this.ImagePreview.Src = restaurant.Logo;

            ISchoolOfMerchantService iSchoolOfMerchantService = UnityHelper.UnityToT<ISchoolOfMerchantService>();
            string schofmntname = iSchoolOfMerchantService.GetSchoolNamesByMerchantID(uid);
            string[] arrname = schofmntname.Split('，');
        
                this.NameSet.Value = schofmntname;
        
        }
    }
}