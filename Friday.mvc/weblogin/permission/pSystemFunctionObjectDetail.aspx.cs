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
        SystemFunctionObject systemFunctionObject;
        string uid;
        string rid;
        ISystemFunctionObjectRepository iSystemFunctionObjectRepository = UnityHelper.UnityToT<ISystemFunctionObjectRepository>();
        ISystemFunctionObjectInRoleRepository iSystemFunctionObjectInRoleRepository = UnityHelper.UnityToT<ISystemFunctionObjectInRoleRepository>();
        IRepository<SystemRole> iSystemRoleRepository = UnityHelper.UnityToT<IRepository<SystemRole>>();
        protected void Page_Load(object sender, EventArgs e)
        {
            uid = Request.Params["uid"];
            rid = Request.Params["rid"];
            systemFunctionObject = iSystemFunctionObjectRepository.Get(uid);
            systemFunctionObjectInRole = iSystemFunctionObjectInRoleRepository.Get(rid, uid);

            if (Request.Params["__EVENTVALIDATION"] != null)
            {
                SaveOrUpdate();
            }
            else
            {
                if (systemFunctionObject != null)
                {
                    this.panelEnabledState.Visible = systemFunctionObject.FunctionAvailable;
                    this.panelEditableState.Visible = systemFunctionObject.EditPermissionAvailable;
                    this.panelDeletableState.Visible = systemFunctionObject.DeletePermissionAvailable;
                }
                if (systemFunctionObjectInRole != null)
                {
                    this.cbEnabledState.Checked = systemFunctionObjectInRole.Enabled;
                    this.cbEditableState.Checked = systemFunctionObjectInRole.Editable;
                    this.cbDeletableState.Checked = systemFunctionObjectInRole.Deletable;
                }
            }
        }
        private void SaveOrUpdate()
        {
            if (systemFunctionObjectInRole == null)
            {
                systemFunctionObjectInRole = new SystemFunctionObjectInRole(){
                    Role = iSystemRoleRepository.Get(rid),
                     SystemFunctionObject=systemFunctionObject
                };

            }
            systemFunctionObjectInRole.Enabled = this.cbEnabledState.Checked;
            systemFunctionObjectInRole.Editable = this.cbEditableState.Checked;
            systemFunctionObjectInRole.Deletable = this.cbDeletableState.Checked;
            iSystemFunctionObjectInRoleRepository.SaveOrUpdate(systemFunctionObjectInRole);

            AjaxResult result = new AjaxResult();
            result.statusCode = "200";
            result.message = "添加成功";
            //2013-02-26 basilwang don't do any thing, so we put #.
            result.navTabId = "#";
            //result.callbackType = "closeCurrent";
            FormatJsonResult jsonResult = new FormatJsonResult();
            jsonResult.Data = result;
            Response.Write(jsonResult.FormatResult());
            Response.End();

        }
    }
}