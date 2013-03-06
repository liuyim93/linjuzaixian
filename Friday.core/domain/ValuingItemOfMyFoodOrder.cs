using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.domain;

namespace friday.core
{
    public class ValuingItemOfMyFoodOrder : Entity
    {
        public ValuingItemOfMyFoodOrder()
        {
            ScoreOfItemInFoodOrders = new Iesi.Collections.Generic.HashedSet<ScoreOfItemInFoodOrder>();
        }

        public virtual Iesi.Collections.Generic.ISet<ScoreOfItemInFoodOrder> ScoreOfItemInFoodOrders
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
