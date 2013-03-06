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
using friday.core.services;

namespace Friday.mvc.weblogin
{
    public partial class ListSchool : BasePage
    {
        protected void Page_Load(object sender, EventArgs e)
        {
         
            ISchoolService iSchoolService = UnityHelper.UnityToT<ISchoolService>();
            IList<School> schs = new List<School>();
            schs = iSchoolService.GetAll();
            //if (parentDataDictionary != null)
            //{
            //    IList<DataDictionary> DataDictionarys = DataDictionaryRep.GetDataDictionaryFromParentID(parentDataDictionary.TreeCode);
            repeater.DataSource = schs;
            repeater.DataBind();
            //}
        }
    }
}