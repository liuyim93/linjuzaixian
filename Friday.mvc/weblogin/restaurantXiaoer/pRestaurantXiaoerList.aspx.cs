﻿using System;
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

namespace Friday.mvc.weblogin
{
    public partial class pRestaurantXiaoer : System.Web.UI.Page
    {
        protected long total;
        protected int pageNum;
        protected int numPerPageValue;


        public string restaurantId;
        public string name;

        public string mid;

        private ILoginUserRepository iLoginUserRepository = UnityHelper.UnityToT<ILoginUserRepository>();
        IRestaurantRepository restRepository = UnityHelper.UnityToT<IRestaurantRepository>();
        IMerchantGoodsTypeRepository mGoodsTypeRepository = UnityHelper.UnityToT<IMerchantGoodsTypeRepository>();

        protected void Page_Load(object sender, EventArgs e)
        {
              

                if (Request.Params["flag"] != "alldelete")
                {
                    SearchLoginUser();
                }
                else
                {
                    DeleteLoginUser();
                }
           
        }
       


        private void DeleteLoginUser()
        {
            //string loginUserid = Request.Params["loginUser_id"];

            //iLoginUserRepository.Delete(loginUserid);
            //AjaxResult result = new AjaxResult();
            //result.statusCode = "200";
            //result.message = "操作成功";
            //FormatJsonResult jsonResult = new FormatJsonResult();
            //jsonResult.Data = result;
            //Response.Write(jsonResult.FormatResult());
            //Response.End();
        }
        private void SearchLoginUser()
        {
            numPerPageValue = Request.Form["numPerPage"] == null ? 5 : Convert.ToInt32(Request.Form["numPerPage"].ToString());
            if (Request.Form["restaurant_id"] != null)
            {
                restaurantId = Request.Form["restaurant_id"];
            }
            else
            {
                restaurantId = Request.Params["restaurant_id"];
            }

            pageNum = Request.Form["pageNum"] == null ? 1 : Convert.ToInt32(Request.Form["pageNum"].ToString());
            int start = (pageNum - 1) * numPerPageValue;
            int limit = numPerPageValue;
            IList<LoginUser> xiaoErLogiUserList = new List<LoginUser>(); ;
            List<DataFilter> logiUserList = new List<DataFilter>();
            List<DataFilter> loginUserOfMechentList = new List<DataFilter>();
            List<DataFilter> mechentList = new List<DataFilter>();
          

            name = Request.Form["Name"];
            if (!string.IsNullOrEmpty(name))
            {
                logiUserList.Add(new DataFilter() { type = "Name", value = name });
            }

                mechentList.Add(new DataFilter()
                {
                    type = "Restaurant",
                    value = Request.Form["restaurant_id"]

                });
                loginUserOfMechentList.Add(new DataFilter()
                {
                    type = "Restaurant",
                    field = mechentList
                });


                logiUserList.Add(new DataFilter()
                {
                    type = "LoginUserOfMechant",
                    field = loginUserOfMechentList
                });

                logiUserList.Add(new DataFilter()
                {
                    type = "UserType",
                    value = "餐馆店小二"

                });
         
            //if (!string.IsNullOrEmpty(restaurantId))
            //{
            //    dfl.Add(new DataFilter() { type = "Restaurant", value = restaurantId });
            //}

            List<DataFilter> dflForOrder = new List<DataFilter>();
            string orderField = string.IsNullOrEmpty(Request.Form["orderField"]) ? "CreateTime" : Request.Form["orderField"];
            string orderDirection = string.IsNullOrEmpty(Request.Form["orderDirection"]) ? "Desc" : Request.Form["orderDirection"];
            dflForOrder.Add(new DataFilter() { type = orderField, comparison = orderDirection });
            logiUserList.Add(new DataFilter() { type = "Order", field = dflForOrder });

            xiaoErLogiUserList = iLoginUserRepository.Search(logiUserList, start, limit, out total);
            repeater.DataSource = xiaoErLogiUserList;
            repeater.DataBind();
           
            numPerPage.Value = numPerPageValue.ToString();
        }
    }
}