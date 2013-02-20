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
    public partial class MultiListSchool : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
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