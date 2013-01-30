using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.domain;

namespace friday.core
{
    public class ValuingItemOfMyHouseOrder:Valuing
    {
        public virtual ValuingOfMyHouseOrder ValuingOfMyHouseOrder
        {
            get;

            set;
        }
        public virtual OrderOfHouse OrderOfHouse
        {
            get;
            set;
        }
    }
}
