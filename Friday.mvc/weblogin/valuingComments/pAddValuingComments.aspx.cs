using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using friday.core.repositories;
using friday.core.domain;
using friday.core.components;
using friday.core;

namespace Friday.mvc.weblogin.valuingComments
{
    public partial class pAddValuingComments : BasePage
    {
        IValuingCommentsRepository iValuingCommentsRepository = UnityHelper.UnityToT<IValuingCommentsRepository>();
        IRepository<Valuing> iValuingRepository = UnityHelper.UnityToT<IRepository<Valuing>>();

        private ValuingComments valuingComments;
        private Valuing valuing;

        protected void Page_Load(object sender, EventArgs e)
        {
            valuing = iValuingRepository.Get(Request.Params["valuing_id"]);

            if (Request.Params["__EVENTVALIDATION"] != null)
            {
                SaveValuingComments();
            }
            else
            {
                TrackIndex.Value = (iValuingCommentsRepository.GetValuingCommentsCount(Request.Params["valuing_id"]) + 1).ToString();
                LoginName.Value = valuing.LoginUser.LoginName;
                MerchantName.Value = valuing.Merchant.Name;
            }
        }

        private void SaveValuingComments()
        {
            AjaxResult result = new AjaxResult();
            FormatJsonResult jsonResult = new FormatJsonResult();

            valuingComments = new ValuingComments();
            BindingHelper.RequestToObject(valuingComments);
            valuingComments.Direction = Convert.ToInt16(DirectionSelect.Value);
            valuingComments.TrackIndex = Convert.ToInt16(TrackIndex.Value);

            valuingComments.Valuing = valuing;

            iValuingCommentsRepository.SaveOrUpdate(valuingComments);

            result.statusCode = "200";
            result.message = "添加成功";
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