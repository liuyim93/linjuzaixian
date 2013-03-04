using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using friday.core.repositories;
using friday.core;
using friday.core.components;
using friday.core.domain;
using friday.core.services;

namespace Friday.mvc.weblogin
{
    public partial class pSystemRoleList : BasePage
    {
        protected long total;
        protected int pageNum;
        protected int numPerPageValue;

        protected string description;
        protected string name;
        protected string tel;
        protected string email;

        private ISystemRoleService iSystemRoleService = UnityHelper.UnityToT<ISystemRoleService>();

        protected void Page_Load(object sender, EventArgs e)
        {
            tagName = systemFunctionObjectService.基本信息模块.角色权限维护.TagName;
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
            }

            if (Request.Params["flag"] == "alldelete")
            {
                DeleteSystemRole();
            }
            else
            {

                SearchSystemRole();

               
            }
        }
        private void  SearchSystemRole()
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
            if (!string.IsNullOrEmpty(Request.Form["Description"]))
                filterList.Add(new DataFilter()
                {
                    type = "Description",
                    value = description = Request.Form["Description"]

                });

            IList<SystemRole> systemUserList = iSystemRoleService.Search(filterList, start, limit, out total);

            repeater.DataSource = systemUserList;
            repeater.DataBind();

            numPerPage.Value = numPerPageValue.ToString();
        }
        private void DeleteSystemRole()
        {

            string sysid = Request.Params["uid"];

            iSystemRoleService.Delete(sysid);

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