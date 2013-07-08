using System;
using System.Linq;
using System.Text;
using friday.core.domain;
using Iesi.Collections.Generic;
using friday.core.EnumType;
using System.Collections.Generic;
using FluentNHibernate.Mapping;

namespace friday.core.domain
{
    public class SectionMap : ClassMap<Section>
    {
        public SectionMap()
        {
            Id(o => o.Id);
            Map(o => o.CreateTime);
            Map(o => o.IsDelete);
            Map(o => o.Version);
            Map(o => o.EntityIndex);

            Map(o => o.ParentID);
            Map(o => o.TLevel);
            Map(o => o.Name);
            Map(o => o.Leaf);
            Map(o => o.SectionCode);
            Map(o => o.Description);
            Map(o => o.Family).Default("").Not.Nullable(); ;
           
            //HasMany<DataResource>(o => o.DataResources).LazyLoad();            
        }
    }
}
