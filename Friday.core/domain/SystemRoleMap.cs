using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using FluentNHibernate.Mapping;

namespace friday.core
{
    public class SystemRoleMap : ClassMap<SystemRole>
    {

        public SystemRoleMap()
        {
            Table("SystemRole");
            Id(o => o.Id);
            Map(o => o.IsDelete);
            Map(o => o.CreateTime).Index("CreateTime");
            Map(o => o.Version);
            Map(o => o.RoleID);
            Map(o => o.Name);
            Map(o => o.Remarks);
            Map(o => o.Description);
                   
        }
    }
}
