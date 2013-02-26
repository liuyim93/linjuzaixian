using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using friday.core;
using friday.core.components;
using friday.core.repositories;

namespace Friday.mvc.weblogin
{
    public partial class MultiListSystemRole : System.Web.UI.Page
    {
        protected long total;
        protected int pageNum;
        protected int numPerPageValue;

        ISystemRoleRepository iSystemRoleRepository = UnityHelper.UnityToT<ISystemRoleRepository>();

        protected void Page_Load(object sender, EventArgs e)
        {
            numPerPageValue = Request.Form["numPerPage"] == null ? 5 : Convert.ToInt32(Request.Form["numPerPage"].ToString());
            pageNum = Request.Form["pageNum"] == null ? 1 : Convert.ToInt32(Request.Form["pageNum"].ToString());
            int start = (pageNum - 1) * numPerPageValue;
            int limit = numPerPageValue;

            List<DataFilter> filterList = new List<DataFilter>();

            filterList.Add(new DataFilter()
            {
                type = "IsDelete",
            });

            IList<SystemRole> systemRoleList = iSystemRoleRepository.Search(filterList, start, limit, out total);

            repeater.DataSource = systemRoleList;
            repeater.DataBind();

            numPerPage.Value = numPerPageValue.ToString();
        }
    }
}