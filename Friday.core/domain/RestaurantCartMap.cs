using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using FluentNHibernate.Mapping;

namespace friday.core.domain
{
    public class RestaurantCartMap : ClassMap<RestaurantCart>
    {
        public RestaurantCartMap()
        {

            Id(o => o.Id);
            Map(o => o.CreateTime);
            Map(o => o.IsDelete);
            Map(o => o.Version);
            Map(o => o.EntityIndex);
            Map(o => o.Price);
            Map(o => o.SendPrice);
            References<SystemUser>(o => o.SystemUser).Not.Nullable();
            References<Restaurant>(o => o.Restaurant); 
            HasMany<CartOfFood>(o => o.CartOfFoods).Inverse().Cascade.All();


        }
    }
}
