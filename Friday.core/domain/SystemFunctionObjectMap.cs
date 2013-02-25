using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.domain;
using FluentNHibernate.Mapping;

namespace friday.core
{
    public class SystemFunctionObjectMap : ClassMap<SystemFunctionObject>
    {
        public SystemFunctionObjectMap()
        {
            Id(o => o.Id);
            Map(o => o.CreateTime);
            Map(o => o.IsDelete);
            Map(o => o.Version);
            
            Map(o => o.EntityIndex);
            Map(o => o.Description);
            Map(o=>o.PermissonTag).Not.Nullable();
            Map(o=>o.FunctionObjectName).Not.Nullable();
            Map(o=>o.ParentFunctionObjectId);
            Map(o=>o.FunctionAvailable).Default("1").Not.Nullable();
            Map(o=>o.DeletePermissionAvailable).Default("1").Not.Nullable();
            Map(o=>o.EditPermissionAvailable).Default("1").Not.Nullable();

        }

        
    }
}
