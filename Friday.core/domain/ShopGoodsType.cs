using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace friday.core.domain
{
    public class ShopGoodsType:Entity
    {
        public virtual Merchant Merchant
        {
            get;

            set;
        }
        public virtual String GoodsType
        {
            get;

            set;
        }
            
    }
}
