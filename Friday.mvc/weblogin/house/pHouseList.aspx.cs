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

namespace Friday.mvc.weblogin
{
    public partial class pHouseList : System.Web.UI.Page
    {
        protected long total;
        protected int pageNum;
        protected int numPerPageValue;


        private IRepository<House> iHouseRepository = UnityHelper.UnityToT<IRepository<House>>();

        protected void Page_Load(object sender, EventArgs e)
        {
            if (Request.Params["flag"] != "alldelete")
            {
                SearchHouse();
            }
            else
            {
                DeleteHouse();
            }
        }
        private void DeleteHouse()
        {

            iHouseRepository.Delete(Request.Params["uid"]);
            AjaxResult result = new AjaxResult();
            result.statusCode = "200";
            result.message = "操作成功";
            FormatJsonResult jsonResult = new FormatJsonResult();
            jsonResult.Data = result;
            Response.Write(jsonResult.FormatResult());
            Response.End();
        }
        private void SearchHouse()
        {

            //在这里初始化ShopId
            numPerPageValue = Request.Form["numPerPage"] == null ? 5 : Convert.ToInt32(Request.Form["numPerPage"].ToString());
            pageNum = Request.Form["pageNum"] == null ? 1 : Convert.ToInt32(Request.Form["pageNum"].ToString());
            int start = (pageNum - 1) * numPerPageValue;
            int limit = numPerPageValue;
            IList<House> houseList = iHouseRepository.GetPageList(start, limit, out total);
            repeater.DataSource = houseList;
            repeater.DataBind();


            numPerPage.Value = numPerPageValue.ToString();
        }
    }
}