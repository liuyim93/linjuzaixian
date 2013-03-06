using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace friday.core.domain
{
    public class ScoreOfItemInCommodityOrder:Entity
    {
        public virtual ValuingOfMyCommodityOrder ValuingOfMyCommodityOrder
        {
            get;
            set;
        }

        public virtual ValuingItemOfMyCommodityOrder ValuingItemOfMyCommodityOrder
        {
            get;
            set;
        }

        public virtual float Score
        {
            get;
            set;
        }
    }
}