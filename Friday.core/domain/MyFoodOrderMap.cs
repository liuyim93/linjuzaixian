using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using FluentNHibernate.Mapping;
namespace friday.core.domain
{
    public class MyFoodOrderMap : ClassMap<MyFoodOrder>
    {
        public MyFoodOrderMap()
        {
            Id(o=>o.Id);
            Map(o => o.CreateTime);
            Map(o => o.IsDelete);
            Map(o => o.Version);
            Map(o=>o.Description);
            Map(o=>o.Price);
            Map(o=>o.OrderStatus);
            Map(o => o.Address);
            Map(o=>o.Linkman);
            Map(o=>o.Tel);
            Map(o=>o.SendTime);
            Map(o => o.OrderNumber);
            References<Customer>(o => o.Customer).Not.Nullable();
            References<Restaurant>(o => o.Restaurant).Not.Nullable();
            HasMany<OrderOfFood>(o => o.OrderOfFoods).Inverse().Cascade.All();
                       
                        
        }
        
    }
}
