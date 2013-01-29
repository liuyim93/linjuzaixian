using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using FluentNHibernate.Mapping;

namespace friday.core.domain
{
    public class RentCartMap : ClassMap<RentCart>
    {
        public RentCartMap()
        {

            Id(o => o.Id);
            Map(o => o.CreateTime);
            Map(o => o.IsDelete);
            Map(o => o.Version);
            Map(o => o.EntityIndex);
            Map(o => o.Price);
            Map(o => o.SendPrice);
            References<Customer>(o => o.Customer);
            References<Rent>(o => o.Rent);
            HasMany<CartOfHouse>(o => o.CartOfHouses).Inverse().Cascade.All();


        }
    }
}
