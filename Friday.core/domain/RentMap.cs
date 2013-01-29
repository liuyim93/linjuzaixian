using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using FluentNHibernate.Mapping;

namespace friday.core.domain
{
    public class RentMap : SubclassMap<Rent>
    {
        public RentMap()
        {



            HasMany<House>(o => o.Houses).Inverse().Cascade.All();
            //HasMany<MyHouseOrder>(o => o.MyHouseOrders).Inverse().Cascade.All();
       

        }
    }
}
