using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using friday.core.repositories;
using friday.core.domain;
using friday.core;
using friday.core.components;

namespace Friday.mvc.weblogin.school
{
    public partial class pSchoolList : BasePage
    {
        protected long total;
        protected int pageNum;
        protected int numPerPageValue;
        public string systemUserId;


        protected string startDate;
        protected string endDate;
        protected string name;
        protected string cityName;
        protected string shortName;
        private SystemUserRepository repositoryForSystemUser = new SystemUserRepository();
        ISchoolRepository iRepositorySchool = UnityHelper.UnityToT<ISchoolRepository>();

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
                    if (!string.IsNullOrEmpty(Request.Form["CityName"]))
                        filterList.Add(new DataFilter()
                        {
                            type = "CityName",
                            value = cityName = Request.Form["CityName"]

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

                    IList<School> schoolList = iRepositorySchool.Search(filterList, start, limit, out total);

                    repeater.DataSource = schoolList;
                    repeater.DataBind();

                    numPerPage.Value = numPerPageValue.ToString();
                }
            }

            else
            {

                DeleteSchool();

            }

        }




        private void DeleteSchool()
        {

            

            iRepositorySchool.Delete(Request.Params["uid"]);

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