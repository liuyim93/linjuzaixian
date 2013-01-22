using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.domain;

namespace friday.core
{
    public class Statistic:Entity
    {
        public int Year
        {
            get;
            set;
        }
        public int Month
        {
            get;
            set;
        }
        public decimal Amount
        {
            get;
            set;
        }
        public int ValuingCount
        {
            get;
            set;
        }
        public float AverageValuing
        {
            get;
            set;
        }
    }
}
