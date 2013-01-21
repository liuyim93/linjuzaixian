using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using friday.core.utils;
using friday.core;

namespace Friday.mvc
{
    public partial class WebForm2 : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            ILogger logger = UnityHelper.UnityToT<ILogger>();
            logger.Write("test", "test");

        }
    }
}