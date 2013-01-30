using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace friday.core
{
    public class ValuingOfMyFoodOrder:Valuing
    {
        public virtual MyFoodOrder MyFoodOrder
        {
            get;
            set;
        }
    }
}
