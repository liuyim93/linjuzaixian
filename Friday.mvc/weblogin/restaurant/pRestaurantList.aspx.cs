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
        IRepository<Restaurant> iRepositoryRestaurant = UnityHelper.UnityToT<IRepository<Restaurant>>();  
        
        protected void Page_Load(object sender, EventArgs e)
        {                     
           
           //2012-9-3  传入systemUser_id将查询只属于此用户的订单，否则显示所有订单
           if (Request.Params["flag"] != "alldelete")
           {
               if (Request.Params["flag"] != "alldelete")
               {
                   numPerPageValue = Request.Form["numPerPage"] == null ? 10 : Convert.ToInt32(Request.Form["numPerPage"].ToString());
                   pageNum = Request.Form["pageNum"] == null ? 1 : Convert.ToInt32(Request.Form["pageNum"].ToString());
                   int start = (pageNum - 1) * numPerPageValue;
                   int limit = numPerPageValue;
                   IList<Restaurant> restaurantList = iRepositoryRestaurant.GetPageList(start, limit, out total);


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