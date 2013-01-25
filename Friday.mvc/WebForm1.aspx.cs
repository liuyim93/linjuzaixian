using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using friday.core.repositories;
using friday.core.domain;
using friday.core;

namespace Friday.mvc
{
    public partial class WebForm1 : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            ISystemUserRepository repo = UnityHelper.UnityToT<ISystemUserRepository>();
            SystemUser u = new SystemUser()
            {
                Name = "basil",
                //Password = "123456",
                Tel = "1342343214",
                Email = "ocam@163.com",
                Description = "a lot of things"



            };
            repo.SaveOrUpdate(u);


        }
    }
}