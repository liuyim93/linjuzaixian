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

namespace Friday.mvc.weblogin
{
    public partial class ListSchool : BasePage
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!this.PermissionValidate(PermissionTag.Enable))
            {
                AjaxResult result = new AjaxResult();
                result.statusCode = "300";
                result.message = "没有选择School权限";
                FormatJsonResult jsonResult = new FormatJsonResult();
                jsonResult.Data = result;
                Response.Write(jsonResult.FormatResult());
                Response.End();
            }

            IRepository<School> reposch = UnityHelper.UnityToT<IRepository<School>>();
            IList<School> schs = new List<School>();
            schs = reposch.GetAll();
            //if (parentDataDictionary != null)
            //{
            //    IList<DataDictionary> DataDictionarys = DataDictionaryRep.GetDataDictionaryFromParentID(parentDataDictionary.TreeCode);
            repeater.DataSource = schs;
            repeater.DataBind();
            //}
        }
    }
}