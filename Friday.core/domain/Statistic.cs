using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.domain;

namespace friday.core
{
    public class Statistic:Entity
    {
        public virtual int Year
        {
            get;
            set;
        }
        public virtual int Month
        {
            get;
            set;
        }
        //2013-01-22 basilwang -1代表月汇总 （trick)
        public virtual int Day
        {
            get;
            set;
        }
        public virtual decimal Amount
        {
            get;
            set;
        }
        public virtual int ValuingCount
        {
            get;
            set;
        }
        public virtual float AverageValuing
        {
            get;
            set;
        }
    }
}
