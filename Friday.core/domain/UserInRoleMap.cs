using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using FluentNHibernate.Mapping;

namespace friday.core.domain
{
    public class UserInRoleMap : ClassMap<UserInRole>
    {

        public UserInRoleMap()
        {
            Id(o => o.Id);
            Map(o => o.IsDelete);
            Map(o => o.CreateTime).Index("CreateTime");
            Map(o => o.Version);
            //通过LoginUser取SystemRole，Fetch.Join()
            References<SystemRole>(o => o.SystemRole).Fetch.Join().Not.Nullable();
            References<LoginUser>(o => o.LoginUser).Not.Nullable() ;      
        }
    }
}
