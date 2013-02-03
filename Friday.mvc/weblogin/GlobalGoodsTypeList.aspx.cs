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

namespace Friday.mvc.weblogin
{
    public partial class GlobalGoodsTypeList : System.Web.UI.Page
    {

        IRepository<GlobalGoodsType> iRepositoryGlobalGoodsType = UnityHelper.UnityToT<IRepository<GlobalGoodsType>>();

        protected void Page_Load(object sender, EventArgs e)
        {
            if (Request.Params["flag"] == "alldelete")
            {
                DeleteMyOrder();

            }

        }

        private void DeleteMyOrder()
        {
            iRepositoryGlobalGoodsType.Delete(Request.Params["uid"]);
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
