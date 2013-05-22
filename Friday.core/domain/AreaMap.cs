using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using FluentNHibernate.Mapping;

namespace friday.core.domain
{
    public class AreaMap:ClassMap<Area>
    {
        public AreaMap()
        {
            Id(o => o.areaid).GeneratedBy.Native();
            Map(o => o.isDelete);
            Map(o => o.createTime);
            Map(o => o.leaf);
            Map(o => o.tLevel);

            Map(o => o.name).Not.Nullable();
            Map(o => o.areacode).Not.Nullable();
            Map(o => o.parentID).Not.Nullable();
            Map(o => o.parentcode).Not.Nullable();
            Map(o => o.shortname);

            HasMany<School>(o => o.schools).Inverse().Cascade.All();
        }
    }
}