using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using FluentNHibernate.Mapping;

namespace friday.core.domain
{
    public class SystemUserMap : ClassMap<SystemUser>
    {
        public SystemUserMap()
        {
            Table("SystemUser");
            Id(o => o.Id);
            Map(o => o.CreateTime);
            Map(o => o.IsDelete);
            Map(o => o.Version);
            Map(o => o.Description);
            Map(o => o.Email);
            Map(o => o.LoginName);
            Map(o => o.Name);
            Map(o => o.Password);
            Map(o => o.Tel);
            Map(o => o.UserType);;
            References<ShoppingCart>(o => o.ShoppingCart);
            //IList<Order>
            HasMany<MyOrder>(o => o.Orders).Inverse().Cascade.All();
            HasMany<FeedBack>(o => o.FeedBack).Inverse().Cascade.All();
            HasMany<MyFavorite>(o => o.Favorite).Inverse().Cascade.All();

        }
    }
}
