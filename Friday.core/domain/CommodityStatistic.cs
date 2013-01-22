using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace friday.core
{
    public class CommodityStatistic:Statistic
    {
        public virtual Commodity Commodity
        {
            get;
            set;
        }
    }
}
