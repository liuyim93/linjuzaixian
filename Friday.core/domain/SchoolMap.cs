using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using FluentNHibernate.Mapping;

namespace friday.core.domain
{
    public class SchoolMap:ClassMap<School>
    {
        public SchoolMap()
        {
            Id(o=>o.Id);
            Map(o => o.CreateTime);
            Map(o => o.Name);
            Map(o => o.IsDelete);
            Map(o => o.Version);
            Map(o => o.EntityIndex);
            //2013-01-07 basilwang add index for search speed
            Map(o => o.ShortName).Index("SchoolShortName").Unique();
            Map(o=>o.AreaCode);
            Map(o => o.Family);
            Map(o => o.Leaf);
            Map(o => o.ParentCode);
            Map(o => o.ParentID);
            Map(o => o.PinYin);
            Map(o => o.TLevel);

            HasMany<SchoolOfMerchant>(o => o.SchoolOfMerchants).Inverse().Cascade.All();
            HasMany<SystemUser>(o => o.SystemUsers).Inverse().Cascade.All();
        }
    }
}
