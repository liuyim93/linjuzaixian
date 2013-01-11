using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using FluentNHibernate.Mapping;

namespace friday.core.domain
{
    public class OrderFoodMap:ClassMap<OrderFood>
    {
        public OrderFoodMap()
        {
            Table("OrderFood");
            Id(o => o.Id);
            Map(o => o.CreateTime);
            Map(o => o.IsDelete);
            Map(o => o.Version);
            Map(o => o.Price);
            Map(o => o.Amount);
            References<MyOrder>(o => o.MyOrder);
            References<Food>(o => o.Food);
        }
    }
}
