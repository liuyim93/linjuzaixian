using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using FluentNHibernate.Mapping;
using friday.core.EnumType;
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
            Map(o => o.EntityIndex);
            Map(o=>o.Description);
            Map(o=>o.Price);
          
            Map(o => o.Address);
            Map(o=>o.Linkman);
            Map(o=>o.Tel);
            Map(o=>o.SendTime);
            Map(o => o.OrderNumber);
            Map(o => o.BackupTel);
            Map(o => o.OrderStatus).CustomType<MyOrderStatusEnum>();


            References<SystemUser>(o => o.SystemUser).Not.Nullable();
            References<Restaurant>(o => o.Restaurant).Not.Nullable();
            HasMany<OrderOfFood>(o => o.OrderOfFoods).Inverse().Cascade.All();

            HasMany<ValuingOfMyFoodOrder>(o => o.ValuingOfMyFoodOrders).Inverse();      
                        
        }
        
    }
}
