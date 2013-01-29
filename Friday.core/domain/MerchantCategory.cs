using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.domain;
using friday.core.EnumType;

namespace friday.core
{
    public class MerchantCategory:Entity
    {
        //中餐 西餐 清真
        public virtual string MerchantCategoryName
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
