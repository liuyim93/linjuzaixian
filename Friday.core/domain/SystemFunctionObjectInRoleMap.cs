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
            Map(o => o.Enabled).Not.Nullable().Default("0");
            Map(o => o.Editable).Not.Nullable().Default("0");
            Map(o => o.Deletable).Not.Nullable().Default("0");
            References<SystemRole>(o => o.Role).Not.Nullable();
            References<SystemFunctionObject>(o => o.SystemFunctionObject);      
        }
    }
}
