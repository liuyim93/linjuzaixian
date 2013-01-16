using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.domain;

namespace friday.core
{
    public class Commodity:Entity
    {
        public virtual string Image
        {
            get;

            set;

        }
        public virtual String Name
        {
            get;

            set;
        }
        public virtual double Price
        {
            get;

            set;

        }
        //Shop 1:N Food
        public virtual Merchant Merchant
        {
            get;
            set;
        }
    }
}
