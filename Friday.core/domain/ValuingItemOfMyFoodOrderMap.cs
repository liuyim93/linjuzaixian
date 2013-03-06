using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using FluentNHibernate.Mapping;
namespace friday.core.domain
{
    public class ValuingItemOfMyFoodOrderMap : ClassMap<ValuingItemOfMyFoodOrder>
    {
        public ValuingItemOfMyFoodOrderMap()
        {
            Id(o => o.Id);
            Map(o => o.CreateTime);
            Map(o => o.IsDelete);
            Map(o => o.Version);
            Map(o => o.ValuingItemName).Not.Nullable();
            Map(o => o.EntityIndex);

            HasMany<ScoreOfItemInFoodOrder>(o => o.ScoreOfItemInFoodOrders).Inverse().Cascade.All();
        }
    }
}