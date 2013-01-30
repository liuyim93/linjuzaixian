using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.domain;

namespace friday.core
{
    public class Customer:Entity
    {
            Addresses = new Iesi.Collections.Generic.HashedSet<Address>();
        
        public virtual Iesi.Collections.Generic.ISet<RentCart> RentCarts

    }
}
