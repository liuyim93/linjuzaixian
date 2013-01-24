using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.domain;

namespace friday.core
{
    public class OrderOfCommodity:Entity
    {
        public virtual Commodity Commodity
        {
            set;

            get;
        }
        public virtual MyCommodityOrder MyCommodityOrder
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
