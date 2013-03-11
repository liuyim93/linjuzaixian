using System.Web.Mvc;

namespace Friday.mvc.Areas.Merchant
{
    public class MerchantAreaRegistration : AreaRegistration
    {
        public override string AreaName
        {
            get
            {
                return "Merchant";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {
            context.MapRoute(
            name:"myBrandsIndex",
            url:  "myBrandsIndex.htm",
            defaults: new { area = "Merchant", controller = "Favorite", action = "myBrandsIndex", id = UrlParameter.Optional }
           );

            context.MapRoute(
                "Merchant_default",
                "Merchant/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}
