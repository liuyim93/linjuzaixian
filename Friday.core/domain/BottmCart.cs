using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace friday.core.domain
{
    public class BottomCart
    {

        public virtual int Amount
        {
            get;

            set;
        }

        public virtual string FoodName
        {
            get;

            set;
        }

        public virtual double Price
        {
            get;

            set;
        }

        public virtual double TotalPrice
        {

            set;

            get;
        }



        public virtual string FoodID
        {
            get;

            set;
        }
    }
}
