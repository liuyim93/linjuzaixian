using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.domain;

namespace friday.core
{
    public class ValuingOfMyHouseOrder:Valuing
    {
        public ValuingOfMyHouseOrder()
        {
            ScoreOfItemInHouseOrders = new Iesi.Collections.Generic.HashedSet<ScoreOfItemInHouseOrder>();
        }

        public virtual MyHouseOrder MyHouseOrder
        {
            get;
            set;
        }

        public virtual Iesi.Collections.Generic.ISet<ScoreOfItemInHouseOrder> ScoreOfItemInHouseOrders
        {
            get;
            set;
        }
    }
}
