using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.domain;

namespace friday.core
{
    public abstract class ValuingItem:Entity
    {
        public virtual string ValuingItemName
        {
            get;

            set;
        }

        public virtual float Score
        {
            get;

            set;
        }

      
    }
}
