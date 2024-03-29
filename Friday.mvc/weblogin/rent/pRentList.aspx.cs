﻿using System;
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

namespace Friday.mvc.weblogin.rent
{
    public partial class pRentList : BasePage
    {
        protected long total;
        protected int pageNum;
        protected int numPerPageValue;
        public string systemUserId;


        protected string startDate;
        protected string endDate;
        protected string name;
        protected string owener;
        protected string shortName;
        protected string address;
        protected string loginName;
        protected string _ShopStatus;

        IRentService iRentService = UnityHelper.UnityToT<IRentService>();

        protected void Page_Load(object sender, EventArgs e)
        {
            tagName = systemFunctionObjectService.租房模块.租房维护.TagName;
            this.PermissionCheck();
            //if (!this.PermissionValidate(PermissionTag.Delete))
            //{
            //    this.liDelete.Visible = false;
            //}

            //if (!this.PermissionValidate(PermissionTag.Edit))
            //{
            //    this.liEdit.Visible = false;
            //}

            if (Request.Params["flag"] != "alldelete")
            {
                if (Request.Params["flag"] != "alldelete")
                {
                    numPerPageValue = Request.Form["numPerPage"] == null ? 10 : Convert.ToInt32(Request.Form["numPerPage"].ToString());
                    pageNum = Request.Form["pageNum"] == null ? 1 : Convert.ToInt32(Request.Form["pageNum"].ToString());
                    int start = (pageNum - 1) * numPerPageValue;
                    int limit = numPerPageValue;

                    List<DataFilter> filterList = new List<DataFilter>();
                    List<DataFilter> loginUserOfMechentList = new List<DataFilter>();
                    List<DataFilter> loginUserList = new List<DataFilter>();

                    filterList.Add(new DataFilter()
                    {
                        type = "IsDelete"
                    });

                    if (!string.IsNullOrEmpty(Request.Form["Name"]))
                        filterList.Add(new DataFilter()
                        {
                            type = "Name",
                            value = name = Request.Form["Name"]

                        });
                    if (!string.IsNullOrEmpty(Request.Form["Owener"]))
                        filterList.Add(new DataFilter()
                        {
                            type = "Owener",
                            value = owener = Request.Form["Owener"]

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
                    if (!string.IsNullOrEmpty(Request.Form["ShopStatus"]))
                    {
                        filterList.Add(new DataFilter()
                          {
                              type = "ShopStatus",
                              value = _ShopStatus = Request.Form["ShopStatus"]

                          });
                        //2013-03-28 basilwang fix the bug can't remember the status when choose and pagination
                        ShopStatus.Value = _ShopStatus;  
                    }
                    if (!string.IsNullOrEmpty(Request.Form["LoginName"]))
                    {
                        loginUserList.Add(new DataFilter()
                        {
                            type = "LoginName",
                            value = loginName = Request.Form["LoginName"]

                        });
                        loginUserList.Add(new DataFilter()
                        {
                            type = "UserType",
                            value = "租房"

                        });
                        loginUserOfMechentList.Add(new DataFilter()
                        {
                            type = "LoginUser",
                            field = loginUserList

                        });

                        filterList.Add(new DataFilter()
                        {
                            type = "LoginUserOfMechant",
                            field = loginUserOfMechentList
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
                    IList<Rent> rentList = iRentService.Search(filterList,start, limit, out total);


                    repeater.DataSource = rentList;
                    repeater.DataBind();

                    numPerPage.Value = numPerPageValue.ToString();

                }
            }

            else
            {

                AjaxResult result = new AjaxResult();
                FormatJsonResult jsonResult = new FormatJsonResult();

                tagName = systemFunctionObjectService.租房模块.租房维护.TagName;
                if (!this.PermissionValidate(PermissionTag.Delete))
                {
                    result.statusCode = "300";
                    result.message = "没有Restaurant删除权限";
                    jsonResult.Data = result;
                    Response.Write(jsonResult.FormatResult());
                    Response.End();
                }
                DeleteRent();

            }


        }



        private void DeleteRent()
        {

            iRentService.Delete(Request.Params["uid"]);
            AjaxResult result = new AjaxResult();
            result.statusCode = "200";
            result.message = "操作成功";
            FormatJsonResult jsonResult = new FormatJsonResult();
            jsonResult.Data = result;
            Response.Write(jsonResult.FormatResult());
            Response.End();
        }


    }
}