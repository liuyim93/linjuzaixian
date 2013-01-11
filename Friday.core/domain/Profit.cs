using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace friday.core.domain
{

    public class Profit:Entity
    {
        public Shop Shop
        {
            set;

            get;
        }


        public double AllProfit
        {
            set;

            get;
        }

        public double IntervalProfit
        {
            set;

            get;
        }

        public double Saleroom
        {
            set;

            get;
        }
    }
}
