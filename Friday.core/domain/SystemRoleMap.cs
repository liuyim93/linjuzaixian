using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using FluentNHibernate.Mapping;
using friday.core.domain;

namespace friday.core
{
    public class SystemRoleMap : ClassMap<SystemRole>
    {

        public SystemRoleMap()
        {
            Id(o => o.Id);
            Map(o => o.IsDelete);
            Map(o => o.CreateTime).Index("CreateTime");
            Map(o => o.Version);
            Map(o => o.Name);
            Map(o => o.Remarks);
            Map(o => o.Description);

            HasMany<RoleInMenu>(b => b.RoleInMenus).AsSet().Cascade.SaveUpdate();
            //2013-02-27 basilwang we need navigate to UserInRole to get LoginUser
            HasMany<UserInRole>(o => o.UserInRoles).Inverse().Cascade.All();
        }
    }
}
