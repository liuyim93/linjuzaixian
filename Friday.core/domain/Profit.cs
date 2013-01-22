using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace friday.core.domain
{

    public class Profit:Entity
    {
        public virtual Shop Shop
        {
            set;

            get;
        }


        public virtual double AllProfit
        {
            set;

            get;
        }

        public virtual double IntervalProfit
        {
            set;

            get;
        }

        public virtual double Saleroom
        {
            set;

            get;
        }
    }
}
