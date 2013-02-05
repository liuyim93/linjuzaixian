using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using friday.core;
using friday.core.repositories;
using friday.core.components;
using friday.core.domain;

namespace Friday.mvc.weblogin.rent
{
    public partial class pRentDetail : System.Web.UI.Page
    {
        IRepository<Rent> iRentRepository = UnityHelper.UnityToT<IRepository<Rent>>();
        //IRepository<SchoolOfMerchant> iSchoolOfMerchantRepository = UnityHelper.UnityToT<IRepository<SchoolOfMerchant>>();
        

        private Rent rent;
        protected void Page_Load(object sender, EventArgs e)
        {
            string uid = Request.Params["uid"].ToString();
            rent = iRentRepository.Load(uid);      
            BindingHelper.ObjectToControl(rent, this);
     
            ISchoolOfMerchantRepository repoSchoolOfMerchant = new SchoolOfMerchantRepository();

            string schofmntname = repoSchoolOfMerchant.GetSchoolNamesByMerchantID(uid);
            this.SchoolOfMerchant.Value = schofmntname;
            

             
        }
    }
}