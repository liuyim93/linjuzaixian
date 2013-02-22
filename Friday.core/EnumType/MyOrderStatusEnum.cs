using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.components;

namespace friday.core.EnumType
{
    public enum MyOrderStatusEnum
    {
        [EnumDescription("配送中")]
        配送中=0,
        [EnumDescription("成功")]
        成功=1,
        [EnumDescription("失败")]
        失败=2
    }
}
