using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.IO;

namespace Friday.mvc
{
    public class RewriteFormHtmlTextWriter : HtmlTextWriter

    {
        public RewriteFormHtmlTextWriter(TextWriter writer)
            : base(writer)
        {
            base.InnerWriter = writer;
        }
        public RewriteFormHtmlTextWriter(HtmlTextWriter writer)
            : base(writer)
        {
            this.InnerWriter = writer.InnerWriter;
        }
        public override void WriteAttribute(string name, string value, bool fEncode)
        {
            if (name == "action")
            {
                HttpContext Context = HttpContext.Current;
                if (Context.Items["ActionAlreadyWritten"] == null)
                {
                    string[] segments = Context.Request.Url.Segments;
                    string matchString = "weblogin/";
                    int index = Context.Request.Url.PathAndQuery.IndexOf(matchString);
                    if (index != -1)
                    {

                        value = Context.Request.Url.PathAndQuery.Substring(index + matchString.Length);
                    }
                   
                    Context.Items["ActionAlreadyWritten"] = true;
                }
            }
            base.WriteAttribute(name, value, fEncode);
        }

 

 


 

 


 

 

    }
}