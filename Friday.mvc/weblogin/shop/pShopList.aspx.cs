using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using friday.core.repositories;
using friday.core.domain;
using friday.core;
using friday.core.components;

namespace Friday.mvc.weblogin.shop
{
    public partial class pShopList : System.Web.UI.Page
    {
        protected long total;
        protected int pageNum;
        protected int numPerPageValue;
        public string systemUserId;


        public string startDate;
        public string endDate;

        IRepository<Shop> iRepositoryShop = UnityHelper.UnityToT<IRepository<Shop>>();

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

            IList<Shop> shopList = iRepositoryShop.GetPageList(start, limit, out total);


            repeater.DataSource = shopList;
            repeater.DataBind();

            numPerPage.Value = numPerPageValue.ToString();
               }
           }

          else
          {

              DeleteShop();

          }

         }




        private void DeleteShop()
        {

            string shopid = Request.Params["uid"];

            iRepositoryShop.Delete(shopid);

            AjaxResult result = new AjaxResult();
            result.statusCode = "200";
            result.message = "删除成功";
            FormatJsonResult jsonResult = new FormatJsonResult();
            jsonResult.Data = result;
            Response.Write(jsonResult.FormatResult());
            Response.End();
        }

    }
}