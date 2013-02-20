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

namespace Friday.mvc.weblogin.globalGoodsType
{
    public partial class pGlobalGoodsTypeList : System.Web.UI.Page
    {

        protected long total;
        protected int pageNum;
        protected int numPerPageValue;

        protected string goodsType;

        IGlobalGoodsTypeRepository iRepositoryGlobalGoodsType = UnityHelper.UnityToT<IGlobalGoodsTypeRepository>();

        protected void Page_Load(object sender, EventArgs e)
        {
            if (Request.Params["flag"] == "alldelete")
            {
                DeleteGlobalGoodsType();

            }
            else
            {
                numPerPageValue = Request.Form["numPerPage"] == null ? 10 : Convert.ToInt32(Request.Form["numPerPage"].ToString());
                pageNum = Request.Form["pageNum"] == null ? 1 : Convert.ToInt32(Request.Form["pageNum"].ToString());
                int start = (pageNum - 1) * numPerPageValue;
                int limit = numPerPageValue;
                List<DataFilter> filterList = new List<DataFilter>();

                filterList.Add(new DataFilter()
                {
                    type = "IsDelete"
                });

                if (!string.IsNullOrEmpty(Request.Form["GoodsType"]))
                    filterList.Add(new DataFilter()
                    {
                        type = "GoodsType",
                        value = goodsType = Request.Form["GoodsType"]

                    });

                if (!string.IsNullOrEmpty(Request.Form["MerchantType"]))
                    filterList.Add(new DataFilter()
                    {
                        type = "MerchantType",
                        value = Request.Form["MerchantType"]

                    });

                IList<GlobalGoodsType> globalGoodsTypeList = iRepositoryGlobalGoodsType.Search(filterList, start, limit, out total);

                repeater.DataSource = globalGoodsTypeList;
                repeater.DataBind();

                numPerPage.Value = numPerPageValue.ToString();
            }
        }

        private void DeleteGlobalGoodsType()
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