using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using friday.core.domain;
using friday.core.components;
using friday.core.repositories;
using Microsoft.Practices.Unity;
using friday.core;
using friday.core.EnumType;
using friday.core.services;

namespace Friday.mvc.weblogin
{
    public partial class pMerchantEmployeeList : BasePage
    {
        protected long total;
        protected int pageNum;
        protected int numPerPageValue;


        public string merchantId;
        public string name;


        public string userType;
        public string mType;

        IMerchantService iMerchantService = UnityHelper.UnityToT<IMerchantService>();
        ILoginUserService iLoginUserService = UnityHelper.UnityToT<ILoginUserService>();

        protected void Page_Load(object sender, EventArgs e)
        {
            tagName = systemFunctionObjectService.基本信息模块.员工维护.TagName;
            this.PermissionCheck();

                if (Request.Params["flag"] != "alldelete")
                {
                    SearchLoginUser();
                    
                }
                else
                {
                    DeleteLoginUser();
                }

               // if (Request.Params["__EVENTVALIDATION"] == null)
               //{            
               //    if (mType == "Restaurant")
               //     {
               //         this.eUserType.Items.Add("餐馆");
               //         this.eUserType.Items.Add("餐馆店小二");                    
               //     }
               //     if (mType == "Rent")
               //     {
               //         this.eUserType.Items.Add("租房");
               //         this.eUserType.Items.Add("租房店小二");
               //     }
               //     if (mType == "Shop")
               //     {
               //         this.eUserType.Items.Add("商店");
               //         this.eUserType.Items.Add("商店店小二");
               //     }
               //}



           
        }
       


        private void DeleteLoginUser()
        {
            string merchantEmployeeid = Request.Params["merchantEmployeeid"];

            iLoginUserService.Delete(merchantEmployeeid);
            AjaxResult result = new AjaxResult();
            result.statusCode = "200";
            result.message = "操作成功";
            FormatJsonResult jsonResult = new FormatJsonResult();
            jsonResult.Data = result;
            Response.Write(jsonResult.FormatResult());
            Response.End();
        }
        private void SearchLoginUser()
        {
            numPerPageValue = Request.Form["numPerPage"] == null ? 5 : Convert.ToInt32(Request.Form["numPerPage"].ToString());
          
            merchantId = Request.Params["merchant_id"];
            mType = Request.Params["merchantType"];


            pageNum = Request.Form["pageNum"] == null ? 1 : Convert.ToInt32(Request.Form["pageNum"].ToString());
            int start = (pageNum - 1) * numPerPageValue;
            int limit = numPerPageValue;
            IList<LoginUser> xiaoErLogiUserList = new List<LoginUser>(); ;
            List<DataFilter> logiUserList = new List<DataFilter>();
            List<DataFilter> loginUserOfMechentList = new List<DataFilter>();
            List<DataFilter> mechentList = new List<DataFilter>();
          

            name = Request.Form["LoginName"];
            if (!string.IsNullOrEmpty(name))
            {
                logiUserList.Add(new DataFilter() { type = "LoginName", value = name });
            }
            //userType = Request.Form["eUserType"];
            //if (!string.IsNullOrEmpty(userType))
            //{
            //    logiUserList.Add(new DataFilter() { type = "UserType", value = userType });
            //}

            mechentList.Add(new DataFilter()
            {
                type = "Merchant",
                value = merchantId

            });

            loginUserOfMechentList.Add(new DataFilter()
            {
                type = "Merchant",
                field = mechentList
            });

            logiUserList.Add(new DataFilter()
            {
                type = "LoginUserOfMerchant",
                field = loginUserOfMechentList
            });
               
            List<DataFilter> dflForOrder = new List<DataFilter>();
            string orderField = string.IsNullOrEmpty(Request.Form["orderField"]) ? "CreateTime" : Request.Form["orderField"];
            string orderDirection = string.IsNullOrEmpty(Request.Form["orderDirection"]) ? "Desc" : Request.Form["orderDirection"];
            dflForOrder.Add(new DataFilter() { type = orderField, comparison = orderDirection });
            logiUserList.Add(new DataFilter() { type = "Order", field = dflForOrder });

            xiaoErLogiUserList = iLoginUserService.Search(logiUserList, start, limit, out total);
            
            repeater.DataSource = xiaoErLogiUserList;
            repeater.DataBind();
           
            numPerPage.Value = numPerPageValue.ToString();
        }
    }
}