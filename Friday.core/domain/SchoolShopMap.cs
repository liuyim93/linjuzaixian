using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using FluentNHibernate.Mapping;


namespace friday.core.domain
{
    public class SchoolShopMap:ClassMap<SchoolShop>
    {
        public SchoolShopMap()
        {
            Table("SchoolShop");
            Id(o => o.Id);
            Map(o => o.CreateTime);
            Map(o => o.IsDelete);
            Map(o => o.Version);
            References<School>(o => o.School);
            References<Shop>(o => o.Shop);

        }
    }
}
