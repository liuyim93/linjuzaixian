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

namespace Friday.mvc.weblogin.dataresource
{
    public partial class pDataResourceList : BasePage
    {
        protected long total;
        protected int pageNum;
        protected int numPerPageValue;
        public string systemUserId;


        protected string startDate;
        protected string endDate;
        protected string title;
        protected string matters;
        IDataResourceService iDataResourceService = UnityHelper.UnityToT<IDataResourceService>();
        protected void Page_Load(object sender, EventArgs e)
        {

            this.tagName = systemFunctionObjectService.基本信息模块.商家活动维护.TagName;
            this.PermissionCheck(PermissionTag.Edit);

            if (Request.Params["flag"] != "alldelete")
            {
                if (Request.Params["flag"] != "alldelete")
                {
                    numPerPageValue = Request.Form["numPerPage"] == null ? 10 : Convert.ToInt32(Request.Form["numPerPage"].ToString());
                    pageNum = Request.Form["pageNum"] == null ? 1 : Convert.ToInt32(Request.Form["pageNum"].ToString());
                    int start = (pageNum - 1) * numPerPageValue;
                    int limit = numPerPageValue;

                    List<DataFilter> filterList = new List<DataFilter>();
                    List<DataFilter> sectionFilterList = new List<DataFilter>();
                   
                      filterList.Add(new DataFilter()
                      {
                        type = "IsDelete",                    

                       });
                    if (!string.IsNullOrEmpty(Request.Form["Title"]))
                        filterList.Add(new DataFilter()
                        {
                            type = "Title",
                            value = title = Request.Form["Title"]

                        });

                    if (!string.IsNullOrEmpty(Request.Form["SectionID"]))
                       {
                           sectionFilterList.Add(new DataFilter()
                           {
                               type = "Section",
                               value = Request.Form["SectionID"]

                           });
                        filterList.Add(new DataFilter()
                        {
                            type = "Section",
                            field = sectionFilterList

                        });
                       }
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

                    IList<DataResource> dataresourceList = iDataResourceService.Search(filterList, start, limit, out total);

                    repeater.DataSource = dataresourceList;
                    repeater.DataBind();

                    numPerPage.Value = numPerPageValue.ToString();
                }
            }

            else
            {
                AjaxResult result = new AjaxResult();
                FormatJsonResult jsonResult = new FormatJsonResult();

                tagName = systemFunctionObjectService.基本信息模块.商家活动维护.TagName;
                if (!this.PermissionValidate(PermissionTag.Delete))
                {
                    result.statusCode = "300";
                    result.message = "没有Food删除权限";
                    jsonResult.Data = result;
                    Response.Write(jsonResult.FormatResult());
                    Response.End();
                }

                DeleteDataResource();

            }

        }




        private void DeleteDataResource()
        {


            iDataResourceService.Delete(Request.Params["uid"]);

            AjaxResult result = new AjaxResult();
            result.statusCode = "200";
            result.message = "删除成功";
            FormatJsonResult jsonResult = new FormatJsonResult();
            jsonResult.Data = result;
            Response.Write(jsonResult.FormatResult());
            Response.End();
        }
        public string RcheckState(string checkStates)
        {
            string uncheckedimage = "../themes/img/001_11.gif";
            string checkedimage = "../themes/img/001_06.gif";
            return (checkStates == "no" ? uncheckedimage : checkedimage);
        }

    }
}