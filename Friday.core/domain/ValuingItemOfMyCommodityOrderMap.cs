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
            Map(o => o.Score);
            
            References<OrderOfCommodity>(o => o.OrderOfCommodity);
            References<ValuingOfMyCommodityOrder>(o => o.ValuingOfMyCommodityOrder).Not.Nullable();
            //HasMany<ValuingItem>(o=>o.ValuingItems).Inverse().Cascade.All();
        }
    }
}