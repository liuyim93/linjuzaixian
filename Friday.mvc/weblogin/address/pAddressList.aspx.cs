using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using friday.core.repositories;
using friday.core;
using friday.core.domain;
using friday.core.components;

namespace Friday.mvc.weblogin.address
{
    public partial class pAddressList : System.Web.UI.Page
    {
        protected long total;
        protected int pageNum;
        protected int numPerPageValue;

        protected string SystemUserID;
        private IAddressRepository iAddressRepository = UnityHelper.UnityToT<IAddressRepository>();

        protected void Page_Load(object sender, EventArgs e)
        {
            if (Request.Params["flag"] != "alldelete")
            {
                SearchAddress();
            }
            else
            {
                DeleteAddress();
            }
        }
        private void DeleteAddress()
        {

            iAddressRepository.PhysicsDelete(Request.Params["uid"]);
            AjaxResult result = new AjaxResult();
            result.statusCode = "200";
            result.message = "操作成功";
            FormatJsonResult jsonResult = new FormatJsonResult();
            jsonResult.Data = result;
            Response.Write(jsonResult.FormatResult());
            Response.End();
        }
        private void SearchAddress()
        {
            if (Request.Form["systemUser_id"] != null)
            {
                SystemUserID = Request.Form["systemUser_id"];
            }
            else
            {
                SystemUserID = Request.Params["systemUser_id"];
            }
            numPerPageValue = Request.Form["numPerPage"] == null ? 5 : Convert.ToInt32(Request.Form["numPerPage"].ToString());
            pageNum = Request.Form["pageNum"] == null ? 1 : Convert.ToInt32(Request.Form["pageNum"].ToString());
            int start = (pageNum - 1) * numPerPageValue;
            int limit = numPerPageValue;
            IList<Address> addressList = null;
            List<DataFilter> dfl = new List<DataFilter>();

            if (!string.IsNullOrEmpty(SystemUserID))
            {
                dfl.Add(new DataFilter() { type = "SystemUser", value = SystemUserID });
            }

            List<DataFilter> dflForOrder = new List<DataFilter>();
            string orderField = string.IsNullOrEmpty(Request.Form["orderField"]) ? "CreateTime" : Request.Form["orderField"];
            string orderDirection = string.IsNullOrEmpty(Request.Form["orderDirection"]) ? "Desc" : Request.Form["orderDirection"];
            dflForOrder.Add(new DataFilter() { type = orderField, comparison = orderDirection });

            dfl.Add(new DataFilter() { type = "Order", field = dflForOrder });

            addressList = iAddressRepository.Search(dfl, start, limit, out total);
            repeater.DataSource = addressList;
            repeater.DataBind();


            numPerPage.Value = numPerPageValue.ToString();
        }
    }
}