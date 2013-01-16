using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.domain;
using Iesi.Collections.Generic;
using friday.core.EnumType;

namespace friday.core.domain
{
    public class SchoolOfMerchant:Entity
    {

        public virtual School School
        {

            get;

            set;
        }

        public virtual Merchant Merchant
        {
            set;

            get;
        }
    }
}
