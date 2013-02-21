using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using friday.core.domain;
using friday.core.repositories;
using friday.core;
using friday.core.components;

namespace Friday.mvc.weblogin.school
{
    public partial class pEditSchool : System.Web.UI.Page
    {
        IRepository<School> iSchoolRepository = UnityHelper.UnityToT<IRepository<School>>();
        private School school;
        protected void Page_Load(object sender, EventArgs e)
        {
            string uid = Request.Params["uid"].ToString();
            school = iSchoolRepository.Load(uid);
            if (Request.Params["__EVENTVALIDATION"] != null)
            {

                SaveSchool();
            }
            else
            {

                BindingHelper.ObjectToControl(school, this);
               
            }
        }

        private void SaveSchool()
        {

            BindingHelper.RequestToObject(school);

            iSchoolRepository.SaveOrUpdate(school);

            AjaxResult result = new AjaxResult();
            result.statusCode = "200";
            result.message = "修改成功";
            result.navTabId = "referer";
            result.callbackType = "closeCurrent";
            FormatJsonResult jsonResult = new FormatJsonResult();
            jsonResult.Data = result;
            Response.Write(jsonResult.FormatResult());
            Response.End();



        }

    }
}