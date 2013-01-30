using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace friday.core
{
    public class ValuingOfMyCommodityOrder:Valuing
    {
        public virtual MyCommodityOrder MyCommodityOrder
        {
            get;
            set;
        }
    }
}
