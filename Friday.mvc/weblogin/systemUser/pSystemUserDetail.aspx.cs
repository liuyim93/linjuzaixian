using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using friday.core.repositories;
using friday.core;
using friday.core.components;
using friday.core.domain;

namespace Friday.mvc.weblogin.systemUser
{
    public partial class pSystemUserDetail : System.Web.UI.Page
    {
        IRepository<SystemUser> iSystemUserRepository = UnityHelper.UnityToT<IRepository<SystemUser>>();
        private SystemUser systemUser;
        protected void Page_Load(object sender, EventArgs e)
        {
            string uid = Request.Params["uid"].ToString();
            systemUser = iSystemUserRepository.Load(uid);

            BindingHelper.ObjectToControl(systemUser, this);
            BindingHelper.ObjectToControl(systemUser.LoginUser, this);
        }
    }
}