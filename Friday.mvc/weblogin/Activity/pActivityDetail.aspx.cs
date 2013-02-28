using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using friday.core;
using friday.core.repositories;
using friday.core.components;
using friday.core.domain;

namespace Friday.mvc.weblogin.activity
{
    public partial class pActivityDetail : BasePage
    {
        IRepository<Activity> iActivityRepository = UnityHelper.UnityToT<IRepository<Activity>>();
        private Activity activity;
        protected void Page_Load(object sender, EventArgs e)
        {
            string uid = Request.Params["uid"].ToString();
            activity = iActivityRepository.Load(uid);

            BindingHelper.ObjectToControl(activity, this);
            ImagePreview.Src = activity.Image;

        }
    }
}