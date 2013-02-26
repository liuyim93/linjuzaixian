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
           string uid = Request.Params["uid"];
           string rid = Request.Params["rid"];
           SystemFunctionObject systemFunctionObject= iSystemFunctionObjectRepository.Get(uid);
           if (systemFunctionObject != null)
           {
               this.panelEnabledState.Visible = systemFunctionObject.FunctionAvailable;
               this.panelEditableState.Visible  = systemFunctionObject.EditPermissionAvailable;
               this.panelDeletableState.Visible = systemFunctionObject.DeletePermissionAvailable;
           }
        }
    }
}