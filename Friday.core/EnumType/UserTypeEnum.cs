using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.components;

namespace friday.core.EnumType
{

    public enum UserTypeEnum
    {
        [EnumDescription("管理员")]
          管理员=0,
        [EnumDescription("顾客")]
          顾客=1,
        [EnumDescription("商店")]
          商店=2,
        [EnumDescription("餐馆")]
          餐馆=3,
        [EnumDescription("租房")]
          租房=4,
        [EnumDescription("送货员")]
          送货员=5,
        [EnumDescription("商铺店小二")]
          商铺店小二=6,
        [EnumDescription("餐馆店小二")]
          餐馆店小二=7,
        [EnumDescription("租房店小二")]
          租房店小二=8,
        [EnumDescription("会员用户")]
          会员用户=9

    }
}
