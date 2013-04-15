using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Services;
using friday.core.domain;
using friday.core.repositories;
using friday.core;
using friday.core.components;
using friday.core.services;

namespace Friday.mvc.weblogin.skuProp
{
    public partial class pAddSkuProp : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        public static string GetPropValue(IList<nvl> nvls)
        {
            IPropValueService iPropValueService = UnityHelper.UnityToT<IPropValueService>();
            string propID = (from c in nvls where c.name == "propID" select c.value).FirstOrDefault();

            IList<Object> resultObjs = new List<Object>();
            IList<PropValue> items = new List<PropValue>();

            items = iPropValueService.getPropValuebyPropID(propID);
            foreach (PropValue p in items)
            {
                resultObjs.Add(new {
                    Id=p.Id,
                    PropValueName = p.PropValueName
                });
            }
            
            FormatJsonResult jsonResult = new FormatJsonResult();
            jsonResult.Data = resultObjs;
            return jsonResult.FormatResult();
        }
    }
}