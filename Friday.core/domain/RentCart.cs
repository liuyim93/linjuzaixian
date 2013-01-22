using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.domain;

namespace friday.core
{
    public class RentCart:Entity
    {
        public virtual Customer Customer
        {
            set;

            get;
        }

        //Order 1:N OrederFood
        public virtual ISet<CartOfHouse> CartOfHouses
        {
            set;

            get;
        }

        public virtual double Price  //订单总价
        {
            get;
            set;
        }

        public virtual Rent Rent
        {
            get;

            set;
        }
        public virtual double SendPrice
        {
            set;

            get;
        }
    }
}
