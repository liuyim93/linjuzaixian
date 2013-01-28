using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using FluentNHibernate.Mapping;

namespace friday.core.domain
{
    public class SystemUserMap : SubclassMap<SystemUser>
    {
        public SystemUserMap()
        {
            
            Map(o => o.Description);
            Map(o => o.Email);
            //Map(o => o.LoginName);
            Map(o => o.Name);
            //Map(o => o.Password);
            Map(o => o.Tel);
            Map(o => o.UserType);

            HasOne<LoginUser>(o => o.LoginUser).PropertyRef("SystemUser");


        }
    }
}
