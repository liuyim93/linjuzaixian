﻿using System;
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
            HasMany<Address>(o => o.Addresses).Inverse().Cascade.All();
            HasMany<ShoppingCart>(o => o.ShoppingCart).Inverse().Cascade.All().Not.KeyNullable();
        }
    }
}
