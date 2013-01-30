using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.domain;

namespace friday.core
{
    public class ValuingItemOfMyFoodOrder : ValuingItem
    {
        public virtual ValuingOfMyFoodOrder ValuingOfMyFoodOrder
        {
            get;

            set;
        }
        public virtual OrderOfFood OrderOfFood
        {
            get;
            set;
        }
    }
}
