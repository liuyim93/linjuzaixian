using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using FluentNHibernate.Mapping;

namespace friday.core.domain
{
    public class CartFoodMap:ClassMap<CartFood>
    {

        public CartFoodMap()
        {
            Table("CartFood");
            Id(o => o.Id);
            Map(o => o.CreateTime);
            Map(o => o.IsDelete);
            Map(o => o.Version);
            Map(o => o.Price);
            Map(o => o.Amount);
            References<ShoppingCart>(o => o.ShoppingCart);
            References<Food>(o => o.Food);
        }

    }
}
