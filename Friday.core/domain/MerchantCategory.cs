using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.domain;

namespace friday.core
{
    public class MerchantCategory:Entity
    {
        //中餐 西餐 清真
        public virtual String MerchantCategoryName
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
