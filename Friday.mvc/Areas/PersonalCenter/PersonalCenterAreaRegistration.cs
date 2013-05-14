using System.Web.Mvc;

namespace Friday.mvc.Areas.PersonalCenter
{
    public class PersonalCenterAreaRegistration : AreaRegistration
    {
        public override string AreaName
        {
            get
            {
                return "PersonalCenter";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {
            context.MapRoute(
         name: "mypersonalcenter",
         url: "personalcenter/mypersonalcenter.htm",
         defaults: new { area = "PersonalCenter", controller = "Home", action = "MyPersonalCenter", id = UrlParameter.Optional }
        );
            context.MapRoute(
                "PersonalCenter_default",
                "PersonalCenter/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}
