using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace friday.core
{
    public class RestaurantStatistic:MerchantStatistic
    {
        public virtual Restaurant Restaurant
        {
            get;
            set;
        }
    }
}
