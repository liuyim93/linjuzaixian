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

namespace Friday.mvc.weblogin.restaurant
{
    public partial class pAddRestaurant : BasePage
    {
        IRestaurantService iRestaurantService = UnityHelper.UnityToT<IRestaurantService>();
        ISchoolOfMerchantService iSchoolOfMerchantService = UnityHelper.UnityToT<ISchoolOfMerchantService>();
        ISchoolService iSchoolService = UnityHelper.UnityToT<ISchoolService>();
        //ILoginUserOfMerchantService iLoginUserOfMerchantService = UnityHelper.UnityToT<ILoginUserOfMerchantService>();

        protected void Page_Load(object sender, EventArgs e)
        {
            if (!this.PermissionValidate(PermissionTag.Enable))
            {
                AjaxResult result = new AjaxResult();
                result.statusCode = "300";
                result.message = "没有Restaurant增加权限";
                FormatJsonResult jsonResult = new FormatJsonResult();
                jsonResult.Data = result;
                Response.Write(jsonResult.FormatResult());
                Response.End();
            }

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

                SaveRestaurant(schid);
            }
            
        }

        private void SaveRestaurant(string schid)
        {
            Restaurant rnt = new Restaurant();
            //LoginUser  lu=new LoginUser();
            //LoginUserOfMerchant lumcht = new LoginUserOfMerchant();

        
            BindingHelper.RequestToObject(rnt);
            iRestaurantService.Save(rnt);

            //lumcht.LoginUser = lu;
            //lumcht.Merchant = rnt;

            //lu.LoginName = this.LoginName.Value;
            //lu.Password = this.Password.Value;
            //lu.UserType = UserTypeEnum.餐馆;
            //iLoginUserService.Save(lu);
            //iLoginUserOfMerchantService.Save(lumcht);


            if (schid != "")
            {
                string[] sArray = schid.Split(',');

                foreach (string shcidsz in sArray)
                {
                    friday.core.domain.SchoolOfMerchant schofmt = new friday.core.domain.SchoolOfMerchant();
                    schofmt.Merchant = rnt;
                    schofmt.School = iSchoolService.Load(shcidsz);
                    iSchoolOfMerchantService.Save(schofmt);
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