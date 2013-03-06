using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace friday.core.domain
{
    public class ScoreOfItemInFoodOrder:Entity
    {
        public virtual ValuingOfMyFoodOrder ValuingOfMyFoodOrder
        {
            get;
            set;
        }

        public virtual ValuingItemOfMyFoodOrder ValuingItemOfMyFoodOrder
        {
            get;
            set;
        }
    }
}