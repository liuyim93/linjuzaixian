using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.domain;

namespace friday.core
{
    public class Customer:Entity
    {
        //SyetemUser 1:N Order
        public virtual Iesi.Collections.Generic.ISet<MyOrder> Orders
        {
            get;

            set;
        }

        public virtual ShoppingCart ShoppingCart
        {
            get;

            set;
        }
        public virtual RestaurantCart RestaurantCart
        {
            get;

            set;
        }
        public virtual RentCart RentCart
        {
            get;

            set;
        }
        public virtual Iesi.Collections.Generic.ISet<Address> Addresses
        {
            get;

            set;
        }

    }
}
