using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using FluentNHibernate.Mapping;

namespace friday.core.domain
{
    public class ScoreOfItemInCommodityOrderMap : ClassMap<ScoreOfItemInCommodityOrder>
    {
        public ScoreOfItemInCommodityOrderMap()
        {
           
            Id(o => o.Id);
            Map(o => o.CreateTime);
            Map(o => o.IsDelete);
            Map(o => o.Version);
            Map(o => o.EntityIndex);
            Map(o => o.Score).Not.Nullable();

            References<ValuingOfMyCommodityOrder>(o => o.ValuingOfMyCommodityOrder).Not.Nullable();
            References<ValuingItemOfMyCommodityOrder>(o => o.ValuingItemOfMyCommodityOrder).Fetch.Join().Not.Nullable();
        }
    }
}
