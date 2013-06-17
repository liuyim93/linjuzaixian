using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using FluentNHibernate.Mapping;

namespace friday.core.domain
{
    public class OrderOfCommodityMap:ClassMap<OrderOfCommodity>
    {
        public OrderOfCommodityMap()
        {
            
            Id(o => o.Id);
            Map(o => o.CreateTime);
            Map(o => o.IsDelete);
            Map(o => o.Version);
            Map(o => o.Price);
            Map(o => o.Amount);
            References<MyCommodityOrder>(o => o.MyCommodityOrder).Not.Nullable();
            References<Commodity>(o => o.Commodity).Not.Nullable();
            References<Sku>(o => o.Sku);
        }
    }
}
