using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using friday.core.components;

namespace friday.core.EnumType
{
    public enum CheckState
    {
        [EnumDescription("已审核")]
          yes =1,  
        [EnumDescription("未审核")]
          no=0,
        [EnumDescription("未定义")]
        unDefined=2,
    }
}
