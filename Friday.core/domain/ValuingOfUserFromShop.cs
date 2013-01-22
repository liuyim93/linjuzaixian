using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.domain;

namespace friday.core
{
    public class ValuingOfUserFromShop:Valuing
    {
        public virtual Shop FromShop
        {
            get;

            set;
        }
        public virtual SystemUser ToSystemUser
        {
            get;

            set;
        }
    }
}
