using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using FluentNHibernate.Mapping;

namespace friday.core.domain
{
    public class SystemMenuMap : ClassMap<SystemMenu>
    {

        public SystemMenuMap()
        {
            Id(o => o.Id);
            Map(o => o.IsDelete);
            Map(o => o.CreateTime).Index("CreateTime");
            Map(o => o.Version);
            Map(o => o.MenuRoute);
            Map(o => o.MenuImage);
            Map(o => o.ParentID);
            Map(o => o.TLevel);
            Map(o => o.Name).Column("MenuName");
            Map(o => o.Leaf);
            Map(o => o.Remarks);
            Map(o => o.ColIndex);
            Map(o => o.IfiFrame);
            
            HasMany<RoleInMenu>(b => b.RoleInMenus).Cascade.All().Inverse().LazyLoad();
        }
    }
}
