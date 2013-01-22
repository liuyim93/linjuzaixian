using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace friday.core.domain
{
    public class OrderMessage
    {
        public virtual string FoodName
        {
            set;

            get;
        }

        public virtual double Price
        {
            set;

            get;
        }

        public virtual int Amount
        {
            set;

            get;
        }

        public virtual double TotalPrice
        {
            set;

            get;

        }

    }
}
