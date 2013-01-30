using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.domain;

namespace friday.core
{
    public class MyFoodOrder:MyOrder
    {
        public MyFoodOrder()
        {
            OrderOfFoods = new Iesi.Collections.Generic.HashedSet<OrderOfFood>();

        }

        //Order 1:N OrederFood
        public virtual Iesi.Collections.Generic.ISet<OrderOfFood> OrderOfFoods
        {
            set;

            get;
        }

        public virtual Restaurant Restaurant
        {
            set;

            get;
        }
        public virtual Iesi.Collections.Generic.ISet<ValuingOfMyFoodOrder> ValuingOfMyFoodOrders
        {
            get;
            set;
        }
    }
}
