using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using friday.core;
using friday.core.repositories;
using friday.core.components;
using friday.core.domain;
using friday.core.EnumType;
using friday.core.services;

namespace Friday.mvc.weblogin.rent
{
    public partial class pRentDetail : BasePage
    {
        IRentService iRentService = UnityHelper.UnityToT<IRentService>();

        //public LoginUser loginuser;
        private Rent rent;
        protected void Page_Load(object sender, EventArgs e)
        {
            string uid = Request.Params["uid"].ToString();
            rent = iRentService.Load(uid);
            tagName = systemFunctionObjectService.租房模块.租房维护.TagName;
            if (!this.PermissionValidate(PermissionTag.Enable))
            {
                AjaxResult result = new AjaxResult();
                result.statusCode = "300";
                result.message = "没有Rent浏览权限";
                FormatJsonResult jsonResult = new FormatJsonResult();
                jsonResult.Data = result;
                Response.Write(jsonResult.FormatResult());
                Response.End();
            }

            BindingHelper.ObjectToControl(rent, this);
            this.ImagePreview.Src = rent.Logo;

            ISchoolOfMerchantService iSchoolOfMerchantService = UnityHelper.UnityToT<ISchoolOfMerchantService>();
            string schofmntname = iSchoolOfMerchantService.GetSchoolNamesByMerchantID(uid);
            string[] arrname = schofmntname.Split('，');

            this.NameSet.Value = schofmntname;

        }
    }
}