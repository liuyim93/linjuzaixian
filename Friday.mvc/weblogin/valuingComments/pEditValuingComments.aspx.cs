using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using friday.core.domain;
using friday.core.components;
using friday.core.repositories;
using friday.core;

namespace Friday.mvc.weblogin.valuingComments
{
    public partial class pEditValuingComments : BasePage
    {
        IValuingCommentsRepository iValuingCommentsRepository = UnityHelper.UnityToT<IValuingCommentsRepository>();
        IRepository<Valuing> iValuingRepository = UnityHelper.UnityToT<IRepository<Valuing>>();

        private ValuingComments valuingComments;
        private Valuing valuing;

        protected void Page_Load(object sender, EventArgs e)
        {
            valuing = iValuingRepository.Get(Request.Params["valuing_id"]);
            valuingComments = iValuingCommentsRepository.Get(Request.Params["uid"]);

            if (CurrentUser.IsAdmin != true)
            {
                if (valuingComments.Direction == 0)
                {
                    AjaxResult result = new AjaxResult();
                    result.statusCode = "300";
                    result.message = "不能修改用户的评价";
                    FormatJsonResult jsonResult = new FormatJsonResult();
                    jsonResult.Data = result;
                    Response.Write(jsonResult.FormatResult());
                    Response.End();
                }
            }

            if (Request.Params["__EVENTVALIDATION"] != null)
            {
                SaveValuingComments();
            }
            else
            {
                TrackIndex.Value = valuingComments.TrackIndex.ToString();
                LoginName.Value = valuing.LoginUser.LoginName;
                MerchantName.Value = valuing.Merchant.Name;
                Comments.Value = valuingComments.Comments;
                if (CurrentUser.IsAdmin != true)
                {
                    DirectionSelect.Visible = false;
                }
                else
                {
                    DirectionSelect.SelectedIndex = valuingComments.Direction + 1;
                }
            }
        }

        private void SaveValuingComments()
        {
            AjaxResult result = new AjaxResult();
            FormatJsonResult jsonResult = new FormatJsonResult();

            BindingHelper.RequestToObject(valuingComments);
            if (CurrentUser.IsAdmin != true)
            {
                valuingComments.Direction = 1;
            }
            else
            {
                valuingComments.Direction = Convert.ToInt16(DirectionSelect.Value);
            }

            iValuingCommentsRepository.SaveOrUpdate(valuingComments);

            result.statusCode = "200";
            result.message = "修改成功";
            result.navTabId = "referer";
            if (Request.Params["rel_hook"] != null)
            {
                result.panelId = Request.Params["rel_hook"];
            }
            result.callbackType = "closeCurrent";
            jsonResult.Data = result;
            Response.Write(jsonResult.FormatResult());
            Response.End();

        }

    }
}