using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using FluentNHibernate.Mapping;

namespace friday.core.domain
{
    public class ShopMap : SubclassMap<Shop>
    {
        public ShopMap()
        {



            HasMany<Commodity>(o => o.Commodities).Inverse().Cascade.All();
           
       

        }
    }
}
