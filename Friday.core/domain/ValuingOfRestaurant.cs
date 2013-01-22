using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.domain;

namespace friday.core
{
    public class ValuingOfRestaurant:Valuing
    {
        public virtual SystemUser FromSystemUser
        {
            get;

            set;
        }
        public virtual Restaurant ToRestaurant
        {
            get;

            set;
        }
    }
}
