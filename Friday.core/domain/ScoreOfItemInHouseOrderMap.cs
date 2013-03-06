using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using FluentNHibernate.Mapping;

namespace friday.core.domain
{
    public class ScoreOfItemInHouseOrderMap : ClassMap<ScoreOfItemInHouseOrder>
    {
        public ScoreOfItemInHouseOrderMap()
        {
           
            Id(o => o.Id);
            Map(o => o.CreateTime);
            Map(o => o.IsDelete);
            Map(o => o.Version);
            Map(o => o.EntityIndex);

            References<ValuingOfMyHouseOrder>(o => o.ValuingOfMyHouseOrder).Not.Nullable();
            References<ValuingItemOfMyHouseOrder>(o => o.ValuingItemOfMyHouseOrder).Fetch.Join().Not.Nullable();
        }
    }
}
