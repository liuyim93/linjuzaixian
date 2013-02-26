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

namespace Friday.mvc.weblogin.feedBack
{
    public partial class pFeedBackList : System.Web.UI.Page
    {
        protected long total;
        protected int pageNum;
        protected int numPerPageValue;
        public string systemUserId;


        protected string startDate;
        protected string endDate;
        protected string type;
        protected string content;
        protected string loginName;
        protected string toLoginUser;
        private SystemUserRepository repositoryForSystemUser = new SystemUserRepository();
        IFeedBackRepository iRepositoryFeedBack = UnityHelper.UnityToT<IFeedBackRepository>();

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
                    List<DataFilter> loginUserList = new List<DataFilter>();
                   

                    if (!string.IsNullOrEmpty(Request.Form["LoginName"]))
                    {
                        loginUserList.Add(new DataFilter()
                            {
                                type = "LoginName",
                                value = loginName = Request.Form["LoginName"]

                            });
                        filterList.Add(new DataFilter()
                        {
                            type = "LoginUser",
                            field = loginUserList

                        });
                    }
                    if (!string.IsNullOrEmpty(Request.Form["Type"]))
                    {
                        filterList.Add(new DataFilter()
                            {
                                type = "Type",
                                value = type = Request.Form["Type"]

                            });
                    }
                    if (!string.IsNullOrEmpty(Request.Form["Contents"]))
                    {
                        filterList.Add(new DataFilter()
                        {
                            type = "Contents",
                            value = content = Request.Form["Contents"]

                        });
                    }
                        filterList.Add(new DataFilter()
                        {
                            type = "ParentFeedBack",
                            value=null

                        });
                    
                    var filter = new DataFilter();
                    if (!string.IsNullOrEmpty(Request.Form["StartDate"]))
                    {
                        filter.type = "CreateTime";
                        filter.value = startDate = Request.Form["StartDate"];
                        if (!string.IsNullOrEmpty(Request.Form["EndDate"]))
                        {
                            filter.valueForCompare = endDate = Request.Form["EndDate"];
                        }
                        filterList.Add(filter);
                    }

                    IList<FeedBack> feedBackList = iRepositoryFeedBack.Search(filterList, start, limit, out total);

                    repeater.DataSource = feedBackList;
                    repeater.DataBind();

                    numPerPage.Value = numPerPageValue.ToString();
                }
            }

            else
            {

                DeleteFeedBack();

            }

        }




        private void DeleteFeedBack()
        {


            iRepositoryFeedBack.PhysicsDelete(Request.Params["uid"]);

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