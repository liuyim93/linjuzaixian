using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.components;

namespace friday.core.EnumType
{

    public enum UserTypeEnum
    {
        [EnumDescription("商家")]
        商家 = 0,
        [EnumDescription("会员")]
        会员 = 1,
       
    }
}
