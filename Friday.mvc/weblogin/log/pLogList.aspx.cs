using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using friday.core;
using friday.core.repositories;
using friday.core.domain;
using friday.core.components;
using friday.core.services;

namespace Friday.mvc.weblogin.log
{
    public partial class pLogList : BasePage
    {
        protected long total;
        protected int pageNum;
        protected int numPerPageValue;
        public string systemUserId;


        protected string startDate;
        protected string endDate;
        protected string type;
        protected string content;
        protected string categoryName;
        protected string title;

        ILogService iLogService = UnityHelper.UnityToT<ILogService>();

        protected void Page_Load(object sender, EventArgs e)
        {

            if (Request.Params["flag"] != "alldelete")
            {
                if (Request.Params["flag"] != "alldelete")
                {
                    numPerPageValue = Request.Form["numPerPage"] == null ? 10 : Convert.ToInt32(Request.Form["numPerPage"].ToString());
                    pageNum = Request.Form["pageNum"] == null ? 1 : Convert.ToInt32(Request.Form["pageNum"].ToString());
                    int start = (pageNum - 1) * numPerPageValue;
                    int limit = numPerPageValue;

                    List<DataFilter> filterList = new List<DataFilter>();
                    List<DataFilter> categoryOfLogList = new List<DataFilter>();
                    List<DataFilter> categoryList = new List<DataFilter>();

                    if(!string.IsNullOrEmpty(Request.Form["CategoryName"]))
                    {
                        categoryList.Add(new DataFilter()
                        {
                            type = "CategoryID",
                            value = categoryName = Request.Params["CategoryName"]
                        });
                        categoryOfLogList.Add(new DataFilter()
                        {
                            type="Category",
                            field=categoryList
                        });
                        filterList.Add(new DataFilter()
                        {
                            type = "CategoryLog",
                            field = categoryOfLogList
                        });
                    
                    }
                    if (!string.IsNullOrEmpty(Request.Form["Title"]))
                    {
                        filterList.Add(new DataFilter()
                        {
                            type = "Title",
                            value = title = Request.Form["Title"]
                        });
                    }

                    var filter = new DataFilter();
                    if (!string.IsNullOrEmpty(Request.Form["StartDate"]))
                    {
                        filter.type = "Timestamp";
                        filter.value = startDate = Request.Form["StartDate"];
                        if (!string.IsNullOrEmpty(Request.Form["EndDate"]))
                        {
                            filter.valueForCompare = endDate = Request.Form["EndDate"];
                        }
                        filterList.Add(filter);
                    }

                    IList<Log> logList = iLogService.Search(filterList, start, limit, out total);

                    repeater.DataSource = logList;
                    repeater.DataBind();

                    numPerPage.Value = numPerPageValue.ToString();
                }
            }


        }




    

    }
}