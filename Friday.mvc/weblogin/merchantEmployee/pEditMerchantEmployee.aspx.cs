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
    public partial class pEditMerchantEmployee : System.Web.UI.Page
    {
        private IRepository<LoginUser> repository = UnityHelper.UnityToT<IRepository<LoginUser>>();
        private LoginUser lu;

        IMerchantRepository restRepository = UnityHelper.UnityToT<IMerchantRepository>();
        ILoginUserOfMerchantRepository iLoginUserOfMerchantRepository = UnityHelper.UnityToT<ILoginUserOfMerchantRepository>();
    

        protected void Page_Load(object sender, EventArgs e)
        {
            string uid = Request.Params["merchantEmployeeid"].ToString();
      
            lu = repository.Load(uid);
            if (Request.Params["__EVENTVALIDATION"] != null)
            {

                SaveLoginUser();
            }
            else
            {

                BindingHelper.ObjectToControl(lu, this);
             
            }
        }

        private void SaveLoginUser()
        {

            BindingHelper.RequestToObject(lu);

            repository.SaveOrUpdate(lu);

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