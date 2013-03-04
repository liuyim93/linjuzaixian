using System.Web.Mvc;

namespace Friday.mvc.Areas.Cart
{
    public class CartAreaRegistration : AreaRegistration
    {
        public override string AreaName
        {
            get
            {
                return "Cart";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {
            context.MapRoute(
         name: "mycart",
         url: "cart/mycart.htm",
         defaults: new { area = "Cart", controller = "Home", action = "MyCart", id = UrlParameter.Optional }
        );
            context.MapRoute(
                "Cart_default",
                "Cart/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}
