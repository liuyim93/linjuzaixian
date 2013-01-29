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

            HasMany<Address>(o => o.Addresses).Inverse().Cascade.All().Not.KeyNullable(); ;
            HasMany<ShoppingCart>(o => o.ShoppingCart).Inverse().Cascade.All();//.Not.KeyNullable();
            HasMany<RestaurantCart>(o => o.RestaurantCart).Inverse().Cascade.All();//.Not.KeyNullable();
            HasMany<RentCart>(o => o.RentCart).Inverse().Cascade.All();//.Not.KeyNullable();


        }
    }
}
