using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using FluentNHibernate.Mapping;
namespace friday.core.domain
{
    public class ValuingOfMyHouseOrderMap : SubclassMap<ValuingOfMyHouseOrder>
    {
        public ValuingOfMyHouseOrderMap()
        {

            HasMany<ScoreOfItemInHouseOrder>(o => o.ScoreOfItemInHouseOrders).Inverse().Cascade.All();
            References<MyHouseOrder>(o => o.MyHouseOrder).Not.Nullable();
           
        }
    }
}