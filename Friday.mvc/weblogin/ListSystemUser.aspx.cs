using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using friday.core.components;
using friday.core.domain;
using friday.core.repositories;
using friday.core;

namespace Friday.mvc.weblogin
{
    public partial class ListSystemUser : System.Web.UI.Page
    {
        protected long total;
        protected int pageNum;
        protected int numPerPageValue;

        protected string loginName;
        protected string name;

        ISystemUserRepository iRepositorySystemUser = UnityHelper.UnityToT<ISystemUserRepository>();
        IRepository<LoginUser> iRepositoryLoginUser = UnityHelper.UnityToT<IRepository<LoginUser>>();

        protected void Page_Load(object sender, EventArgs e)
        {

            numPerPageValue = Request.Form["numPerPage"] == null ? 10 : Convert.ToInt32(Request.Form["numPerPage"].ToString());
            pageNum = Request.Form["pageNum"] == null ? 1 : Convert.ToInt32(Request.Form["pageNum"].ToString());
            int start = (pageNum - 1) * numPerPageValue;
            int limit = numPerPageValue;

            List<DataFilter> filterList = new List<DataFilter>();
            List<DataFilter> LoginUserFilter = new List<DataFilter>();

            filterList.Add(new DataFilter()
            {
                type = "IsDelete"
            });

            filterList.Add(new DataFilter()
            {
                type = "IsAnonymous"
            });

            if (!string.IsNullOrEmpty(Request.Form["LoginName"]))
                LoginUserFilter.Add(new DataFilter()
                {
                    type = "LoginName",
                    value = loginName = Request.Form["LoginName"]

                });

            filterList.Add(new DataFilter()
            {
                type = "LoginUser",
                field = LoginUserFilter
            });

            if (!string.IsNullOrEmpty(Request.Form["Name"]))
                filterList.Add(new DataFilter()
                {
                    type = "Name",
                    value = name = Request.Form["Name"]

                });

            List<DataFilter> dflForOrder = new List<DataFilter>();
            string orderField = string.IsNullOrEmpty(Request.Form["orderField"]) ? "CreateTime" : Request.Form["orderField"];
            string orderDirection = string.IsNullOrEmpty(Request.Form["orderDirection"]) ? "Desc" : Request.Form["orderDirection"];
            dflForOrder.Add(new DataFilter() { type = orderField, comparison = orderDirection });
            filterList.Add(new DataFilter() { type = "Order", field = dflForOrder });

            IList<SystemUser> systemUserList = iRepositorySystemUser.Search(filterList, start, limit, out total);

            repeater.DataSource = systemUserList;
            repeater.DataBind();

            numPerPage.Value = numPerPageValue.ToString();
        }
    }
}