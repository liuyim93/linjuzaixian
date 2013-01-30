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

            HasMany<ValuingItemOfMyCommodityOrder>(o => o.ValuingItemOfMyCommodityOrders).Inverse().Cascade.All();
            References <MyCommodityOrder> (o => o.MyCommodityOrder);
           
        }
    }
}