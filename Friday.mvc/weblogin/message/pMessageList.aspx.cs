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

namespace Friday.mvc.weblogin.message
{
    public partial class pMessageList : BasePage
    {
        protected long total;
        protected int pageNum;
        protected int numPerPageValue;
        public string systemUserId;


        protected string startDate;
        protected string endDate;
        protected string name;
        protected string threadIndex;
        protected string loginUserName;
        protected string merchantName;
       IMessageService iMessageService = UnityHelper.UnityToT<IMessageService>();

        protected void Page_Load(object sender, EventArgs e)
        {
            tagName = systemFunctionObjectService.消息模块.消息维护.TagName;
            this.PermissionCheck();


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
                    List<DataFilter> merchantList = new List<DataFilter>();

                    if (!string.IsNullOrEmpty(Request.Form["Name"]))
                        filterList.Add(new DataFilter()
                        {
                            type = "Name",
                            value = name = Request.Form["Name"]

                        });

                    if (!string.IsNullOrEmpty(Request.Form["ThreadIndex"]))
                        filterList.Add(new DataFilter()
                        {
                            type = "ThreadIndex",
                            value = threadIndex = Request.Form["ThreadIndex"]

                        });
                    if (!string.IsNullOrEmpty(Request.Form["LoginUserName"]))
                    {
                        loginUserList.Add(new DataFilter()
                        {
                            type = "LoginName",
                            value = loginUserName = Request.Form["LoginUserName"]

                        });
                        filterList.Add(new DataFilter()
                        {
                            type = "LoginUser",
                            field = loginUserList
                        });
                    }
                    if (!string.IsNullOrEmpty(Request.Form["MerchantName"]))
                    {
                        merchantList.Add(new DataFilter()
                        {
                            type = "Name",
                            value = merchantName = Request.Form["MerchantName"]

                        });
                        filterList.Add(new DataFilter()
                        {
                            type = "Merchant",
                            field = merchantList
                        });
                    }
                    //if (!string.IsNullOrEmpty(Request.Form["ToLoginUser"]))
                    //{
                    //    tologinUserList.Add(new DataFilter()
                    //    {
                    //        type = "ToLoginUser",
                    //        value = toLoginUser = Request.Form["ToLoginUser"]

                    //    });
                    //    filterList.Add(new DataFilter()
                    //    {
                    //        type = "ToLoginUser",
                    //        field = tologinUserList
                    //    });
                    //}
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

                    IList<Message> messageList = iMessageService.Search(filterList, start, limit, out total);

                    repeater.DataSource = messageList;
                    repeater.DataBind();

                    numPerPage.Value = numPerPageValue.ToString();
                }
            }

            else
            {
                AjaxResult result = new AjaxResult();
                FormatJsonResult jsonResult = new FormatJsonResult();

                tagName = systemFunctionObjectService.消息模块.消息维护.TagName;
                if (!this.PermissionValidate(PermissionTag.Delete))
                {
                    result.statusCode = "300";
                    result.message = "没有Message删除权限";
                    jsonResult.Data = result;
                    Response.Write(jsonResult.FormatResult());
                    Response.End();
                }

                DeleteMessage();

            }

        }




        private void DeleteMessage()
        {


            iMessageService.Delete(Request.Params["uid"]);

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