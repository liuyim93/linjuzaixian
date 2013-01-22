using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.EnumType;
namespace friday.core.domain
{
    public class OrderOfFood:Entity
    {
        public virtual Food Food
        {
            set;

            get;
        } 
        public virtual MyFoodOrder MyFoodOrder
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
