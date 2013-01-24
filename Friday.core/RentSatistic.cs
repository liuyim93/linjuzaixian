using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace friday.core
{
    public class RentSatistic:MerchantStatistic
    {
        public virtual Rent Rent
        {
            get;
            set;
        }
    }
}
