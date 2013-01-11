using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using FluentNHibernate.Mapping;
namespace friday.core.domain
{
    public class MyOrderMap : ClassMap<MyOrder>
    {
        public MyOrderMap()
        {
            Table("MyOrder");
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
           References<SystemUser>(o => o.SystemUser);
           References<Shop>(o => o.Shop);
           HasMany<OrderFood>(o => o.OrderFoods).Inverse().LazyLoad().Cascade.All();
                       
                        
        }
        
    }
}
