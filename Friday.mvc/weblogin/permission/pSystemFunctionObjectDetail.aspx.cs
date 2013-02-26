using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using friday.core.repositories;
using friday.core;

namespace Friday.mvc.weblogin
{
    public partial class pSystemFunctionObjectDetail : System.Web.UI.Page
    {
        ISystemFunctionObjectRepository iSystemFunctionObjectRepository = UnityHelper.UnityToT<ISystemFunctionObjectRepository>();
        protected void Page_Load(object sender, EventArgs e)
        {
           SystemFunctionObject systemFunctionObject= iSystemFunctionObjectRepository.Get(Request.Params["uid"]);
           if (systemFunctionObject != null)
           {
               this.lblEnabledState.InnerText = systemFunctionObject.FunctionAvailable?"可设置":"不可设置";
               this.lblEditableState.InnerText  = systemFunctionObject.EditPermissionAvailable?"可设置":"不可设置";
               this.lblDeleteableState.InnerText = systemFunctionObject.DeletePermissionAvailable ? "可设置" : "不可设置";
           }
        }
    }
}