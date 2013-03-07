using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using friday.core;
using friday.core.domain;

namespace Friday.mvc.Models
{
    public class MainModel
    {
        public IEnumerable<MerchantCategory> MerchantRestaurantCategories { get; set; }
        public IEnumerable<MerchantCategory> MerchantRentCategories { get; set; }
        public IEnumerable<MerchantCategory> MerchantShopCategories { get; set; }

        public IEnumerable<Activity> Activities { get; set; }
    }
}