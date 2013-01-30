using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using FluentNHibernate.Mapping;
namespace friday.core.domain
{
    public class ValuingOfMyFoodOrderMap : SubclassMap<ValuingOfMyFoodOrder>
    {
        public ValuingOfMyFoodOrderMap()
        {

            HasMany<ValuingItemOfMyFoodOrder>(o => o.ValuingItemOfMyFoodOrders).Inverse().Cascade.All();
            References <MyFoodOrder> (o => o.MyFoodOrder).Not.Nullable();
           
        }
    }
}