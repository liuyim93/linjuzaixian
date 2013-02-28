using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using friday.core.repositories;
using friday.core.domain;

namespace Friday.mvc.weblogin.users
{
    public partial class nSystemUserList : BasePage
    {
        protected long total;
        protected int pageNum;
        protected int numPerPageValue;

        public string tel;
        public string address;
        public string password;
        public string email;
        public string name;
        public string loginname;

        protected void Page_Load(object sender, EventArgs e)
        {
            if (Request.Params["flag"] != "alldelete")
            {
                SearchSystemUser();
            }
        }

      
        private void SearchSystemUser()
        {
            numPerPageValue = Request.Form["numPerPage"] == null ? 10 : Convert.ToInt32(Request.Form["numPerPage"].ToString());
            pageNum = Request.Form["pageNum"] == null ? 1 : Convert.ToInt32(Request.Form["pageNum"].ToString());
            int start = (pageNum - 1) * numPerPageValue;
            int limit = numPerPageValue;




            IList<SystemUser> SystemUserList = new Repository<SystemUser>().GetAll();

            repeater.DataSource = SystemUserList;
            repeater.DataBind();

            numPerPage.Value = numPerPageValue.ToString();
        }
    }
}