using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace friday.core.domain
{
    public class CartFood:Entity
    {
        public virtual ShoppingCart ShoppingCart
        {
            set;
            get;
        }

        public virtual Food Food
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
