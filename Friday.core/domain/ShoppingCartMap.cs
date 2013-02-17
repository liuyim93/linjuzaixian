using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using FluentNHibernate.Mapping;

namespace friday.core.domain
{
    public  class ShoppingCartMap:ClassMap<ShoppingCart>
    {
        public ShoppingCartMap()
        {
           
            Id(o => o.Id);
            Map(o => o.CreateTime);
            Map(o => o.IsDelete);
            Map(o => o.Version);
            Map(o => o.Price);
            Map(o => o.SendPrice);
            HasMany<CartOfCommodity>(o => o.CartOfCommodities).Inverse().Cascade.All();
            References<SystemUser>(o => o.SystemUser).Not.Nullable();
            References<Shop>(o => o.Shop);
             




        }
    }
}
