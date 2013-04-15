using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using friday.core.repositories;
using friday.core;
using friday.core.components;
using friday.core.domain;
using friday.core.EnumType;
using friday.core.services;

namespace Friday.mvc.weblogin
{
    public partial class pEditPropID : BasePage
    {
        IPropIDService iPropIDService = UnityHelper.UnityToT<IPropIDService>();
        private PropID propID;

        protected void Page_Load(object sender, EventArgs e)
        {
            int uid =Convert.ToInt32(Request.Params["uid"]);

            //tagName = systemFunctionObjectService.基本信息模块.自定义商品类型维护.TagName;
            //this.PermissionCheck();

            propID = iPropIDService.Load(uid);
            if (Request.Params["__EVENTVALIDATION"] != null)
            {

                SavePropID();
            }
            else
            {
                BindingHelper.ObjectToControl(propID, this);
            }
        }

        private void SavePropID()
        {

            BindingHelper.RequestToObject(propID);
            iPropIDService.Update(propID);

            AjaxResult result = new AjaxResult();
            result.statusCode = "200";
            result.message = "修改成功";
            result.navTabId = "referer";
            if (Request.Params["rel_hook"] != null)
            {
                result.panelId = Request.Params["rel_hook"];
            }
            result.callbackType = "closeCurrent";
            FormatJsonResult jsonResult = new FormatJsonResult();
            jsonResult.Data = result;
            Response.Write(jsonResult.FormatResult());
            Response.End();



        }

    }
}