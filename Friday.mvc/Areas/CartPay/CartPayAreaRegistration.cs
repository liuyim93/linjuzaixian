using System.Web.Mvc;

namespace Friday.mvc.Areas.CartPay
{
    public class CartPayAreaRegistration : AreaRegistration
    {
        public override string AreaName
        {
            get
            {
                return "CartPay";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {
            context.MapRoute(
         name: "mycartpay",
         url: "cartpay/mycartpay.htm",
         defaults: new { area = "CartPay", controller = "Home", action = "MyCartPay", id = UrlParameter.Optional }
        );
            context.MapRoute(
                "CartPay_default",
                "CartPay/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}
