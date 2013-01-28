using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using FluentNHibernate.Mapping;
namespace friday.core.domain
{
    public class ValuingItemMap:ClassMap<ValuingItem>
    {
        public ValuingItemMap()
        {
            Id(o => o.Id);
            Map(o => o.CreateTime);
            Map(o => o.IsDelete);
            Map(o => o.Version);
            Map(o=>o.EntityIndex);
            Map(o => o.Score);
            Map(o => o.ValuingItemName);
            References<Valuing>(o=>o.Valuing).Not.Nullable();
        }
    }
}
