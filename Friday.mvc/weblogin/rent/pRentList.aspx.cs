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

namespace Friday.mvc.weblogin.rent
{
    public partial class pRentList : System.Web.UI.Page
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
        IRentRepository iRepositoryRent = UnityHelper.UnityToT<IRentRepository>();

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

                    IList<Rent> rentList = iRepositoryRent.GetPageList(start, limit, out total);


                    repeater.DataSource = rentList;
                    repeater.DataBind();

                    numPerPage.Value = numPerPageValue.ToString();

                }
            }

            else
            {
                DeleteRent();

            }


        }



        private void DeleteRent()
        {

            iRepositoryRent.Delete(Request.Params["uid"]);
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