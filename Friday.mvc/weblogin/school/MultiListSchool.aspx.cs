using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using friday.core.domain;
using friday.core.repositories;
using friday.core;
using friday.core.components;
using friday.core.services;

namespace Friday.mvc.weblogin
{
    public partial class MultiListSchool : BasePage
    {
        protected long total;
        protected int pageNum;
        protected int numPerPageValue;

        protected string name;
        protected string shortName;
        protected string address;
        ISchoolService iSchoolService = UnityHelper.UnityToT<ISchoolService>();
        protected void Page_Load(object sender, EventArgs e)
        {
          
            numPerPageValue = Request.Form["numPerPage"] == null ? 5 : Convert.ToInt32(Request.Form["numPerPage"].ToString());
            pageNum = Request.Form["pageNum"] == null ? 1 : Convert.ToInt32(Request.Form["pageNum"].ToString());
            int start = (pageNum - 1) * numPerPageValue;
            int limit = numPerPageValue;

            List<DataFilter> filterList = new List<DataFilter>();
            if (!string.IsNullOrEmpty(Request.Form["Name"]))
                filterList.Add(new DataFilter()
                {
                    type = "Name",
                    value = name = Request.Form["Name"]

                });
            if (!string.IsNullOrEmpty(Request.Form["ShortName"]))
                filterList.Add(new DataFilter()
                {
                    type = "ShortName",
                    value = shortName = Request.Form["ShortName"]

                });
            if (!string.IsNullOrEmpty(Request.Form["Address"]))
                filterList.Add(new DataFilter()
                {
                    type = "Address",
                    value = address = Request.Form["Address"]

                });

            IList<School> schoolList = iSchoolService.GetAll();

            repeater.DataSource = schoolList;
            repeater.DataBind();

            numPerPage.Value = numPerPageValue.ToString();
        }
    }
}