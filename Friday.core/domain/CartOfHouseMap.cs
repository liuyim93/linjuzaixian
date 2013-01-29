using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using FluentNHibernate.Mapping;

namespace friday.core.domain
{
    public class CartOfHouseMap:ClassMap<CartOfHouse>
    {

        public CartOfHouseMap()
        {
            Id(o => o.Id);
            Map(o => o.CreateTime);
            Map(o => o.IsDelete);
            Map(o => o.Version);
            Map(o => o.Price);
            Map(o => o.Amount);
            References<RentCart>(o => o.RentCart);
            References<House>(o => o.House);
        }

    }
}
