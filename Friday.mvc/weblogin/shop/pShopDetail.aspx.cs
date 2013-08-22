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
using friday.core.EnumType;
using friday.core.services;

namespace Friday.mvc.weblogin.shop
{
    public partial class pShopDetail : BasePage
    {
        IShopService iShopService = UnityHelper.UnityToT<IShopService>();
        ISchoolOfMerchantService iSchoolOfMerchantService = UnityHelper.UnityToT<ISchoolOfMerchantService>();
        private Shop shop;
        protected void Page_Load(object sender, EventArgs e)
        {
            tagName = systemFunctionObjectService.商店模块.商店维护.TagName;
            if (!this.PermissionValidate(PermissionTag.Enable))
            {
                AjaxResult result = new AjaxResult();
                result.statusCode = "300";
                result.message = "没有Shop浏览权限";
                result.callbackType = "closeCurrent";
                FormatJsonResult jsonResult = new FormatJsonResult();
                jsonResult.Data = result;
                Response.Write(jsonResult.FormatResult());
                Response.End();
            }

            string uid = Request.Params["uid"].ToString();
            shop = iShopService.Load(uid);

            BindingHelper.ObjectToControl(shop, this);
            ShopStatus.Value = ((int)shop.ShopStatus).ToString();
            Type.Value = ((int)shop.MerchantType).ToString();

            string[] schofmntname = iSchoolOfMerchantService.GetSchoolNamesAndIdsByMerchantID(uid);
            //string[] arrname = schofmntname.Split('，');
            //if (arrname.Length > 1)
            //{
                this.NameSet.Value = schofmntname[0];
                this.IDSet.Value = schofmntname[1];
            //}
            //else
            //{
            //    this.SchoolOfMerchant.Value = schofmntname;
            //}




        }
    }
}