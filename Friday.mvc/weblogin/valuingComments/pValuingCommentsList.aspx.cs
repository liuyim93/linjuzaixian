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

namespace Friday.mvc.weblogin.valuingComments
{
    public partial class pValuingCommentsList : BasePage
    {
        protected long total;
        protected int pageNum;
        protected int numPerPageValue;

        protected string valuingID;

        IValuingCommentsRepository iValuingCommentsRepository = UnityHelper.UnityToT<IValuingCommentsRepository>();
        IRepository<Valuing> iValuingRepository = UnityHelper.UnityToT<IRepository<Valuing>>();

        private Valuing valuing;

        protected void Page_Load(object sender, EventArgs e)
        {
            tagName = systemFunctionObjectService.基本信息模块.评论回复管理.TagName;
            this.PermissionCheck();

            if (Request.Form["valuing_id"] != null)
            {
                valuingID = Request.Form["valuing_id"];
            }
            else
            {
                valuingID = Request.Params["valuing_id"];
            }
            valuing = iValuingRepository.Load(valuingID);

            if (Request.Params["flag"] != "alldelete")
            {
                SearchValuingComments();
            }
            else
            {

                AjaxResult result = new AjaxResult();
                FormatJsonResult jsonResult = new FormatJsonResult();
                tagName = systemFunctionObjectService.基本信息模块.评论回复管理.TagName;

                if (!this.PermissionValidate(PermissionTag.Delete))
                {
                    result.statusCode = "300";
                    result.message = "没有评论删除权限";
                    jsonResult.Data = result;
                    Response.Write(jsonResult.FormatResult());
                    Response.End();
                if (CurrentUser.IsAdmin != true)
                {
                    if (iValuingCommentsRepository.Get(Request.Params["uid"]).Direction == 0)
                    {
                        AjaxResult result = new AjaxResult();
                        result.statusCode = "300";
                        result.message = "不能删除用户的评价";
                        FormatJsonResult jsonResult = new FormatJsonResult();
                        jsonResult.Data = result;
                        Response.Write(jsonResult.FormatResult());
                        Response.End();
                    }
                }

                DeleteValuingComments();
            }
        }
        private void DeleteValuingComments()
        {

            iValuingCommentsRepository.Delete(Request.Params["uid"]);

            AjaxResult result = new AjaxResult();
            result.statusCode = "200";
            result.message = "操作成功";
            if (Request.Params["rel_hook"] != null)
            {
                result.panelId = Request.Params["rel_hook"];
            }
            FormatJsonResult jsonResult = new FormatJsonResult();
            jsonResult.Data = result;
            Response.Write(jsonResult.FormatResult());
            Response.End();
        }
        private void SearchValuingComments()
        {
            numPerPageValue = Request.Form["numPerPage"] == null ? 5 : Convert.ToInt32(Request.Form["numPerPage"].ToString());
            pageNum = Request.Form["pageNum"] == null ? 1 : Convert.ToInt32(Request.Form["pageNum"].ToString());
            int start = (pageNum - 1) * numPerPageValue;
            int limit = numPerPageValue;
            IList<ValuingComments> valuingCommentsList = null;
            List<DataFilter> dfl = new List<DataFilter>();
            List<DataFilter> ValuingFilter = new List<DataFilter>();

            ValuingFilter.Add(new DataFilter() { type = "Valuing", value = valuingID });
            dfl.Add(new DataFilter() { type = "Valuing", field = ValuingFilter });

            dfl.Add(new DataFilter()
            {
                type = "IsDelete"
            });

            List<DataFilter> dflForOrder = new List<DataFilter>();
            string orderField = string.IsNullOrEmpty(Request.Form["orderField"]) ? "CreateTime" : Request.Form["orderField"];
            string orderDirection = string.IsNullOrEmpty(Request.Form["orderDirection"]) ? "Desc" : Request.Form["orderDirection"];
            dflForOrder.Add(new DataFilter() { type = orderField, comparison = orderDirection });

            dfl.Add(new DataFilter() { type = "Order", field = dflForOrder });

            valuingCommentsList = iValuingCommentsRepository.Search(dfl, start, limit, out total);
            repeater.DataSource = valuingCommentsList;
            repeater.DataBind();


            numPerPage.Value = numPerPageValue.ToString();
        }
    }
}