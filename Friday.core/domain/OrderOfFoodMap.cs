using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using FluentNHibernate.Mapping;

namespace friday.core.domain
{
    public class OrderOfFoodMap:ClassMap<OrderOfFood>
    {
        public OrderOfFoodMap()
        {
            Table("OrderOfFood");
            Id(o => o.Id);
            Map(o => o.CreateTime);
            Map(o => o.IsDelete);
            Map(o => o.Version);
            Map(o => o.Price);
            Map(o => o.Amount);
            References<MyFoodOrder>(o => o.MyFoodOrder);
            References<Food>(o => o.Food);
        }
    }
}
