using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.components;

namespace friday.core.EnumType
{
    public enum MerchantTypeEnum
    {
        [EnumDescription("餐馆")]
        餐馆 = 0,
        [EnumDescription("租房")]
        租房 = 1,
        [EnumDescription("百货")]
        百货 = 2,
    }
}
