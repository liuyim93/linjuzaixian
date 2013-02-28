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

namespace Friday.mvc.weblogin
{
    public partial class pAddAddress : BasePage
    {
        private IRepository<Address> addressRepository = UnityHelper.UnityToT<IRepository<Address>>();
        private IRepository<SystemUser> systemUserRepository = UnityHelper.UnityToT<IRepository<SystemUser>>();

        SystemUser systemUser = new SystemUser();
        private Address address = new Address();

        protected void Page_Load(object sender, EventArgs e)
        {
            if (Request.Params["__EVENTVALIDATION"] != null)
            {
                SaveAddress();
            }
        }

        private void SaveAddress()
        {
            
            BindingHelper.RequestToObject(address);
            systemUser = systemUserRepository.Get(Request.Params["systemUser_id"]);
            address.SystemUser = systemUser;

            addressRepository.SaveOrUpdate(address);

            AjaxResult result = new AjaxResult();
            result.statusCode = "200";
            result.message = "修改成功";
            result.navTabId = "referer";
            //2013-02-13 basilwang set rel_hook to panelId
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