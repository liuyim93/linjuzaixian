using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using friday.core.repositories;
using friday.core.domain;
using friday.core;

namespace Friday.mvc.weblogin
{
    public partial class ListSystemRole : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            ISystemRoleRepository repoSystemRole = UnityHelper.UnityToT<ISystemRoleRepository>();
            IList<SystemRole> merchants = new List<SystemRole>();
            merchants = repoSystemRole.GetAll();
            merchants.Remove(repoSystemRole.GetRoleByName("顾客"));
            repeater.DataSource = merchants;
            repeater.DataBind();
        }
    }
}