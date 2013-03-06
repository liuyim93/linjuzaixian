using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using FluentNHibernate.Mapping;
namespace friday.core.domain
{

    public class ValuingOfMyCommodityOrderMap : SubclassMap<ValuingOfMyCommodityOrder>
    {
        public ValuingOfMyCommodityOrderMap()
        {
            
            References<MyCommodityOrder>(o => o.MyCommodityOrder).Not.Nullable();
            HasMany<ScoreOfItemInCommodityOrder>(o => o.ScoreOfItemInCommodityOrders).Inverse().Cascade.All();

        }
    }
}
