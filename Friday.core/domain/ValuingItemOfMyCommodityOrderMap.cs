using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using FluentNHibernate.Mapping;
namespace friday.core.domain
{
    public class ValuingItemOfMyCommodityOrderMap : ClassMap<ValuingItemOfMyCommodityOrder>
    {
        public ValuingItemOfMyCommodityOrderMap()
        {
            Id(o => o.Id);
            Map(o => o.CreateTime);
            Map(o => o.IsDelete);
            Map(o => o.Version);
            Map(o => o.ValuingItemName);
            Map(o => o.EntityIndex);

            HasMany<ScoreOfItemInCommodityOrder>(o => o.ScoreOfItemInCommodityOrders).Inverse().Cascade.All();
        }
    }
}