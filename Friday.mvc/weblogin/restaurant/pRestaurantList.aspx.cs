using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using friday.core;
using friday.core.repositories;
using friday.core.domain;
using friday.core.components;
using friday.core.EnumType;
using friday.core.services;
using friday.core.utils;

namespace Friday.mvc.weblogin.restaurant
{
    public partial class pRestaurantList : BasePage
    {
        protected long total;
        protected int pageNum;
        protected int numPerPageValue;
        public string systemUserId;


        protected string startDate;
        protected string endDate;
        protected string name;
        protected string owener;
        protected string shortName;
        protected string address;
        protected string shopStatus;
        protected string tel;
        protected string loginName;
        private SystemUserRepository repositoryForSystemUser = new SystemUserRepository();
        IRestaurantRepository iRepositoryRestaurant = UnityHelper.UnityToT<IRestaurantRepository>();

        protected void Page_Load(object sender, EventArgs e)
        {
           tagName = systemFunctionObjectService.餐馆模块.餐馆维护.TagName;
           this.PermissionCheck();
            //2013-02-28 basilwang you can use this to block button
           //if(!this.PermissionValidate(PermissionTag.Delete))
           //{
           //    //this.liDelete
           //    this.liDelete.Visible = false;
           //}
           //iLogger.LogMessage("进入" + tagName + "页面", typeof(pRestaurantList).FullName, EventDataTypeCategory.信息 | EventDataTypeCategory.操作日志);
           if (Request.Params["flag"] != "alldelete")
           {
               if (Request.Params["flag"] != "alldelete")
               {
                   numPerPageValue = Request.Form["numPerPage"] == null ? 10 : Convert.ToInt32(Request.Form["numPerPage"].ToString());
                   pageNum = Request.Form["pageNum"] == null ? 1 : Convert.ToInt32(Request.Form["pageNum"].ToString());
                   int start = (pageNum - 1) * numPerPageValue;
                   int limit = numPerPageValue;

                   List<DataFilter> filterList = new List<DataFilter>();
                   List<DataFilter> loginUserOfMechentList = new List<DataFilter>();
                   List<DataFilter> loginUserList = new List<DataFilter>();

                   if (!string.IsNullOrEmpty(Request.Form["Name"]))
                       filterList.Add(new DataFilter()
                       {
                           type = "Name",
                           value = name=Request.Form["Name"]

                       });
                   if(!string.IsNullOrEmpty(Request.Form["Owener"]))
                       filterList.Add(new DataFilter()
                       {
                           type = "Owener",
                           value = owener=Request.Form["Owener"]

                       });
                   if (!string.IsNullOrEmpty(Request.Form["ShortName"]))
                       filterList.Add(new DataFilter()
                       {
                           type = "ShortName",
                           value = shortName=Request.Form["ShortName"]

                       });
                   if (!string.IsNullOrEmpty(Request.Form["Address"]))
                       filterList.Add(new DataFilter()
                       {
                           type = "Address",
                           value = address=Request.Form["Address"]

                       });
                   if (!string.IsNullOrEmpty(Request.Form["ShopStatus"]))
                       filterList.Add(new DataFilter()
                       {
                           type = "ShopStatus",
                           value = shopStatus=Request.Form["ShopStatus"]

                       });
                   if (!string.IsNullOrEmpty(Request.Form["Tel"]))
                       filterList.Add(new DataFilter()
                       {
                           type = "Tel",
                           value = tel=Request.Form["Tel"]

                       });
                   //loginName 包括店长得LoginName和相应权限店小二的LoginName
                   //if (!string.IsNullOrEmpty(Request.Form["LoginName"]))
                   //    filterList.Add(new DataFilter()
                   //    {
                   //        type = "LoginName",
                   //        value = loginName = Request.Form["LoginName"]

                   //    });

                   //Version2  3表嵌套查询

                   if (!string.IsNullOrEmpty(Request.Form["LoginName"]))
                   { 
                       loginUserList.Add(new DataFilter()
                       {
                           type = "LoginName",
                           value = loginName = Request.Form["LoginName"]

                       });
                       loginUserList.Add(new DataFilter()
                       {
                           type = "UserType",
                           value = "餐馆"

                       });
                       loginUserOfMechentList.Add(new DataFilter()
                       {
                           type = "LoginUser",
                           field= loginUserList

                       });
                      
                       filterList.Add(new DataFilter()
                       {
                           type="LoginUserOfMechant",
                           field=loginUserOfMechentList
                       });

                   }

                   var filter = new DataFilter();
                   if (!string.IsNullOrEmpty(Request.Form["StartDate"]))
                   {
                       filter.type = "CreateTime";
                       filter.value = startDate=Request.Form["StartDate"];
                       if (!string.IsNullOrEmpty(Request.Form["EndDate"]))
                       {
                           filter.valueForCompare =endDate= Request.Form["EndDate"];
                       }
                       filterList.Add(filter);
                   }
                   
                   IList<Restaurant> restaurantList = iRepositoryRestaurant.Search(filterList,start, limit, out total);


                   repeater.DataSource = restaurantList;
                   repeater.DataBind();

                   numPerPage.Value = numPerPageValue.ToString();

               }
           }

           else
           {
               DeleteRestaurant();

           }
         
      
        }





        private void DeleteRestaurant()
        {

            iRepositoryRestaurant.Delete(Request.Params["uid"]);
            AjaxResult result = new AjaxResult();
            result.statusCode = "200";
            result.message = "操作成功";
            FormatJsonResult jsonResult = new FormatJsonResult();
            jsonResult.Data = result;
            Response.Write(jsonResult.FormatResult());
            Response.End();
        }
    

    }
}