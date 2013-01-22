using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.domain;

namespace friday.core
{
    public class CartOfHouse:Entity
    {
        public virtual RentCart RentCart
        {
            set;
            get;
        }

        public virtual House House
        {
            set;

            get;
        }

        public virtual int Amount
        {
            set;

            get;
        }
        public virtual double Price//菜品单价
        {
            set;

            get;
        }
    }
}
