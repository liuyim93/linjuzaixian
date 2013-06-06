using System.Web.Mvc;

namespace Friday.mvc.Areas.OtherPage
{
    public class OtherPageAreaRegistration : AreaRegistration
    {
        public override string AreaName
        {
            get
            {
                return "OtherPage";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {
            context.MapRoute(
                 name: "Help",
                 url: "Help.html",
                 defaults: new { area = "OtherPage", controller = "Help", action = "Index", id = UrlParameter.Optional }
            );
          
            context.MapRoute(
                "OtherPage_default",
                "OtherPage/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}
