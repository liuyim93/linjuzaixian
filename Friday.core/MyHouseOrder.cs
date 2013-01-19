using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.domain;

namespace friday.core
{
    public class MyHouseOrder:MyOrder
    {
        //Order 1:N OrederFood
        public virtual Iesi.Collections.Generic.ISet<OrderOfHouse> OrderOfHouses
        {
            set;

            get;
        }
    }
}
