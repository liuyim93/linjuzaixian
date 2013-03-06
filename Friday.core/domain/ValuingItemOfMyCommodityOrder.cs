using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.domain;

namespace friday.core
{
    public class ValuingItemOfMyCommodityOrder:Entity
    {
        public ValuingItemOfMyCommodityOrder()
        {
            ScoreOfItemInCommodityOrders = new Iesi.Collections.Generic.HashedSet<ScoreOfItemInCommodityOrder>();
        }

        public virtual Iesi.Collections.Generic.ISet<ScoreOfItemInCommodityOrder> ScoreOfItemInCommodityOrders
        {
            get;
            set;
        }

        public virtual string ValuingItemName
        {
            get;

            set;
        }
    }
}
