using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using FluentNHibernate.Mapping;

namespace friday.core.domain
{
    public class ScoreOfItemInFoodOrderMap : ClassMap<ScoreOfItemInFoodOrder>
    {
        public ScoreOfItemInFoodOrderMap()
        {
           
            Id(o => o.Id);
            Map(o => o.CreateTime);
            Map(o => o.IsDelete);
            Map(o => o.Version);
            Map(o => o.EntityIndex);

            References<ValuingOfMyFoodOrder>(o => o.ValuingOfMyFoodOrder).Not.Nullable();
            References<ValuingItemOfMyFoodOrder>(o => o.ValuingItemOfMyFoodOrder).Fetch.Join().Not.Nullable();
        }
    }
}
