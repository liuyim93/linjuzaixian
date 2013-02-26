using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using FluentNHibernate.Mapping;

namespace friday.core.domain
{
    public class RoleInMenuMap : ClassMap<RoleInMenu>
    {

        public RoleInMenuMap()
        {
            Id(o => o.Id);
            Map(o => o.IsDelete);
            Map(o => o.CreateTime).Index("CreateTime");
            Map(o => o.Version);
            Map(o => o.ButtonID);

            References<SystemRole>(o => o.Role).Not.LazyLoad().Column("RoleID");
            References<SystemMenu>(o => o.Menu).Column("MenuID");      
        }
    }
}
