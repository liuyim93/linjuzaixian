﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.domain;

namespace friday.core
{
    public class MyHouseOrder:MyOrder
    {

        public MyHouseOrder()
        {
            OrderOfHouses = new Iesi.Collections.Generic.HashedSet<OrderOfHouse>();

        }
        //Order 1:N OrederFood
        public virtual Iesi.Collections.Generic.ISet<OrderOfHouse> OrderOfHouses
        {
            set;

            get;
        }

        public virtual Rent Rent
        {
            set;

            get;
        }
        public virtual Iesi.Collections.Generic.ISet<ValuingOfMyHouseOrder> ValuingOfMyHouseOrders
        {
            get;
            set;
        }
    }
}
