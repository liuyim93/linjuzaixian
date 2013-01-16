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
            Table("School");
            Id(o=>o.Id);
            Map(o => o.CreateTime);
            Map(o => o.Name);
            Map(o => o.IsDelete);
            Map(o => o.Version);
            //2013-01-07 basilwang add index for search speed
            Map(o => o.ShortName).Index("SchoolShortName").Unique();
            Map(o=>o.CityName);
            Map(o => o.Image);
            HasMany<SchoolOfMerchant>(o => o.SchoolOfMerchants).Inverse().Cascade.All();
        }
    }
}
