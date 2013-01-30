using System;
using System.Linq;
using System.Text;
using friday.core.domain;
using Iesi.Collections.Generic;
using friday.core.EnumType;
using System.Collections.Generic;
namespace friday.core.domain
{
    public class Shop:Merchant
    {
        public Shop()
        {
            Commodities = new Iesi.Collections.Generic.HashedSet<Commodity>();

        }

        public virtual Iesi.Collections.Generic.ISet<Commodity> Commodities
        {
            get;
            set;
        }
        

        
    }
}
