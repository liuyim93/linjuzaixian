using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using FluentNHibernate.Mapping;

namespace friday.core.domain
{
    public class CartOfCommodityMap:ClassMap<CartOfCommodity>
    {

        public CartOfCommodityMap()
        {
            Id(o => o.Id);
            Map(o => o.CreateTime);
            Map(o => o.IsDelete);
            Map(o => o.Version);
            Map(o => o.Price);
            Map(o => o.Amount);
            References<ShoppingCart>(o => o.ShoppingCart).Not.Nullable();
            References<Commodity>(o => o.Commodity).Not.Nullable();
            References<Sku>(o => o.Sku).Not.Nullable();
        }

    }
}
