using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using friday.core.components;
using friday.core.domain;
using friday.core;
using friday.core.repositories;
using friday.core.services;

namespace Friday.mvc.weblogin
{
    public partial class pAddPropValue : BasePage
    {
    
        IPropValueService iPropValueService = UnityHelper.UnityToT<IPropValueService>();
        IPropIDService iPropIDService = UnityHelper.UnityToT<IPropIDService>();
        IMerchantService iMerchantService = UnityHelper.UnityToT<IMerchantService>();

        private PropValue propValue;
        private string mid;
        private string mtype="";
        private Merchant merchant;

        protected void Page_Load(object sender, EventArgs e)
        {
            //tagName = systemFunctionObjectService.基本信息模块.自定义商品类型维护.TagName;
            //if (!this.PermissionValidate(PermissionTag.Enable))
            //{
            //    AjaxResult result = new AjaxResult();
            //    result.statusCode = "300";
            //    result.message = "没有PropValue增加权限";
            //    FormatJsonResult jsonResult = new FormatJsonResult();
            //    jsonResult.Data = result;
            //    Response.Write(jsonResult.FormatResult());
            //    Response.End();
            //}

            mid = Request.Params["merchant_id"].ToString();
            //mtype = Request.Params["mType"].ToString();
            if (Request.Params["__EVENTVALIDATION"] != null)
            {
                SavePropValue();
            }
            else 
            {
                IList<PropID> propIDs = new List<PropID>();
                if (!this.CurrentUser.IsAdmin)
                {
                    propIDs = iPropIDService.GetPropIDByMerchantID(this.CurrentUser.LoginUserOfMerchants.SingleOrDefault().Merchant.Id);
                }
                else
                {
                    propIDs = iPropIDService.GetAll();
                }
                foreach (var i in propIDs)
                {
                    this.PropIDList.Items.Add(i.PropIDName);
                }
                
            }







        }

        private void SavePropValue()
        {       
            propValue = new PropValue();
         
            propValue.Merchant = iMerchantService.Load(mid);                
            BindingHelper.RequestToObject(propValue);
            string propValueName = this.PropValueName.Value;

            bool flag = iPropValueService.IsHaveTheSameName(propValueName);
            AjaxResult result = new AjaxResult();
            if (flag == true)
            {
                result.statusCode = "300";
                result.message = "已存在此规格类型";
                result.navTabId = "referer";
            
            }
            else 
            {

                iPropValueService.Save(propValue);
                result.statusCode = "200";
                result.message = "添加成功";
                result.navTabId = "referer";
            }      

          
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