using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.domain;

namespace friday.core
{
    public class ValuingItemOfMyHouseOrder : Entity
    {
        public ValuingItemOfMyHouseOrder()
        {
            ScoreOfItemInHouseOrders = new Iesi.Collections.Generic.HashedSet<ScoreOfItemInHouseOrder>();
        }

        public virtual Iesi.Collections.Generic.ISet<ScoreOfItemInHouseOrder> ScoreOfItemInHouseOrders
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
