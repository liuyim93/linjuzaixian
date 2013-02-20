using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using friday.core.repositories;
using friday.core;
using friday.core.domain;
using friday.core.components;

namespace Friday.mvc.weblogin.systemUser
{
    public partial class pSystemUserList : System.Web.UI.Page
    {
        protected long total;
        protected int pageNum;
        protected int numPerPageValue;

        protected string loginName;
        protected string name;
        protected string tel;
        protected string email;
        ISystemUserRepository iRepositorySystemUser = UnityHelper.UnityToT<ISystemUserRepository>();
        IRepository<LoginUser> iRepositoryLoginUser = UnityHelper.UnityToT<IRepository<LoginUser>>();

        protected void Page_Load(object sender, EventArgs e)
        {
            if (Request.Params["flag"] == "alldelete")
            {
                DeleteSystemUser();

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

                IList<SystemUser> systemUserList = iRepositorySystemUser.Search(filterList, start, limit, out total);

                repeater.DataSource = systemUserList;
                repeater.DataBind();

                numPerPage.Value = numPerPageValue.ToString();
            }
        }

        private void DeleteSystemUser()
        {
            string LoginUserID = iRepositorySystemUser.Get(Request.Params["uid"]).LoginUser.Id;
            iRepositorySystemUser.Delete(Request.Params["uid"]);
            iRepositoryLoginUser.Delete(LoginUserID);

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