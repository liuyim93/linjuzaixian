using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using friday.core.repositories;
using friday.core;
using friday.core.components;
using friday.core.domain;
using friday.core.EnumType;
using friday.core.services;

namespace Friday.mvc.weblogin
{
    public partial class pLoginUserList : BasePage
    {
        protected long total;
        protected int pageNum;
        protected int numPerPageValue;

        protected string loginName;
        protected string merchantType;

        ILoginUserService iLoginUserService = UnityHelper.UnityToT<ILoginUserService>();
        IUserInRoleService iUserInRoleService = UnityHelper.UnityToT<IUserInRoleService>();
        IMerchantService iMerchantService = UnityHelper.UnityToT<IMerchantService>();

        protected void Page_Load(object sender, EventArgs e)
        {
            if (Request.Params["flag"] == "alldelete")
            {
                DeleteLoginUser();

            }
            else
            {
                numPerPageValue = Request.Form["numPerPage"] == null ? 10 : Convert.ToInt32(Request.Form["numPerPage"].ToString());
                pageNum = Request.Form["pageNum"] == null ? 1 : Convert.ToInt32(Request.Form["pageNum"].ToString());
                int start = (pageNum - 1) * numPerPageValue;
                int limit = numPerPageValue;

                List<DataFilter> filterList = new List<DataFilter>();
                List<DataFilter> loginUserOfMerchantList = new List<DataFilter>();
                List<DataFilter> MerchantList = new List<DataFilter>();
                Merchant merchant = new Merchant();



                filterList.Add(new DataFilter()
                {
                    type = "IsDelete"
                });

                if (!string.IsNullOrEmpty(Request.Form["LoginName"]))
                    filterList.Add(new DataFilter()
                    {
                        type = "LoginName",
                        value = loginName = Request.Form["LoginName"]

                    });

                if (!string.IsNullOrEmpty(Request.Form["IsAdmin"]))
                    filterList.Add(new DataFilter()
                    {
                        type = "IsAdmin",
                        value = Request.Form["IsAdmin"]

                    });

                if (!string.IsNullOrEmpty(Request.Form["IDSet"]))
                   {
                      merchant = iMerchantService.Load(Request.Form["IDSet"]);
                      //merchantType=EnumDescription.GetFieldText(merchant.MerchantType);
                      if (merchant.MerchantType == MerchantTypeEnum.餐馆)
                    {
                        merchantType = "Restaurant";
                    }
                    if (merchant.MerchantType ==MerchantTypeEnum.租房)
                    {
                        merchantType = "Rent";
                    }
                    if (merchant.MerchantType == MerchantTypeEnum.百货)
                    {
                        merchantType = "Shop";
                    }

                     MerchantList.Add(new DataFilter()
                     {
                         type = merchantType,
                        value = Request.Form["IDSet"]

                     });
                     loginUserOfMerchantList.Add(new DataFilter()
                     {
                         type = merchantType,
                          field=MerchantList

                     });
                     filterList.Add(new DataFilter()
                     {
                         type = "LoginUserOfMerchant",
                         field = loginUserOfMerchantList
                     });

                    }
                List<DataFilter> dflForOrder = new List<DataFilter>();
                string orderField = string.IsNullOrEmpty(Request.Form["orderField"]) ? "CreateTime" : Request.Form["orderField"];
                string orderDirection = string.IsNullOrEmpty(Request.Form["orderDirection"]) ? "Desc" : Request.Form["orderDirection"];
                dflForOrder.Add(new DataFilter() { type = orderField, comparison = orderDirection });
                filterList.Add(new DataFilter() { type = "Order", field = dflForOrder });

                IList<LoginUser> loginUserList = iLoginUserService.Search(filterList, start, limit, out total);
                IList<LoginUser> finalUser = new List<LoginUser>();
                foreach (LoginUser l in loginUserList)
                {
                    if (l.SystemUser == null)
                    {
                        finalUser.Add(l);
                    }
                }
                repeater.DataSource = finalUser;
                repeater.DataBind();

                numPerPage.Value = numPerPageValue.ToString();
            }
        }

        private void DeleteLoginUser()
        {
            iLoginUserService.Delete(Request.Params["uid"]);
            iUserInRoleService.DeleteUserInRoleByLoginUserID(Request.Params["uid"]);
            iPermissionManager.RefreshUserInRole();

            AjaxResult result = new AjaxResult();
            result.statusCode = "200";
            result.message = "修改成功";
            FormatJsonResult jsonResult = new FormatJsonResult();
            jsonResult.Data = result;
            Response.Write(jsonResult.FormatResult());
            Response.End();
        }
    }
}