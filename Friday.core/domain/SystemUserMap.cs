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
            Id(o => o.Id);
            Map(o => o.CreateTime);
            Map(o => o.IsDelete);
            Map(o => o.Version);
            
            Map(o => o.EntityIndex);
            Map(o => o.Description);
            Map(o => o.Email);
            //Map(o => o.LoginName);
            Map(o => o.Name);
            //Map(o => o.Password);
            Map(o => o.Tel);
            Map(o => o.IsAnonymous);

            HasOne<LoginUser>(o => o.LoginUser).PropertyRef("SystemUser");
            HasMany<Address>(o => o.Addresses).Cascade.All().Inverse();
            HasMany<MyFavorite>(o => o.MyFavorites).Inverse();
            HasOne<RestaurantCart>(o => o.RestaurantCart).Cascade.SaveUpdate().PropertyRef("SystemUser") ;//no user-->keynotnullable



        }
    }
}
