using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using friday.core.domain;
using friday.core.repositories;
using friday.core;
using friday.core.components;
using friday.core.EnumType;
using friday.core.services;

namespace Friday.mvc.weblogin.shop
{
    public partial class pEditShop : BasePage
    {
        IShopService iShopService = UnityHelper.UnityToT<IShopService>();
        ISchoolOfMerchantService iSchoolOfMerchantService = UnityHelper.UnityToT<ISchoolOfMerchantService>();
        ISchoolService iSchoolService = UnityHelper.UnityToT<ISchoolService>();
       
        private Shop shop;
        protected void Page_Load(object sender, EventArgs e)
        {
            string uid = Request.Params["uid"].ToString();

            this.tagName = systemFunctionObjectService.商店模块.商店维护.TagName;
            this.PermissionCheck(PermissionTag.Edit);
            if (this.CurrentUser.IsAdmin)
            {
                uid = Request.Params["uid"].ToString();
            }
            else
            {
                uid = this.CurrentUser.LoginUserOfMerchants.SingleOrDefault().Merchant.Id;

            }        
            shop = iShopService.Load(uid);

            //UserTypeEnum ust = UserTypeEnum.商店;
            //loginuser = iLoginUserOfMerchantRepository.GetMerchantLoginUserBy(shop.Id, ust);

            if (Request.Params["__EVENTVALIDATION"] != null)
            {
                string schid = "";
                if (this.IDSet.Value != null && this.IDSet.Value != "")
                {
                    schid = this.IDSet.Value;
                }
                if (this.SchoolOfMerchantID.Value != null && this.SchoolOfMerchantID.Value != "")
                {
                    schid = this.SchoolOfMerchantID.Value;
                }
                SaveShop(uid, schid);
            }
            else
            {

                BindingHelper.ObjectToControl(shop, this);
               
                this.ImagePreview.Src = shop.Logo;
 

                //this.LoginName.Value = loginuser.LoginName;


                string schofmntname = iSchoolOfMerchantService.GetSchoolNamesByMerchantID(uid);
                string[] arrname = schofmntname.Split('，');
                if (arrname.Length>1)
                {             
                    this.NameSet.Value = schofmntname;
                }
                else
                {
                    this.SchoolOfMerchant.Value = schofmntname;
                }

            }
        }

        private void SaveShop(string uid, string schid)
        {

            BindingHelper.RequestToObject(shop);
            iShopService.Update(shop);

            iSchoolOfMerchantService.DeleteSchoolOfMerchantByMerchantID(uid);


            if (schid != "")
            {

                string[] sArray = schid.Split(',');
                foreach (string shcidsz in sArray)
                {
                    friday.core.domain.SchoolOfMerchant schofmt = new friday.core.domain.SchoolOfMerchant();
                    schofmt.Merchant = shop;
                    schofmt.School = iSchoolService.Load(shcidsz);
                    iSchoolOfMerchantService.Update(schofmt);
                }
            }
            AjaxResult result = new AjaxResult();
            result.statusCode = "200";
            result.message = "修改成功";
            result.navTabId = "referer";
            result.callbackType = "closeCurrent";
            FormatJsonResult jsonResult = new FormatJsonResult();
            jsonResult.Data = result;
            Response.Write(jsonResult.FormatResult());
            Response.End();



        }

    }
}