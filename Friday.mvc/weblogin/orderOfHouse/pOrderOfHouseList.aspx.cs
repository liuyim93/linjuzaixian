﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using friday.core;
using friday.core.repositories;
using friday.core.domain;
using friday.core.components;

namespace Friday.mvc.weblogin
{
    public partial class pOrderOfHouseList : System.Web.UI.Page
    {
        protected long total;
        protected int pageNum;
        protected int numPerPageValue;

        protected string MyHouseOrderID;
        protected string rent_id;

        private IOrderOfHouseRepository iOrderOfHouseRepository = UnityHelper.UnityToT<IOrderOfHouseRepository>();
        private IMyHouseOrderRepository iMyHouseOrderRepository = UnityHelper.UnityToT<IMyHouseOrderRepository>();

        private MyHouseOrder myHouseOrder;
        private OrderOfHouse orderOfHouse;

        protected void Page_Load(object sender, EventArgs e)
        {
            if (Request.Form["myHouseOrder_id"] != null)
            {
                MyHouseOrderID = Request.Form["myHouseOrder_id"];
            }
            else
            {
                MyHouseOrderID = Request.Params["myHouseOrder_id"];
            }
            myHouseOrder = iMyHouseOrderRepository.Get(MyHouseOrderID);
            rent_id = myHouseOrder.Rent.Id;

            if (Request.Params["flag"] != "alldelete")
            {
                SearchOrderOfHouse();
            }
            else
            {
                DeleteOrderOfHouse();
            }
        }
        private void DeleteOrderOfHouse()
        {

            orderOfHouse = iOrderOfHouseRepository.Get(Request.Params["uid"]);

            myHouseOrder.Price = myHouseOrder.Price - orderOfHouse.Price;

            iMyHouseOrderRepository.SaveOrUpdate(myHouseOrder);
            iOrderOfHouseRepository.Delete(Request.Params["uid"]);

            AjaxResult result = new AjaxResult();
            result.statusCode = "200";
            result.message = "操作成功";
            FormatJsonResult jsonResult = new FormatJsonResult();
            jsonResult.Data = result;
            Response.Write(jsonResult.FormatResult());
            Response.End();
        }
        private void SearchOrderOfHouse()
        {
            numPerPageValue = Request.Form["numPerPage"] == null ? 5 : Convert.ToInt32(Request.Form["numPerPage"].ToString());
            pageNum = Request.Form["pageNum"] == null ? 1 : Convert.ToInt32(Request.Form["pageNum"].ToString());
            int start = (pageNum - 1) * numPerPageValue;
            int limit = numPerPageValue;
            IList<OrderOfHouse> orderOfHouseList = null;
            List<DataFilter> dfl = new List<DataFilter>();

            if (!string.IsNullOrEmpty(MyHouseOrderID))
            {
                dfl.Add(new DataFilter() { type = "MyHouseOrder", value = MyHouseOrderID });
            }

            dfl.Add(new DataFilter()
            {
                type = "IsDelete"
            });

            List<DataFilter> dflForOrder = new List<DataFilter>();
            string orderField = string.IsNullOrEmpty(Request.Form["orderField"]) ? "CreateTime" : Request.Form["orderField"];
            string orderDirection = string.IsNullOrEmpty(Request.Form["orderDirection"]) ? "Desc" : Request.Form["orderDirection"];
            dflForOrder.Add(new DataFilter() { type = orderField, comparison = orderDirection });

            dfl.Add(new DataFilter() { type = "Order", field = dflForOrder });

            orderOfHouseList = iOrderOfHouseRepository.Search(dfl, start, limit, out total);
            repeater.DataSource = orderOfHouseList;
            repeater.DataBind();


            numPerPage.Value = numPerPageValue.ToString();
        }
    }
}