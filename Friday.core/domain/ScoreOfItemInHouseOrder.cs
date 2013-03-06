using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace friday.core.domain
{
    public class ScoreOfItemInHouseOrder:Entity
    {
        public virtual ValuingOfMyHouseOrder ValuingOfMyHouseOrder
        {
            get;
            set;
        }

        public virtual ValuingItemOfMyHouseOrder ValuingItemOfMyHouseOrder
        {
            get;
            set;
        }
    }
}