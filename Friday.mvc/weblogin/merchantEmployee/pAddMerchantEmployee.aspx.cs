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
using System.IO;

namespace Friday.mvc.weblogin
{
    public partial class pAddMerchantEmployee : System.Web.UI.Page
    {

        IMerchantRepository merchantRepository = UnityHelper.UnityToT<IMerchantRepository>();
        ILoginUserOfMerchantRepository iLoginUserOfMerchantRepository = UnityHelper.UnityToT<ILoginUserOfMerchantRepository>();
        
        string mid;
        string mtype;

        protected void Page_Load(object sender, EventArgs e)
        {
             mid = Request.Params["merchant_id"].ToString();
             mtype = Request.Params["mType"].ToString();
            if (Request.Params["__EVENTVALIDATION"] != null)
            {

                SaveLoginUser();
            }           

        }

        private void SaveLoginUser()
        {    
             IRepository<LoginUser> repository = UnityHelper.UnityToT<IRepository<LoginUser>>();
             LoginUser f=new LoginUser();
             BindingHelper.RequestToObject(f);
             if (mtype == "Restaurant")
             {
                 f.UserType = UserTypeEnum.餐馆店小二;
             }
             if (mtype == "Rent")
             {
                 f.UserType = UserTypeEnum.租房店小二;
             }
             if (mtype == "Shop")
             {
                 f.UserType = UserTypeEnum.商店店小二;
             }
            repository.SaveOrUpdate(f);

            Merchant merchant = merchantRepository.Get(mid);

             LoginUserOfMerchant lum = new LoginUserOfMerchant();
             lum.LoginUser = f;
             lum.Merchant = merchant;
             iLoginUserOfMerchantRepository.SaveOrUpdate(lum);

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