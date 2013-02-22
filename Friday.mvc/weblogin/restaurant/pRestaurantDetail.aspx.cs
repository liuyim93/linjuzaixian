using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using friday.core;
using friday.core.repositories;
using friday.core.components;

namespace Friday.mvc.weblogin.restaurant
{
    public partial class pRestaurantDetail : System.Web.UI.Page
    {
        IRepository<Restaurant> iRestaurantRepository = UnityHelper.UnityToT<IRepository<Restaurant>>();
        private Restaurant restaurant;
        protected void Page_Load(object sender, EventArgs e)
        {
            string uid = Request.Params["uid"].ToString();
            restaurant = iRestaurantRepository.Load(uid);

            BindingHelper.ObjectToControl(restaurant, this);
            this.ImagePreview.Src = restaurant.Logo;

            ISchoolOfMerchantRepository repoSchoolOfMerchant = new SchoolOfMerchantRepository();
            string schofmntname = repoSchoolOfMerchant.GetSchoolNamesByMerchantID(uid);
            string[] arrname = schofmntname.Split('，');
            //if (arrname.Length > 1)
            //{
            //    this.NameSet.Value = schofmntname;
            //}
            //else
            //{
                this.NameSet.Value = schofmntname;
            //}




        }
    }
}