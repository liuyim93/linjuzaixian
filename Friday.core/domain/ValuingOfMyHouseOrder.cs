using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace friday.core
{
    public class ValuingOfMyHouseOrder:Valuing
    {
        public virtual MyHouseOrder MyHouseOrder
        {
            get;
            set;
        }
    }
}
