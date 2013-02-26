﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using friday.core.repositories;
using friday.core;
using friday.core.components;

namespace Friday.mvc.weblogin
{
    public partial class pSystemRoleList : System.Web.UI.Page
    {
        protected long total;
        protected int pageNum;
        protected int numPerPageValue;

        protected string loginName;
        protected string name;
        protected string tel;
        protected string email;

        IRepository<SystemRole> iSystemRoleRepository = UnityHelper.UnityToT<IRepository<SystemRole>>();

        protected void Page_Load(object sender, EventArgs e)
        {
            if (Request.Params["flag"] == "alldelete")
            {

            }
            else
            {
                numPerPageValue = Request.Form["numPerPage"] == null ? 10 : Convert.ToInt32(Request.Form["numPerPage"].ToString());
                pageNum = Request.Form["pageNum"] == null ? 1 : Convert.ToInt32(Request.Form["pageNum"].ToString());
                int start = (pageNum - 1) * numPerPageValue;
                int limit = numPerPageValue;

               
                IList<SystemRole> systemUserList = iSystemRoleRepository.GetPageList(start, limit, out total);

                repeater.DataSource = systemUserList;
                repeater.DataBind();

                numPerPage.Value = numPerPageValue.ToString();
            }
        }

    }
}