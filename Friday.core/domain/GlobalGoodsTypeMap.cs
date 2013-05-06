using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using FluentNHibernate.Mapping;
using friday.core.EnumType;

namespace friday.core.domain
{
    public class GlobalGoodsTypeMap : ClassMap<GlobalGoodsType>
    {
        public GlobalGoodsTypeMap()
        {
          
            Id(o => o.Id);
            Map(o => o.CreateTime);
            Map(o => o.IsDelete);
            Map(o => o.Version);
            Map(o => o.EntityIndex);

            Map(o => o.ParentID);
            Map(o => o.TLevel);
            Map(o => o.Name);
            Map(o => o.Leaf);
        }
    }
}
