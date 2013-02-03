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

namespace Friday.mvc.weblogin.school
{
    public partial class nSchoolDetail : System.Web.UI.Page
    {
        IRepository<School> iSchoolRepository = UnityHelper.UnityToT<IRepository<School>>();
        private School school;
        protected void Page_Load(object sender, EventArgs e)
        {
            string uid = Request.Params["uid"].ToString();
            school = iSchoolRepository.Load(uid);

            BindingHelper.ObjectToControl(school, this);

        }
    }
}