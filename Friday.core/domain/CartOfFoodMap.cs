using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using FluentNHibernate.Mapping;

namespace friday.core.domain
{
    public class CartOfFoodMap:ClassMap<CartOfFood>
    {

        public CartOfFoodMap()
        {
            Id(o => o.Id);
            Map(o => o.CreateTime);
            Map(o => o.IsDelete);
            Map(o => o.Version);
            Map(o => o.Price);
            Map(o => o.Amount);
            References<RestaurantCart>(o => o.RestaurantCart).Not.Nullable();
            References<Food>(o => o.Food).Not.Nullable();
        }

    }
}
