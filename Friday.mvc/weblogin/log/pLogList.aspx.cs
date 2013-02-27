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

namespace Friday.mvc.weblogin.log
{
    public partial class pLogList : System.Web.UI.Page
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

        //IRepository<Log> iRepositoryLog = UnityHelper.UnityToT<IRepository<Log>>();
         ILogRepository iRepositoryLog = UnityHelper.UnityToT<ILogRepository>();

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

                    if(Request.Params["CategoryName"]!=null)
                    {
                        categoryList.Add(new DataFilter()
                        {
                            type = "CategoryName",
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

                    IList<Log> logList = iRepositoryLog.Search(filterList, start, limit, out total);

                    repeater.DataSource = logList;
                    repeater.DataBind();

                    numPerPage.Value = numPerPageValue.ToString();
                }
            }

            else
            {

                DeleteLog();

            }

        }




        private void DeleteLog()
        {


            iRepositoryLog.PhysicsDelete(Request.Params["uid"]);

            AjaxResult result = new AjaxResult();
            result.statusCode = "200";
            result.message = "删除成功";
            FormatJsonResult jsonResult = new FormatJsonResult();
            jsonResult.Data = result;
            Response.Write(jsonResult.FormatResult());
            Response.End();
        }

    }
}