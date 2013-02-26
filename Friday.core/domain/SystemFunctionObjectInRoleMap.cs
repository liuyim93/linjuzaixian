using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using FluentNHibernate.Mapping;
using friday.core.domain;
using friday.core;

namespace Moss.Core
{
    public class SystemFunctionObjectInRoleMap : ClassMap<SystemFunctionObjectInRole>
    {

        public SystemFunctionObjectInRoleMap()
        {
            Id(o => o.Id);
            Map(o => o.IsDelete);
            Map(o => o.CreateTime).Index("CreateTime");
            Map(o => o.Version);
            References<SystemRole>(o => o.Role).Not.Nullable();
            References<SystemFunctionObject>(o => o.SystemFunctionObject);      
        }
    }
}
