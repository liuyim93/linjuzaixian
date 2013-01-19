using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace friday.core
{
    public class OrderOfHouse
    {
        public virtual House House
        {
            set;

            get;
        }
        public virtual MyHouseOrder MyHouseOrder
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
