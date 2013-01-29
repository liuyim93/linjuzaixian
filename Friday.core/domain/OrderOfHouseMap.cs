using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using FluentNHibernate.Mapping;

namespace friday.core.domain
{
    public class OrderOfHouseMap:ClassMap<OrderOfHouse>
    {
        public OrderOfHouseMap()
        {
            
            Id(o => o.Id);
            Map(o => o.CreateTime);
            Map(o => o.IsDelete);
            Map(o => o.Version);
            Map(o => o.Price);
            Map(o => o.Amount);
            References<MyHouseOrder>(o => o.MyHouseOrder).Not.Nullable();
            References<House>(o => o.House).Not.Nullable();
        }
    }
}
