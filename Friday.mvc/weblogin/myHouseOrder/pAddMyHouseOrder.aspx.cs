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
using friday.core.services;

namespace Friday.mvc.weblogin
{
    public partial class pAddMyHouseOrder : BasePage
    {
        IMyHouseOrderService iMyHouseOrderService = UnityHelper.UnityToT<IMyHouseOrderService>();
        IRepository<SystemUser> iSystemUserRepository = UnityHelper.UnityToT<IRepository<SystemUser>>();
        IRepository<Rent> iRentRepository = UnityHelper.UnityToT<IRepository<Rent>>();

        private SystemUser systemUserObj;
        private Rent rentObj;
        private MyHouseOrder myHouseOrder = new MyHouseOrder();

        protected void Page_Load(object sender, EventArgs e)
        {
            AjaxResult result = new AjaxResult();
            FormatJsonResult jsonResult = new FormatJsonResult();

            if (!this.PermissionValidate(PermissionTag.Enable))
            {
                result.statusCode = "300";
                result.message = "没有MyHouseOrder增加权限";
                jsonResult.Data = result;
                Response.Write(jsonResult.FormatResult());
                Response.End();
            }
            if (Request.Params["__EVENTVALIDATION"] != null)
            {

                SaveMyHouseOrder();
            }
        }

        private void SaveMyHouseOrder()
        {
            AjaxResult result = new AjaxResult();
            FormatJsonResult jsonResult = new FormatJsonResult();

            rentObj = iRentRepository.Get(Request.Params["MerchantID"]);
            systemUserObj = iSystemUserRepository.Get(Request.Params["SystemUserID"]);

            myHouseOrder.SystemUser = systemUserObj;
            myHouseOrder.Rent = rentObj;

            BindingHelper.RequestToObject(myHouseOrder);
            iMyHouseOrderService.Save(myHouseOrder);

            result.statusCode = "200";
            result.message = "添加成功";
            result.navTabId = "referer";
            result.callbackType = "closeCurrent";
            jsonResult.Data = result;
            Response.Write(jsonResult.FormatResult());
            Response.End();
        }
    }
}