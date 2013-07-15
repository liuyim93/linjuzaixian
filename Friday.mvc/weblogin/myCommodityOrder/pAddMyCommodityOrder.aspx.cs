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
    public partial class pAddMyCommodityOrder : BasePage
    {
        IRepository<MyCommodityOrder> iMyCommodityOrderRepository = UnityHelper.UnityToT<IRepository<MyCommodityOrder>>();
        IRepository<SystemUser> iSystemUserRepository = UnityHelper.UnityToT<IRepository<SystemUser>>();
        IRepository<Shop> iShopRepository = UnityHelper.UnityToT<IRepository<Shop>>();

        private SystemUser systemUserObj;
        private Shop shopObj;
        private MyCommodityOrder myCommodityOrder = new MyCommodityOrder();

        protected void Page_Load(object sender, EventArgs e)
        {
            AjaxResult result = new AjaxResult();
            FormatJsonResult jsonResult = new FormatJsonResult();

            tagName = systemFunctionObjectService.商店模块.商品订单维护.TagName;
            if (!this.PermissionValidate(PermissionTag.Enable))
            {
                result.statusCode = "300";
                result.message = "没有MyCommodityOrder增加权限";
                result.callbackType = "closeCurrent";
                jsonResult.Data = result;
                Response.Write(jsonResult.FormatResult());
                Response.End();
            }
            if (this.CurrentUser.IsAdmin == false)
            {
                this.addOrdMerchant.Visible = false;
            }

            if (Request.Params["__EVENTVALIDATION"] != null)
            {
              
                SaveMyCommodityOrder();
            }
        }

        private void SaveMyCommodityOrder()
        {
            string shopId;


             if (this.CurrentUser.IsAdmin == false)
            {
                shopId=this.CurrentUser.LoginUserOfMerchants.FirstOrDefault().Merchant.Id;                 
            }
            else 
            {   
              shopId=Request.Params["MerchantID"];
            }

            shopObj = iShopRepository.Get(shopId);
            systemUserObj = iSystemUserRepository.Get(Request.Params["SystemUserID"]);

            myCommodityOrder.SystemUser = systemUserObj;

               
            myCommodityOrder.Shop = shopObj;
            
            BindingHelper.RequestToObject(myCommodityOrder);
            iMyCommodityOrderRepository.SaveOrUpdate(myCommodityOrder);

            AjaxResult result = new AjaxResult();
            FormatJsonResult jsonResult = new FormatJsonResult();

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