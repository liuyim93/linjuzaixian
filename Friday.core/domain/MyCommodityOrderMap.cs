using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using FluentNHibernate.Mapping;
using friday.core.EnumType;
namespace friday.core.domain
{
    public class MyCommodityOrderMap : ClassMap<MyCommodityOrder>
    {
        public MyCommodityOrderMap()
        {
            Id(o => o.Id);
            Map(o => o.CreateTime);
            Map(o => o.IsDelete);
            Map(o => o.Version);
            Map(o => o.EntityIndex);
            Map(o => o.Description);
            Map(o => o.Price);
            Map(o => o.OrderStatus);
            Map(o => o.Address);
            Map(o => o.Linkman);
            Map(o => o.Tel);
            Map(o => o.SendTime);
            Map(o => o.OrderNumber);
            Map(o => o.BackupTel);
            Map(o => o.OrderStatus).CustomType<MyOrderStatusEnum>();


            References<SystemUser>(o => o.SystemUser).Not.Nullable();
            References<Shop>(o => o.Shop).Not.Nullable();
            HasMany<OrderOfCommodity>(o => o.OrderOfCommodities).Inverse().Cascade.All();

            HasMany<ValuingOfMyCommodityOrder>(o => o.ValuingOfMyCommodityOrders).Inverse();            
                        
        }
        
    }
}
