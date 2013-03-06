using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using FluentNHibernate.Mapping;
namespace friday.core.domain
{
    public class ValuingItemOfMyHouseOrderMap : ClassMap<ValuingItemOfMyHouseOrder>
    {
        public ValuingItemOfMyHouseOrderMap()
        {
            Id(o => o.Id);
            Map(o => o.CreateTime);
            Map(o => o.IsDelete);
            Map(o => o.Version);
            Map(o => o.ValuingItemName).Not.Nullable();
            Map(o => o.EntityIndex);

            HasMany<ScoreOfItemInHouseOrder>(o => o.ScoreOfItemInHouseOrders).Inverse().Cascade.All();
        }
    }
}