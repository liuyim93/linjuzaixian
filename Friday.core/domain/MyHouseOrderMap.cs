using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using FluentNHibernate.Mapping;
using friday.core.EnumType;
namespace friday.core.domain
{
    public class MyHouseOrderMap : ClassMap<MyHouseOrder>
    {
        public MyHouseOrderMap()
        {
            Id(o=>o.Id);
            Map(o => o.CreateTime);
            Map(o => o.IsDelete);
            Map(o => o.Version);
            Map(o => o.EntityIndex);
            Map(o=>o.Description);
            Map(o=>o.Price);
            Map(o=>o.OrderStatus);
            Map(o => o.Address);
            Map(o=>o.Linkman);
            Map(o=>o.Tel);
            Map(o=>o.SendTime);
            Map(o => o.OrderNumber);
            Map(o => o.BackupTel);
            Map(o => o.OrderStatus).CustomType<MyOrderStatusEnum>(); 
           

            References<Customer>(o => o.Customer).Not.Nullable();
            References<Rent>(o => o.Rent).Not.Nullable();
            HasMany<OrderOfHouse>(o => o.OrderOfHouses).Inverse().Cascade.All();

            HasMany<ValuingOfMyHouseOrder>(o => o.ValuingOfMyHouseOrders).Inverse();             
        }
        
    }
}
