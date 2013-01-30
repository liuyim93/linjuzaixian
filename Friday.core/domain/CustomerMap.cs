using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using FluentNHibernate.Mapping;
namespace friday.core.domain
{
    public class CustomerMap:ClassMap<Customer>
    {
        public CustomerMap()
        {
            Id(o => o.Id);
            Map(o => o.CreateTime);
            Map(o => o.IsDelete);
            Map(o => o.Version);
            Map(o=>o.EntityIndex);

            HasMany<Address>(o => o.Addresses).Inverse().Cascade.All();
            HasMany<ShoppingCart>(o => o.ShoppingCarts).Inverse().Cascade.All();//.Not.KeyNullable();
            HasMany<RestaurantCart>(o => o.RestaurantCarts).Inverse().Cascade.All();//.Not.KeyNullable();
            HasMany<RentCart>(o => o.RentCarts).Inverse().Cascade.All();//.Not.KeyNullable();


        }
    }
}
