using System.Web.Mvc;

namespace Friday.mvc.Areas.Order
{
    public class OrderAreaRegistration : AreaRegistration
    {
        public override string AreaName
        {
            get
            {
                return "Order";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {
            context.MapRoute(
         name: "confirmorder",
         url: "order/confirmorder.htm",
         defaults: new { area = "Order", controller = "Home", action = "ConfirmOrder", id = UrlParameter.Optional }
        );
            context.MapRoute(
                "Order_default",
                "Order/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}
