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

namespace Friday.mvc.weblogin
{
    public partial class pSystemFunctionObjectDetail : System.Web.UI.Page
    {
        SystemFunctionObjectInRole systemFunctionObjectInRole;
        ISystemFunctionObjectRepository iSystemFunctionObjectRepository = UnityHelper.UnityToT<ISystemFunctionObjectRepository>();
        ISystemFunctionObjectInRoleRepository iSystemFunctionObjectInRoleRepository = UnityHelper.UnityToT<ISystemFunctionObjectInRoleRepository>();
        protected void Page_Load(object sender, EventArgs e)
        {
            string uid = Request.Params["uid"];
            string rid = Request.Params["rid"];
            SystemFunctionObject systemFunctionObject = iSystemFunctionObjectRepository.Get(uid);
            systemFunctionObjectInRole = iSystemFunctionObjectInRoleRepository.Get(rid, uid);
   
            if (Request.Params["__EVENTVALIDATION"] != null)
            {
                SaveOrUpdate();
            }
           if (systemFunctionObject != null)
           {
               this.panelEnabledState.Visible = systemFunctionObject.FunctionAvailable;
               this.panelEditableState.Visible  = systemFunctionObject.EditPermissionAvailable;
               this.panelDeletableState.Visible = systemFunctionObject.DeletePermissionAvailable;
           }
          if (systemFunctionObjectInRole!=null)
           {
               this.cbEnabledState.Checked = systemFunctionObjectInRole.Enabled;
               this.cbEditableState.Checked = systemFunctionObjectInRole.Editable;
               this.cbDeletableState.Checked = systemFunctionObjectInRole.Deletable;
           }
        }
        private void SaveOrUpdate()
        {
            systemFunctionObjectInRole.Enabled = this.cbEnabledState.Checked;
            systemFunctionObjectInRole.Editable = this.cbEditableState.Checked;
            systemFunctionObjectInRole.Deletable = this.cbDeletableState.Checked;
            iSystemFunctionObjectInRoleRepository.SaveOrUpdate(systemFunctionObjectInRole);

            AjaxResult result = new AjaxResult();
            result.statusCode = "200";
            result.message = "添加成功";
            result.navTabId = "referer";
            result.callbackType = "closeCurrent";
            FormatJsonResult jsonResult = new FormatJsonResult();
            jsonResult.Data = result;
            Response.Write(jsonResult.FormatResult());
            Response.End();

        }
    }
}