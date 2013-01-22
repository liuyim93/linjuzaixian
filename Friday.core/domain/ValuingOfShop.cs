using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.domain;

namespace friday.core
{
    public class ValuingOfShop: Valuing
    {
        public virtual SystemUser FromSystemUser
        {
            get;

            set;
        }
        public virtual Shop ToShop
        {
            get;

            set;
        }

    }
}
