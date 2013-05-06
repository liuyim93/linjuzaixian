using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.domain;
using friday.core.EnumType;

namespace friday.core.domain
{
    public class GlobalGoodsType:Entity
    {
        public virtual string GoodsType
        {
            get;

            set;
        }
        public virtual MerchantTypeEnum MerchantType
        {
            get;

            set;
        }
    }
}
