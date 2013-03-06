using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.domain;

namespace friday.core
{
    public class ValuingOfMyCommodityOrder:Valuing
    {
        public ValuingOfMyCommodityOrder()
        {
            ScoreOfItemInCommodityOrders = new Iesi.Collections.Generic.HashedSet<ScoreOfItemInCommodityOrder>();
        }

        public virtual MyCommodityOrder MyCommodityOrder
        {
            get;
            set;
        }

        public virtual Iesi.Collections.Generic.ISet<ScoreOfItemInCommodityOrder> ScoreOfItemInCommodityOrders
        {
            get;
            set;
        }
    }
}
