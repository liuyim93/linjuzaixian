using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.domain;

namespace friday.core
{
    public class MyFoodOrder:MyOrder
    {
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
    }
}
