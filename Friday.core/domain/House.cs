using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace friday.core
{
    public class House:AbstractCommodity
    {
        //Shop 1:N Food
        public virtual Rent Rent
        {
            get;
            set;
        }
    }
}
