using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace friday.core
{
    public class ValuingItemOfMyCommodityOrder:Valuing
    {
        public virtual ValuingOfMyCommodityOrder ValuingOfMyCommodityOrder
        {
            get;

            set;
        }
        public virtual OrderOfCommodity OrderOfCommodity
        {
            get;
            set;
        }
    }
}
