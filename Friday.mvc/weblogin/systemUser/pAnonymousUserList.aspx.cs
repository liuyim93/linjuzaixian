﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using friday.core.repositories;
using friday.core;
using friday.core.domain;
using friday.core.components;
using friday.core.services;

namespace Friday.mvc.weblogin
{
    public partial class pAnonymousUserList : BasePage
    {
        protected long total;
        protected int pageNum;
        protected int numPerPageValue;

        protected string loginName;
        protected string name;
        protected string tel;
        protected string email;

        private ISystemUserService iSystemUserService = UnityHelper.UnityToT<ISystemUserService>();
        private ILoginUserService iLoginUserService = UnityHelper.UnityToT<ILoginUserService>();

        protected void Page_Load(object sender, EventArgs e)
        {
            tagName = systemFunctionObjectService.基本信息模块.顾客账号维护.TagName;
            this.PermissionCheck();
            //2013-02-28 basilwang you can use this to block button
            if (!this.PermissionValidate(PermissionTag.Delete))
            {
                //this.liDelete
                this.liDelete.Visible = false;
            }

            if (!this.PermissionValidate(PermissionTag.Edit))
            {
                this.liEdit.Visible = false;
                this.liReset.Visible = false;
            }

            if (Request.Params["flag"] == "alldelete")
            {
                AjaxResult result = new AjaxResult();
                FormatJsonResult jsonResult = new FormatJsonResult();

                tagName = systemFunctionObjectService.基本信息模块.顾客账号维护.TagName;
                if (!this.PermissionValidate(PermissionTag.Delete))
                {
                    result.statusCode = "300";
                    result.message = "没有AnonymousUser删除权限";
                    jsonResult.Data = result;
                    Response.Write(jsonResult.FormatResult());
                    Response.End();
                }

                DeleteAnonymousUser();

            }
            else
            {
                numPerPageValue = Request.Form["numPerPage"] == null ? 10 : Convert.ToInt32(Request.Form["numPerPage"].ToString());
                pageNum = Request.Form["pageNum"] == null ? 1 : Convert.ToInt32(Request.Form["pageNum"].ToString());
                int start = (pageNum - 1) * numPerPageValue;
                int limit = numPerPageValue;

                List<DataFilter> filterList = new List<DataFilter>();
                List<DataFilter> LoginUserFilter = new List<DataFilter>();

                filterList.Add(new DataFilter()
                {
                    type = "IsDelete"
                });

                filterList.Add(new DataFilter()
                {
                    type = "IsAnonymous"
                });

                if (!string.IsNullOrEmpty(Request.Form["LoginName"]))
                LoginUserFilter.Add(new DataFilter()
                {
                    type = "LoginName",
                    value = loginName = Request.Form["LoginName"]

                });

                filterList.Add(new DataFilter()
                {
                    type = "LoginUser",
                    field = LoginUserFilter
                });

                if (!string.IsNullOrEmpty(Request.Form["Name"]))
                    filterList.Add(new DataFilter()
                    {
                        type = "Name",
                        value = name = Request.Form["Name"]

                    });

                if (!string.IsNullOrEmpty(Request.Form["Tel"]))
                    filterList.Add(new DataFilter()
                    {
                        type = "Tel",
                        value = tel = Request.Form["Tel"]

                    });

                if (!string.IsNullOrEmpty(Request.Form["Email"]))
                    filterList.Add(new DataFilter()
                    {
                        type = "Email",
                        value = email = Request.Form["Email"]

                    });

                List<DataFilter> dflForOrder = new List<DataFilter>();
                string orderField = string.IsNullOrEmpty(Request.Form["orderField"]) ? "CreateTime" : Request.Form["orderField"];
                string orderDirection = string.IsNullOrEmpty(Request.Form["orderDirection"]) ? "Desc" : Request.Form["orderDirection"];
                dflForOrder.Add(new DataFilter() { type = orderField, comparison = orderDirection });
                filterList.Add(new DataFilter() { type = "Order", field = dflForOrder });

                IList<SystemUser> systemUserList = iSystemUserService.Search(filterList, start, limit, out total);

                repeater.DataSource = systemUserList;
                repeater.DataBind();

                numPerPage.Value = numPerPageValue.ToString();
            }
        }

        private void DeleteAnonymousUser()
        {
            string LoginUserID = iSystemUserService.Load(Request.Params["uid"]).LoginUser.Id;
            iSystemUserService.Delete(Request.Params["uid"]);
            iLoginUserService.Delete(LoginUserID);

            AjaxResult result = new AjaxResult();
            result.statusCode = "200";
            result.message = "修改成功";
            FormatJsonResult jsonResult = new FormatJsonResult();
            jsonResult.Data = result;
            Response.Write(jsonResult.FormatResult());
            Response.End();
        }
    }
}