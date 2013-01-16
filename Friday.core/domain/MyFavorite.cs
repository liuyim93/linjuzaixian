using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace friday.core.domain
{
    public class MyFavorite:Entity
    {
        public virtual SchoolOfMerchant SchoolOfMerchant
        {
            set;

            get;
        }
        public virtual SystemUser SystemUser
        {

            set;

            get;
        }

    }
}
