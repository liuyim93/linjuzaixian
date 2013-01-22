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
            //Map(o => o.ShopID);
            //Map(o => o.ShopName);
            Map(o => o.SendPrice);
            //HasMany<CartFood>(o => o.CartFoods).Inverse().Cascade.All();
        }
    }
}
