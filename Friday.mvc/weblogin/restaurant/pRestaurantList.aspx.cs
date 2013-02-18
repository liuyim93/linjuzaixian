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

namespace Friday.mvc.weblogin.restaurant
{
    public partial class pRestaurantList : System.Web.UI.Page
    {
        protected long total;
        protected int pageNum;
        protected int numPerPageValue;
        public string systemUserId;


        public string startDate;
        public string endDate;        
        private SystemUserRepository repositoryForSystemUser = new SystemUserRepository();
        IRestaurantRepository iRepositoryRestaurant = UnityHelper.UnityToT<IRestaurantRepository>();  
        
        protected void Page_Load(object sender, EventArgs e)
        {                     
            
           if (Request.Params["flag"] != "alldelete")
           {
               if (Request.Params["flag"] != "alldelete")
               {
                   numPerPageValue = Request.Form["numPerPage"] == null ? 10 : Convert.ToInt32(Request.Form["numPerPage"].ToString());
                   pageNum = Request.Form["pageNum"] == null ? 1 : Convert.ToInt32(Request.Form["pageNum"].ToString());
                   int start = (pageNum - 1) * numPerPageValue;
                   int limit = numPerPageValue;

                   List<DataFilter> filterList = new List<DataFilter>();
                   if (!string.IsNullOrEmpty(Request.Form["Name"]))
                       filterList.Add(new DataFilter()
                       {
                           type = "Name",
                           value = Request.Form["Name"]

                       });
                   if(!string.IsNullOrEmpty(Request.Form["Owener"]))
                       filterList.Add(new DataFilter()
                       {
                           type = "Owener",
                           value = Request.Form["Owener"]

                       });
                   if (!string.IsNullOrEmpty(Request.Form["ShortName"]))
                       filterList.Add(new DataFilter()
                       {
                           type = "ShortName",
                           value = Request.Form["ShortName"]

                       });
                   if (!string.IsNullOrEmpty(Request.Form["Address"]))
                       filterList.Add(new DataFilter()
                       {
                           type = "Address",
                           value = Request.Form["Address"]

                       });
                   if (!string.IsNullOrEmpty(Request.Form["ShopStatus"]))
                       filterList.Add(new DataFilter()
                       {
                           type = "ShopStatus",
                           value = Request.Form["ShopStatus"]

                       });
                   if (!string.IsNullOrEmpty(Request.Form["Tel"]))
                       filterList.Add(new DataFilter()
                       {
                           type = "Tel",
                           value = Request.Form["Tel"]

                       });
                   var filter = new DataFilter();
                   if (!string.IsNullOrEmpty(Request.Form["StartDate"]))
                   {
                       filter.type = "CreateTime";
                       filter.value = Request.Form["StartDate"];
                       if (!string.IsNullOrEmpty(Request.Form["EndDate"]))
                       {
                           filter.valueForCompare = Request.Form["EndDate"];
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