using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using FluentNHibernate.Mapping;


namespace friday.core.domain
{
    public class SchoolOfMerchantMap : ClassMap<SchoolOfMerchant>
    {
        public SchoolOfMerchantMap()
        {
           
            Id(o => o.Id);
            Map(o => o.CreateTime);
            Map(o => o.IsDelete);
            Map(o => o.Version);
            References<School>(o => o.School).Not.Nullable();
            References<Merchant>(o => o.Merchant).Fetch.Join().Not.Nullable();

        }
    }
}
