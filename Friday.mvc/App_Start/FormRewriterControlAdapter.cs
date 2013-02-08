using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI.Adapters;
using System.Diagnostics;
using System.Web.UI;

namespace Friday.mvc
{
    public class FormRewriterControlAdapter:ControlAdapter
    {
        [DebuggerNonUserCode]
        public FormRewriterControlAdapter()
        {
        }
        protected override void Render(HtmlTextWriter writer)
        {
            base.Render(new RewriteFormHtmlTextWriter(writer));
        }

 

 


 

 

    }
}