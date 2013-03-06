using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.domain;

namespace friday.core
{
    public class ValuingOfMyFoodOrder:Valuing
    {
        public ValuingOfMyFoodOrder()
        {
            ScoreOfItemInFoodOrders = new Iesi.Collections.Generic.HashedSet<ScoreOfItemInFoodOrder>();
        }

        public virtual MyFoodOrder MyFoodOrder
        {
            get;
            set;
        }

        public virtual Iesi.Collections.Generic.ISet<ScoreOfItemInFoodOrder> ScoreOfItemInFoodOrders
        {
            get;
            set;
        }
    }
}
